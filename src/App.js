import React from "react";

// New - import the React Router components, and the Profile page component
import { Router, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Home from './components/Home'
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import MenuAppBar from './components/Navigation';
import Test from "./components/Test";


function App() {


  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
    <MenuAppBar />
        </header>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/test" component={Test} />
          <PrivateRoute exact path="/feed" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
