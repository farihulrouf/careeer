import React, { Component } from "react";
import SaveButton from "../../../../../components/SaveCancelButton";
import {
  getEmployeeEducationDetails,
  updateEmployeeEducationDetails,
  deleteEmployeeEducationDetails,
} from "../../../../../core/apiClient/organization/organizationClient";
import EducationDetails from "../../../../EmployeeOnboardingFlow/EducationCertificateDetails/EducationDetails";
import { decryptData } from "../../../../../utils/encryptDecrypt";
class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationDetails: [
        {
          degree: "",
          specialization: "",
          completionYear: "",
          course: "",
          institute: "",
        },
      ],
      educationComponent: [
        {
          label: "degree",
          fieldName: "degree",
          type: "selector",
          option: [
            "None",
            "Secondary (10th)",
            "Higher Secondary (12th / Pre University)",
            "Diploma",
            "Bachelor's",
            "Master's ",
            "Doctorate",
            "Others",
          ],
          placeHolder: "Select Education",
          error: false,
          errorIndex: [],
          required: true,
        },
        {
          label: "course",
          fieldName: "course",
          type: "input",
          placeHolder: "Enter course",
          error: false,
          errorIndex: [],
          required: false,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "specialization",
          fieldName: "specialization",
          type: "input",
          placeHolder: "Enter specialization",
          error: false,
          errorIndex: [],
          required: false,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "university/College",
          fieldName: "institute",
          type: "input",
          placeHolder: "Enter institute",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "completion Year",
          fieldName: "completionYear",
          type: "selector",
          startYear: new Date().getFullYear() - 60,
          endYear: new Date().getFullYear(),
          placeHolder: "Select Year",
          error: false,
          errorIndex: [],
          required: true,
        },
      ],
    };
  }
  componentDidMount() {
    this.loadEducationData();
  }
  loadEducationData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await getEmployeeEducationDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ educationDetails: data });
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
  addFormHandler = (values, object, id) => {
    this.setState(
      {
        [values]: [...this.state[values], object],
      },
      () => document.scrollToElement(id + (this.state[values].length - 1))
    );
  };
  cancelFormHandler = async (values, index) => {
    try {
      document.toggleLoading(true);
      let details = this.state[values];
      if (details[index].id) {
        let orgId = decryptData(localStorage.orgId);
        let token = decryptData(localStorage.token);
        let employeeId = decryptData(localStorage.employeeId);
        if (values === "educationDetails") {
          let { data, status } = await deleteEmployeeEducationDetails(
            details[index].id,
            orgId,
            employeeId,
            { Authorization: token }
          );
          if (status === 200) {
            details.splice(index, 1);
            this.setState({
              [values]: details,
            });
            document.message.success("Successfully removed");
          } else {
            document.message.error(JSON.stringify(data));
          }
        }
      } else {
        details.splice(index, 1);
        this.setState({
          [values]: details,
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

  handleInputForm = (
    value,
    field,
    detailsIndex,
    componentIndex,
    details,
    componentData
  ) => {
    let detailsArray = this.state[details],
      componentArray = this.state[componentData];
    detailsArray[detailsIndex][field] = value;
    componentArray[componentIndex].error = false;
    componentArray[componentIndex].errorIndex = componentArray[
      componentIndex
    ].errorIndex.filter((eachField) => eachField !== parseInt(detailsIndex));
    this.setState({ [details]: detailsArray, [componentData]: componentArray });
  };
  handleSave = async () => {
    try {
      let isValid = this.validate();
      document.toggleLoading(true);
      if (isValid) {
        let educationDetails = this.state.educationDetails;
        let orgId = decryptData(localStorage.orgId);
        let token = decryptData(localStorage.token);
        let employeeId = decryptData(localStorage.employeeId);
        let {
          data,
          status,
        } = await updateEmployeeEducationDetails(
          educationDetails,
          orgId,
          employeeId,
          { Authorization: token }
        );
        if (status >= 200 && status < 300) {
          document.message.success("Education details saved successfully.");
          this.props.changeOnboardingStep(3);
        } else {
          document.message.error(JSON.stringify(data));
        }
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  validate = () => {
    let failedRecords = [];
    let educationDetails = this.state.educationDetails;
    let educationComponent = this.state.educationComponent;
    for (let eduIndex in educationComponent) {
      for (let detailsIndex in educationDetails) {
        if (educationComponent[eduIndex].required) {
          if (
            educationComponent[eduIndex].option &&
            educationComponent[eduIndex].option.length &&
            !educationComponent[eduIndex].option.includes(
              educationDetails[detailsIndex][
                educationComponent[eduIndex].fieldName
              ]
            )
          ) {
            educationComponent[eduIndex].error = true;
            educationComponent[eduIndex].errorIndex.push(
              parseInt(detailsIndex)
            );
            failedRecords.push(educationComponent[eduIndex]);
            continue;
          }
          if (
            !educationDetails[detailsIndex][
              educationComponent[eduIndex].fieldName
            ]
          ) {
            educationComponent[eduIndex].error = true;
            educationComponent[eduIndex].errorIndex.push(
              parseInt(detailsIndex)
            );
            failedRecords.push(educationComponent[eduIndex]);
            continue;
          }
          if (educationComponent[eduIndex].validation) {
            let validationResult = educationComponent[eduIndex].validation.test(
              educationDetails[detailsIndex][
                educationComponent[eduIndex].fieldName
              ]
            );
            if (!validationResult) {
              educationComponent[eduIndex].error = true;
              educationComponent[eduIndex].errorIndex.push(
                parseInt(detailsIndex)
              );
              failedRecords.push(educationComponent[eduIndex]);
            }
          }
        }
      }
    }
    this.setState({ educationComponent });
    if (failedRecords.length) {
      document.scrollToElement(
        `#${failedRecords[0].fieldName}${failedRecords[0].errorIndex[0]}`
      );
      return false;
    }
    return true;
  };

  render() {
    return (
      <div>
        <div>
          <EducationDetails
            {...this}
            educationDetails={this.state.educationDetails}
            educationComponent={this.state.educationComponent}
            dropDownScroll={this.props.dropDownScroll}
          />
        </div>

        <div className="onboarding-button-container">
          <SaveButton
            save={this.handleSave}
            cancel={this.props.cancel || null}
          />
        </div>
      </div>
    );
  }
}

export default EditEducation;
