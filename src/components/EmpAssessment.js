import React, { Component } from "react";
import { Link } from "react-router-dom";
import SkillCard from "./SkillCardV2";
import Button from "./Button";
import "antd/dist/antd.css";
import "../assets/css/EmpAssessment.css";
import { Tooltip, Modal } from "antd";
import Info from "../assets/images/info.svg";
import { getEmployeeSkillsDetails } from "../core/apiClient/organization/organizationClient";
import { getAssessmentLink } from "../core/apiClient/assessment";
import { decryptData } from "../utils/encryptDecrypt";
import { getAllByDisplayValue } from "@testing-library/react";

const className = {
  mainContainer: {
    width: "100%",
    height: "max-content",
    textAlign: "center",
    display: "flex",
    color: "#303030",
    backgroundColor: "#FFFFFF",
    fontFamily: "Open Sans Regular",
    borderRadius: "10px",
  },
  iffo: {
    paddingRight: "8px"
  },
  EmpAssessment: {
    flex: 1,
    margin: "4% 0% 3% 0%",
  },
  subTitle: {
    fontSize: "18px",
  },
  description: {
    padding: "4% 0 0.5% 0",
    color: "#767676",
  },

  SkillCardContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: "2.5% 0 5% 0",
    flexWrap: "wrap",
  },
  ScoreNumber: {
    fontSize: 48,
    fontFamily: "Open Sans Semibold",
  },
  ButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1%",
    padding: "0 4%",
  },
  InfoIcon: {
    height: 16,
    width: 16,
    position: "relative",
    right: "-111px",
    top: "28px",
    cursor: "pointer",
  },
  assessmentTitle: {
    fontSize: "1.3em",
    fontFamily: "Open Sans Semibold",
    color: "#fa808a",
    position: "relative",
  },
};
class EmpAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSkillRating: [
        {
          title: "Technical Skills",
          backgroundColor: "#ACAED8",
          selfRating: 0,
          skills: [],
        },
        {
          title: "Functional Skills",
          backgroundColor: "#FF808B",
          selfRating: 0,
          skills: [],
        },
        {
          title: "Interpersonal Skills",
          backgroundColor: "#FFB97D",
          selfRating: 0,
          skills: [],
        },
        {
          title: "Stake Holder Skills",
          backgroundColor: "#96ACF9",
          selfRating: 0,
          skills: [],
        },
      ],
      assessmentLinks: [],
      showModal: false,
    };
  }

  componentDidMount() {
    this.loadSkillsData();
    this.loadAssessmentLink();
  }
  loadSkillsData = async () => {
    try {
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeSkillsDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let totalSkillRating = this.state.totalSkillRating;
        if (data.length) {
          for (let skillIndex in data) {
            for (let skillRateIndex in totalSkillRating) {
              if (
                data[skillIndex].skillType &&
                totalSkillRating[skillRateIndex].title
                  .toLowerCase()
                  .includes(data[skillIndex].skillType.toLowerCase())
              ) {
                totalSkillRating[skillRateIndex].skills.push(data[skillIndex]);
                totalSkillRating[skillRateIndex].selfRating =
                  totalSkillRating[skillRateIndex].selfRating +
                  parseInt(data[skillIndex].selfRating, 10);
              }
            }
          }
        }
        this.setState({ totalSkillRating });
      } else {
        document.message.error(JSON.stringify(data));
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadAssessmentLink = async () => {
    try {
      document.toggleLoading(true);
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (employeeId) {
        let { data, status } = await getAssessmentLink(employeeId, "", {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          let assessmentData = Object.entries(data);
          let assessmentValue = [
            {
              name: "Technical",
              color: "#4c52d4",
            },
            {
              name: "Interpersonal",
              color: "#fd953c",
            },
            { name: "Stakeholder", color: "#4bc848" },
            {
              name: "Interpersonal_Stakeholder",
              color: "#fd953c",
              borderColor: "#4bc848",
              width: 270,
            },
          ];
          let assessmentLinks = [];
          for (const [field, value] of assessmentData) {
            for (let i = 0; i < assessmentValue.length; i++) {
              if (
                assessmentValue[i].name.split("_").join("").toLowerCase() ===
                field.split("_").join("").toLowerCase()
              ) {
                assessmentLinks.push({
                  name: field.split("_").join(" and ") + " assessment",
                  color: assessmentValue[i].color,
                  link: value,
                  borderColor: assessmentValue[i].borderColor || null,
                  width: assessmentValue[i].width || null,
                });
              }
            }
          }

          this.setState({ assessmentLinks, showModal: true });
          document.toggleLoading();
        } else {
          document.toggleLoading();
          this.setState({ assessmentLinks: [], showModal: true });
        }
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      this.setState({ assessmentLinks: [], showModal: true });
    }
  };

  render() {
    const { assessmentLinks, totalSkillRating, showModal } = this.state;
    return (
      <Modal
        visible={showModal}
        closable={false}
        // this.props.onCloseHandler
        onCancel={null}
        footer={null}
        centered={true}
        width="800px"
        style={{ position: "relative" }}
      >
        <div style={{ borderRadius: "20px", width: "100%" }}>
          <div style={className.mainContainer}>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
              }}
            >
              {/* <Link
                to="/employee/dashboard"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#FA808A",
                }}
              >
                Go to dashboard
              </Link> */}
            </div>
            <div style={className.EmpAssessment}>
              <div style={className.subTitle}>
                {this.props.assessmentData.title}
              </div>
              <div style={className.SkillCardContainer}>
                {totalSkillRating.map((element, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        margin: "1em 0",
                      }}
                    >
                      <SkillCard
                        style={{
                          height: 92,
                          backgroundColor: element.backgroundColor,
                        }}
                        title={element.title}
                        percentage={Math.round(
                          (element.selfRating / (element.skills.length * 10)) *
                          100
                        )}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={className.subTitle}>
                {this.props.assessmentData.subTitle}
              </div>
              <div style={className.description}>
                {this.props.assessmentData.scoreTitle}
              </div>
              <div style={className.ScoreNumber}>
                {this.props.assessmentData.score.scoreValue}
              </div>
              <div>
                {/* <div style={className.assessmentTitle}>
                  Take Assessment
                  <Tooltip
                    placement="right"
                    title={
                      assessmentLinks.length > 0
                        ? this.props.assessmentData.info.enableLabel
                        : this.props.assessmentData.info.disableLabel
                    }
                  >
                    <img src={Info} style={className.InfoIcon} alt="info" />
                  </Tooltip>
                </div> */}
                {/* <div
                  placement="right"
                >
                  <img src={Info} style={className.iffo} alt="info" />
                        Your assessment is available in training page
                      </div> */}
                <div style={className.ButtonContainer}>

                  {assessmentLinks.map((eachAssessment, index) => (
                    <div
                      style={{
                        width: eachAssessment.width
                          ? eachAssessment.width
                          : 186,
                        fontFamily: "Open Sans Semibold",
                        marginRight:
                          index < assessmentLinks.length - 1 ? "2em" : "0",
                      }}
                      key={index}
                    >
                      {/* <Button
                        label={eachAssessment.name}
                        disabled={eachAssessment.link ? false : true}
                        styles={{
                          color: eachAssessment.link
                            ? eachAssessment.color
                            : "#ffff",
                          backgroundColor: eachAssessment.link
                            ? "#ffffff"
                            : "#bbbbbb",
                          border: eachAssessment.link
                            ? eachAssessment.borderColor || eachAssessment.color
                            : "#bbbbbb",
                          minHeight: "40px",
                        }}
                        onClick={() =>
                          eachAssessment.link
                            ? window.open(eachAssessment.link, "_blank")
                            : null
                        }
                      /> */}

                      <Link
                        to="/employee/dashboard"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: "#FA808A",
                        }}
                      >   <Tooltip
                        placement="right"
                        title="Your assessment is available in training page"
                      >
                          <img src={Info} style={className.InfoIcon} alt="info" />
                        </Tooltip><Button
                          label=" Go to dashboard"
                          styles={{
                            color:
                              "#ffff",
                            backgroundColor: "#f9808b",
                            border: "#f9808b",
                            minHeight: "40px",
                          }}

                        />
                      </Link>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default EmpAssessment;
