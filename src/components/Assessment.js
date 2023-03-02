import React, { Component } from "react";
import corner1 from "../assets/images/Mask Group 11.svg";
import corner2 from "../assets/images/Mask Group 12.svg";
import AssessmentModal from "./TrainingAssessmentModal";
import { decryptData } from "../utils/encryptDecrypt";
import { getEmployeeDetails } from "../core/apiClient/organization/organizationClient";
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
    alignItems: "center",
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
    flex: 1,
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
export default class Assessment extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleModal = (visible) => {
    this.setState({ visible });
  };
  componentDidMount = () => {
    this.loadEmployeeDetails();
  };
  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.selectedUser
        ? this.props.selectedUser
        : decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          console.log(data);
          this.setState({
            employee: data.professionalDetails,
          });
          console.log(this.state.employee.firstName,"employee")
        }

        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  render() {
    return (
      <div style={styles.wholeComp}>
        <div style={styles.mainComp}>
          <div style={styles.mainDiv}>
            <img
              style={{ position: "absolute", top: "-32px", left: "-26px" }}
              src={corner1}
              alt=""
            ></img>
            <div style={styles.Details_Image}>
              <div style={styles.image}>
                <img
                  src={this.props.image}
                  style={{ width: 154, height: 116 }}
                  alt=""
                ></img>
              </div>
              <div style={styles.Details}>
                <div style={styles.details_div}>
                  <div style={styles.para}>
                    <p style={styles.para1}>Hey {this.state.employee?.firstName}</p>
                    <b>
                      <p style={styles.para2}>
                        {`You are ${
                          Math.round(100-(this.props.Percentage)) || 0
                        }% away on your ${this.props.skillType || ""} skills for your next role!`}
                      </p>
                    </b>
                    <p style={styles.para3}>
                      {/* Test your skills and improve your skill score */}
                    </p>
                  </div>
                  {this.props.skillType != 'stakeholder' ?      <div style={styles.button_para}>
                    <div style={styles.para4}>
                    Validate your skills today!
                    </div>
                  <button
                      style={{
                        cursor: "pointer",
                        width: "186px",
                        height: " 40px",
                        border: "0px",
                        outline: "none",
                        padding: 0,
                        background:
                          "rgb(255, 128, 139) 0% 0% no-repeat padding-box",
                        borderRadius: "4px",
                        opacity: 1,
                        textAlign: "center",
                        fontFamily: "Open Sans Semibold",
                        letterSpacing: "0px",
                        color: "#FFFFFF",
                      }}
                      type="submit"
                      onClick={() => this.handleModal(true)}
                    >
                      Take Assessment
                    </button>
                  </div>: ""}
                </div>
              </div>
            </div>
            <img
              style={{
                position: "absolute",
                top: "152px",
                right: " -65px",
              }}
              src={corner2}
              alt=""
            ></img>
          </div>
        </div>
        <AssessmentModal
          visible={this.state.visible}
          label="Take Assessment"
          closeModal={() => this.handleModal(false)}
          assessmentLink={this.props.assessmentLink}
        />
      </div>
    );
  }
}
