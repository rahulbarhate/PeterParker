import React from "react";
import Navigation from "./components/Navigation";
import withAuthentication from "./withAuthentication";

const App = () => <Navigation />;

export default withAuthentication(App);
