import React, { Component } from "react";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import ReactGoogleMapLoader from "react-google-maps-loader";
import API_KEY from "../secrets/mapSecrets";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      value: ""
    };
  }
  handleInputChange = e => {
    this.setState({
      search: e.target.value,
      value: e.target.value
    });
  };
  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction);
    console.log(originalPrediction);
    this.setState({ search: "", value: geocodedPrediction.formatted_address });
  };
  render = () => {
    const { search, value } = this.state;
    return (
      <ReactGoogleMapLoader
        params={{ key: API_KEY, libraries: "places,geocode" }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompleteRequest={{ input: search }}
              onSelectSuggest={this.handleSelectSuggest}
              textNoResult="No Results Found"
              customRender={prediction => (
                <div className="customWrapper">
                  {prediction ? prediction.description : "No Results found"}
                </div>
              )}
            >
              <input
                type="text"
                value={value}
                placeholder="Search a Location"
                onChange={this.handleInputChange}
              />
            </ReactGooglePlacesSuggest>
          )
        }
      />
    );
  };
}
export default SearchBar;
