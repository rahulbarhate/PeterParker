import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { firebase } from "../firebase";
import { SignUpLink } from "./SignUp";
import { auth } from "../firebase";
import * as routes from "../constants/routes";
import { TextField, Card, CardContent, withStyles } from "@material-ui/core";
import { browserHistory } from "react-router";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    // objectFit: "cover",
  },
  formControl: {
    margin: theme.spacing.unit
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount = () => {};

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(firebase.auth.currentUser)
        );
        console.log(localStorage.getItem("currentUser"));
        this.setState({ ...INITIAL_STATE });
        history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    const { classes } = this.props;

    return (
      <div className="container-fluid" style={{ margin: "5%" }}>
        <Card style={{ maxWidth: "45%" }}>
          <CardContent>
            <form onSubmit={this.onSubmit}>
              <fieldset>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={email}
                    onChange={event =>
                      this.setState(byPropKey("email", event.target.value))
                    }
                    type="text"
                    placeholder="Email Address"
                  />
                  <br />
                  <input
                    className="form-control"
                    value={password}
                    onChange={event =>
                      this.setState(byPropKey("password", event.target.value))
                    }
                    type="password"
                    placeholder="Password"
                  />
                  <br />
                  <button
                    disabled={isInvalid}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Sign In
                  </button>

                  {error && <p>{error.message}</p>}
                </div>
              </fieldset>
            </form>
            <SignUpLink />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(SignInPage));

export { SignInForm };
