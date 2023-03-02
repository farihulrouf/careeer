import React from "react";
import "../assets/css/AdminViewUserProfileAssessment.css";
import { getAssessments } from "../core/apiClient/assessment";
import { decryptData } from "../utils/encryptDecrypt";
import timeStampToDate from "../core/lib/TimeStampToDate";
import { InboxOutlined } from "@ant-design/icons";
export default class AdminViewUserProfileAssessment extends React.Component {
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
      let employeeId = this.props.selectedUser,
        token = decryptData(localStorage.token);
      let { data, status } = await getAssessments(employeeId, months, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let assessment = this.state.assessment;
        assessment = data;
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
  render() {
    return (
      <div className="mainDiv-assesment1">
        <div className="assesmentCard1">
          <div className="assesmentHeading1">
            <div className="heading-title1">Assessment</div>

            <div className="assesmentDuration1">
              <div
                className="durationItem1"
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
                className="durationItem1"
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
                className="durationItem1"
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
          </div>
          <div className="assesmentContents1 scroll-container">
            {this.state.assessment.length !== 0 ? (
              <>
                {this.state.assessment.map((assesment, id) => (
                  <div key={id} className="contents1">
                    <div className="dot1"></div>
                    <div className="assesments1">
                      <div className="assesmentNumber1">
                        {assesment.AssessmentSkillTypeSkillScores.map(
                          (ele, indx) =>
                            indx + 1 ===
                            assesment.AssessmentSkillTypeSkillScores.length
                              ? ele.SkillType.name
                              : ele.SkillType.name + " _ "
                        )}
                      </div>
                      <div className="assesmentDate1">
                        {timeStampToDate(
                          new Date(assesment.completedAt).getTime()
                        )}
                      </div>
                    </div>
                    <div className="skillScore1">
                      <div>Skill score :&nbsp;</div>
                      <div>
                        {assesment.totalScorePercentage || 0}
                        /100
                      </div>
                    </div>
                    <div className="view1">view report</div>
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
                <span>
                  <InboxOutlined style={{ fontSize: "8em" }} />
                </span>
                <span>No Data</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
