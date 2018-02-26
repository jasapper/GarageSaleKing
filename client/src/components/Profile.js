import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    const currentUser = this.props.currentUser;
    
    return (
        <div className="container">
        <h3>Profile page for {currentUser.username}</h3>
        </div>

    );
  }
}