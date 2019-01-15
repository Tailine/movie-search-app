import * as React from "react";
import styled from "styled-components";
import { SearchInput } from "src/components/SearchInput";
import { Link, RouteComponentProps } from "react-router-dom";
import { Loading, NotFound } from "src/components/BaseComponents";
import { inject, observer } from "mobx-react";
import { MovieStore } from "../../stores";

interface IState {
  userInput: string;
  loading: boolean;
}

interface IParamsProps extends RouteComponentProps<{ value?: string }> {
  movieStore: MovieStore;
}

@inject("movieStore")
@observer
export class Movies extends React.Component<IParamsProps, IState> {
  public state: IState = {
    userInput: "",
    loading: false
  };

  public componentDidMount = () => {
    this.getGenres();
    if (this.props.match.params) {
      this.onSubmitSearch(this.props.match.params.value);
    }
  };

  private getGenres = async () => {
    await this.props.movieStore.getGenreList();
  };

  private onSubmitSearch = async (value?: string) => {
    const val = this.state.userInput === "" ? value! : this.state.userInput;
    this.props.history.push(val); // update url
    this.setState({ loading: true });
    await this.props.movieStore.getMovies(val);
  };

  private onChangeSearchInput = (value: string) => {
    this.setState({
      userInput: value
    });
  };

  private filterGenre = (genreid: number[]) => {
    const res = genreid.map(genreElement => {
      const filteredGenre = this.props.movieStore.genres.genres.find(
        genreListElement => genreListElement.id === genreElement
      )!;
      return filteredGenre.name;
    });
    return res;
  };

  public render() {
    const Card = styled.div`
      margin: 3em 0;
      border-radius: 10px;
      box-shadow: 5px 5px 5px #eae9e8;
      background-color: #ebebeb;

      @media (min-width: 760px) {
        display: grid;
        grid-template-columns: 300px auto;
      }
    `;

    const Cover = styled.img`
      width: 100%;
      max-height: 400px;
      border-radius: 10px 0 0 10px;

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
      background-color: #10162a;
      color: #ffa000;
      font-weight: 200;
      font-size: 2em;
      padding: 0.5em 3em;
      border-radius: 0 10px 0 0;
    `;

    const Sinopse = styled.div`
      margin-top: -30px;
      padding: 0.7em;
      font-size: 1.2em;
      color: #555555;
    `;

    const RatingContainer = styled.div`
      background-color: #10162a;
      display: inline-block;
      border-radius: 50%;
      padding: 0.2em;
      position: relative;
      top: -4.5em;
      left: 0.7em;
    `;

    const Rating = styled.div`
      background-color: #10162a;
      border: 4px solid #ffa000;
      display: inline-block;
      border-radius: 50%;
      padding: 1.4em 1em;
      color: #ffa000;
      font-weight: bold;
    `;

    const Date = styled.p`
      color: #959595;
      margin-left: 7em;
      padding-top: 0.5em;
    `;

    const DetailsLink = styled(Link)`
      text-decoration: none;
      color: #7e7e7f;
    `;

    const Genre = styled.div`
      border-radius: 15px;
      border: 1px solid #10162a;
      display: inline-block;
      padding: 0.4em 0.6em;
      margin: 2em 0.6em;
      color: #10162a;
      background: #fff;
    `;

    const displayGenres = (g: string[]) => {
      const genres = g.map((genre, id) => {
        return <Genre key={id}>{genre}</Genre>;
      });
      return genres;
    };

    const displayMovies = () => {
      const renderMovies = this.props.movieStore.movies.map(m => {
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
        {this.props.movieStore.isLoadingMovieDetails ? (
          <Loading />
        ) : this.props.movieStore.movies.length > 0 ? (
          displayMovies()
        ) : (
          <NotFound />
        )}
      </>
    );
  }
}
