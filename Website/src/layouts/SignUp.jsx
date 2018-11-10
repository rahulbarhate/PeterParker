import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import * as routes from "../constants/routes";
import { TextField, Card, CardContent } from "@material-ui/core";
import { firebase } from "../firebase";
const INITIAL_STATE = {
  displayName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  phoneNumber: "",
  error: null
};

const SignUpPage = ({ history }) => (
  <div>
    <SignUpForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { history } = this.props;
    const { email, passwordOne } = this.state;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        firebase.auth.currentUser
          .updateProfile({
            displayName: this.state.displayName,
            phoneNumber: this.state.phoneNumber
          })
          .then(() => {
            localStorage.setItem(
              "currentUser",
              JSON.stringify(firebase.auth.currentUser)
            );
            history.push(routes.REGISTER_PARKING);
            window.location.reload();
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
    event.preventDefault();
  };

  render() {
    const { email, passwordOne, error, phoneNumber, displayName } = this.state;
    const isInvalid =
      passwordOne === "" ||
      email === "" ||
      displayName === "" ||
      phoneNumber === "";
    return (
      <div
        className="container-fluid"
        style={{ margin: "5%", alignContent: "center" }}
      >
        {" "}
        <Card style={{ maxWidth: "45%" }}>
          <CardContent>
            <form onSubmit={this.onSubmit}>
              <fieldset>
                <div className="form-group">
                  {" "}
                  <input
                    className="form-control"
                    placeholder="Name"
                    type="Name"
                    value={this.state.displayName}
                    onChange={event =>
                      this.setState(
                        byPropKey("displayName", event.target.value)
                      )
                    }
                  />
                  <br />
                  <input
                    className="form-control"
                    placeholder="Email Address"
                    type="email"
                    value={this.state.email}
                    onChange={event =>
                      this.setState(byPropKey("email", event.target.value))
                    }
                  />
                  <br />
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    onChange={event =>
                      this.setState(
                        byPropKey("passwordOne", event.target.value)
                      )
                    }
                  />
                  <br />
                  <input
                    className="form-control"
                    placeholder="Phone Number"
                    type="phoneNumber"
                    onChange={event =>
                      this.setState(
                        byPropKey("phoneNumber", event.target.value)
                      )
                    }
                  />
                  <br />
                  <button
                    className="btn btn-primary"
                    disabled={isInvalid}
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <br />
                </div>
                {error && <p>{error.message}</p>}
              </fieldset>
            </form>
            <p>
              Already have an account?
              <Link to={routes.SIGN_IN}> Sign In</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account?
    <Link to={routes.SIGN_UP}> Sign Up</Link>
  </p>
);
export default withRouter(SignUpPage);
export { SignUpForm, SignUpLink };
