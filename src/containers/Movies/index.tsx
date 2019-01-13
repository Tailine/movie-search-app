import * as React from "react";
import styled from "styled-components";
import { SearchInput } from "src/components/SearchInput";
import { IMovie, IGenre } from "src/api/types";
import { getMovies, getGenreList } from "src/api";
import { Link, RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from 'src/components/BaseComponents';

interface IState {
  userInput: string;
  movies: IMovie[];
  loading: boolean;
  genreList: { genres: IGenre[] };
}

interface IParamsProps extends RouteComponentProps<{ value?: string }> {}

export class Movies extends React.Component<IParamsProps, IState> {
  public state: IState = {
    userInput: "",
    movies: [],
    loading: false,
    genreList: { genres: [] }
  };

  public componentDidMount = () => {
    this.getGenres();
    if (this.props.match.params) {
      this.onSubmitSearch(this.props.match.params.value);
    }
  };

  private getGenres = async () => {
    const genreList = await getGenreList();
    this.setState({ genreList });
  };

  private onSubmitSearch = async (value?: string) => {
    const val = this.state.userInput === "" ? value! : this.state.userInput;
    this.props.history.push(val); // update url
    this.setState({ loading: true });
    const movies = await getMovies(val);
    this.setState({ loading: false, movies });
  };

  private onChangeSearchInput = (value: string) => {
    this.setState({
      userInput: value
    });
  };

  private filterGenre = (genreid: number[]) => {
    const res = genreid.map(genreElement => {
      const filteredGenre = this.state.genreList.genres.find(
        genreListElement => genreListElement.id === genreElement
      )!;
      return filteredGenre.name;
    });
    return res;
  };

  public render() {
    const Card = styled.div`
      margin: 3em 0;
      background-color: #0F2027;
      color: white;

      @media (min-width: 760px) {
        display: grid;
        grid-template-columns: 300px auto;
      }
    `;

    const Cover = styled.img`
      width: 100%;
      max-height: 400px;

      @media (min-width: 760px) {
        max-height: 100%;
      }
    `;

    const Description = styled.div`
      text-align: justify;
      margin-top: -5px;

      @media (min-width: 760px) {
        margin-top: 0;
      }
    `;

    const FilmTitle = styled.h2`
      background-image: linear-gradient(to right, #0F2027, #203A43, #2C5364);
      color: #78ffd6;
      padding: 0.5em 4em;
    `;

    const Sinopse = styled.div`
      margin-top: -30px;
      padding: 0.7em;
      color: #2C5364;
    `;

    const RatingContainer = styled.div`
      background-image: linear-gradient(to right, #0F2027, #203A43, #2C5364);
      display: inline-block;
      border-radius: 50%;
      padding: 0.2em;
      position: relative;
      top: -3em;
      left: 0.7em;
    `;

    const Rating = styled.div`
      background-image: linear-gradient(to right, #0F2027, #203A43, #2C5364);
      border: 3px solid #eee;
      display: inline-block;
      border-radius: 50%;
      padding: 1em;
      color: #78ffd6;
    `;

    const Date = styled.p`
      color: #959595;
      margin-left: 7em;
      padding-top: .5em;
    `;

    const DetailsLink = styled(Link)`
      text-decoration: none;
      color: #7e7e7f;
    `;

    const Genre = styled.div`
      border-radius: 15px;
      border: 1px solid #2C5364;
      display: inline-block;
      padding: 0.2em 0.4em;
      margin: 2em 0.6em;
      color: #2C5364;
    `;

    const { movies, loading } = this.state;
    const displayGenres = (g: string[]) => {
      const genres = g.map((genre, id) => {
        return <Genre key={id}>{genre}</Genre>;
      });
      return genres;
    };

    const displayMovies = () => {
      const renderMovies = movies.map(m => {
        const date = m.release_date.split("-");
        const formatedDate = `${date[2]}/${date[1]}/${date[0]}`;
        const filteredGenres = this.filterGenre(m.genre_ids);
        return (
          <DetailsLink to={"/detalhes/" + m.id} key={m.id}>
            <Card key={m.id}>
              <Cover src={`https://image.tmdb.org/t/p/w400/${m.poster_path}`} />
              <Description>
                <FilmTitle>{m.title}</FilmTitle>
                <Date>{formatedDate}</Date>
                <RatingContainer>
                  <Rating>{m.vote_average * 10}%</Rating>
                </RatingContainer>
                <Sinopse>{m.overview}</Sinopse>
                {displayGenres(filteredGenres)}
              </Description>
            </Card>
          </DetailsLink>
        );
      });
      return renderMovies;
    };

    return (
      <>
        <SearchInput
          onSubmit={this.onSubmitSearch}
          value={this.state.userInput}
          onChange={this.onChangeSearchInput}
        />
        {loading ? <LoadingComponent /> : movies.length > 0 ? displayMovies() : null}
      </>
    );
  }
}
