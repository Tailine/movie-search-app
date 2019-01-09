import * as React from "react";
import styled from "styled-components";
import { SearchInput } from "src/components/SearchInput";
import { IMovie } from "src/api/types";
import { getMovies } from "src/api";

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
    this.setState({ movies }, () => console.log(movies));
  };

  private onChangeSearchInput = (value: string) => {
    this.setState({
      userInput: value
    });
  };

  public render() {
    const Card = styled.div`
      display: grid;
      grid-template-columns: 200px auto;
    `;

    const Cover = styled.div`
      background-image: url(https://nerdist.com/wp-content/uploads/2014/09/DC-COMICS-BATMAN-SUPERMAN-14-COVER.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 300px;
    `;

    const Description = styled.div``;

    const FilmTitle = styled.h2`
      background-image: linear-gradient(to right, #3f5efb, #4510a1);
      color: white;
      padding: 0.5em;
    `;

    const Sinopse = styled.div`
      padding: 0.7em;
      margin-top: 0.7em;
    `;

    const { movies } = this.state;

    return (
      <>
        <SearchInput
          onSubmit={this.onSubmitSearch}
          value={this.state.userInput}
          onChange={this.onChangeSearchInput}
        />
        {movies.length > 0 ? (
          <Card>
            <Cover />
            <Description>
              <FilmTitle>{movies[0].title}</FilmTitle>
              <Sinopse>{movies[0].overview}</Sinopse>
            </Description>
          </Card>
        ) : null}
      </>
    );
  }
}
