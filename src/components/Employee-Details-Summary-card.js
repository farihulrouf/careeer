import React, { Component } from "react";
import DotsImage from "../assets/svg/Dots.svg";
import DisplayPicture from "./DisplayPicture";
import "../assets/css/OpenSans.css";

const className = {
  container: {
    width: "100%",
    height: "100%",
    boxShadow: "1px 4px 12px #00000027",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    fontFamily: "Open Sans Regular",
  },
  summaryContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
  },
  displayImageContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  NameContainer: {
    paddingTop: "1%",
  },
  NameLabel: {
    fontSize: 24,
    color: "#303030",
    fontFamily: "Open Sans Semibold",
  },
  designation: {
    fontSize: 16,
    color: "#767676",
  },
  ProfessionalContainer: {
    color: "#303030",
    fontSize: 14,
    paddingTop: "8%",
  },
  title: {
    color: "#303030",
    fontSize: 14,
    fontFamily: "Open Sans Semibold",
    paddingBottom: "2.5%",
  },
  detailsContainer: {
    fontSize: 14,
    paddingBottom: 10,
    display: "flex",
  },
  detailsLabel: {
    color: "#767676",
    flex: 0.7,
    textTransform: "capitalize",
  },
  PersonalContainer: {
    paddingTop: "5%",
    color: "#303030",
    fontSize: 14,
  },
};

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { professionalIndex: "", personalIndex: "" };
  }

  showHiddenText = (index, field) => {
    if (this.state[field] === index) {
      this.setState({ [field]: "" });
      return;
    } else this.setState({ [field]: index });
  };

  render() {
    const professional = this.props.professionalDetailsData;
    const personal = this.props.personalDetailsData;
    const { professionalIndex, personalIndex } = this.state;
    return (
      <div style={className.container}>
        <div style={className.summaryContainer}>
          <div style={className.displayImageContainer}>
            <div style={{ display: "flex" }}>
              <img src={DotsImage} alt="DotsImage" />

              <div style={{ height: "125px", width: "126px", marginLeft: 5 }}>
                <DisplayPicture
                  profile={this.props.profile}
                  updateRotation={this.props.updateRotation}
                />
              </div>
              <div style={{ height: "125px", width: "90px" }}></div>
            </div>
            <div style={className.NameContainer}>
              <div style={className.NameLabel}>
                {professional[0].value}&nbsp;
                {professional[1].value}&nbsp;
                {professional[2].value}
              </div>
              <div style={className.designation}>{professional[7].value}</div>
            </div>
          </div>

          <div style={className.ProfessionalContainer}>
            <div style={className.title}>{this.props.title.label1}</div>
            {professional.map((element, index) => {
              if (index > 2) {
                return (
                  <div style={className.detailsContainer} key={index}>
                    <div style={className.detailsLabel}>
                      {element.title === "alternatePhoneNumber"
                        ? "altPhoneNumber"
                        : element.title.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textOverflow: "ellipsis",
                        overflow:
                          professionalIndex === index ? "visible" : "hidden",
                        whiteSpace:
                          professionalIndex === index ? "normal" : "nowrap",
                      }}
                      onClick={() =>
                        this.showHiddenText(index, "professionalIndex")
                      }
                    >
                      {!element.value
                        ? "N/A"
                        : element.title === "alternatePhoneNumber" ||
                          element.title === "phoneNumber"
                        ? element.value && element.value.length > 3
                          ? element.value.charAt(0) === "+"
                            ? element.value
                            : "+" + element.value
                          : "N/A"
                        : element.value}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div style={className.PersonalContainer}>
            <div style={className.title}>{this.props.title.label2}</div>
            {personal.map((element, index) => {
              return (
                <div style={className.detailsContainer} key={index}>
                  <div style={className.detailsLabel}>
                    {element.title.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      textOverflow: "ellipsis",
                      overflow: personalIndex === index ? "visible" : "hidden",
                      whiteSpace: personalIndex === index ? "normal" : "nowrap",
                    }}
                    onClick={() => this.showHiddenText(index, "personalIndex")}
                  >
                    {element.value === "" ? (
                      "N/A"
                    ) : element.title === "linkedInProfile" ? (
                      <span>{element.value}</span>
                    ) : (
                      element.value
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeDetails;
