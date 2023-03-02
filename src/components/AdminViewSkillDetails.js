import React, { Component } from "react";
import "../assets/css/AdminViewSkillDetails.css";
import { getEmployeeSkillsDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import { Empty } from "antd";

class AdminViewSkillDetails extends Component {
  state = {
    style: {
      checkColor: "#F17E8A",
      selectedColor: "#4D4CAC",
      hoverColor: "rgb(247, 86, 137)",
    },
    skillDetails: [
      { title: "Technical Skills", skills: [] },
      { title: "Functional Skills", skills: [] },
      { title: "Interpersonal Skills", skills: [] },
      { title: "Stakeholder Skills", skills: [] },
      { title: "Additional Skills", skills: [] },
    ],
    areSkillsEmpty: true,
  };
  componentDidMount = () => {
    this.loadSkillsDetails();
  };
  loadSkillsDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = this.props.selectedUser,
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        let { data, status } = await getEmployeeSkillsDetails(
          orgId,
          employeeId,
          { Authorization: token }
        );
        if (status >= 200 && status < 300) {
          let skillDetails = this.state.skillDetails;
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              let idex = skillDetails.findIndex((item) => {
                return item.title
                  .toLowerCase()
                  .includes(data[i]["skillType"].toLowerCase());
              });
              if (idex < 0) idex = 0;
              skillDetails[idex].skills.push(data[i].name);
            }
          }
          for (let i = 0; i < skillDetails.length; i++) {
            if (skillDetails[i].skills.length > 0) {
              this.setState({ areSkillsEmpty: false });
            }
          }
          this.setState({ skillDetails });
        }
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  render() {
    return (
      <div className="skilss-mainDiv1">
        <div className="skillsCard1">
          <div className="skillsCard-header1">
            <img
              src={require("../assets/images/adminViewSkill.svg")}
              alt="skillIcon"
            />
            <div className="skillsHeading1">Skills</div>
            <div className="skillsHeadingLine1"></div>
          </div>
          <div
            className="scroll-container"
            style={{ overflowY: "auto", flex: 1 }}
          >
            {!this.state.areSkillsEmpty ? (
              this.state.skillDetails.map((skillDetail, index) => (
                <div key={index} className="skills-group1">
                  <div className="group-heading1">
                    {skillDetail.skills.length !== 0 ? skillDetail.title : ""}
                  </div>
                  <div
                    style={{
                      flexWrap: "wrap",
                      display: "flex",
                      padding: "1.2px 0px",
                    }}
                  >
                    {skillDetail.skills.map((ele, indx) => {
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
                              textTransform: "capitalize",
                              letterSpacing: "0.03em",
                              fontWeight: 500,
                            }}
                          >
                            {ele}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminViewSkillDetails;
