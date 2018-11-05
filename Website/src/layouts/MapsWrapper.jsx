import { Map, GoogleApiWrapper } from "google-maps-react";
import React from "react";
import API_KEY from "../secrets/mapSecrets";

class MapContainer extends React.Component {
  render() {
    return (
      <Map
        style={{ maxHeight: 500, maxWidth: "70%" }}
        google={this.props.google}
        zoom={14}
        className={"map"}
        center={this.props.latLng}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
