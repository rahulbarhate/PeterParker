import React, { Component } from "react";
class ParkingSpotComponent extends Component {
  state = {
    Comp: <div />
  };
  componentDidMount = () => {
    const inUseUri =
      "https://firebasestorage.googleapis.com/v0/b/singapore-a572e.appspot.com/o/car%20red.jpg?alt=media&token=e8763b1b-3007-4d46-8901-bd1fbe674c4b";
    const vacantUri =
      "https://firebasestorage.googleapis.com/v0/b/singapore-a572e.appspot.com/o/car%20green.jpg?alt=media&token=1a1e5839-28be-4bb4-974a-b9fe12e62f52";
    if (this.props.vacant == 1) {
      this.setState({
        Comp: <img src={vacantUri} style={{ width: 50 }} alt="Spot Vacant" />
      });
    } else {
      this.setState({
        Comp: <img src={inUseUri} style={{ width: 50 }} alt="Spot in use" />
      });
    }
  };
  render() {
    return <div>{this.state.Comp}</div>;
  }
}
export default ParkingSpotComponent;
