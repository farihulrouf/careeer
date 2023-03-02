import React, { Component } from "react";
import EducationDetails from "./EducationDetails";
import CertificateDetails from "./CertificateDetails";
import SaveButton from "../../../components/SaveCancelButton";
import {
  getEmployeeEducationDetails,
  getEmployeeCertificatesDetails,
  updateEmployeeEducationDetails,
  updateEmployeeCertificatesDetails,
  deleteEmployeeEducationDetails,
  deleteEmployeeCertificatesDetails,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
class EducationAndCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationDetails: [
        // {
        //   degree: "",
        //   specialization: "",
        //   completionYear: "",
        //   course: "",
        //   institute: "",
        // },
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
          placeHolder: "Type here",
          error: false,
          errorIndex: [],
          required: false,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "specialization",
          fieldName: "specialization",
          type: "input",
          placeHolder: "Type here",
          error: false,
          errorIndex: [],
          required: false,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "university/College",
          fieldName: "institute",
          type: "input",
          placeHolder: "Type here",
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
      certificateDetails: [
        // {
        //   name: "",
        //   image: "",
        //   body: "",
        //   validity: "",
        //   specialization: null,
        //   completionYear: "",
        //   course: null,
        //   errorIndex: [],
        //   institute: null,
        // },
      ],

      certificateComponent: [
        {
          label: "Certificate Name",
          fieldName: "name",
          type: "input",
          placeHolder: "Java, Net, PMP etc..",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "Institute Name",
          fieldName: "body",
          type: "input",
          placeHolder: "udemy, AWS, collegedunia, etc..",
          error: false,
          errorIndex: [],
          required: true,
          validation: /[a-zA-Z 0-9!@#$%^&*()]{2,}/,
        },
        {
          label: "Completion Year",
          fieldName: "completionYear",
          type: "selector",
          startYear: new Date().getFullYear() - 60,
          endYear: new Date().getFullYear(),
          placeHolder: "Select Year",
          error: false,
          errorIndex: [],
          required: true,
        },
        {
          label: "Certification Validity",
          fieldName: "validity",
          subLabel1: "Life Time",
          subLabel2: "Choose date",
          startYear: new Date().getFullYear(),
          endYear: new Date().getFullYear() + 30,
          type: "radio",
          error: false,
          errorIndex: [],
          required: true,
        },
        {
          label: "Upload Certificate",
          fieldName: "image",
          type: "file",
          error: false,
          errorIndex: [],
          required: true,
        },
      ],
    };
  }
  componentDidMount() {
    this.loadEducationData();
    this.loadCertificatesData();
  }
  loadEducationData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeEducationDetails(
        orgId,
        employeeId,
        {
          Authorization: token,
        }
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
  loadCertificatesData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);

      let { data, status } = await getEmployeeCertificatesDetails(
        orgId,
        employeeId,
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ certificateDetails: data });
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
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        if (values === "educationDetails") {
          let { data, status } = await deleteEmployeeEducationDetails(
            details[index].id,
            orgId,
            employeeId,
            {
              Authorization: token,
            }
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
        } else {
          let { data, status } = await deleteEmployeeCertificatesDetails(
            details[index].id,
            orgId,
            employeeId,
            {
              Authorization: token,
            }
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
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        let { data, status } = await updateEmployeeEducationDetails(
          educationDetails,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        let certificateDetails = this.state.certificateDetails.filter(
          (eachCerti) => {
            if (eachCerti.name && eachCerti.body) {
              return eachCerti;
            } else return null;
          }
        );
        let noOfNewCertificates = 0;
        let formData = new FormData();
        for (let certIndex in certificateDetails) {
          if (typeof certificateDetails[certIndex].image !== "string") {
            formData.append("certificate", certificateDetails[certIndex].image);
            certificateDetails[certIndex].image = {
              originalName: certificateDetails[certIndex].image.name,
              indexOfFile: noOfNewCertificates,
            };
            noOfNewCertificates++;
          }
        }
        formData.append(
          "certificateDetails",
          JSON.stringify(certificateDetails)
        );
        let certResponse = await updateEmployeeCertificatesDetails(
          formData,
          orgId,
          employeeId,
          { "content-type": "multipart/form-data", Authorization: token }
        );
        if (
          status >= 200 &&
          status < 300 &&
          certResponse.status >= 200 &&
          certResponse.status < 300
        ) {
          document.message.success(
            "Education and Certificate saved successfully."
          );
          this.props.changeOnboardingStep(this.props.stepCount + 1);
        } else {
          document.message.error(
            status > 300
              ? JSON.stringify(data)
              : JSON.stringify(certResponse.data)
          );
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
    let certificateDetails = this.state.certificateDetails;
    let certificateComponent = this.state.certificateComponent;
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

    for (let certCompIndex in certificateComponent) {
      for (let certDetailsIndex in certificateDetails) {
        let allFieldsAreEmpty = true;
        for (let eachDetail in certificateDetails) {
          if (
            certificateDetails[certDetailsIndex][
              certificateComponent[eachDetail].fieldName
            ]
          ) {
            allFieldsAreEmpty = false;
          }
        }
        if (allFieldsAreEmpty) continue;
        if (certificateComponent[certCompIndex].required) {
          if (
            !certificateDetails[certDetailsIndex][
              certificateComponent[certCompIndex].fieldName
            ]
          ) {
            certificateComponent[certCompIndex].error = true;
            certificateComponent[certCompIndex].errorIndex.push(
              parseInt(certDetailsIndex)
            );
            failedRecords.push(certificateComponent[certCompIndex]);
            continue;
          }
          if (certificateComponent[certCompIndex].validation) {
            let validationResult = certificateComponent[
              certCompIndex
            ].validation.test(
              certificateDetails[certDetailsIndex][
                certificateComponent[certCompIndex].fieldName
              ]
            );
            if (!validationResult) {
              certificateComponent[certCompIndex].error = true;
              certificateComponent[certCompIndex].errorIndex.push(
                parseInt(certDetailsIndex)
              );
              failedRecords.push(certificateComponent[certCompIndex]);
            }
          }
        }
      }
    }
    this.setState({ educationComponent, certificateComponent });
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
          />
        </div>

        <div style={{ borderTop: "1px solid rgb(226, 226, 226)" }}>
          <CertificateDetails
            {...this}
            certificateDetails={this.state.certificateDetails}
            certificateComponent={this.state.certificateComponent}
          />
        </div>

        <div className="onboarding-button-container">
          <SaveButton save={this.handleSave} />
        </div>
      </div>
    );
  }
}

export default EducationAndCertificate;
