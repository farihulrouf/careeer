import React from "react";
export default class NotAuthorised extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h1>401</h1>
        <h2>You are not authorised</h2>
        <a href="/">Go to home</a>
      </div>
    );
  }
}
