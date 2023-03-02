import React, { Component } from "react";
import SaveButton from "../../../components/SaveCancelButton";
import SkillsSelector from "./SkillsSelectorDetails";
import SkillRating from "./skillRating/index";
import {
  getSkillsOptions,
  getEmployeeSkillsDetails,
  updateEmployeeSkillsDetails,
  deleteEmployeeSkillsDetails,
  addSkill,
  getSkills,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
class SkillsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsComponent: [
        {
          title: "Technical Skills",
          label: "Add Skills",
          type: "tools",
          fieldName: "technicalSkills",
          placeHolder: "Add Technical Skills",
          error: false,
          errorIndex: [],
          selector: "name",
          option: [],
          required: true,
        },
        {
          title: "Functional Skills",
          label: "Add Skills",
          type: "tools",
          placeHolder: "Add Functional Skills",
          error: false,
          errorIndex: [],
          fieldName: "functionalSkills",
          selector: "name",
          option: [],
          required: false,
        },
        {
          title: "Interpersonal Skills",
          label: "Add Skills",
          type: "tools",
          placeHolder: "Add Interpersonal Skills",
          error: false,
          errorIndex: [],
          fieldName: "interpersonalSkills",
          selector: "name",
          option: [],
          required: false,
        },
        {
          title: "Stake holder Skills",
          label: "Add Skills",
          type: "tools",
          placeHolder: "Add Stakeholder Skills",
          error: false,
          errorIndex: [],
          fieldName: "stakeholderSkills",
          selector: "name",
          option: [],
          required: false,
        },
        {
          label: "Add Tools",
          title: "Additional Skills",
          type: "tools",
          fieldName: "additionalSkills",
          selector: "name",
          option: [],
          placeHolder: "Add Skills",
          error: false,
          errorIndex: [],
          required: false,
          hidden: true,
          allowCustomAddition: true,
        },
      ],
      skillsdetails: {
        technicalSkills: [],
        functionalSkills: [],
        interpersonalSkills: [],
        stakeholderSkills: [],
        additionalSkills: [],
      },
      selectedTab: 0,
      ratedSkills: [],
    };
  }

  componentDidMount() {
    this.loadSkillsList();
    this.loadEmployeeSkillsData();
    this.loadAdditionalSkills();
  }
  loadSkillsList = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await getSkillsOptions(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let skillsComponent = this.state.skillsComponent;
        if (data.length) {
          for (let skillIndex in data) {
            for (let skillCompIndex in skillsComponent) {
              if (
                data[skillIndex].skillType &&
                skillsComponent[skillCompIndex].title
                  .toLowerCase()
                  .includes(data[skillIndex].skillType.toLowerCase())
              ) {
                skillsComponent[skillCompIndex].option.push(data[skillIndex]);
              }
            }
          }
        }

        this.setState({ skillsComponent });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  loadAdditionalSkills = async () => {
    try {
      document.toggleLoading(true);
      let token = decryptData(localStorage.token);
      let { data, status } = await getSkills("skillType", "additional", {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let skillsComponent = this.state.skillsComponent;
        let additionalSkillIndex = skillsComponent.findIndex(
          (eachSkillComp) => eachSkillComp.title === "Additional Skills"
        );
        if (additionalSkillIndex >= 0) {
          skillsComponent[additionalSkillIndex].option = data;
          this.setState({ skillsComponent });
        }
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  loadEmployeeSkillsData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await getEmployeeSkillsDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let skillsdetails = this.state.skillsdetails;
        let skillsComponent = this.state.skillsComponent;
        if (data.length) {
          for (let skillIndex in data) {
            for (let skillCompIndex in skillsComponent) {
              if (
                data[skillIndex].skillType &&
                skillsComponent[skillCompIndex].title
                  .toLowerCase()
                  .includes(data[skillIndex].skillType.toLowerCase())
              ) {
                skillsdetails[skillsComponent[skillCompIndex].fieldName].push(
                  data[skillIndex]
                );
              }
            }
          }
        }
        this.setState({ skillsdetails });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  saveSkillDetails = async (skillsDetails) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await updateEmployeeSkillsDetails(
        skillsDetails,
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        document.message.success("Skill details saved successfully.");
        this.props.changeOnboardingStep(this.props.stepCount + 1);
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  handleDeleteOption = async (index, skillIndex, option) => {
    try {
      if (option.userId) {
        let orgId = decryptData(localStorage.orgId);
        let token = decryptData(localStorage.token);
        let employeeId = decryptData(localStorage.employeeId);
        document.toggleLoading(true);
        let { status } = await deleteEmployeeSkillsDetails(
          option.id,
          orgId,
          employeeId,
          { Authorization: token }
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

  handleInputForm = (value, field, eachComponentIndex) => {
    let skillsComponent = this.state.skillsComponent;
    let skillsdetails = this.state.skillsdetails;
    skillsdetails[field] = value;
    skillsComponent[eachComponentIndex].error = false;
    skillsComponent[eachComponentIndex].errorIndex = skillsComponent[
      eachComponentIndex
    ].errorIndex.filter(
      (eachField) => eachField !== parseInt(eachComponentIndex)
    );
    this.setState({ skillsComponent, skillsdetails });
  };

  handleSaveClick = () => {
    if (this.state.selectedTab === 0) {
      let isValid = this.validateSkills();
      if (isValid) {
        this.setState({ selectedTab: 1 });
      }
    } else {
      let skillsComponent = this.state.skillsComponent;
      let skillsdetails = this.state.skillsdetails;
      let ratedSkills = [];
      for (let eachSkillIndex in skillsComponent) {
        let eachStackSkill =
          skillsdetails[skillsComponent[eachSkillIndex].fieldName];
        for (let eachStackIndex in eachStackSkill) {
          if (!isNaN(eachStackSkill[eachStackIndex].selfRating)) {
            ratedSkills.push({
              skillId: eachStackSkill[eachStackIndex].skillId,
              selfRating: eachStackSkill[eachStackIndex].selfRating,
            });
          } else {
            ratedSkills.push({
              skillId: eachStackSkill[eachStackIndex].skillId,
              selfRating: 0,
            });
          }
        }
      }
      this.saveSkillDetails(ratedSkills);
    }
  };
  validateSkills = () => {
    let failedRecords = [];
    let skillsdetails = this.state.skillsdetails;
    let skillsComponent = this.state.skillsComponent;
    for (let compoIndex in skillsComponent) {
      if (skillsComponent[compoIndex].required) {
        if (
          !skillsdetails[skillsComponent[compoIndex].fieldName] ||
          !skillsdetails[skillsComponent[compoIndex].fieldName].length
        ) {
          skillsComponent[compoIndex].error = true;
          skillsComponent[compoIndex].errorIndex.push(parseInt(compoIndex));
          failedRecords.push(skillsComponent[compoIndex]);
          continue;
        }
        if (skillsComponent[compoIndex].validation) {
          let validationResult = skillsComponent[compoIndex].validation.test(
            skillsdetails[skillsComponent[compoIndex].fieldName]
          );
          if (!validationResult) {
            skillsComponent[compoIndex].error = true;
            skillsComponent[compoIndex].errorIndex.push(parseInt(compoIndex));
            failedRecords.push(skillsComponent[compoIndex]);
          }
        }
      }
    }
    this.setState({ skillsComponent });
    if (failedRecords.length) {
      document.scrollToElement(
        `#${failedRecords[0].fieldName}${failedRecords[0].errorIndex[0]}`
      );
      return false;
    }
    return true;
  };
  handleSkillRatingSlider = (selfRating, fieldName, indexOfSkill) => {
    let skillsdetails = this.state.skillsdetails;
    skillsdetails[fieldName][indexOfSkill].selfRating = selfRating;
    this.setState({ skillsdetails });
  };
  handleAddCustomSkill = async (skill, skillType) => {
    try {
      skill.skillType = skillType;
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      skill.orgId = orgId;
      skill.employeeId = employeeId;
      let token = decryptData(localStorage.token);
      let { data, status } = await addSkill(skill, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        document.message.success("Skill added successfully");
        let skillsComponent = this.state.skillsComponent;
        let indexOfSkill = skillsComponent.findIndex((eachComp) =>
          eachComp.title.toLowerCase().includes(skillType.toLowerCase())
        );
        skillsComponent[indexOfSkill].option.push(data);
        this.setState({ skillsComponent });
        document.toggleLoading();
        return { data, status };
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
      return { data, status };
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      return { status: 500 };
    }
  };
  render() {
    let { selectedTab, skillsdetails, skillsComponent } = this.state;
    return (
      <div style={{ margin: "0 5%" }}>
        {selectedTab === 0 && <SkillsSelector {...this} {...this.state} />}
        {selectedTab === 1 && (
          <SkillRating
            skills={skillsdetails}
            skillsComponent={skillsComponent}
            handleSkillRatingSlider={this.handleSkillRatingSlider}
          />
        )}
        <div className="onboarding-button-container">
          <SaveButton
            cancel={() => {
              this.setState({ selectedTab: 0 });
              if (this.props.cancel && this.state.selectedTab === 0) {
                let valid = this.validateSkills();
                if (valid && this.state.skillsdetails.technicalSkills.length)
                  this.props.cancel();
              }
            }}
            save={this.handleSaveClick}
          />
        </div>
      </div>
    );
  }
}
export default SkillsDetails;
