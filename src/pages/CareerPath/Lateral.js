import React from "react";
import "../../assets/css/Lateral.css";
import { getDesignationsSkills } from "../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../utils/encryptDecrypt";
import DialogOpen from "../../components/DialogCareer/DialogCareer";
import SkillComparisonChart from "../../components/SkillComparisonChart";
import Button from "../../components/Button";
import { message } from "antd";

class Lateral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      open: false,
      title: "",
      RequiredSkills: [
        {
          title: "Technical",
          description: "",
        },
        {
          title: "Functional",
          description:
            "Complete product knowledge (25 modules), Determine scope of implementation, prepare and present proposal",
        },
        {
          title: "Stakeholder",
          description:
            "Create proper communication channels with client, Respond to client concerns",
        },
        {
          title: "Interpersonal",
          description:
            "Relationship management both internal & external, organizational skill",
        },
      ],
      information: [
        {
          title: "Technical",
          description: "",
        },
        {
          title: "Functional",
          description: "",
        },
        {
          title: "Stakeholder",
          description: "",
        },
        {
          title: "Interpersonal",
          description: "",
        },
      ],
      technical: "",
      functional: "",
      interpersonal: "",
      stakeholder: "",
      selectedBackgroundColor: "",
      color: ["#ACAED8", "#F18A96", "#9BB0F9", "#F8B87D"],
    };
  }
  onClose = () => {
    this.setState({ open: false });
  };
  async componentDidMount() {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getDesignationsSkills(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          for (let dataIndex in data) {
            switch (data[dataIndex].skillType) {
              case "Technical":
                this.setState({
                  Technical:
                    this.state.Technical === undefined
                      ? data[dataIndex].name
                      : this.state.Technical + " ," + data[dataIndex].name,
                });
                break;
              case "Functional":
                this.setState({
                  Functional:
                    this.state.Functional === undefined
                      ? data[dataIndex].name
                      : this.state.Functional + " ," + data[dataIndex].name,
                });
                break;
              case "Interpersonal":
                this.setState({
                  Interpersonal:
                    this.state.Interpersonal === undefined
                      ? data[dataIndex].name
                      : this.state.Interpersonal + " ," + data[dataIndex].name,
                });
                break;
              case "Stake holder":
                this.setState({
                  Stakeholder:
                    this.state.Stakeholder === undefined
                      ? data[dataIndex].name
                      : this.state.Stakeholder + " ," + data[dataIndex].name,
                });
                break;
              default:
                break;
            }
          }
          this.setState({ currentDesignationSkills: data });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
      document.toggleLoading();
    }
  }
  onClickDesignation = (designationDetails) => {
    this.setState({
      open: true,
      selectedBackgroundColor: designationDetails.selectedBackgroundColor,
      title: designationDetails.title,
      designationId: designationDetails.designationId,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      careerPathDetail: nextProps.careerPathDetail,
    };
  }

  render() {
    return (
      <>
        {this.state.careerPathDetail && (
          <div className="Lateral-main">
            {this.state.open === true ? (
              <DialogOpen
                open={this.state.open}
                onClose={this.onClose}
                information={this.state.information}
                headerColor={this.state.selectedBackgroundColor}
                gainedTitle={"Present Skills"}
                requiredTitle={"Required Skills"}
                RequiredSkills={this.state.RequiredSkills}
                title={this.state.title}
                designationId={this.state.designationId}
              ></DialogOpen>
            ) : (
              ""
            )}
            <div className="Lateral-step">
              {this.state.careerPathDetail.designationMatrix
                .filter(
                  (eachDesignation) => eachDesignation.careerpath === "LATERAL"
                )
                .map((eachDesignation, id) => (
                  <div
                    key={id}
                    onClick={() =>
                      this.onClickDesignation({
                        open: true,
                        selectedBackgroundColor:
                          this.state.tab === id ? "#9898F6" : "#ACAED8",
                        title: eachDesignation.forwardDesignation,
                        tab: id,
                        designationId: eachDesignation.forwardDesignationId,
                      })
                    }
                    style={{
                      background: this.state.tab === id ? "#9898F6" : "#ACAED8",
                      fontSize: this.state.careerPathDetail.designationMatrix.length >=4 ? 12: ""
                    }}
                    className={
                      this.state.careerPathDetail.lateralDesignationCount > 1
                        ? "Lateral-step1-implementation"
                        : "step3-implementation"
                    }
                  >
                    {eachDesignation.forwardDesignation}
                  </div>
                ))}
            </div>
            <div
              className="step2-implementation"
              onClick={() =>
                this.onClickDesignation({
                  open: true,
                  selectedBackgroundColor: "#f18a96",
                  title: this.state.careerPathDetail.employeeDetails
                    .currentDesignationName,
                  designationId: this.state.careerPathDetail.employeeDetails
                    .currentDesignationId,
                })
              }
            >
              {
                this.state.careerPathDetail.employeeDetails
                  .currentDesignationName
              }
            </div>
            <div className="step3-information">
              <div className="chart-div">
                <div style={{ width: "100%" }}>
                  <div className="chart-container">
                    <SkillComparisonChart
                      skillsChartData={this.props.skillsChartDetails}
                      height="300px"
                    />
                  </div>
                  {/* <div className="chart-button-container">
                    You want to improve your skills?
                    <div
                      className="chart-button"
                      onClick={() =>
                        this.onClickDesignation({
                          open: true,
                          selectedBackgroundColor: "#f18a96",
                          title: this.state.careerPathDetail.employeeDetails
                            .currentDesignationName,
                          designationId: this.state.careerPathDetail
                            .employeeDetails.currentDesignationId,
                        })
                      }
                    >
                      <Button
                        label={"Upgrade Your Skills"}
                        styles={{
                          color: "#FFFFFF",
                          backgroundColor: "#FF808B",
                          border: "#FF808B",
                          height: "40px",
                        }}
                      />
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="detail-description">
                {this.state.information.map((info, index) => (
                  <div key={index}>
                    <div className="detail-description-title">
                      <div
                        className="round-orderd"
                        style={{
                          background: this.state.color[
                            index % this.state.color.length
                          ],
                        }}
                      ></div>
                      {info.title}
                    </div>
                    <div className="detail-description-information">
                      {this.state[info.title]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Lateral;
