import React from "react";
import { getSkillComparisonDetails } from "../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../utils/encryptDecrypt";
import "antd/dist/antd.css";
import "../../assets/css/Dialogcareer.css";
import { Modal } from "antd";
import SkillComparisonChart from "../SkillComparisonChart";

class DialogCareer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      skillsChartDetails: [],
      color: ["#ACAED8", "#F18A96", "#9BB0F9", "#F8B87D"],
      skillTypes: ["Technical", "Functional", "Interpersonal", "Stakeholder"],
    };
  }

  componentDidMount() {
    this.loadSkillDetails(this.props.designationId);
    this.loadSkillComparisonChart(this.props.designationId);
  }

  async loadSkillDetails(designationId) {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        let { data, status } = await getSkillComparisonDetails(
          orgId,
          employeeId,
          designationId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let { requiredSkills, gainedSkills } = data;

          for (let skillIndex in requiredSkills) {
            switch (parseInt(requiredSkills[skillIndex].skillTypeId)) {
              case 1:
                this.setState({
                  requiredtechnical:
                    this.state.requiredtechnical === undefined
                      ? requiredSkills[skillIndex].skillName
                      : this.state.requiredtechnical +
                        " ," +
                        requiredSkills[skillIndex].skillName,
                });
                break;
              case 2:
                this.setState({
                  requiredfunctional:
                    this.state.requiredfunctional === undefined
                      ? requiredSkills[skillIndex].skillName
                      : this.state.requiredfunctional +
                        " ," +
                        requiredSkills[skillIndex].skillName,
                });
                break;
              case 3:
                this.setState({
                  requiredinterpersonal:
                    this.state.requiredinterpersonal === undefined
                      ? requiredSkills[skillIndex].skillName
                      : this.state.requiredinterpersonal +
                        " ," +
                        requiredSkills[skillIndex].skillName,
                });
                break;
              case 4:
                this.setState({
                  requiredstakeholder:
                    this.state.requiredstakeholder === undefined
                      ? requiredSkills[skillIndex].skillName
                      : this.state.requiredstakeholder +
                        " ," +
                        requiredSkills[skillIndex].skillName,
                });
                break;
              default:
                break;
            }
          }

          for (let gainedIndex in gainedSkills) {
            switch (parseInt(gainedSkills[gainedIndex].skillTypeId)) {
              case 1:
                this.setState({
                  gainedtechnical:
                    this.state.gainedtechnical === undefined
                      ? gainedSkills[gainedIndex].skillName
                      : this.state.gainedtechnical +
                        " ," +
                        gainedSkills[gainedIndex].skillName,
                });
                break;
              case 2:
                this.setState({
                  gainedfunctional:
                    this.state.gainedfunctional === undefined
                      ? gainedSkills[gainedIndex].skillName
                      : this.state.gainedfunctional +
                        " ," +
                        gainedSkills[gainedIndex].skillName,
                });
                break;
              case 3:
                this.setState({
                  gainedinterpersonal:
                    this.state.gainedinterpersonal === undefined
                      ? gainedSkills[gainedIndex].skillName
                      : this.state.gainedinterpersonal +
                        " ," +
                        gainedSkills[gainedIndex].skillName,
                });
                break;
              case 4:
                this.setState({
                  gainedstakeholder:
                    this.state.gainedstakeholder === undefined
                      ? gainedSkills[gainedIndex].skillName
                      : this.state.gainedstakeholder +
                        " ," +
                        gainedSkills[gainedIndex].skillName,
                });
                break;
              default:
                break;
            }
          }
        }
      }
      document.toggleLoading();
      return;
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  }

  loadSkillComparisonChart = async (designationId) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        let { data, status } = await getSkillComparisonDetails(
          orgId,
          employeeId,
          designationId,
          {
            Authorization: token,
          }
        );
        let skillsChartDetails = [];
        if (status >= 200 && status < 300) {
          if (data.skillCounter) {
            const entries = Object.entries(data.skillCounter);
            for (const [type, count] of entries) {
              let skillValue = "";
              let skillCounterKeyList = {
                skillType: "",
                totalSkills: "",
                requiredSkills: "",
                gainedSkills: "",
                requiredSkillsPercentage: "",
                gainedSkillsPercentage: "",
              };

              skillValue =
                type === "technicalSkills"
                  ? "Technical Skills"
                  : type === "functionalSkills"
                  ? "Functional Skills"
                  : type === "interpersonalSkills"
                  ? "Interpersonal Skills"
                  : "Stakeholder Skills";

              skillCounterKeyList.skillType = skillValue;
              skillCounterKeyList.totalSkills = count.totalSkills;
              skillCounterKeyList.requiredSkills = count.requiredSkills;
              skillCounterKeyList.gainedSkills = count.gainedSkills;
              skillCounterKeyList.level = count.level;
              skillCounterKeyList.requiredSkillsPercentage =
                count.requiredSkillsPercentage;
                skillCounterKeyList.skillStatus = count.skillStatus;
              skillCounterKeyList.gainedSkillsPercentage =
                count.gainedSkillsPercentage;
              skillsChartDetails.push(skillCounterKeyList);
            }
            this.setState({ skillsChartDetails });
          }
        }
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  handleCancel = (e) => {
    this.props.onClose();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      title: nextProps.title,
    };
  }

  render() {
    return (
      <div className={"skillgap-modal-parent"}>
        <Modal
          style={{
            padding: "0px",
            borderRadius: "15px",
          }}
          visible={this.props.open}
          closable={false}
          onCancel={this.handleCancel}
          footer={null}
          centered={true}
          width="96%"
          bodyStyle={{
            padding: "0px",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "525px",
              margin: "2.5% 0",
            }}
          >
            <div
              className="closeButton-div"
              style={{
                background: this.props.headerColor,
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            >
              <div className="dailog-title">{this.state.title}</div>
              <div
                onClick={this.handleCancel}
                className="closeButton"
                style={{
                  color: this.props.headerColor,
                }}
              >
                ×
              </div>
            </div>
            <div className="body-dialog">
              <div className="detail-description-dialog" style={{ flex: 0.6 }}>
                <span className="detail-description-title">
                  {this.props.gainedTitle}
                </span>
                {this.state.skillTypes.map((skillType, index) => (
                  <div key={index}>
                    <div
                      className="detail-description-title"
                      style={{ fontWeight: "100" }}
                    >
                      <div
                        className="round-orderd"
                        style={{
                          background: this.state.color[
                            index % this.state.color.length
                          ],
                        }}
                      ></div>
                      {skillType}
                    </div>
                    <div className="detail-description-information">
                      {this.state["gained" + skillType.toLowerCase()]}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  flex: 1.3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="dialog-chart-container">
                  <SkillComparisonChart
                    skillsChartData={this.state.skillsChartDetails}
                  />
                </div>
              </div>
              <div className="detail-description-dialog" style={{ flex: 0.9 }}>
                <span className="detail-description-title">
                  {this.props.requiredTitle}
                </span>
                {this.state.skillTypes.map((skillType, index) => (
                  <div key={index}>
                    <div
                      className="detail-description-title"
                      style={{ fontWeight: "100" }}
                    >
                      <div
                        className="round-orderd"
                        style={{
                          background: this.state.color[
                            index % this.state.color.length
                          ],
                        }}
                      ></div>
                      {skillType}
                    </div>
                    <div className="detail-description-information">
                      {this.state["required" + skillType.toLowerCase()]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DialogCareer;
