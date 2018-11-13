import React, { Component } from "react";
import ParkingSpotComponent from "./ParkingSpot";
import VerticalParkingSpot from "./VerticalParkingSpot";
import { db } from "../firebase/firebase";
class ParkingVisualizationComponent extends Component {
  componentDidMount = () => {
    db.ref("ParkingLot1").on("value", snapshot => {
      console.log(JSON.parse(snapshot.val()));
      this.setState({ full: JSON.parse(snapshot.val()) });
    });
  };
  constructor(props) {
    super(props);
    this.state = { full: [[0, 0], [0, 0, 0, 0], [0, 0]] };
  }
  render() {
    return (
      <div>
        <div
          style={{
            content: "",
            clear: "both",
            display: "table",
            marginLeft: 50
          }}
        >
          {this.state.full[0].map((value, index) => (
            <div
              style={{
                float: "left",
                border: "2px solid grey"
              }}
            >
              <VerticalParkingSpot style={{}} vacant={value} key={index} />
            </div>
          ))}
        </div>
        <br />
        <div>
          {this.state.full[1].map((value, index) => (
            <ParkingSpotComponent vacant={value} key={index} />
          ))}
        </div>
        <br />
        <div style={{}}>
          {this.state.full[2].map((value, index) => (
            <ParkingSpotComponent vacant={value} key={index} />
          ))}
        </div>
      </div>
    );
  }
}
export default ParkingVisualizationComponent;
