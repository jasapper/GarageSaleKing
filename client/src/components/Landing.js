import React, { Component } from "react";
import bgimage from "./GSK-web2.jpg";


export default class Landing extends Component {


  render() {
    return (
      <div>
        <a href="/garagesales"><img src={bgimage} id="landing-img" alt="background"/></a>
        <h1>GarageSaleKing</h1>
        <h3>
          Find garage/yard sale events near you and post your own!
          <div>
            <a href="/garagesales">Go to the sales!</a>
          </div>
        </h3>
      </div>
    );
  }
}
