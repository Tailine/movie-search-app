import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IGenre } from "src/api/types";
import styled from "styled-components";
import Loading from "react-loading";
import { inject, observer } from "mobx-react";
import { MovieStore } from "src/stores";

interface IParamsProps extends RouteComponentProps<{ id: string }> {
  movieStore: MovieStore;
}

@inject("movieStore")
@observer
export class Details extends React.Component<IParamsProps> {
  public componentDidMount() {
    this.getMovieDetails();
  }

  private getMovieDetails = async () => {
    const movieId = this.props.match.params.id;
    await this.props.movieStore.getMovieDetails(movieId);
  };

  public render() {
    const Wrapper = styled.div`
      background-color: lightgray;
      margin: 3em 0;
    `;

    const HeaderContainer = styled.div`
      background-color: #e6e6e6;
      color: #404b88;
      display: flex;
      justify-content: space-between;
      padding: 1em;
      font-size: 1.8em;
    `;

    const Title = styled.p``;

    const Date = styled.p`
      color: #959595;
      font-size: 0.7em;
    `;

    const Content = styled.div`
      background-color: #f2f2f2;
      display: grid;
      grid-template-columns: 700px auto;
    `;

    const MovieDetails = styled.div`
      padding: 1.5em;
    `;

    const Cover = styled.img`
      width: 100%;
      height: 100%;
    `;

    const Subtitle = styled.h2`
      color: #404b88;
      font-weight: 100;
      font-size: 1.3em;
    `;

    const Paragraph = styled.p`
      margin-top: 0.7em;
      text-aling: justify;
      color: #444;
    `;

    const Line = styled.hr`
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ffa000;
      margin: 1em 0;
      padding: 0;
    `;

    const SinopseContent = styled.p`
      margin-bottom: 2em;
    `;

    const MovieInfoContainer = styled.div`
      display: flex;
      justify-content: space-between;
    `;

    const MovieInfo = styled.div`
      text-align: center;
    `;

    const MovieInfoTitle = styled.p`
      font-size: 1.2em;
      padding: 0.3em;
      color: #404b88;
    `;

    const MovieInfoDesc = styled.p`
      font-size: 0.8em;
    `;

    const Genre = styled.div`
      border-radius: 15px;
      border: 1px solid #3b4f8e;
      display: inline-block;
      padding: 0.2em 0.6em;
      margin: 3em 0.6em;
      background-color: #ffedd0;
      color: #404b88;
    `;

    let hour;
    let min;
    let formatedDate;
    if (this.props.movieStore.details) {
      const date = this.props.movieStore.details!.release_date;
      formatedDate = `${date[2]}/${date[1]}/${date[1]}`;
      hour = Math.floor(this.props.movieStore.details!.runtime / 60);
      min = this.props.movieStore.details!.runtime % 60;
    }

    const displayGenres = (genresArray: IGenre[]) => {
      const genres = genresArray.map((genre, id) => {
        return <Genre key={id}>{genre.name}</Genre>;
      });
      return genres;
    };

    return (
      <>
        {this.props.movieStore.isLoadingMovieDetails ||
        !this.props.movieStore.details ? (
          <Loading />
        ) : (
          <Wrapper>
            <HeaderContainer>
              <Title>{this.props.movieStore.details.title}</Title>
              <Date>{formatedDate}</Date>
            </HeaderContainer>
            <Content>
              <MovieDetails>
                <Subtitle>Sinopse</Subtitle>
                <Line />
                <Paragraph>{this.props.movieStore.details.overview}</Paragraph>
                <SinopseContent />
                <Subtitle>Informações</Subtitle>
                <Line />
                <MovieInfoContainer>
                  <MovieInfo>
                    <MovieInfoTitle>Situação</MovieInfoTitle>
                    <MovieInfoDesc>
                      {this.props.movieStore.details!.status}
                    </MovieInfoDesc>
                  </MovieInfo>
                  <MovieInfo>
                    <MovieInfoTitle>Idioma</MovieInfoTitle>
                    <MovieInfoDesc>
                      {this.props.movieStore.details.original_language}
                    </MovieInfoDesc>
                  </MovieInfo>
                  <MovieInfo>
                    <MovieInfoTitle>Duração</MovieInfoTitle>
                    <MovieInfoDesc>{`${hour}h ${min}min`}</MovieInfoDesc>
                  </MovieInfo>
                  <MovieInfo>
                    <MovieInfoTitle>Orçamento</MovieInfoTitle>
                    <MovieInfoDesc>
                      ${this.props.movieStore.details.budget}
                    </MovieInfoDesc>
                  </MovieInfo>
                  <MovieInfo>
                    <MovieInfoTitle>Receita</MovieInfoTitle>
                    <MovieInfoDesc>$853.977.000,00</MovieInfoDesc>
                  </MovieInfo>
                  <MovieInfo>
                    <MovieInfoTitle>Lucro</MovieInfoTitle>
                    <MovieInfoDesc>
                      ${this.props.movieStore.details.revenue}
                    </MovieInfoDesc>
                  </MovieInfo>
                </MovieInfoContainer>
                {displayGenres(this.props.movieStore.details.genres)}
              </MovieDetails>
              <Cover
                src={`https://image.tmdb.org/t/p/w400/${
                  this.props.movieStore.details.poster_path
                }`}
              />
            </Content>
          </Wrapper>
        )}
      </>
    );
  }
}
