import React from "react";
import "../assets/css/EmployeeUserProfileAssessment.css";
import "../assets/css/PoppinsFont.css";
import {
  getAssessments,
  getAssessmentReportUrl,
} from "../core/apiClient/assessment";
import { decryptData } from "../utils/encryptDecrypt";
import timeStampToDate from "../core/lib/TimeStampToDate";
import { Empty } from "antd";
export default class EmployeeUserProfileAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      border1: false,
      border2: true,
      border3: false,
      assessment: [],
      firstDuration: "1 yr",
      secondDuration: "6 mon",
      thirdDuration: "3 mon",
    };
  }
  componentDidMount = () => {
    this.loadAssessments(6);
  };
  loadAssessments = async (months) => {
    try {
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      let { data, status } = await getAssessments(employeeId, months, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let assessment = this.state.assessment;
        assessment = data;
        console.log("assessmenytr", data);
        this.setState({
          assessment: assessment,
        });
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  monthHandler = (ele) => {
    if (ele === "1") {
      this.setState(
        {
          border1: true,
          border2: false,
          border3: false,
        },
        () => this.loadAssessments(12)
      );
    } else if (ele === "2") {
      this.setState(
        {
          border1: false,
          border2: true,
          border3: false,
        },
        () => this.loadAssessments(6)
      );
    } else {
      this.setState(
        {
          border1: false,
          border2: false,
          border3: true,
        },
        () => this.loadAssessments(3)
      );
    }
  };

  viewReport = async (reportKey) => {
    try {
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      let { data, status } = await getAssessmentReportUrl(
        employeeId,
        reportKey,
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        window.open(data.url);
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    return (
      <div className="mainDiv-assesment">
        <div className="assesmentCard">
          <div className="assesmentHeading">
            <img src={require("../assets/images/examgroup.svg")} alt="icon" />
            <div className="heading-title">Assessment</div>
            <div className="headingLine"></div>
          </div>
          <div className="assesmentDuration">
            <div
              className="durationItem"
              onClick={() => this.monthHandler("1")}
              style={{
                border: this.state.border1 ? "1px solid#FF808B" : "",
                color: this.state.border1 ? "#FF808B" : "#767676",
                borderRadius: this.state.border1 ? "20px" : "",
              }}
            >
              {this.state.firstDuration}
            </div>
            <div
              className="durationItem"
              onClick={() => this.monthHandler("2")}
              style={{
                border: this.state.border2 ? "1px solid#FF808B" : "",
                color: this.state.border2 ? "#FF808B" : "#767676",
                borderRadius: this.state.border2 ? "20px" : "",
              }}
            >
              {this.state.secondDuration}
            </div>
            <div
              className="durationItem"
              onClick={() => this.monthHandler("3")}
              style={{
                border: this.state.border3 ? "1px solid #FF808B" : "",
                color: this.state.border3 ? "#FF808B" : "#767676",
                borderRadius: this.state.border3 ? "20px" : "",
              }}
            >
              {this.state.thirdDuration}
            </div>
          </div>
          <div className="assesmentContents">
            {this.state.assessment.length !== 0 ? (
              <>
                {this.state.assessment.map((assesment, id) => (
                  <div className="contents" key={id}>
                    <div className="dot"></div>
                    <div className="assesments">
                      <div className="assesmentNumber">
                        {assesment.AssessmentSkillTypeSkillScores.map(
                          (ele, indx) =>
                            indx + 1 ===
                            assesment.AssessmentSkillTypeSkillScores.length
                              ? ele.SkillType.name
                              : ele.SkillType.name + " _ "
                        )}
                      </div>
                      <div className="assesmentDate">
                        {timeStampToDate(
                          new Date(assesment.completedAt).getTime()
                        )}
                      </div>
                    </div>
                    <div className="skillScore">
                      <div>Skill score :&nbsp;</div>
                      <div>
                        {assesment.totalScorePercentage || 0}
                        /100
                      </div>
                    </div>
                    <div
                      className="view"
                      onClick={() => this.viewReport(assesment.reportKey)}
                    >
                      view report
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#767676",
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
