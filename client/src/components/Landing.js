import React, { Component } from "react";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <h2>Landing Page</h2>
        <h3>
          The first page shown to arriving user, this page will cycle through a set of pictures
          in the background. There will be buttons for the user to login, signup or view all garage
          sales around thier location.
          <div>
            <a href="/garagesales">View the garage sales around you</a>
          </div>
        </h3>
      </div>
    );
  }
}
