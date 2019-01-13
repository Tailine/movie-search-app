import * as React from 'react';
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = styled(ReactLoading)`
  margin: 0 auto;
`;

export const LoadingComponent = () => {
  return <Loading type="spin" color="#6c23ea" /> 
}