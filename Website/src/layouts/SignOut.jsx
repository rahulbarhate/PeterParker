import React from "react";
import * as routes from "../constants/routes";
import { browserHistory } from "react-router";
import { withRouter } from "react-router-dom";
import { auth } from "../firebase";

const SignOutButton = () => (
  <button
    type="button"
    onClick={() => {
      auth.doSignOut();
      localStorage.clear("currentUser");
      this.props.history.push(routes.SIGN_IN);
    }}
  >
    Sign Out
  </button>
);

export default withRouter(SignOutButton);
