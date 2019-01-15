import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import { MovieStore, AuthStore } from "./stores";

const movieStore = new MovieStore();
const authStore = new AuthStore();

const rootStore = {
  movieStore,
  authStore
};

ReactDOM.render(
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
