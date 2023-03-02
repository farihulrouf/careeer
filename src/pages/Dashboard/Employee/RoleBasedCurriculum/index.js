import React, { Component } from "react";
import { message } from "antd";
import CurriculumList from "../RoleBasedCurriculum/components/CurriculumList";
import LearningObjectives from "./components/LearningObjectives";
import { decryptData } from "../../../../utils/encryptDecrypt";
import {
  getEmployeeCurriculums,
  getEmployeeCurriculumObjectives,
} from "../../../../core/apiClient/organization/organizationClient";
import Info from "../../../../assets/images/info.svg";
import ToolTip from "../../../../components/ToolTipComponent";
import CampusManagementCurriculum from "../RoleBasedCurriculum/components/CampusManagementCurriculum";
import CampusManagementLearningObjectives from "../RoleBasedCurriculum/components/CampMgmtLearningObjective";

class RoleBasedCurriculum extends Component {
  state = {
    selectedId: 0,
    curriculums: [],
    learningObjectives: [],
    showToolTip: false,
    checkMarkIndexes: [1, 3, 4, 7, 11, 12, 15, 16, 19, 20],
    checkMarkIndexes1: [1, 3, 4, 7, 11, 12, 15, 16, 19, 20],
    checkMarkIndexes2: [0, 3, 5, 6, 9, 11, 15, 16, 17, 19],
    isCampusManagement: true,
    campMgmtselectedId: 0,
    campMgmtLearningObjectives: {},
    statusPercentage: [
      { name: "notStarted", value: 100 },
      { name: "completed", value: 0 },
    ],
    CourseTypes: [],
    campusManagement: [],
  };

