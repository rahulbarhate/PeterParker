import { Map, GoogleApiWrapper, Marker, Polygon } from "google-maps-react";
import React from "react";
import API_KEY from "../secrets/mapSecrets";
class CustomMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coords: [], polygon: <div /> };
  }
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
  render() {
    return (
      <Map
        style={{ maxHeight: 500, maxWidth: "70%" }}
        google={this.props.google}
        zoom={14}
        className={"map"}
        onClick={this.onMapClick}
        center={this.props.latLng}
      >
        <Marker title={"Current Location"} position={this.props.latLng} />
        {this.state.coords.map(latLng => (
          <Marker
            key={latLng}
            position={latLng}
            draggable={true}
            onDragend={this.onMarkerDragged}
          />
        ))}
        {this.state.polygon}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(CustomMapContainer);
