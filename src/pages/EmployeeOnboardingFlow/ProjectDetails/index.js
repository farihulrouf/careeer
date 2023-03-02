import React, { Component } from "react";
import SaveButton from "../../../components/SaveCancelButton";
import InputField from "../../../components/InputField";
import styled from "styled-components";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import PopUpDisplay from "../../../components/PopUpDisplay";
import {
  getEmployeeProjectsDetails,
  updateEmployeeProjectsDetails,
  deleteEmployeeProjectsDetails,
  deleteEmployeeProjectTool,
  getTools,
  addTool,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
const Div = styled.div`
  margin-bottom: 200px;
  .project-title-container {
    display: flex;
    justify-content: space-between;
    margin: 0 5%;
  }
  .project-title {
    font-size: 1.5em;
    font-family: "Open Sans Semibold";
  }

  .add-icon-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: "Open Sans Regular";
  }
  .add-icon {
    margin-right: 5px;
    font-size: 1em;
  }
  .project-inputs {
    margin: 20px 0;
  }
  .cancel-icon {
    margin-top: 5px;
    margin-right: 5%;
    font-size: 1em;
    cursor: pointer;
  }
`;

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteIndex: "",
      deleteForm: false,
      clearToolsSearch: false,
      projectDetails: [
        {
          name: "",
          descriptions: "",
          tools: [],
        },
      ],
      projectComponent: [
        {
          label: "Project Name",
          type: "input",
          fieldName: "name",
          placeHolder: "Type here",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9.*$%^&(){}|:,?~!_-]{2,70}/,
        },
        {
          label: "Description",
          type: "textArea",
          fieldName: "descriptions",
          placeHolder: "Type here",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9.*$%^&(){}|:,?~!_-]{2,250}/,
        },
        {
          title: "Tools Used",
          fieldName: "tools",
          type: "tools",
          selector: "name",
          option: [],
          placeHolder: "add tools",
          error: false,
          errorIndex: [],
          required: true,
          label: "Add Tools",
          allowCustomAddition: true,
        },
      ],
      toolsList: [],
    };
  }
  componentDidMount() {
    this.loadTools();
    this.loadProjectsDetails();
  }

  loadTools = async () => {
    try {
      document.toggleLoading(true);
      let token = decryptData(localStorage.token);
      let { data, status } = await getTools({
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let projectComponent = this.state.projectComponent;
        let indexOfComp = projectComponent.findIndex(
          (eachComp) => eachComp.fieldName === "tools"
        );
        projectComponent[indexOfComp].option = data;
        this.setState({ projectComponent });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadProjectsDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await getEmployeeProjectsDetails(
        orgId,
        employeeId,
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        if (data.length) {
          if (data.length) this.setState({ projectDetails: data });
        }
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  addProjectHandler = () => {
    this.setState(
      {
        projectDetails: [
          ...this.state.projectDetails,
          {
            name: "",
            descriptions: "",
            tools: [],
          },
        ],
      },
      () =>
        document.scrollToElement(
          "#project-form" + (this.state.projectDetails.length - 1)
        )
    );
  };
  cancelProjectHandler = (index) => {
    let projectDetails = this.state.projectDetails;
    if (projectDetails[index].id) {
      this.deleteProjectDetails(index, projectDetails[index].id);
      return;
    } else {
      projectDetails.splice(index, 1);
      this.setState({
        projectDetails,
      });
    }
    return;
  };

  handleInputForm = (value, field, eachDetailsIndex, eachComponentIndex) => {
    let projectDetails = this.state.projectDetails,
      projectComponent = this.state.projectComponent;
    projectDetails[eachDetailsIndex][field] = value;
    projectComponent[eachComponentIndex].error = false;
    projectComponent[eachComponentIndex].errorIndex = projectComponent[
      eachComponentIndex
    ].errorIndex.filter(
      (eachField) => eachField !== parseInt(eachDetailsIndex)
    );
    this.setState({ projectDetails, projectComponent });
  };

  validate = () => {
    let failedRecords = [];
    let projectDetails = this.state.projectDetails;
    let projectComponent = this.state.projectComponent;
    for (let compoIndex in projectComponent) {
      for (let detailsIndex in projectDetails) {
        if (projectComponent[compoIndex].required) {
          if (
            !projectDetails[detailsIndex][
              projectComponent[compoIndex].fieldName
            ] ||
            Array.isArray(
              projectDetails[detailsIndex][
                projectComponent[compoIndex].fieldName
              ]
            )
              ? !projectDetails[detailsIndex][
                  projectComponent[compoIndex].fieldName
                ].length
              : false
          ) {
            projectComponent[compoIndex].error = true;
            projectComponent[compoIndex].errorIndex.push(
              parseInt(detailsIndex)
            );
            failedRecords.push(projectComponent[compoIndex]);
            continue;
          }
          if (projectComponent[compoIndex].validation) {
            let validationResult = projectComponent[compoIndex].validation.test(
              projectDetails[detailsIndex][
                projectComponent[compoIndex].fieldName
              ]
            );
            if (!validationResult) {
              projectComponent[compoIndex].error = true;
              projectComponent[compoIndex].errorIndex.push(
                parseInt(detailsIndex)
              );
              failedRecords.push(projectComponent[compoIndex]);
            }
          }
        }
      }
    }
    this.setState({ projectComponent });
    if (failedRecords.length) {
      document.scrollToElement(
        `#${failedRecords[0].fieldName}${failedRecords[0].errorIndex[0]}`
      );
      return false;
    }
    return true;
  };

  handleDeleteOption = async (index, projectIndex, option) => {
    try {
      document.toggleLoading(true);
      let projectDetails = this.state.projectDetails;
      let projectId = projectDetails[projectIndex].id;
      if (option.userId) {
        let orgId = decryptData(localStorage.orgId);
        let token = decryptData(localStorage.token);
        let employeeId = decryptData(localStorage.employeeId);
        let { status } = await deleteEmployeeProjectTool(
          option.id,
          projectId,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status === 200) {
          document.toggleLoading();
          return true;
        } else {
          document.message.error(
            "Something went wrong! please try again later."
          );
          document.toggleLoading();
          return false;
        }
      } else {
        document.toggleLoading();
        return true;
      }
    } catch (error) {
      console.log(error);
      document.toggleLoading();
      return false;
    }
  };

  saveDetails = async () => {
    try {
      let isValid = this.validate();
      if (isValid) {
        document.toggleLoading(true);
        let projectDetails = this.state.projectDetails;
        let orgId = decryptData(localStorage.orgId);
        let token = decryptData(localStorage.token);
        let employeeId = decryptData(localStorage.employeeId);
        let { data, status } = await updateEmployeeProjectsDetails(
          projectDetails,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success("Project details saved successfully.");
          this.props.changeOnboardingStep(this.props.stepCount + 1);
        } else {
          document.message.error(JSON.stringify(data));
        }
        document.toggleLoading();
      }
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  deletFormHandler = (deleteIndex, details) => {
    if (details.id) {
      this.setState({ deleteForm: true, deleteIndex });
    } else {
      this.deleteProjectDetails(deleteIndex);
    }
  };
  popUpHandler = (selected) => {
    if (selected) {
      this.deleteProjectDetails(this.state.deleteIndex);
    }
    this.setState({ deleteForm: false });
  };

  deleteProjectDetails = async (index) => {
    let projectDetails = this.state.projectDetails;
    if (projectDetails[index].id) {
      try {
        document.toggleLoading(true);
        let projectDetails = this.state.projectDetails;
        let orgId = decryptData(localStorage.orgId);
        let token = decryptData(localStorage.token);
        let employeeId = decryptData(localStorage.employeeId);
        let { data, status } = await deleteEmployeeProjectsDetails(
          projectDetails[index].id,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success(data);
          projectDetails.splice(index, 1);
          this.setState({
            projectDetails,
          });
        } else {
          document.message.error("Something went wrong!.");
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error("Something went wrong! Please try again later.");
        document.toggleLoading();
      }
    } else {
      projectDetails.splice(index, 1);
      this.setState({
        projectDetails,
      });
      document.message.success("Successfully removed");
    }
  };
  handleAddCustomTool = async (tool) => {
    try {
      this.setState({clearToolsSearch: true})
      document.toggleLoading(true);
      let token = decryptData(localStorage.token);
      let { data, status } = await addTool(tool, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        document.message.success("Tool added successfully");
        let projectComponent = this.state.projectComponent;
        let indexOfTool = projectComponent.findIndex(
          (eachComp) => eachComp.fieldName === "tools"
        );
        projectComponent[indexOfTool].option.push(data);
        this.setState({ projectComponent,clearToolsSearch:false });
        document.toggleLoading();
        return { data, status };
      } else {
        this.setState({clearToolsSearch: false})
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
      return { data, status };
    } catch (error) {
      this.setState({clearToolsSearch: false})
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      return { status: 500 };
    }
  };
  render() {
    return (
      <Div>
        {this.state.deleteForm && (
          <PopUpDisplay
            subTitle="Are you sure to delete this ?"
            width="max-content"
            popUpHandler={this.popUpHandler}
          />
        )}
        <div className="project-title-container">
          <div className="project-title">Projects Handled</div>
          <div
            className="add-icon-container"
            onClick={() => this.addProjectHandler()}
          >
            <div className="add-icon">
              <PlusCircleOutlined />
            </div>
            <div className="add-title"> Add Project</div>
          </div>
        </div>
        {this.state.projectDetails.map((eachDetails, eachDetailsIndex) => (
          <div
            className="project-form-main-container"
            id={"project-form" + eachDetailsIndex}
            key={eachDetailsIndex + 1}
          >
            <div
              style={{
                display: eachDetailsIndex >= 1 ? "flex" : "none",
                justifyContent: "flex-end",
                borderTop: "1px solid #E2E2E2",
              }}
            >
              <div
                className="cancel-icon"
                onClick={() =>
                  this.deletFormHandler(eachDetailsIndex, eachDetails)
                }
              >
                <MinusCircleOutlined />
              </div>
            </div>
            <div style={{ margin: "3% 5%" }}>
              {this.state.projectComponent.map(
                (eachComponent, eachComponentIndex) => (
                  <div
                    key={eachComponentIndex}
                    className="project-inputs"
                    style={{
                      width: eachComponent.type === "tools" ? "327px" : "100%",
                    }}
                  >
                    <InputField
                      id={eachComponent.fieldName + eachDetailsIndex}
                      allowCustomAddition={eachComponent.allowCustomAddition}
                      label={eachComponent.label}
                      title={eachComponent.title || ""}
                      index={eachDetailsIndex}
                      placeHolder={eachComponent.placeHolder}
                      type={eachComponent.type}
                      selector={eachComponent.selector || null}
                      value={eachDetails[eachComponent["fieldName"]] || ""}
                      option={eachComponent.option || null}
                      error={
                        eachComponent.error &&
                        eachComponent.errorIndex.includes(eachDetailsIndex)
                      }
                      clearToolsSearch={this.state.clearToolsSearch}
                      handleAddCustomOption={this.handleAddCustomTool}
                      handleDeleteOption={this.handleDeleteOption}
                      required={eachComponent.required || false}
                      onChange={(e) =>
                        this.handleInputForm(
                          e,
                          eachComponent["fieldName"],
                          eachDetailsIndex,
                          eachComponentIndex
                        )
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
        <div className="onboarding-button-container">
          <SaveButton
            save={this.saveDetails}
            cancel={this.props.cancel || null}
          />
        </div>
      </Div>
    );
  }
}

export default ProjectDetails;
