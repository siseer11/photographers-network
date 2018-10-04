import React, { Component } from "react";
import { Spinner } from "./Spinner";

class LoadingPage extends Component {
  render() {
    return (
      <div className="section-content spinner-container">
        <Spinner />
      </div>
    );
  }
}

export default LoadingPage;
