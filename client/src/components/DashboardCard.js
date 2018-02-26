import React, { Component } from "react";

export default class DashboardCard extends Component {
  render() {
    const garageSales = this.props.garageSales;
    return (
      <div className="row">
        {garageSales.map(garageSale => {
          return (
            <div className="garageSaleItem" key={garageSale._id}>
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image">
                    <img
                      src={
                        "https://s3.us-east-1.amazonaws.com/garagesaleking/" +
                        garageSale.images[0]
                      }
                      alt="Dashboard Item"
                    />
                    <span className="card-title">
                      {garageSale.distance !== undefined
                        ? Math.round(garageSale.distance * 100) / 100 +
                          " miles away"
                        : garageSale.location}{" "}
                    </span>
                  </div>
                  <div className="card-content">
                    <p>
                      {garageSale.description.length >= 200
                        ? garageSale.description.substring(0, 200) + " ..."
                        : garageSale.description}
                    </p>
                  </div>
                  <div className="card-action">
                    <a
                      className="cyan-text text-darken-3"
                      href={"/garagesales/" + garageSale._id}
                    >
                      More Info
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
