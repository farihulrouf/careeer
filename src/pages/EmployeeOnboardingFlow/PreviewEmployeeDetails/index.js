import React, { Component } from "react";
import EmployeeDetailsSummary from "../../../components/Employee-Details-Summary-card";
import EducationSummary from "../../../components/Education-Summary";
import CertificateSummary from "../../../components/Certificate-Summary";
import ExperienceSummary from "../../../components/Experience-Summary";
import ProjectSummary from "../../../components/Project-Summary";
import EmpAssessment from "../../../components/EmpAssessment";
import Button from "../../../components/Button";
import certificate from "../../../assets/svg/certificate.svg";
import circle from "../../../assets/svg/circle.svg";
import education from "../../../assets/svg/education.svg";
import experience from "../../../assets/svg/experience.svg";
import project from "../../../assets/svg/project.svg";
import countryFlag from "../../../assets/images/india.svg";
import AppHeadderV2 from "../../../components/AppHeaderV2";
import AppLogo from "../../../assets/images/AppLogo.png";
import PopUpDisplay from "../../../components/PopUpDisplay";
import defaultProfile from "../../../assets/images/defaultProfile.svg";
import "../../../assets/css/ScrollBarDesign.css";
import TimeStampTodate from "../../../core/lib/TimeStampToDate";

import {
  getEmployeeDetails,
  getEmployeeEducationDetails,
  getEmployeeCertificatesDetails,
  getEmployeeExperiencesDetails,
  getEmployeeProjectsDetails,
  updateOnboardingStatus,
} from "../../../core/apiClient/organization/organizationClient";
import { logout } from "../../../core/apiClient/auth";
import { encryptData, decryptData } from "../../../utils/encryptDecrypt";
import axios from "axios";

const className = {
  previewPageContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
  },

  previewTitle: {
    fontSize: 18,
    color: "#303030",
    fontFamily: "Open Sans Semibold",
    padding: "10px 0 10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 30px 0 20px",
    borderRadius: 8,
    background: "#FFFFFF",
  },
  summaryContainer: {
    display: "flex",
  },
  profileDetails: {
    flex: 0.978,
  },
  previewContainer: {
    backgroundColor: "#FAFAFA",
    padding: 20,
    overflowY: "auto",
  },
  previewPageFooter: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 14,
  },

  summaryCards: {
    marginLeft: 15,
    display: "grid",
    flex: 2,
    gridTemplateColumns: "repeat(2,1fr)",
    gridAutoRows: "minmax(370px,0.6fr)",
    gridColumnGap: 15,
    gridRowGap: 15,
  },
};

class EmployeePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkClicked: "",
      images: {
        logo: AppLogo,
        flag: countryFlag,
        profilePic: null,
      },
      profileData: {
        name: "",
        designation: "",
        links: ["Company Profile", "Subscriptions", "Help", "Log Out"],
      },

      professionalDetailsData: [
        { title: "firstName", value: "" },
        { title: "middleName", value: "" },
        { title: "lastName", value: "" },
        { title: "phoneNumber", value: "" },
        { title: "alternatePhoneNumber", value: "" },
        { title: "officialEmail", value: "" },
        { title: "organization", value: "" },
        { title: "designation", value: "" },
        { title: "department", value: "" },
        { title: "country", value: "India" },
        { title: "region", value: "Bangalore,India" },
        { title: "location", value: "BTP Office,Bangalore,India" },
      ],
      personalDetailsData: [
        { title: "personalEmailID", value: "" },
        { title: "dateofBirth", value: "" },
        { title: "gender", value: "" },
        { title: "linkedInProfile", value: "" },
      ],
      educationDetails: [],
      certificateDetails: [],
      experienceDetails: [],
      projectDetails: [],
      assessmentData: {
        title: "Your Self Rated Score",
        subTitle: " Take assessment to validate your Skills score",
        scoreTitle: "My Validated Skill Score",
        score: { scoreValue: 0, total: 100 },
        info: {
          disableLabel:
            "Your assessment will be ready within 24 Hours.We will notify you via email",
          enableLabel: "Your assessment is ready",
        },
      },
      modalOpen: false,
      countryCode: "in",
    };
  }

  componentDidMount = () => {
    let userRecord = decryptData(localStorage.getItem("session"));
    if (userRecord) {
      userRecord = JSON.parse(userRecord);
      this.loadEmployeeDetails();
      this.loadEducationDetails();
      this.loadCertificatesDetails();
      this.loadExperience();
      this.getProjectDetails();
      this.getGeoInfo();
    }
  };

  getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        this.setState({
          countryName: data.country_name,
          countryCode: data.country_code.toLowerCase(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        let profileData = this.state.profileData;
        let professional = data.professionalDetails;
        let professionalDetailsData = this.state.professionalDetailsData;
        profileData.name =
          (professional.firstName || "") +
          " " +
          (professional.middleName || "") +
          " " +
          (professional.lastName || "");
        profileData.designation = professional.designation;
        const entries = Object.entries(professional);
        for (const [field, value] of entries) {
          for (let professionalIdex in professionalDetailsData) {
            if (
              field
                .toLowerCase()
                .startsWith(
                  professionalDetailsData[professionalIdex].title.toLowerCase()
                )
            ) {
              if (field !== "designationId") {
                professionalDetailsData[professionalIdex].value = value;
              }
            }
          }
        }
        let personal = data.personalDetails;
        let personalDetailsData = this.state.personalDetailsData;
        personalDetailsData[0].value = personal.personalEmail;
        personalDetailsData[1].value = TimeStampTodate(personal.dateofBirth);
        personalDetailsData[2].value = personal.gender;
        personalDetailsData[3].value = personal.linkedInProfile;
        let profileURL = "";
        if (professional.profilePicture !== null) {
          profileURL = professional.profilePicture;
        } else profileURL = defaultProfile;
        this.setState({
          professionalDetailsData,
          personalDetailsData,
          profileURL,
          images: {
            logo: AppLogo,
            flag: countryFlag,
            profilePic: profileURL,
          },
          profileData,
        });
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  loadEducationDetails = async () => {
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
        this.setState({ educationDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadCertificatesDetails = async () => {
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
        this.setState({ certificateDetails: data });
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
        this.setState({ experienceDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  getProjectDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeProjectsDetails(
        orgId,
        employeeId,
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        this.setState({ projectDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  onCloseHandler = () => {
    this.setState({ modalOpen: false });
  };

  onSubmit = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await updateOnboardingStatus(
        { onboardingCompleted: true },
        orgId,
        employeeId,
        {
          Authorization: token,
        }
      );
      if (status === 200) {
        this.setState({ modalOpen: true });
        document.message.success("Records saved successfully.");
        localStorage.setItem("isOnBoardingCompleted", encryptData(true));
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      return null;
    }
  };
  linkHandler = (link) => {
    this.setState({ linkClicked: link });
  };
  popUpHandler = async (bool) => {
    if (bool) {
      try {
        let token = decryptData(localStorage.token);
        localStorage.clear();
        if (token) {
          await logout(token);
        }
        window.open("/login", "_self");
      } catch (error) {
        window.open("/login", "_self");
        // document.message.error("Please try after sometime");
      }
    } else {
      this.setState({ linkClicked: "" });
    }
  };
  render() {
    return (
      <div style={className.previewPageContainer}>
        {this.state.linkClicked === "Log Out" && (
          <PopUpDisplay
            subTitle="Confirm Logout ?"
            width="20%"
            popUpHandler={this.popUpHandler}
          />
        )}
        <div style={className.HeadderContainer}>
          <AppHeadderV2
            images={this.state.images}
            FlagOptions={this.state.FlagOptions}
            profileData={this.state.profileData}
            profileURL={this.state.profileURL}
            linkHandler={(e) => this.linkHandler(e)}
            countryCode={this.state.countryCode}
          />
        </div>
        <div style={className.previewTitle}>
          <div>Preview</div>
          <div style={className.previewPageFooter}>
            <div
              style={{ width: 98 }}
              onClick={this.props.editEmpDetailsHandler}
            >
              <Button
                label="Edit"
                styles={{
                  color: "#FF808B",
                  backgroundColor: "#ffffff",
                  border: "#FF808B",
                  height: "40px",
                }}
              />
            </div>
            <div style={{ width: 98, marginLeft: 10 }} onClick={this.onSubmit}>
              <Button
                label="Submit"
                styles={{
                  color: "#ffffff",
                  backgroundColor: "#FF808B",
                  border: "#FF808B",
                  height: "40px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="web-route" style={className.previewContainer}>
          <div style={className.summaryContainer}>
            <div style={className.profileDetails}>
              <EmployeeDetailsSummary
                profile={this.state.profileURL}
                updateRotation={0}
                title={{
                  label1: "Professional Details",
                  label2: "Personal Details",
                }}
                {...this.state}
              />
            </div>
            <div style={className.summaryCards}>
              <div style={{ height: "100%" }}>
                <EducationSummary
                  title={"Education"}
                  type={"timeTracker"}
                  icon={education}
                  trackerIcon={circle}
                  educationDetails={this.state.educationDetails}
                />
              </div>
              <div style={{ height: "100%" }}>
                <ExperienceSummary
                  title={"Experience"}
                  type={"timeTracker"}
                  icon={experience}
                  trackerIcon={circle}
                  experienceDetails={this.state.experienceDetails}
                />
              </div>
              <div style={{ height: "100%" }}>
                <CertificateSummary
                  title={"Certificates"}
                  type={"NotimeTracker"}
                  icon={certificate}
                  trackerIcon={circle}
                  certificateDetails={this.state.certificateDetails}
                />
              </div>
              <div style={{ height: "100%" }}>
                <ProjectSummary
                  title={"Projects"}
                  type={"NotimeTracker"}
                  icon={project}
                  trackerIcon={circle}
                  projectDetails={this.state.projectDetails}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.modalOpen && (
          <EmpAssessment
            assessmentData={this.state.assessmentData}
            status={true}
            modalOpen={this.state.modalOpen}
            onCloseHandler={this.onCloseHandler}
          />
        )}
      </div>
    );
  }
}

export default EmployeePreview;
