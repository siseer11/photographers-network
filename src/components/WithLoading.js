import React from "react";

export const WithLoading = ({ loading, component, ...rest }) => {
  console.log(loading);
  if (loading != false) {
    return <h2>Loading...</h2>;
  } else {
    return component;
  }
};
