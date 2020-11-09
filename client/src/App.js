import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Browsing from './pages/Browsing';
import SignUp from "../src/pages/SignUp";
// import API from "./utils/API.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { NavbarText } from 'reactstrap';
import { Router, Redirect } from 'react-router';

class App extends Component {

  state = {
    redirect: false
  };

  componentDidMount = () => {
    fetch("http://localhost:3001/", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response  => {
      if (response.status === 200) {
        return this.setState({
          redirect: true
        })
      } else {
        return this.setState({
          redirect: false
        })
      }
    })
    .catch(error => {
      console.log("Error authenticating user: ", error);
    })
  }

  render() {
    const {redirect} = this.state;

    if (redirect) {
      return (<BrowserRouter><Redirect to="/profile" /></BrowserRouter>)
    }


    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/browsing"} component={Browsing} />
          </Switch>
        </div>
      </BrowserRouter>
    );
    
  }
}
export default App;