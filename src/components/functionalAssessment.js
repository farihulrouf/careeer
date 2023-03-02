import React, { Component } from "react";
import corner1 from "../assets/images/Mask Group 11.svg";
import corner2 from "../assets/images/Mask Group 12.svg";
const styles = {
  wholeComp: {
    width: "100%",
    overflow: "hidden",
    fontFamily: "Open Sans Regular",
  },
  mainComp: {
    margin: "10px 0px 15px 5px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "1px 4px 12px #00000027",
    borderRadius: "8px",
    opacity: 1,
  },
  mainDiv: {
    position: "relative",
    height: 202,
    display: "flex",
  },
  Details_Image: {
    margin: "30px 30px 10px 30px",
    display: "flex",
    flex: 1,
  },
  image: {
    flex: 0.3,
    margin: "10px",
    display: "flex",
    justifyContent: "center",
  },

  Details: {
    margin: "10px 10px 10px 0",
    flex: 0.7,
    lineHeight: 1.6,
    color: "#3D3D3D",
    fontfamily: "Open Sans Regular",
    opacity: 1,
    display: "flex",
    justifyContent: "center",
  },
  details_div: {
    display: "flex",
    flexDirection: "column",
  },
  para: {
    flex: 2,
    paddingTop: 18,
  },
  para1: {
    margin: "0px",
    fontFamily: "Open Sans Light",
    fontSize: "1.286em",
  },
  para2: {
    margin: "0px",
    fontFamily: "Open Sans Semibold",
    fontSize: "1.143em",
  },
  para3: {
    margin: "0px",
    font: "Open Sans Light",
  },
  button_para: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  para4: {
    flex: 1,
    margin: "0px",
    fontFamily: "Open Sans Regular",
    letterSpacing: "0px",
    color: "#404040",
    opacity: 1,
    paddingRight: "10px",
  },
};
export default class FunctionalAssessment extends Component {
  render() {
    return (
      <div style={styles.wholeComp}>
        <div style={styles.mainComp}>
          <div style={styles.mainDiv}>
            <img
              style={{ position: "absolute", top: "-32px", left: "-27px" }}
              src={corner1}
              alt='assessement'
            ></img>
            <div style={styles.Details_Image}>
              <div style={styles.image}>
                <img src={this.props.image} alt='scoreimg'></img>
              </div>
              <div style={styles.Details}>
                <div style={styles.details_div}>
                  <div style={styles.para}>
                    <p style={styles.para1}>Hey, {this.props.name} </p>
                    <b>
                      <p style={styles.para2}>
                        You have {this.props.rampcount} ramp up courses
                      </p>
                    </b>
                  </div>
                  <div style={styles.button_para}>
                    <div>
                      <p style={styles.para4}>{this.props.para3}</p>
                    </div>
                    <div>
                      <button
                        style={{
                          cursor: this.props.assessmentLink
                            ? "pointer"
                            : " not-allowed",
                          width: "186px",
                          height: " 40px",
                          border: "0px",
                          outline: "none",
                          padding: 0,
                          background: this.props.assessmentLink
                            ? "rgb(255, 128, 139) 0% 0% no-repeat padding-box"
                            : "#a2a2a2",
                          borderRadius: "4px",
                          opacity: 1,
                          textAlign: "center",
                          fontFamily: "Open Sans Semibold",
                          letterSpacing: "0px",
                          color: "#FFFFFF",
                        }}
                        type="submit"
                        onClick={() =>
                          (this.props.assessmentLink &&
                            window.open(this.props.assessmentLink, "_blank")) ||
                          null
                        }
                      >
                        {this.props.buttonName}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              style={{
                position: "absolute",
                bottom: "-61px",
                right: "-65px",
              }}
              src={corner2}
              alt='maskImg'
            ></img>
          </div>
        </div>
      </div>
    );
  }
}
