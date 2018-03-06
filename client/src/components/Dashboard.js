import React, { Component } from "react";
import DashboardCard from "./DashboardCard";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garageSales: [],
      isEmpty: false,
      dashboardLoading: false,
      timeout: false,
      counter: 0
    };
  }

  async componentDidMount() {
    const result = await fetch("/api/garagesales");
    const garageSales = await result.json();

    this.setState({ garageSales: this.props.garageSales });

    //Check if the database has any garage sale at all to begin with
    if (garageSales.length === 0) {
      this.setState({ isEmpty: true });
      return;
    }

    if (this.props.geoLocationEnabled) {
      if (this.state.garageSales.length === 0) {
        this.setState({ dashboardLoading: true });
        //Set a timer so if loading goes on for 10seconds then
        //Taking too long View All Garage Sales button should appear on screen
        this.timerID = setInterval(() => this.timer(), 1000);
      } else {
        this.setState({ dashboardLoading: false });
      }
    } else {
      this.setState({ garageSales: garageSales });
    }
  }

  timer() {
    this.setState({ counter: this.state.counter + 1 });
    if (this.state.counter === 5) {
      console.log(this.state.counter);
      this.setState({ timeout: true });
      clearInterval(this.timerID);
    }
  }

  async onClick() {
    const result = await fetch("/api/garagesales");
    const garageSales = await result.json();
    this.setState({ garageSales: garageSales });
  }

  render() {
    if (this.isEmpty) {
      return <h2>There are no Garage Sales in our system at this time</h2>;
    } else {
      if (this.state.dashboardLoading) {
        return (
          <div className="container">
            <div className="row section">
              <div className="col s12">
                <h3 className="cyan-text text-darken-3">
                  {"geolocation" in navigator
                    ? "Garage Sales Around You"
                    : "Garage Sales"}
                </h3>
                <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>

                  <div className="spinner-layer spinner-red">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>

                  <div className="spinner-layer spinner-yellow">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>

                  <div className="spinner-layer spinner-green">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {this.state.timeout ? (
                <div>
                  <h4>Tired of waiting? Click below to view all garage sales regardless of proximity to you.</h4>
                  <button onClick={this.onClick}>View All Garage Sales</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="row section">
              <div className="col s12">
                <h3 className="cyan-text text-darken-3">
                  {this.state.garageSales.length > 0 &&
                  this.state.garageSales[0].distance !== undefined
                    ? "Garage Sales Around You"
                    : "Garage Sales"}
                </h3>
              </div>
            </div>
            {<DashboardCard garageSales={this.state.garageSales} />}
          </div>
        );
      }
    }
  }
}
