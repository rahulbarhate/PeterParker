import React, { Component } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import CustomMapContainer from "./CustomMapWrapper";
import API_KEY from "../secrets/mapSecrets";
import { Map, GoogleApiWrapper, Marker, Polygon } from "google-maps-react";
import { db } from "../firebase/firebase";
import * as routes from "../constants/routes";
import { auth } from "../firebase/firebase";
class RegisterParkingLotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 18,
      lng: 73.85,
      cars: "",
      lmv: "",
      scooters: "",
      coords: [],
      polygon: <div />,
      mapContainer: <div />
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
        this.setState({
          mapContainer: (
            <CustomMapContainer
              onClick={this.onClickHandler}
              style={{
                position: "absolute",
                float: "left"
              }}
              latLng={{ lat: position.coords.lat, lng: position.coords.lng }}
            />
          )
        });
      });
    } else {
    }
  };
  onMapClick = (mapProps, map, click) => {
    console.log(click);
    console.log(click.latLng.lat());
    let { coords } = this.state;
    coords.push({ lat: click.latLng.lat(), lng: click.latLng.lng() });
    this.setState({ coords });
    if (coords.length >= 3) {
      this.setState({ polygon: <div /> });
      this.setState({
        polygon: (
          <Polygon
            paths={this.state.coords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          />
        )
      });
    }
  };
  onSubmit = () => {
    const { history } = this.props;
    console.log(auth.currentUser.uid);
    db.ref("ParkingLot/" + auth.currentUser.uid)
      .set(
        JSON.stringify({
          coords: this.state.coords,
          carsCount: this.state.cars,
          lmvCount: this.state.lmv,
          scootersCount: this.state.scooters,
          cars: [],
          lmv: [],
          scooters: [],
          mapCenter: { lat: this.state.lat, lng: this.state.lng }
        })
      )
      .then(res => {
        history.push(routes.LANDING);
      })
      .catch(e => {
        console.error(e);
      });
  };
  render() {
    return (
      <div
        className="container-fluid"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          height: "auto",
          width: "auto",
          marginTop: "2.5%"
        }}
      >
        <form
          className="form-group"
          style={{ float: "left", width: "25%", clear: "left", maxWidth: 500 }}
        >
          <input
            value={this.state.cars}
            type="Number"
            className="form-control"
            placeholder="Number of Cars"
            onChange={event => {
              this.setState({ cars: event.target.value });
            }}
          />
          <br />
          <input
            value={this.state.lmv}
            className="form-control"
            placeholder="Number of LMV"
            type="Number"
            onChange={event => {
              this.setState({ lmv: event.target.value });
            }}
          />
          <br />
          <input
            value={this.state.scooters}
            className="form-control"
            placeholder="Number of Scooters"
            type="Number"
            onChange={event => {
              this.setState({ scooters: event.target.value });
            }}
          />
          <br />

          <Button
            className="btn btn-primary"
            color="inherit"
            onClick={this.onSubmit}
          >
            Submit
          </Button>
          <br />
          <div style={{ maxWidth: 500, width: "50%" }}>
            <Map
              google={this.props.google}
              zoom={14}
              className={"map"}
              onClick={this.onMapClick}
              center={{ lat: this.state.lat, lng: this.state.lng }}
            >
              <Marker
                title={"Current Location"}
                position={{ lat: this.state.lat, lng: this.state.lng }}
              />
              {this.state.coords.map(latLng => (
                <Marker key={latLng} position={latLng} />
              ))}
              {this.state.polygon}
            </Map>
            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(RegisterParkingLotPage);
