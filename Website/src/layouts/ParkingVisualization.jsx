import React, { Component } from "react";
import ParkingSpotComponent from "./ParkingSpot";
import VerticalParkingSpot from "./VerticalParkingSpot";
class ParkingVisualizationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { full: [[0, 0], [0, 1, 0, 0], [0, 1]] };
  }
  render() {
    const inUseUri =
      "https://firebasestorage.googleapis.com/v0/b/singapore-a572e.appspot.com/o/car%20red.jpg?alt=media&token=e8763b1b-3007-4d46-8901-bd1fbe674c4b";
    const vacantUri =
      "https://firebasestorage.googleapis.com/v0/b/singapore-a572e.appspot.com/o/car%20green.jpg?alt=media&token=1a1e5839-28be-4bb4-974a-b9fe12e62f52";
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
                border: "2px solid black"
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
