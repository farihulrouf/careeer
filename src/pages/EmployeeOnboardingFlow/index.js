import React, { Component } from "react";
import styled from "styled-components";
import SidebarComponent from "./SideBar";
import OnboardingResume from "./ResumeDetails";
import OnboardingEmployeeDetails from "./EmployeeDetails";
import OnboardingEducationNCertificates from "./EducationCertificateDetails";
import OnboardingExperiances from "./ExperienceDetails";
import OnboardingProjects from "./ProjectDetails";
import OnboardingSkills from "./Skills";
import { getOnboardingHistory } from "../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../utils/encryptDecrypt";
import PreviewEmployeeDetails from "./PreviewEmployeeDetails";
const Div = styled.div`
  height: 100%;
  width: 100%;
  color: #303030;
  font-family: "Open Sans Regular";
  .onboarding-stepper {
    display: grid;
    grid-template-columns: 295px auto;
    width: 100%;
    height: 100%;
  }

  .onboarding-form-container {
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .onboarding-form {
    flex: 1;
    margin: 5% 10%;
    padding-bottom: 15%;
  }
  .onboarding-button-container {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    width: 65vw;
    padding: 1%;
  }
`;
class EmployeeOnboardingFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        // {
        //   title: "Resume",
        //   status: 1,
        //   component: OnboardingResume,
        //   stepId: 2,
        // },
        {
          title: "Employee Details",
          status: 1,
          component: OnboardingEmployeeDetails,
          stepId: 2,
        },
        {
          title: "Education & Certificates",
          status: 1,
          component: OnboardingEducationNCertificates,
          stepId: 3,
        },
        {
          title: "Experiences",
          status: 1,
          component: OnboardingExperiances,
          stepId: 4,
        },
        {
          title: "Projects",
          status: 1,
          component: OnboardingProjects,
          stepId: 5,
        },
        {
          title: "Skills",
          status: 1,
          component: OnboardingSkills,
          stepId: 6,
        },
      ],
      selectedStep: 0,
      showEmployeeDetails: false,
    };
  }

  changeOnboardingStep = (selectedStep) => {
    let element = document.querySelector(".onboarding-form-container");
    element.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.loadOnboardingHistory();
    if (selectedStep > this.state.steps.length - 1) {
      this.setState({ showEmployeeDetails: true });
    } else {
      this.setState({ selectedStep });
    }
  };
  componentDidMount() {
    this.loadOnboardingHistory();
  }
  loadOnboardingHistory = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getOnboardingHistory(orgId, employeeId, {
        Authorization: token,
      });
      if (status === 200) {
        let steps = this.state.steps;
        for (let stepIndex in steps) {
          let onboardingStep = data.find(
            (eachStep) => eachStep.stepId === steps[stepIndex].stepId
          );
          if (onboardingStep) {
            steps[stepIndex].status = onboardingStep.status;
          }
        }
        this.setState({ steps });
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      return null;
    }
  };
  editEmpDetailsHandler = () => {
    this.setState({ showEmployeeDetails: false, selectedStep: 0 });
    //NOTE: if resume section is there in stepper,then selectedStep is 1 else selectedStep is 0
  };
  render() {
    return (
      <Div>
        {!this.state.showEmployeeDetails ? (
          <div className="onboarding-stepper">
            <div className="onboarding-side-bar">
              <SidebarComponent
                links={this.state.steps}
                profileURL={this.state.profileURL}
                changeOnboardingStep={this.changeOnboardingStep}
                editPhotoHandler={this.editPhotoHandler}
                updateRotation={this.state.updateRotation}
                selectedStep={this.state.selectedStep}
              />
            </div>
            <div className="onboarding-form-container">
              <div className="onboarding-form">
                {this.state.steps.map(
                  (step, index) =>
                    this.state.selectedStep === index && (
                      <step.component
                        key={"stepprtTabBody" + index}
                        {...step}
                        stepCount={index}
                        changeOnboardingStep={this.changeOnboardingStep}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        ) : (
          <PreviewEmployeeDetails
            editEmpDetailsHandler={this.editEmpDetailsHandler}
            logout={this.props.logout}
          />
        )}
      </Div>
    );
  }
}

export default EmployeeOnboardingFlow;
