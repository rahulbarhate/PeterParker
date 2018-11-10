import React, { Component } from "react";
import { db } from "../firebase/firebase";
import { firebase } from "../firebase";
import {
  TextField,
  Card,
  CardContent,
  withStyles,
  CardMedia
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
class WatchLiveFeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carCount: 0,
      cameraFeed1: null,
      cameraFeed2: null,
      cameraFeed3: null,
      cameraFeed4: null
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("currentUser")) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser);
      db.ref("ParkingLot/" + currentUser.uid).on("value", snapshot => {
        let res = JSON.parse(snapshot.val());
        console.log(res);
      });
      let storage = firebase.storage;
      db.ref(currentUser.uid + "/" + "stream").once("value", data => {
        console.log(data.val());
      });
      db.ref(currentUser.uid + "/" + "stream").on("child_changed", data => {
        console.log(data.val());
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
        <div style={{ marginTop: "2.5%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Card style={{ marginRight: "2.5%" }}>
              <CardMedia
                src={
                  "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4"
                }
              />
              <CardContent>
                <Typography>Feed One</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardMedia
                src={
                  "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4"
                }
              />
              <CardContent>
                <Typography>Feed One</Typography>
              </CardContent>
            </Card>
          </div>
          <div
            style={{
              marginTop: "2.5%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Card style={{ marginRight: "2.5%" }}>
              <CardMedia
                src={
                  "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4"
                }
              />
              <CardContent>
                <Typography>Feed One</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardMedia
                src={
                  "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4"
                }
              />
              <CardContent>
                <Typography>Feed One</Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default WatchLiveFeedPage;
