import React, { Component } from "react";

export default class HeaderLinks extends Component {
  render() {
    const currentUser = this.props.currentUser;
    if (currentUser === undefined) {
      return [
        <ul>
        <li key="link1">
          <a href="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
        </li>
        </ul>
      ];
    } else {
      return [
        <li key="link1">
          <a href="/profile"><i className="fa fa-user" aria-hidden="true"></i> {currentUser.username}</a>
        </li>,
        <li key="link2">
          <a href="/garagesales/new"><i className="fa fa-cart-plus" aria-hidden="true"></i> New Sale</a>
        </li>,
        <li key="link3">
          <a href="/api/logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
        </li>
      ];
    }
  }
}
