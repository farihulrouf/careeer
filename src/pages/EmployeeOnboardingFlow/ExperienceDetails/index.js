import React, { Component } from "react";
import SaveButton from "../../../components/SaveCancelButton";
import InputField from "../../../components/InputField";
import styled from "styled-components";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import PopUpDisplay from "../../../components/PopUpDisplay";
import {
  getTools,
  getEmployeeExperiencesDetails,
  updateEmployeeExperiencesDetails,
  deleteEmployeeExperiencesDetails,
  deleteEmployeeExperienceTool,
  addTool,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
const Div = styled.div`
  margin-bottom: 10%;
  .experience-title-container {
    display: flex;
    justify-content: space-between;
    margin: 0 5%;
  }
  .experience-title {
    font-size: 1.5em;
    font-family: "Open Sans Semibold";
    font-weight:600px
  }

  .experience-form-main-container {
    min-height: 360px;
  }
  .experience-sub-container {
    margin: 3% 5%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15%;
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
  .experience-inputs {
    margin: 2% 0;
  }
  .cancel-icon {
    margin-top: 5px;
    margin-right: 5%;
    font-size: 1em;
    cursor: pointer;
  }
`;
class ExperienceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteIndex: "",
      deleteForm: false,
      clearToolsSearch: false,
      experienceDetails: [
        {
          designation: "",
          organization: "",
          startDate: "",
          endDate: "",
          tools: [],
        },
      ],
      experienceComponent: [
        {
          label: "Designation",
          fieldName: "designation",
          type: "input",
          placeHolder: "Type Designation",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9.*$%^&(){}|:,?~!-_]{2,}/,
        },
        {
          label: "Organization",
          fieldName: "organization",
          type: "input",
          placeHolder: "Type Organization",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9.*$%^&(){}|:,?~!_-]{2,}/,
        },
        {
          label: "Started Working From",
          fieldName: "startDate",
          type: "selector",
          placeHolder: "From",
          startYear: new Date().getFullYear() - 50,
          endYear: new Date().getFullYear(),
          error: false,
          errorIndex: [],
          required: true,
        },
        {
          label: "Working Till",
          fieldName: "endDate",
          type: "selector",
          placeHolder: "To",
          startYear: new Date().getFullYear() - 50,
          endYear: new Date().getFullYear(),
          tillPresent: true,
          error: false,
          errorIndex: [],
          required: true,
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
    };
  }

  componentDidMount() {
    this.loadTools();
    this.loadExperience();
  }
  loadTools = async () => {
    try {
      document.toggleLoading(true);
      let token = decryptData(localStorage.token);
      let { data, status } = await getTools({
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let experienceComponent = this.state.experienceComponent;
        let indexOfComp = experienceComponent.findIndex(
          (eachComp) => eachComp.fieldName === "tools"
        );
        experienceComponent[indexOfComp].option = data;
        this.setState({ experienceComponent });
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
  loadExperience = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeExperiencesDetails(
        orgId,
        employeeId,
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ experienceDetails: data });
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
  addExperienceHandler = () => {
    this.setState(
      {
        experienceDetails: [
          ...this.state.experienceDetails,
          {
            designation: "",
            organization: "",
            startDate: "",
            endDate: "",
            tools: [],
          },
        ],
      },
      () =>
        document.scrollToElement(
          "#experience-form" + (this.state.experienceDetails.length - 1)
        )
    );
  };

  deletFormHandler = (deleteIndex, details) => {
    if (details.id) {
      this.setState({ deleteForm: true, deleteIndex });
    } else {
      this.cancelExperience(deleteIndex);
    }
  };
  popUpHandler = (selected) => {
    if (selected) {
      this.cancelExperience(this.state.deleteIndex);
    }
    this.setState({ deleteForm: false });
  };

  cancelExperience = async (index) => {
    try {
      document.toggleLoading(true);
      let experienceDetails = this.state.experienceDetails;
      if (experienceDetails[index].id) {
        let orgId = decryptData(localStorage.orgId);
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        let { data, status } = await deleteEmployeeExperiencesDetails(
          experienceDetails[index].id,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status === 200) {
          experienceDetails.splice(index, 1);
          this.setState({
            experienceDetails,
          });
          document.message.success("Successfully removed");
        } else {
          document.message.error(JSON.stringify(data));
        }
      } else {
        experienceDetails.splice(index, 1);
        this.setState({
          experienceDetails,
        });
        document.message.success("Successfully removed");
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  handleInputForm = (value, field, eachDetailsIndex, eachComponentIndex) => {
    let experienceDetails = this.state.experienceDetails,
      experienceComponent = this.state.experienceComponent;
    experienceDetails[eachDetailsIndex][field] = value;
    experienceComponent[eachComponentIndex].error = false;
    experienceComponent[eachComponentIndex].errorIndex = experienceComponent[
      eachComponentIndex
    ].errorIndex.filter(
      (eachField) => eachField !== parseInt(eachDetailsIndex)
    );
    this.setState({ experienceDetails, experienceComponent });
  };
  handleSaveClick = async () => {
    try {
      let isValid = this.validate();
      if (isValid) {
        let orgId = decryptData(localStorage.orgId);
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        document.toggleLoading(true);
        let experienceDetails = this.state.experienceDetails;
        let { data, status } = await updateEmployeeExperiencesDetails(
          experienceDetails,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success("Experience details saved successfully");
          this.props.changeOnboardingStep(this.props.stepCount + 1);
        } else {
          document.message.error(JSON.stringify(data));
        }
        document.toggleLoading();
      }
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  validate = () => {
    let failedRecords = [];
    let experienceDetails = this.state.experienceDetails;
    let experienceComponent = this.state.experienceComponent;
    for (let compoIndex in experienceComponent) {
      for (let detailsIndex in experienceDetails) {
        if (experienceComponent[compoIndex].required) {
          if (
            !experienceDetails[detailsIndex][
              experienceComponent[compoIndex].fieldName
            ] ||
            Array.isArray(
              experienceDetails[detailsIndex][
                experienceComponent[compoIndex].fieldName
              ]
            )
              ? !experienceDetails[detailsIndex][
                  experienceComponent[compoIndex].fieldName
                ].length
              : false
          ) {
            experienceComponent[compoIndex].error = true;
            experienceComponent[compoIndex].errorIndex.push(
              parseInt(detailsIndex)
            );
            failedRecords.push(experienceComponent[compoIndex]);
            continue;
          }
          if (experienceComponent[compoIndex].validation) {
            let validationResult = experienceComponent[
              compoIndex
            ].validation.test(
              experienceDetails[detailsIndex][
                experienceComponent[compoIndex].fieldName
              ]
            );
            if (!validationResult) {
              experienceComponent[compoIndex].error = true;
              experienceComponent[compoIndex].errorIndex.push(
                parseInt(detailsIndex)
              );
              failedRecords.push(experienceComponent[compoIndex]);
            }
          }
        }
      }
    }
    this.setState({ experienceComponent });
    if (failedRecords.length) {
      document.scrollToElement(
        `#${failedRecords[0].fieldName}${failedRecords[0].errorIndex[0]}`
      );
      return false;
    }
    return true;
  };
  handleDeleteOption = async (index, experienceIndex, option) => {
    try {
      document.toggleLoading(true);
      let experienceDetails = this.state.experienceDetails;
      let experienceId = experienceDetails[experienceIndex].id;
      if (option.userId) {
        let orgId = decryptData(localStorage.orgId);
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        let { status } = await deleteEmployeeExperienceTool(
          option.id,
          experienceId,
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
  handleAddCustomTool = async (tool) => {
    try {
      this.setState({clearToolsSearch: true})
      let token = decryptData(localStorage.token);
      document.toggleLoading(true);
      let { data, status } = await addTool(tool, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        document.message.success("Tool added successfully");
        let experienceComponent = this.state.experienceComponent;
        let indexOfTool = experienceComponent.findIndex(
          (eachComp) => eachComp.fieldName === "tools"
        );
        experienceComponent[indexOfTool].option.push(data);
        this.setState({ experienceComponent,clearToolsSearch: false });
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
        <div className="experience-title-container">
          <div className="experience-title">Overall Experience </div>
          <div
            className="add-icon-container"
            onClick={() => this.addExperienceHandler()}
          >
            <div className="add-icon">
              <PlusCircleOutlined />
            </div>
            <div className="add-title"> Add Overall Experience </div>
          </div>
        </div>
        {this.state.experienceDetails.map((eachDetails, eachDetailsIndex) => (
          <div
            className="experience-form-main-container"
            id={"experience-form" + eachDetailsIndex}
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
            <div className="experience-sub-container">
              {this.state.experienceComponent.map(
                (eachComponent, eachComponentIndex) => (
                  <div className="experience-inputs" key={eachComponentIndex}>
                    <InputField
                      id={eachComponent.fieldName + eachDetailsIndex}
                      label={eachComponent.label}
                      title={eachComponent.title || ""}
                      index={eachDetailsIndex}
                      allowCustomAddition={eachComponent.allowCustomAddition}
                      placeHolder={eachComponent.placeHolder}
                      type={eachComponent.type}
                      selector={eachComponent.selector || null}
                      value={eachDetails[eachComponent["fieldName"]]}
                      option={eachComponent.option || null}
                      disabled={eachComponent.disabled || false}
                      error={
                        eachComponent.error &&
                        eachComponent.errorIndex.includes(eachDetailsIndex)
                      }
                      startYear={
                        eachComponent.fieldName === "endDate"
                          ? eachDetails.startDate
                          : eachComponent.startYear
                      }
                      endYear={eachComponent.endYear}
                      tillPresent={eachComponent.tillPresent}
                      handleDeleteOption={this.handleDeleteOption}
                      handleAddCustomOption={this.handleAddCustomTool}
                      clearToolsSearch={this.state.clearToolsSearch}
                      required={eachComponent.required || false}
                      onChange={(e) =>
                        this.handleInputForm(
                          e,
                          eachComponent["fieldName"],
                          eachDetailsIndex,
                          eachComponentIndex
                        )
                      }
                      dropDownScroll={this.props.dropDownScroll}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
        <div className="onboarding-button-container">
          <SaveButton
            save={this.handleSaveClick}
            cancel={this.props.cancel || null}
          />
        </div>
      </Div>
    );
  }
}

export default ExperienceDetails;
