import React, { Component } from "react";
import SaveButton from "../../../../../components/SaveCancelButton";
import styled from "styled-components";
import {
  getEmployeeDetails,
  updateEmployeeDetails,
} from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";
import InputField from "../../../../../components/InputField";

const Div = styled.div`
  margin: 0 8% 8% 8%;
  min-height: 615px;
  .professional-title {
    font-size: 1em;
    font-family: "Open Sans Semibold";
  }
  .professional-container {
    font-size: 0.875em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15%;
    grid-row-gap: 10%;
    margin: 3% 0;
  }
`;

class EditProfessional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionalDetails: {
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: { code: "", number: "" },
        alternatePhoneNumber: { code: "", number: "" },
        officialEmail: "",
        organization: "",
        designation: "",
        designationId: null,
        department: "",
        country: "",
        location: "",
        region: "",
      },
      personalDetails: {},
      professionalComponent: [
        {
          label: "first Name",
          type: "input",
          fieldName: "firstName",
          placeHolder: "Type First Name",
          error: false,
          required: true,
          validation: /^[a-zA-Z ]{2,50}$/,
        },
        {
          label: "middle Name",
          type: "input",
          fieldName: "middleName",
          placeHolder: "Type Middle Name",
          error: false,
          required: false,
          validation: /^[a-zA-Z ]{0,50}$/,
        },
        {
          label: "last Name",
          type: "input",
          fieldName: "lastName",
          placeHolder: "Type Last Name",
          error: false,
          required: false,
          validation: /^[a-zA-Z ]{0,50}$/,
        },
        {
          label: "phone Number",
          type: "number",
          fieldName: "phoneNumber",
          placeHolder: "Type Phone Number",
          error: false,
          required: true,
          validation: /^[0-9]{4,13}$/,
        },
        {
          label: "alternate Phone Number",
          type: "number",
          fieldName: "alternatePhoneNumber",
          placeHolder: "Type Phone Number",
          error: false,
          required: false,
          validation: /^[0-9]{4,13}$/,
        },
        {
          label: "official Email Id",
          type: "input",
          fieldName: "officialEmail",
          placeHolder: "Type Email Id",
          error: false,
          required: false,
          disabled: true,
        },

        {
          label: "organization",
          type: "input",
          fieldName: "organization",
          placeHolder: "Type here",
          error: false,
          required: false,
          disabled: true,
        },
        {
          label: "designation",
          type: "input",
          fieldName: "designation",
          placeHolder: "Type here",
          error: false,
          required: false,
          disabled: true,
        },
        {
          label: "department",
          type: "input",
          fieldName: "department",
          placeHolder: "Select Department",
          error: false,
          required: false,
          disabled: true,
        },
        {
          label: "country",
          type: "input",
          fieldName: "country",
          placeHolder: "Select Country",
          error: false,
          required: false,
          disabled: true,
        },
        {
          label: "region",
          type: "input",
          fieldName: "region",
          placeHolder: "Select Region",
          error: false,
          required: false,
          disabled: true,
        },
        {
          label: "location",
          type: "input",
          fieldName: "location",
          placeHolder: "Select Location",
          error: false,
          required: false,
          disabled: true,
        },
      ],
    };
  }
  componentDidMount() {
    this.loadEmployeeDetails();
  }
  loadEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status === 200) {
        let professional = data.professionalDetails;
        let professionalDetails = this.state.professionalDetails;
        let splittedPhoneNumber = professional.phoneNumber.split("-");
        let splittedAltPhone = professional.alternatePhoneNumber.split("-");
        professionalDetails.firstName = professional.firstName;
        professionalDetails.middleName = professional.middleName;
        professionalDetails.lastName = professional.lastName;
        professionalDetails.phoneNumber = {
          code: splittedPhoneNumber[0],
          number: splittedPhoneNumber[1] ? splittedPhoneNumber[1] : "",
        };
        professionalDetails.alternatePhoneNumber = {
          code: splittedAltPhone[0],
          number: splittedAltPhone[1] ? splittedAltPhone[1] : "",
        };
        professionalDetails.officialEmail = professional.officialEmail;
        professionalDetails.organization = professional.organization;
        professionalDetails.designation = professional.designation;
        professionalDetails.designationId = professional.designationId;
        professionalDetails.department = professional.department;
        professionalDetails.country = professional.country;
        professionalDetails.region = professional.region;
        professionalDetails.location = professional.location;
        let personal = data.personalDetails;
        let personalDetails = this.state.personalDetails;
        personalDetails.personalEmail = personal.personalEmail;
        personalDetails.dateofBirth = personal.dateofBirth;
        personalDetails.gender = personal.gender;
        personalDetails.linkedInProfile = personal.linkedInProfile;
        this.setState({ professionalDetails, personalDetails });
      }

      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  validate = (designComponent, inputData) => {
    let failedRecords = [];
    let componentData = this.state[designComponent];
    let formInputs = this.state[inputData];
    for (let i = 0; i < componentData.length; i++) {
      if (
        componentData[i].fieldName === "phoneNumber" ||
        componentData[i].fieldName === "alternatePhoneNumber"
      ) {
        if (componentData[i].required) {
          let phoneDetails = formInputs[componentData[i].fieldName];
          if (!phoneDetails.number && !phoneDetails.code) {
            componentData[i].error = true;
            failedRecords.push(componentData[i]);
            continue;
          }
        }
        if (
          formInputs[componentData[i].fieldName].number ||
          formInputs[componentData[i].fieldName].code
        ) {
          let result = componentData[i].validation.test(
            formInputs[componentData[i].fieldName].number
          );
          if (result && formInputs[componentData[i].fieldName].code) {
            componentData[i].error = false;
          } else {
            componentData[i].error = true;
            failedRecords.push(componentData[i]);
          }
        }
      } else if (componentData[i].fieldName === "dateofBirth") {
        if (
          !componentData[i].validation.test(
            formInputs[componentData[i].fieldName]
          )
        ) {
          componentData[i].dateBorderValid = true;
          componentData[i].monthBorderValid = true;
          componentData[i].yearBorderValid = true;
          failedRecords.push(componentData[i]);
        }
      } else {
        if (!componentData[i].disabled) {
          let result;
          if (
            !componentData[i].required &&
            !formInputs[componentData[i].fieldName]
          ) {
            componentData[i].error = false;
            continue;
          } else {
            if (
              componentData[i].required &&
              !formInputs[componentData[i].fieldName]
            ) {
              componentData[i].error = true;
              failedRecords.push(componentData[i]);
            } else {
              result = componentData[i].validation.test(
                formInputs[componentData[i].fieldName]
              );
            }
          }

          if (result) {
            componentData[i].error = false;
          } else {
            componentData[i].error = true;
            failedRecords.push(componentData[i]);
          }
        }
      }
    }
    this.setState({ [designComponent]: componentData });
    if (failedRecords.length) {
      document.scrollToElement(`#${failedRecords[0].fieldName}`);
      return false;
    }
    return true;
  };

  handleInputForm = (
    value,
    field,
    eachComponentIndex,
    inputData,
    designData
  ) => {
    let details = this.state[inputData],
      designComponent = this.state[designData];
    if (field === "phoneNumber" || field === "alternatePhoneNumber") {
      details[field].number = value;
    } else {
      details[field] = value;
    }
    designComponent[eachComponentIndex].dateBorderValid = false;
    designComponent[eachComponentIndex].monthBorderValid = false;
    designComponent[eachComponentIndex].yearBorderValid = false;
    designComponent[eachComponentIndex].error = false;
    this.setState({ [inputData]: details, [designData]: designComponent });
  };

  countryCodeSelector = (value, field, eachComponentIndex) => {
    let professionalDetails = this.state.professionalDetails;
    let professionalComponent = this.state.professionalComponent;
    professionalDetails[field].code = value;
    professionalComponent[eachComponentIndex].error = false;
    this.setState({ professionalDetails, professionalComponent });
  };

  saveDetails = async () => {
    try {
      let validProffessional = this.validate(
        "professionalComponent",
        "professionalDetails"
      );
      if (validProffessional) {
        let professionalDetails = JSON.parse(
          JSON.stringify(this.state.professionalDetails)
        );
        let personalDetails = this.state.personalDetails;

        professionalDetails.phoneNumber = `${professionalDetails.phoneNumber.code}-${professionalDetails.phoneNumber.number}`;
        professionalDetails.alternatePhoneNumber = `${professionalDetails.alternatePhoneNumber.code}-${professionalDetails.alternatePhoneNumber.number}`;
        document.toggleLoading(true);
        let orgId = decryptData(localStorage.orgId);
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        let { data, status } = await updateEmployeeDetails(
          {
            professionalDetails,
            personalDetails,
          },
          orgId,
          employeeId,
          { Authorization: token }
        );
        if (status >= 200 && status < 300) {
          document.message.success("Professional details saved successfully.");
          this.props.changeOnboardingStep(2);
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

  render() {
    let { professionalDetails, professionalComponent } = this.state;
    return (
      <Div>
        <div className="professional-title">Professional Details</div>
        <div className="professional-container">
          {professionalComponent.map((eachComponent, eachComponentIndex) => (
            <InputField
              id={eachComponent.fieldName}
              label={eachComponent.label}
              placeHolder={eachComponent.placeHolder}
              type={eachComponent.type}
              selector={eachComponent.selector}
              key={eachComponentIndex}
              value={professionalDetails[eachComponent["fieldName"]]}
              option={eachComponent.option || null}
              disabled={eachComponent.disabled || false}
              error={eachComponent.error || false}
              required={eachComponent.required || false}
              countryCodeSelector={(e) =>
                this.countryCodeSelector(
                  e,
                  eachComponent["fieldName"],
                  eachComponentIndex
                )
              }
              onChange={(e) =>
                this.handleInputForm(
                  e,
                  eachComponent["fieldName"],
                  eachComponentIndex,
                  "professionalDetails",
                  "professionalComponent"
                )
              }
            />
          ))}
        </div>
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

export default EditProfessional;
