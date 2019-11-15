import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./login/Login";
import HomePage from "./home-page/HomePage";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

function App() {
  const routing = (
    <BrowserRouter>
      <>
        <div className="App__wrapper">
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );

  return <div className="App">{routing}</div>;
}

export default App;
