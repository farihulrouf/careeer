import React, { Component } from "react";

export default class componentName extends Component {
  state = {
    hoverActive: false,
    bgColor: "#FFFFFF",
  };
  componentDidMount() {
    this.setState({
      color: {
        hover:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.hover
            ? this.props.style.color.hover
            : "#ed5796",
      },
    });
  }
  mouseOverHandler = () => {
    this.setState({ hoverActive: true, bgColor: "#f5f3f3" });
  };
  mouseLeaveHandler = () => {
    this.setState({ hoverActive: false, bgColor: "#FFFFFF" });
  };
  render() {
    return (
      <div
        onMouseMove={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
        onMouseDown={this.props.onClick}
        style={{
          position: "relative",
          minHeight: "40px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          background: this.state.bgColor,
          border:
            this.state.hoverActive || this.state.enter
              ? "1px solid" + this.state.color.hover
              : "1px solid #FFFFFF",
          cursor: "pointer",
        }}
      >
        <div
          style={{ paddingRight: "40px", marginLeft: "20px", color: "#222222" }}
        >
          {this.props.country.name}
        </div>
        <div style={{ color: "#757575" }}>{this.props.country.dial_code}</div>
      </div>
    );
  }
}
