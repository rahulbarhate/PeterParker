import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ParkingLot from "../utilClasses/ParkingLot";
import { Map, GoogleApiWrapper, Marker, Polygon } from "google-maps-react";
import MapContainer from "./MapsWrapper";
import API_KEY from "../secrets/mapSecrets";
import { db } from "../firebase/firebase";
import firebase from "firebase";
import { auth } from "../firebase/firebase";
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lmvCount: 0,
      scootersCount: 0,
      carsCount: 0,
      coords: [],
      cars: [],
      lmv: [],
      scooters: [],
      mapCenter: {
        lat: 18,
        lng: 73.85
      },
      polygon: <div />
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("currentUser")) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));

      db.ref("ParkingLot/" + currentUser.uid).on("value", snapshot => {
        let res = JSON.parse(snapshot.val());
        this.setState({ carCount: res.cars.length });
        this.setState({ coords: res.coords });
        this.setState({ mapCenter: res.mapCenter });
        this.setState({ cars: res.cars });
        this.setState({ carsCount: res.carsCount });
        this.setState({ scooters: res.scooters });
        this.setState({ scootersCount: res.scootersCount });
        this.setState({ lmv: res.lmv });
        this.setState({ lmvCount: res.lmvCount });
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
      });
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ padding: "5%" }}>
        <div style={{ flexDirection: "column" }}>
          <div className="row">
            <Card>
              <CardContent>
                <Typography variant="h4">
                  Car Count: {this.state.carsCount}
                </Typography>
                <Typography variant="h4">
                  LMV Count: {this.state.lmvCount}
                </Typography>
                <Typography variant="h4">
                  Scooter Count: {this.state.scootersCount}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ maxWidth: 250, width: "25%", marginTop: "2.5%" }}>
          <Map google={this.props.google} center={this.state.mapCenter}>
            {this.state.polygon}
          </Map>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: API_KEY
})(LandingPage);
