import React, { Component } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
class CurriculumActivity extends Component {
  state = {
    bgColor: false,
  };
  doHoverHandler = () => {
    this.setState({
      bgColor: true,
    });
  };
  removeHoverHandler = () => {
    this.setState({
      bgColor: false,
    });
  };
  render() {
    return (
      <div
        onMouseEnter={this.doHoverHandler}
        onMouseLeave={this.removeHoverHandler}
        onClick={this.props.onClick}
        style={{
          cursor: "pointer",
          color: this.props.isMgmtCurriculum
            ? this.props.selectedId === this.props.id
              ? "#FF808B"
              : this.state.bgColor
              ? "#FF808B"
              : "#767676"
            : this.props.selectedId === this.props.id
            ? "#FFFFFF"
            : this.state.bgColor
            ? "#FF808B"
            : "#767676",
          border:
            this.props.selectedId === this.props.id
              ? "1px solid #FF808B"
              : "1px solid white",
          padding: "1% 1% 1% 3%",
          background: this.props.isMgmtCurriculum
            ? this.props.selectedId === this.props.id
              ? "#F8F8F8"
              : this.state.bgColor
              ? "#F8F8F8"
              : "#FFFFFF"
            : this.props.selectedId === this.props.id
            ? "#FF808B"
            : this.state.bgColor
            ? "#F8F8F8"
            : "#FFFFFF",
          borderRadius: 4,
          position: "relative",
          display: this.props.isMgmtCurriculum ? "" : "flex",
          alignItems: "center",
        }}
      >
        {this.props.isMgmtCurriculum ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1, paddingRight: 10 }}>
              <div>{this.props.element}</div>
              <div
                style={{
                  color:
                    this.props.status.toLowerCase() === "not started"
                      ? "red"
                      : "green",
                }}
              >
                Status: {this.props.status}
              </div>
            </div>
            <div
              style={{
                visibility:
                  this.props.selectedId === this.props.id
                    ? "visible"
                    : "hidden",
                right: 0,
                top: "28%",
                fontSize: 20,
              }}
            >
              <CaretRightOutlined />
            </div>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, paddingRight: 10 }}>
              {this.props.element}
            </div>
            <div
              style={{
                visibility:
                  this.props.selectedId === this.props.id
                    ? "visible"
                    : "hidden",
                right: 0,
                top: "28%",
                fontSize: 20,
              }}
            >
              <CaretRightOutlined />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default CurriculumActivity;
