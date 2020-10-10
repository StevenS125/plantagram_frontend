// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import { MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import green from '@material-ui/core/colors/green';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const theme = createMuiTheme({
    palette: {
    primary: green,
    }
})



ReactDOM.render(
  
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
      <MuiThemeProvider theme={theme}>
    <App />
    </ MuiThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();