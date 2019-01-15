import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "src/components/Header";
import { Details } from "../Details";
import { Movies } from "../Movies";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Pagination } from "../../components/Pagination";

interface IState {
  movies: object;
}

class App extends React.Component<{}, IState> {
  public render() {
    const GlobalStyle = createGlobalStyle`
      @import url('https://fonts.googleapis.com/css?family=Lato');
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Lato';
      }
    `;

    const Wrapper = styled.div`
      width: 80%;
      margin: 0 auto;
    `;

    return (
      <>
        <GlobalStyle />
        <Header />
        <Wrapper>
          <Router>
            <Switch>
              <Route path="/detalhes/:id" component={Details} />
              <Route path="/:value" component={Movies} />
              <Route path="/" component={Movies} />
            </Switch>
          </Router>
        </Wrapper>
        <Pagination total={10} activePage={5} />
      </>
    );
  }
}

export default App;
