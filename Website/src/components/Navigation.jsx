import React from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "../AuthUserContext";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as routes from "../constants/routes";
import MenuIcon from "@material-ui/icons/Menu";
import withAuthentication from "../withAuthentication";
import SignOutButton from "../layouts/SignOut";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { auth } from "../firebase";
// import Navigation from "./components/Navigation";
import LandingPage from "../layouts/Landing";
import SignUpPage from "../layouts/SignUp";
import { Provider } from "react-redux";
import SignInPage from "../layouts/SignIn";
import WatchLiveFeedPage from "../layouts/WatchLiveFeed";
import HomePage from "../layouts/Home";
// import AccountPage from "./layouts/Account";

import "../css/style.css";

import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  withStyles,
  IconButton,
  Drawer,
  ListItemText,
  ListItemIcon,
  Button
} from "@material-ui/core";
import { browserHistory } from "react-router";
import { Typography } from "@material-ui/core";
import RegisterParkingLotPage from "../layouts/RegisterParkingLot";
const drawerWidth = 200;
const styles = theme => ({
  root: {
    display: "flex",
    height: window.innerHeight,
    zIndex: 1,
    overflow: "auto",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  grow: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
class Navigation extends React.Component {
  state = {
    open: false
  };
  redirectToSignIn = () => {
    localStorage.clear("currentUser");
    auth.doSignOut();
    browserHistory.push(routes.SIGN_IN);
    window.location.reload();
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  componentDidMount = () => {
    console.log();
  };
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            {/* <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              style={{ marginLeft: "1%" }}
              variant="title"
              color="inherit"
              noWrap
              className={classes.grow}
              onClick={() => {
                browserHistory.push("/");
              }}
            >
              Peter Parker
            </Typography>{" "}
            <div className={classes.grow} />
            <div
              style={
                localStorage.getItem("currentUser") != null
                  ? { display: "block", position: "end" }
                  : { display: "none" }
              }
            >
              <Button
                color="inherit"
                onClick={() => {
                  browserHistory.push(routes.WATCH_LIVE_FEED);
                  window.location.reload();
                }}
              >
                Watch Live Feed
              </Button>
              <Button color="inherit" onClick={this.redirectToSignIn}>
                Sign Out
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {/* <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
          </AuthUserContext.Consumer>
        </Drawer> */}
        <div className={classes.content}>
          <Router>
            <div>
              <Route exact path={routes.LANDING} component={LandingPage} />
              <Route exact path={routes.SIGN_UP} component={SignUpPage} />
              <Route exact path={routes.SIGN_IN} component={SignInPage} />
              <Route
                exact
                path={routes.WATCH_LIVE_FEED}
                component={WatchLiveFeedPage}
              />
              <Route
                exact
                path={routes.REGISTER_PARKING}
                component={RegisterParkingLotPage}
              />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

const NavigationAuth = () => (
  <List>
    <ListItem button onClick={() => browserHistory.push(routes.LANDING)}>
      <ListItemIcon>
        <i className="material-icons">home</i>
      </ListItemIcon>
      <ListItemText>Landing</ListItemText>
    </ListItem>
    {/* <ListItem button onClick={browserHistory.push(routes.ACCOUNT)}>
      <ListItemIcon>
        <i className="material-icons">account_circle</i>
      </ListItemIcon>
      <ListItemText>Account</ListItemText>
    </ListItem> */}
  </List>
);

const NavigationNonAuth = () => (
  <List>
    <ListItem button onClick={browserHistory.push(routes.LANDING)}>
      <ListItemIcon>
        <i className="material-icons">home</i>
      </ListItemIcon>
      <ListItemText>Landing</ListItemText>
    </ListItem>
    <ListItem button onClick={browserHistory.push(routes.SIGN_IN)}>
      <ListItemIcon>
        <i className="material-icons">account_circle</i>
      </ListItemIcon>
      <ListItemText>Sign In</ListItemText>
    </ListItem>
  </List>
);

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withAuthentication(Navigation)
);
