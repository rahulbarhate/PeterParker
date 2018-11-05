import React from "react";
import { firebase } from "../firebase";
import { TextField, Card, CardContent, withStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carCount: 0
    };
  }
  componentDidMount = () => {
    let currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
  };
  render() {
    return (
      <div className="container-fluid">
        <div>
          <Card>
            <CardContent>
              <Typography>Car Count</Typography>
              <Typography>{this.state.carCount}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default HomePage;
