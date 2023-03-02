import React from "react";
export default class PageNotFound extends React.Component {
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
        <h1>404</h1>
        <h2>Page Not Found!</h2>
        <a href="/">Go to home</a>
      </div>
    );
  }
}