  componentDidMount = () => {
    // this.loadEmployeeCurriculums();      // Need to manage api calls based on the Curriculum
    this.loadCampMgmtCurriculum();
  };
  setSelectedId = (curriculums) => {
    if (curriculums.length !== 0) {
      for (let i = 0; i < curriculums.length; i++) {
        if (curriculums[i].curriculum.length !== 0) {
          this.setState(
            {
              selectedId: curriculums[i].curriculum[0].id,
            },
            () => this.loadEmployeeObjectives(this.state.selectedId, 0)
          );
          return;
        }
      }
    }
  };
  loadEmployeeCurriculums = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getEmployeeCurriculums(orgId, employeeId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let curriculums = this.state.curriculums;
          curriculums = response.data;
          this.setState(
            {
              curriculums: curriculums,
            },
            () => this.setSelectedId(this.state.curriculums)
          );
        } else {
          this.setState({
            curriculums: [],
            selectedId: 0,
          });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  loadEmployeeObjectives = async (curriculumId, index) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getEmployeeCurriculumObjectives(
          orgId,
          employeeId,
          curriculumId,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let learningObjectives = this.state.learningObjectives;
          learningObjectives = response.data;
          this.setState({
            learningObjectives: learningObjectives,
          });
          //this is for random select checkbox
          if (index % 2 === 0) {
            this.setState({
              checkMarkIndexes: this.state.checkMarkIndexes1,
            });
          } else
            this.setState({ checkMarkIndexes: this.state.checkMarkIndexes2 });
        } else {
          this.setState({
            learningObjectives: [],
            selectedId: 0,
          });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  onClickCurriculum = (id, index) => {
    this.setState(
      {
        selectedId: id,
      },
      () => this.loadEmployeeObjectives(id, index)
    );
  };
  loadCampMgmtCurriculum = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getEmployeeCurriculums(orgId, employeeId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let campusManagement = this.state.campusManagement;
          campusManagement = response.data;
          this.setState(
            {
              campusManagement: campusManagement,
            },
            () => this.onClickCampMgmtCurriculum(0)
          );
        } else {
          this.setState({
            campusManagement: [],
            campMgmtselectedId: 0,
          });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };

  onClickCampMgmtCurriculum = (index) => {
    if (this.state.campusManagement.length > 0) {
      this.setState({ campMgmtselectedId: index });
      let campMgmtLearningObjectives = this.state.campusManagement[index];
      let completed =
        Number(campMgmtLearningObjectives.Percentage.split("%")[0]) || 0;
      let remining = 100 - completed;

      let statusPercentage = [];
      statusPercentage.push({ name: "notCopleted", value: remining });
      statusPercentage.push({ name: "copleted", value: completed });
      if (campMgmtLearningObjectives["Course Types"]) {
        let courseTypes = [];
        for (
          let i = 0;
          i < campMgmtLearningObjectives["Course Types"].length;
          i++
        ) {
          let string = campMgmtLearningObjectives["Course Types"][i].split(":");
          let percentage = Number(string[1].split("%")[0]) || 0;
          let name = string[0] || "";
          courseTypes.push({
            name: name,
            CourseType: [
              { name: "l2", value: 100 - percentage },
              { name: "l1", value: percentage },
            ],
            color:
              name === "Technical"
                ? "#FFB97D"
                : name === "Functional"
                ? "#9898F7"
                : name === "Interpersonal"
                ? "#FF8C96"
                : "#9698C7",
          });
        }
        this.setState({ CourseTypes: courseTypes });
      }

      this.setState({
        statusPercentage: statusPercentage,
        campMgmtLearningObjectives,
      });
    }
  };
  render() {
    return (
      <div
        style={{
          fontFamily: "Open Sans Regular",
          fontSize: 16,
          borderRadius: 8,
          color: "#303030",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "Open Sans Semibold",
            fontSize: "1.126em",
            background: "#FFFFFF",
            marginBottom: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            padding: 20,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          {!this.state.isCampusManagement ? (
            <div>Role Based Curriculum</div>
          ) : (
            <div>Learning Plan </div>
          )}
          <div>
            <img
              src={Info}
              style={{
                height: "16px",
                width: "16px",
                margin: "0 0 0 8px",
                cursor: "pointer",
              }}
              alt="info-Icon"
              onMouseOver={() => this.setState({ showToolTip: true })}
              onMouseLeave={() => this.setState({ showToolTip: false })}
            />
            <div
              style={{
                position: "relative",
                opacity: this.state.showToolTip ? 1 : 0,
                visibility: this.state.showToolTip ? "visible" : "hidden",
                transition: "opacity 0.4s ease-out",
              }}
            >
              <ToolTip
                className="toolTip"
                style={{
                  minWidth: 300,
                  maxWidth: 400,
                  minHeight: 30,
                  maxHeight: 100,
                  left: "-16px",
                  top: 8,
                  opacity: 1,
                  borderRadius: 1,
                  display: "flex",
                  backgroundColor: "#F4F4FE",
                }}
                toolTip={{ placement: "bottomLeft", width: "7px" }}
              >
                <div
                  style={{
                    width: "inherit",
                    height: "inherit",
                    outline: "none",
                  }}
                >
                  <div
                    style={{
                      padding: 10,
                      fontSize: "0.955em",
                      color: "#4D4CAC",
                    }}
                  >
                    Please go through the Role-Based Curriculum to understand
                    your ramp-up plan for next 30 days to 60 days
                  </div>
                </div>
              </ToolTip>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", height: 400 }}>
          <div
            style={{
              flex: 0.8,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              marginRight: 18,
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            {this.state.isCampusManagement ? (
              <CampusManagementCurriculum
                campusManagement={this.state.campusManagement}
                campMgmtselectedId={this.state.campMgmtselectedId}
                onClickCampMgmtCurriculum={this.onClickCampMgmtCurriculum}
              />
            ) : (
              <CurriculumList
                curriculums={this.state.curriculums}
                selectedId={this.state.selectedId}
                onClickCurriculum={this.onClickCurriculum}
              />
            )}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              padding: 20,
            }}
          >
            {this.state.isCampusManagement ? (
              <CampusManagementLearningObjectives
                campMgmtLearningObjectives={
                  this.state.campMgmtLearningObjectives
                }
                skillGap={this.state.statusPercentage}
                CourseTypes={this.state.CourseTypes}
                campusManagement={this.state.campusManagement}
              />
            ) : (
              <LearningObjectives
                learningObjectives={this.state.learningObjectives}
                checkMarkIndexes={this.state.checkMarkIndexes}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RoleBasedCurriculum;
