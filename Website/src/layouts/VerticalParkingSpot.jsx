import React, { Component } from "react";

class VerticalParkingSpot extends Component {
  state = {
    Comp: <div />
  };
  componentDidMount = () => {
    const inUseUri =
      "https://firebasestorage.googleapis.com/v0/b/singapore-a572e.appspot.com/o/red90.jpg?alt=media&token=86b66342-9521-4461-9871-613e6c85d3a0";
    const vacantUri =
      "https://firebasestorage.googleapis.com/v0/b/singapore-a572e.appspot.com/o/green90.jpg?alt=media&token=27a90d38-17fe-45b9-a27f-c3cd7231d0ca";
    if (this.props.vacant == 1) {
      this.setState({
        Comp: <img src={vacantUri} style={{ height: 50 }} alt="Spot Vacant" />
      });
    } else {
      this.setState({
        Comp: <img src={inUseUri} style={{ height: 50 }} alt="Spot in use" />
      });
    }
  };
  render() {
    return <div>{this.state.Comp}</div>;
  }
}
export default VerticalParkingSpot;
