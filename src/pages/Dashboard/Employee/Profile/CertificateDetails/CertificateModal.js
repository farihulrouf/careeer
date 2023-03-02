import React, { Component } from "react";
import SaveButton from "../../../../../components/SaveCancelButton";
import {
  getEmployeeCertificatesDetails,
  updateEmployeeCertificatesDetails,
  deleteEmployeeCertificatesDetails,
} from "../../../../../core/apiClient/organization/organizationClient";
import CertificateDetails from "../../../../EmployeeOnboardingFlow/EducationCertificateDetails/CertificateDetails";
import { decryptData } from "../../../../../utils/encryptDecrypt";
class CertificateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateDetails: [
        {
          name: "",
          image: "",
          body: "",
          validity: "lifeTime",
          specialization: null,
          completionYear: "",
          course: null,
          errorIndex: [],
          institute: null,
        },
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
          validation: /[a-zA-Z 0-9!@#$%^&*()+]{2,}/,
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
    this.loadCertificatesData();
  }

  loadCertificatesData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeCertificatesDetails(
        orgId,
        employeeId,
        { Authorization: token }
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
        let { data, status } = await deleteEmployeeCertificatesDetails(
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
        let orgId = decryptData(localStorage.orgId);
        let employeeId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        let certificateDetails = this.state.certificateDetails.filter(
          (eachCerti) => {
            if (eachCerti.name && eachCerti.body) {
              return eachCerti;
            } else {
              return null;
            }
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
        if (certResponse.status >= 200 && certResponse.status < 300) {
          document.message.success("Certificate saved successfully.");
          this.props.changeOnboardingStep(3);
        } else {
          document.message.error(JSON.stringify(certResponse.data));
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
    let certificateDetails = this.state.certificateDetails;
    let certificateComponent = this.state.certificateComponent;
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
    this.setState({ certificateComponent });
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
          <CertificateDetails
            {...this}
            certificateDetails={this.state.certificateDetails}
            certificateComponent={this.state.certificateComponent}
            dropDownScroll={this.props.dropDownScroll}
          />
        </div>

        <div className="onboarding-button-container">
          <SaveButton save={this.handleSave} cancel={this.props.cancel} />
        </div>
      </div>
    );
  }
}

export default CertificateModal;
