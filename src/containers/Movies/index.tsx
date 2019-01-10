import * as React from "react";
import styled from "styled-components";
import { SearchInput } from "src/components/SearchInput";
import { IMovie } from "src/api/types";
import { getMovies } from "src/api";
import { Link } from "react-router-dom";

interface IState {
  userInput: string;
  movies: IMovie[];
}

export class Movies extends React.Component<{}, IState> {
  public state: IState = {
    userInput: "",
    movies: []
  };

  private onSubmitSearch = async () => {
    const movies = await getMovies(this.state.userInput);
    this.setState({ movies }, () => {
      console.log(movies);
    });
  };

  private onChangeSearchInput = (value: string) => {
    this.setState({
      userInput: value
    });
  };

  public render() {
    const Card = styled.div`
      margin: 3em 0;

      @media (min-width: 760px) {
        display: grid;
        grid-template-columns: 300px auto;
      }
    `;

    const Cover = styled.img`
      height: 100%;
      width: 100%;

      @media (min-width: 760px) {
        min-height: 400px;
      }
    `;

    const Description = styled.div`
      text-align: justify;
    `;

    const FilmTitle = styled.h2`
      background-image: linear-gradient(to right, #3f5efb, #4510a1);
      color: white;
      padding: 0.5em 4em;
    `;

    const Sinopse = styled.div`
      padding: 0.7em;
      margin-top: 1em;
    `;

    const RatingContainer = styled.div`
      background-image: linear-gradient(to right, #3f5efb, #4510a1);
      display: inline-block;
      border-radius: 50%;
      padding: 0.2em;
      position: relative;
      top: -2em;
      left: 0.7em;
    `;

    const Rating = styled.div`
      background-color: #116193;
      border: 3px solid #eee;
      display: inline-block;
      border-radius: 50%;
      padding: 1em;
      background-image: linear-gradient(to right, #3f5efb, #4510a1);
      color: #eee;
    `;

    const CardLink = styled(Link)`
      text-decoration: none;
      color: #7e7e7f;
    `;

    const { movies } = this.state;

    const displayMovies = () => {
      const renderMovies = movies.map(m => {
        return (
          <CardLink to={"/detalhes/" + m.id} key={m.id}>
            <Card key={m.id}>
              <Cover src={`https://image.tmdb.org/t/p/w400/${m.poster_path}`} />
              <Description>
                <FilmTitle>{m.title}</FilmTitle>
                <RatingContainer>
                  <Rating>{m.vote_average * 10}</Rating>
                </RatingContainer>
                <Sinopse>{m.overview}</Sinopse>
              </Description>
            </Card>
          </CardLink>
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
        {movies.length > 0 ? displayMovies() : null}
      </>
    );
  }
}
