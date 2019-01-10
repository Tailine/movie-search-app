import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
// import { getDetails } from "src/api";
import { IMovieDetails } from "src/api/types";
import styled from "styled-components";

interface IParamsProps extends RouteComponentProps<any> {
  match: any;
}

interface IState {
  details: IMovieDetails[];
}

export class Details extends React.Component<IParamsProps, {}, IState> {
  public state: IState = {
    details: []
  };

  //   private getMovieDetails = async () => {
  //   const movieId = this.props.match.params.id;
  //   const details = await getDetails(movieId);
  //   this.setState({ details });
  //   };

  public render() {
    const Wrapper = styled.div`
      background-color: lightgray;
      margin: 3em 0;
    `;

    const HeaderContainer = styled.div`
      background-color: gray;
      color: white;
      display: flex;
      justify-content: space-between;
      padding: 1em;
      font-size: 1.2em;
    `;

    const Title = styled.p``;

    const Date = styled.p``;

    const Content = styled.div`
      display: grid;
      grid-template-columns: 700px auto;
    `;

    const MovieDetails = styled.div`
      padding: 1.5em;
    `;

    const Cover = styled.img`
      width: 100%;
    `;

    const Subtitle = styled.h2`
      color: #1b4a96;
      font-weight: 100;
    `;

    const Line = styled.hr`
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #00baba;
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
      color: #1b4a96;
    `;

    const MovieInfoTitleDesc = styled.p`
      font-size: 0.8em;
    `;

    return (
      <>
        <Wrapper>
          <HeaderContainer>
            <Title>Thor: Ragnarok</Title>
            <Date>25/10/2015</Date>
          </HeaderContainer>
          <Content>
            <MovieDetails>
              <Subtitle>Sinopse</Subtitle>
              <Line />
              <SinopseContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nostrum cupiditate facere, nam assumenda quisquam ea
                optio a deleniti, eum, hic sunt consectetur eaque blanditiis
                veritatis ratione at deserunt totam.
              </SinopseContent>
              <Subtitle>Informações</Subtitle>
              <Line />
              <MovieInfoContainer>
                <MovieInfo>
                  <MovieInfoTitle>Situação</MovieInfoTitle>
                  <MovieInfoTitleDesc>Lançado</MovieInfoTitleDesc>
                </MovieInfo>
                <MovieInfo>
                  <MovieInfoTitle>Idioma</MovieInfoTitle>
                  <MovieInfoTitleDesc>Inglês</MovieInfoTitleDesc>
                </MovieInfo>
                <MovieInfo>
                  <MovieInfoTitle>Duração</MovieInfoTitle>
                  <MovieInfoTitleDesc>2h 10min</MovieInfoTitleDesc>
                </MovieInfo>
                <MovieInfo>
                  <MovieInfoTitle>Orçamento</MovieInfoTitle>
                  <MovieInfoTitleDesc>$180.000.000,00</MovieInfoTitleDesc>
                </MovieInfo>
                <MovieInfo>
                  <MovieInfoTitle>Receita</MovieInfoTitle>
                  <MovieInfoTitleDesc>$853.977.000,00</MovieInfoTitleDesc>
                </MovieInfo>
                <MovieInfo>
                  <MovieInfoTitle>Lucro</MovieInfoTitle>
                  <MovieInfoTitleDesc>$673.977.000,00</MovieInfoTitleDesc>
                </MovieInfo>
              </MovieInfoContainer>
            </MovieDetails>
            <Cover src="https://echosrecordbar.co.za/storage/90865/conversions/101544_medium.jpg" />
          </Content>
        </Wrapper>
      </>
    );
  }
}
