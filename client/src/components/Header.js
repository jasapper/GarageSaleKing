import React, { Component } from "react";
import HeaderLinks from "./HeaderLinks";
import $ from "jquery";

export default class Header extends Component {
  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="cyan darken-3">
          <div className="nav-wrapper container">
            <a href="/garagesales" className="brand-logo">
              GarageSaleKing
            </a>
            <a href="" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <HeaderLinks currentUser={this.props.currentUser} />
            </ul>
            <ul className="right side-nav" id="mobile-demo">
              <HeaderLinks currentUser={this.props.currentUser} />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
