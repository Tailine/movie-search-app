import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {Header} from 'src/components/Header';
import Details from '../Details';
// import {SearchInput} from '../../components/SearchInput';
import {Movies} from '../Movies';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

interface IState {
  movies: object;
}

class App extends React.Component<{}, IState> {

  public render() {

    const GlobalStyle = createGlobalStyle`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
                <Route path="/detalhes" component={Details} />
                <Route path="/movies" component={Movies} />
              </Switch>
            </Router>
          </Wrapper>
        </>
    );
  }
}

export default App;
