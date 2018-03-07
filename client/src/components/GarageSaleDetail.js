import React, { Component } from "react";
import GarageSaleCarousel from "./GarageSaleCarousel";

const apiKey = process.env.GOOGLE_API;

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
            <h4 className="cyan-text text-darken-3 center-align">{garageSale.location}</h4>
            <h5 className="cyan-text text-darken-3 center-align">
              Starts: {garageSale.startDate} | Ends: {garageSale.endDate}
            </h5>
            <h5 className="cyan-text text-darken-5 center-align">Description: {garageSale.description}</h5>
          </div>
          <div id="map"><a href={"https://www.google.com/maps/place/" + garageSale.location}><img src={"https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=400x400&markers=" + garageSale.location + "&key="} alt="Map of sale location" /></a>
        </div>
          <div className="col s12 garageSaleCarousel center-align">
            {<GarageSaleCarousel garageSale={garageSale} />}
          </div>
          </div>
          <div className="row section">
          
        <div className="grey lighten-2">
           <br />
          </div>
        </div>

      </div>
    );
  }
}
