import React, { Component } from "react";

const styles = {
  wholepbar: {
    width: "100%",
    height: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pbar: {
    height: "8px",
    width: "85%",
    border: "1px solid #EBEBEB",
    backgroundColor: "#EBEBEB",
    borderRadius: "5px",
    margin: "5px",
  },
};
export default class ProgressBar extends Component {
  render() {
    return (
      <div style={styles.wholepbar}>
        <div style={styles.pbar}>
          <div
            style={{
              borderRadius: "3px",
              height: "100%",
              width: this.props.progress + "%",
              background: "#4D4CAC",
            }}
          ></div>
        </div>
        <div
          style={{
            fontFamily: "Sans-serif",
            marginRight: "6%",
            font: "Semibold 16px/22px Open Sans",
            color: "#303030",
          }}
        >
          {this.props.progress}%
        </div>
      </div>
    );
  }
}
