import React, { Component } from "react";
import GarageSaleCarousel from "./GarageSaleCarousel";

export default class GarageSaleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { garageSale: {} };
  }

  async componentDidMount() {
    const garageSaleId = this.props.match.params.id;
    const result = await fetch("/api/garagesales/" + garageSaleId);
    const garageSale = await result.json();

    this.setState({ garageSale: garageSale });
  }

  

  render() {
    const garageSale = this.state.garageSale;

    return (
      <div className="container">
        <div className="row section">
          <div className="col s12">
            <h3 className="cyan-text text-darken-3">{garageSale.location}</h3>
            <h5 className="cyan-text text-darken-3">
              Opened {garageSale.startDate} Closes {garageSale.endDate}
            </h5>
          </div>
          <div className="col s12 garageSaleCarousel center-align">
            {<GarageSaleCarousel garageSale={garageSale} />}
          </div>
        </div>
        <div className="grey lighten-2">
          {garageSale.location} <br />
          {garageSale.coords} <br />
          {garageSale.coords} <br />
          {garageSale.startDate} <br />
          {garageSale.endDate} <br />
        </div>
      </div>
    );
  }
}
