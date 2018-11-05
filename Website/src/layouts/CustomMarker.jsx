import React, { Component } from "react";
import { Marker } from "google-maps-react/dist/components/Marker";

class CustomMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      visible: false
    };
  }
  onDragged = (map, mapProps, clickEvent) => {};
  onMarkerClicked = (map, mapProps, clickEvent) => {};
  render() {
    return (
      <Marker
        onClick={this.onMarkerClicked}
        onDragend={this.onDragged}
        visible={this.state.visible}
      />
    );
  }
}
