import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import GarageSaleForm from "./GarageSaleForm";
import GarageSaleDetail from "./GarageSaleDetail";
import Login from "./Login";
import Profile from "./Profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      garageSales: [],
      geoLocationEnabled: true
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          const fetchInit = {
            headers: new Headers({ "Content-Type": "application/json" }),
            method: "POST",
            mode: "cors",
            body: JSON.stringify(userLocation),
            credentials: "same-origin"
          };

          const response = await fetch("/api/user_location", fetchInit);
          const garageSales = await response.json();
          this.setState({ garageSales: garageSales, geoLocationEnabled: true });
        },
        err => {
          if (err.code === err.PERMISSION_DENIED) {
            this.setState({ geoLocationEnabled: false });
          }
        }
      );
    }
  }

  async componentDidMount() {
    const result = await fetch("/api/current_user", {
      credentials: "same-origin"
    });
    const currentUser = await result.json();
    this.setState({ currentUser: currentUser.user });
  }

  render() {
    //Default Route to be used with routes that makes use of the header component
    const DefaultRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={matchProps => (
            <div className="DefaultRoute">
              <Header currentUser={this.state.currentUser} />
              <Component
                {...matchProps}
                currentUser={this.state.currentUser}
                garageSales={this.state.garageSales}
                geoLocationEnabled={this.state.geoLocationEnabled}
              />
            </div>
          )}
        />
      );
    };

    //Private Route checks if user is logged in before rendering route
    const PrivateRoute = ({ component: Component, authed, ...rest }) => {
      return (
        <Route
          {...rest}
          render={matchProps =>
            authed === true ? (
              <div className="PrivateRoute">
                <Header currentUser={this.state.currentUser} />
                <Component
                  {...matchProps}
                  currentUser={this.state.currentUser}
                />
              </div>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: matchProps.location }
                }}
              />
            )
          }
        />
      );
    };

    //Checks if user is logged in and redirects to dashboard
    const AuthedRoute = ({ component: Component, authed, ...rest }) => {
      return (
        <Route
          {...rest}
          render={matchProps =>
            authed === true ? (
              <Redirect
                to={{
                  pathname: "/garagesales",
                  state: { from: matchProps.location }
                }}
              />
            ) : (
              <div className="AuthedRoute">
                <Header currentUser={this.state.currentUser} />
                <Component
                  {...matchProps}
                  currentUser={this.state.currentUser}
                />
              </div>
            )
          }
        />
      );
    };

    return (
      <div>
        <BrowserRouter>
          {/* Switch component is used to prevent multiple routes from being 
          rendered at any given time */}
          <Switch>
            <Route exact path="/" component={Landing} />
            <DefaultRoute exact path="/garagesales" component={Dashboard} />
            <PrivateRoute
              exact path="/garagesales/new"
              component={GarageSaleForm}
              authed={this.state.currentUser === undefined ? false : true}
            />
            <PrivateRoute
              exact path="/garagesales/:id"
              authed={this.state.currentUser === undefined ? false : true}
              component={GarageSaleDetail}
            />
            <PrivateRoute
              exact path="/profile"
              component={Profile}
              authed={this.state.currentUser === undefined ? false : true}
            />
            <DefaultRoute exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
