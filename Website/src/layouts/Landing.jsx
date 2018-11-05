import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ParkingLot from "../utilClasses/ParkingLot";
import MapContainer from "./MapsWrapper";
import { db } from "../firebase/firebase";
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carCount: 0,
      lat: 18,
      lng: 73.85
    };
  }
  addSampleParkingLot = () => {
    console.log("test");
    console.log(localStorage.getItem("currentUser"));

    new ParkingLot({ lat: 18.511439, lng: 73.806694 }, 1, [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ]).addToDB();
  };
  componentDidMount = () => {
    if (localStorage.getItem("currentUser")) {
      let currentUser = localStorage.getItem("currentUser");
      console.log(currentUser);
      db.ref("ParkingLot/" + 1).on("value", snapshot => {
        let res = JSON.parse(snapshot.val());
        this.setState({ carCount: res.cars.length });
        this.setState({ lat: res.coordinates.lat });
        this.setState({ lng: res.coordinates.lng });
      });
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ padding: "5%" }}>
        <div style={{ flexDirection: "column" }}>
          <Card style={{ maxWidth: 200 }}>
            <CardContent>
              <Typography variant="h3" color="primary">
                Car Count
              </Typography>
              <Typography variant="h4">{this.state.carCount}</Typography>
            </CardContent>
          </Card>
        </div>
        <div style={{ maxWidth: 500, marginTop: "2.5%" }}>
          <MapContainer latLng={{ lat: this.state.lat, lng: this.state.lng }} />
        </div>
      </div>
    );
  }
}
export default LandingPage;
