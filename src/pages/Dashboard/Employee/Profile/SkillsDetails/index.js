import React from "react";
import "../../../../../assets/css/EmployeeUserProfileSkills.css";
import { Modal, Empty } from "antd";
import "antd/dist/antd.css";
import SkillsModal from "../../../../EmployeeOnboardingFlow/Skills";
import {
  getEmployeeSkillsDetails,
  deleteEmployeeSkillsDetails,
} from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";

const styles = {
  editButton: {
    cursor: "pointer",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    border: "1px solid #ffffff",
  },
  cancelButton: {
    padding: "5% 8% 5% 8%",
    backgroundColor: "#ffffff",
    border: "2px solid #ff808b",
    color: "#ff808b",
    marginRight: "3%",
    fontWeight: "600",
    cursor: "pointer",
  },
  saveButton: {
    padding: "5% 10% 5% 10%",
    backgroundColor: "#ff808b",
    border: "2px solid #ff808b",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
export default class EmployeeUserProfileSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      style: {
        checkColor: "#F17E8A",
        selectedColor: "#4D4CAC",
        hoverColor: "rgb(247, 86, 137)",
      },
      skillsDetails: [],
    };
  }
  componentDidMount() {
    this.loadSkillsDetails();
  }

  loadSkillsDetails = async (value) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeSkillsDetails(
          orgId,
          employeeId,
          { Authorization: token }
        );
        if (status >= 200 && status < 300) {
          let skillsDetails = [
            { title: "Technical Skills", skills: [] },
            { title: "Functional Skills", skills: [] },
            { title: "Interpersonal Skills", skills: [] },
            { title: "Stakeholder Skills", skills: [] },
            { title: "Additional Skills", skills: [] },
          ];
          let responsedata = data;
          if (responsedata.length) {
            for (let i = 0; i < responsedata.length; i++) {
              let idex = skillsDetails.findIndex((item) => {
                return item.title
                  .toLowerCase()
                  .includes(
                    responsedata[i]["skillType"]
                      .replace(/\s/g, "")
                      .toLowerCase()
                  );
              });
              if (idex < 0) idex = 0;
              skillsDetails[idex].skills.push(responsedata[i]);
            }
          }
          this.setState({ skillsDetails });
          if (value === "cancel") {
            if (skillsDetails.length && skillsDetails[0].skills.length) {
              this.setState({ visible: false });
            } else {
              document.message.error("Please save an added skill");
            }
          }
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  showDetails = () => {
    this.setState({
      visible: true,
    });
  };

  saveDetails = () => {
    this.setState({
      visible: false,
    });
    this.loadSkillsDetails();
  };

  handelDeletSkill = async (index, subIndex, option) => {
    try {
      let skillsDetails = this.state.skillsDetails;
      if (option.userId) {
        let orgId = decryptData(localStorage.orgId);
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        document.toggleLoading(true);
        let { status } = await deleteEmployeeSkillsDetails(
          option.id,
          orgId,
          employeeId,
          { Authorization: token }
        );
        if (status >= 200 && status < 300) {
          document.toggleLoading();
          document.message.success("Deleted Successfully");
          skillsDetails[index].skills.splice(subIndex, 1);
          this.setState({ skillsDetails });
        } else {
          document.message.error(
            "Something went wrong! please try again later."
          );
          document.toggleLoading();
        }
        document.toggleLoading();
      }
    } catch (error) {
      console.log(error);
      document.toggleLoading();
      return false;
    }
  };

  render() {
    const { skillsDetails, visible } = this.state;
    return (
      <div className="skilss-mainDiv">
        <div className="skillsCard">
          <div className="skillsCard-header">
            <img
              src={require("../../../../../assets/images/GroupSkills.svg")}
              alt="goalIcon"
            />
            <div className="skillsHeading">Skills</div>
            <div className="skillsHeadingLine"></div>
            <div style={styles.editButton} onClick={this.showDetails}>
              <img
                src={require("../../../../../assets/images/Groupedit.svg")}
                alt="editIcon"
              />
            </div>
          </div>
          <div
            style={{ overflowY: "auto", flex: 1 }}
            className="skills-container"
          >
            {skillsDetails.length ? (
              skillsDetails.map((eachSkill, index) => (
                <>
                  {(eachSkill.skills.length && (
                    <div key={index} className="skills-group">
                      <div className="group-heading">
                        {eachSkill.skills.length !== 0 ? eachSkill.title : ""}
                      </div>
                      <div
                        style={{
                          flexWrap: "wrap",
                          display: "flex",
                          padding: "1.2px 0px",
                          minHeight: this.state.ShowOptions ? "90px" : "",
                        }}
                      >
                        {eachSkill.skills.map((ele, indx) => {
                          return (
                            <div
                              key={indx}
                              className="savedOptions"
                              style={{
                                borderRadius: "20px",
                                margin: "3px 3px",
                                display: "flex",
                                fontSize: "14px",
                                fontFamily: "inherit",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "fit-content",
                                padding: "5px 6px",
                                border: " 0.8px solid #D7D7EC",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Open Sans Regular",
                                  padding: "0 5px 0 2.5px",
                                  color: this.state.style.selectedColor,
                                  cursor: "default",
                                  textTransform: "capitalize",
                                  letterSpacing: "0.03em",
                                  fontWeight: 500,
                                }}
                              >
                                {ele.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )) ||
                    ""}
                </>
              ))
            ) : (
              <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
        {visible && (
          <Modal
            visible={visible}
            width="50%"
            footer={null}
            onCancel={null}
            height="400px"
            className="dashboard-modal"
            closable={false}
          >
            <div className="user-profile-edit scroll-container">
              <SkillsModal
                changeOnboardingStep={this.saveDetails}
                cancel={() => this.loadSkillsDetails("cancel")}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
