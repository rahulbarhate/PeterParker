import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import CustomMapContainer from "./CustomMapWrapper";
class RegisterParkingLotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 18,
      lng: 73.85
    };
  }
  componentDidMount = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude
        });
        this.setState({
          lng: position.coords.longitude
        });
      });
    } else {
    }
    this.mapContainer = (
      <CustomMapContainer
        latLng={{ lat: this.state.lat, lng: this.state.lng }}
      />
    );
  };
  render() {
    return (
      <div className="container-fluid" style={{ marginTop: "5%" }}>
        {this.mapContainer}
        <form className="form-group">
          <input
            className="form-control"
            placeholder="Number of Cars"
            type="Number"
          />
        </form>
      </div>
    );
  }
}

export default RegisterParkingLotPage;
