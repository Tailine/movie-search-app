import * as React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingAnimation = styled(ReactLoading)`
  margin: 0 auto;
`;

const NotFoundMessage = styled.div`
  margin: 0 auto;
  color: gray;
  font-size: 1.2em;
`;

export const Loading = () => {
  return <LoadingAnimation type="spin" color="#6c23ea" />;
};

export const NotFound = () => {
  return <NotFoundMessage>Filme não encontrado :(</NotFoundMessage>;
};
