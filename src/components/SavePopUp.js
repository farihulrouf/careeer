import React, { Component } from "react";
import { Button } from "antd";
class SavePopUp extends Component {
  state = {
    cancelButtonHover: false,
    saveButtonHover: false,
  };
  buttonHover = (state) => {
    if (state === "cancel") {
      this.setState({ cancelButtonHover: true });
    } else {
      this.setState({ saveButtonHover: true });
    }
  };
  buttonHoverMove = (state) => {
    if (state === "cancel") {
      this.setState({ cancelButtonHover: false });
    } else {
      this.setState({ saveButtonHover: false });
    }
  };
  render() {
    return (
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            background: "gray",
            opacity: 0.4,
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <div
            style={{
              minHeight: "24%",
              width: "32%",
              zIndex: 1,
              background: "#FFFFFF",
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginTop: "10px" }}>
              You have unsaved data on this page
            </h2>
            <h3 style={{ color: "#767676" }}>Would you like to save it?</h3>
            <div style={{ display: "flex", marginTop: "12px" }}>
              <Button
                onMouseEnter={() => this.buttonHover("cancel")}
                onMouseLeave={() => this.buttonHoverMove("cancel")}
                onClick={() => this.props.savePopUpHandler("no")}
                type="primary"
                style={{
                  opacity: this.state.cancelButtonHover ? 0.7 : 1,
                  height: "30px",
                  width: "80px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#FF808B",
                  border: "1px solid #FF808B",
                  borderRadius: "4px",
                  background: "inherit",
                  marginRight: "14px",
                }}
              >
                No
              </Button>
              <Button
                onMouseEnter={() => this.buttonHover("save")}
                onMouseLeave={() => this.buttonHoverMove("save")}
                onClick={() => this.props.savePopUpHandler("save")}
                type="primary"
                style={{
                  opacity: this.state.saveButtonHover ? 0.7 : 1,
                  height: "30px",
                  width: "80px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "4px",
                  background: "#FF808B",
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavePopUp;
