import React, { Component } from "react";
import { getEmployeeDetails } from "../core/apiClient/organization/organizationClient";
import Nav from "../components/NavigationBar";
import Approval from "../assets/images/approval.svg";
import Award from "../assets/images/award.svg";
import analtics from "../assets/images/Analytics.svg";
import Hierarchy from "../assets/images/hierarchy.svg";
import Dashboard from "../assets/images/dashboard.svg";
import User from "../assets/images/user.svg";
import AppHeadderV2 from "./AppHeaderV2";
import Teams from "../assets/images/teams.svg";
import Goal from "../assets/images/goal.svg";
import CareerImg from "../assets/images/careerImage.svg";
import Training from "../assets/images/training.svg";
import AppLogo from "../assets/images/AppLogo.png";
import India from "../assets/images/india.svg";
import ProfilePic from "../assets/images/defaultProfile.svg";
import Activity from "../assets/images/activities.svg";
import "../assets/css/OpenSans.css";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PopUpDisplay from "./PopUpDisplay";
import HelpPopUpDisplay from "./HelpPopUpDisplay";
import { decryptData, encryptData } from "../utils/encryptDecrypt";
import { logout } from "../core/apiClient/auth";
import { trackRoleSwitchActivities } from "../core/apiClient/assessment";
import axios from "axios";

class Header_Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionalDetailsData: [{ value: "" }, { value: "" }, { value: "" }],
      images: {
        logo: AppLogo,
        flag: India,
        profilePic: ProfilePic,
      },
      linkClicked: "",
      profileURL: ProfilePic,
      profileData: {
        name: "",
        designation: "",
        links:
          decryptData(localStorage.role) === "employee"
            ? ["Help", "Log Out"]
            : ["Help", "Log Out"],
      },
      navigationData: [],
      Admin: [
        { img: Dashboard, label: "Dashboard" },
        { img: Award, label: "Leaderboard" },
        { img: User, label: "User Management" },
        { img: User, label: "Org Management" },
        { img: Hierarchy, label: "Hierarchy" },
        { img: Approval, label: "Approval" },
        // { img: Approval, label: "Assessments" },
        { img: analtics, label: "Reports"}

      ],
      Manager: [
        { img: Dashboard, label: "Dashboard" },
        { img: Award, label: "Leaderboard" },
        { img: Teams, label: "Teams" },
        { img: Goal, label: "Feedback" },
        { img: Goal, label: "Learning Goals" },
        { img: Approval, label: "Approval" },
        { img: analtics, label: "Reports" },
        // { img: analtics, label: "Activity" },


      ],
      Employee: [
        { img: Dashboard, label: "Dashboard" },
        { img: CareerImg, label: "Career Path" },
        { img: Training, label: "Training" },
        { img: Award, label: "Leaderboard" },
        { img: Goal, label: "Feedback" },
        { img: Goal, label: "Learning Goals" },
        { img: Activity, label: "Activities" },
      ],
      selectedNavBar: "",
      selectedNavBarName: "",
      viewOptions: [],
      view: this.props.view,
      countryCode: "in",
      viewAs: this.props.view === "employee" ? "Employee" 
              : this.props.view === "manager" ? "Manager"
              : "Admin"
    };
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  componentDidMount = () => {
    this.loadEmployeeProfile();
    this.loadViewOptions(this.props.view);
    this.getGeoInfo();
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
  static getDerivedStateFromProps(prev, state) {
    let update = {};
    let name = "";
    if (prev.proffessional !== undefined && prev.proffessional) {
      name =
        (prev.proffessional.firstName || "") +
        " " +
        `${prev.proffessional.middleName || ""}` +
        " " +
        (prev.proffessional.lastName || "");

      update.profileData = {
        name,
        designation: prev.proffessional.designation,
        links:
          decryptData(localStorage.role) === "employee"
            ? ["Help", "Log Out"]
            : ["Help", "Log Out"],
      };
    }

    if (prev?.profileUrl && prev.profileUrl !== state.images.profilePic) {
      update.images = {
        logo: AppLogo,
        flag: India,
        profilePic: prev.profileUrl === "remove" ? ProfilePic : prev.profileUrl,
      };
    }

    return update;
  }

  loadEmployeeProfile = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      let name = "";
      if (orgId && employeeId) {
        let { data, status } = await getEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });

        let professionalDetailsData = this.state.professionalDetailsData;
        if (status >= 200 && status < 300) {
          let deignation = "";
          let profilePic = "";
          let profileURL = this.state.profileURL;
          let professionalDetails = data.professionalDetails;

          if (data.professionalDetails) {
            professionalDetailsData[0].value = professionalDetails.firstName;
            professionalDetailsData[1].value = professionalDetails.middleName;
            professionalDetailsData[2].value = professionalDetails.lastName;
            profilePic = professionalDetails.profilePicture;
            profileURL = professionalDetails.profilePicture;
            deignation = professionalDetails.designation;
          }
          for (let i = 0; i < professionalDetailsData.length; i++) {
            let str = professionalDetailsData[i].value;
            if (
              str !== null &&
              str !== "" &&
              str !== undefined &&
              str !== "null"
            ) {
              name = name + " " + str;
            }
          }

          this.setState({
            profileData: {
              name,
              designation: deignation,
              links:
                decryptData(localStorage.role) === "employee"
                  ? ["Help", "Log Out"]
                  : ["Help", "Log Out"],
            },
            images: {
              logo: AppLogo,
              flag: India,
              profilePic,
            },
            profileURL,
          });
        }
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadViewOptions = (role) => {
    let viewOptions = [];
    viewOptions = [
      ...new Set(
        localStorage.getItem("authRoles") &&
          JSON.parse(decryptData(localStorage.getItem("authRoles")))
            .map((eachRole) => (eachRole === "OrgAdmin" ? "Admin" : eachRole))
            .filter((eachRole) => eachRole.toLowerCase() !== role.toLowerCase())
      ),
    ];
    let navigationData =
      (role === "admin" && this.state.Admin) ||
      (role === "manager" && this.state.Manager) ||
      (role === "employee" && this.state.Employee);
    this.setState({ viewOptions, navigationData });
  };

  trackRoleSwitchActivities = async (fromRole, toRole) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        userId = decryptData(localStorage.userId),
        token = decryptData(localStorage.token);
      if (orgId && userId) {
        let { data, status } = await trackRoleSwitchActivities(
          userId,
          { fromRole: fromRole, toRole: toRole },
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
        }
      }
      document.toggleLoading();
    } catch (error) {
      document.toggleLoading();
    }
  };
  viewHandler = async (e, location) => {
    console.log("View As",e,"location",location)
    let currentPath = location.split("/");
    currentPath = currentPath[currentPath.length - 1].replace("-", " ");
    let url = `/${e.toLowerCase()}/`;
    let indexOfCurrentPath = this.state[e].findIndex(
      (eachRole) => eachRole.label.toLowerCase() === currentPath.toLowerCase()
    );
    if (indexOfCurrentPath < 0) {
      url = url + "dashboard";
    } else {
      url = url + currentPath.replace(" ", "-");
    }
    let optionElement =
      this.state.view[0].toUpperCase() + this.state.view.slice(1);
    let viewOptions = this.state.viewOptions.filter(
      (role) => role === optionElement
    );
    await this.trackRoleSwitchActivities(optionElement, e);
    if (e === "Manager") {
      window.open(url, "_self");
      this.setState({
        navigationData: this.state.Manager,
        viewOptions,
        selectedNavBar: "",
        selectedNavBarName: "",
        view: e,
      });
    } else if (e === "Admin") {
      window.open(url, "_self");
      this.setState({
        navigationData: this.state.Admin,
        viewOptions,
        selectedNavBar: "",
        selectedNavBarName: "",
        view: e,
      });
    } else if (e === "Employee") {
      window.open(url, "_self");
      this.setState({
        navigationData: this.state.Employee,
        viewOptions,
        selectedNavBar: "",
        selectedNavBarName: "",
        view: e,
      });
    }
    localStorage.setItem("role", encryptData(e.toLowerCase()));
  };
  linkHandler = (link) => {
    this.setState({ linkClicked: link });
  };

  navBarLinkHandler = (index) => {
    this.setState({
      selectedNavBar: index,
      selectedNavBarName: this.state.navigationData[index].label,
    });
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

  viewProfileHanler = () => {
    this.props.history.push("/employee/dashboard/profile");
  };
  render() {
    return (
      <div
        style={{
          position: "sticky",
          width: "100%",
          top: 0,
          zIndex: 20,
          boxShadow: "5px 0px 15px #b9b9b977",
        }}
      >
        {this.state.linkClicked === "Log Out" && (
          <PopUpDisplay
            subTitle="Confirm Log Out ?"
            width="20%"
            popUpHandler={this.popUpHandler}
          />
        )}
        {this.state.linkClicked === "Help" && (
          <HelpPopUpDisplay
            title="Please contact"
            email="adarsh@elcarreira.com"
            phone={
              decryptData(localStorage.role) === "admin" ? "+91 9886769886" : ""
            }
            width="30%"
            popUpHandler={this.popUpHandler}
          />
        )}
        <AppHeadderV2
          images={this.state.images}
          profileURL={this.state.profileURL}
          FlagOptions={this.state.FlagOptions}
          profileData={this.state.profileData}
          linkHandler={(e) => this.linkHandler(e)}
          viewProfileHanler={this.viewProfileHanler}
          role={decryptData(localStorage.role)}
          countryCode={this.state.countryCode}
        />
        <Nav
          navigationData={this.state.navigationData}
          viewHandler={this.viewHandler}
          viewOptions={this.state.viewOptions}
          selectedNavBar={this.state.selectedNavBar}
          navBarLinkHandler={this.navBarLinkHandler}
          selectedNavBarName={this.state.selectedNavBarName}
          view={this.state.view}
          viewAs={this.state.viewAs}
        />
      </div>
    );
  }
}

export default withRouter(Header_Navigation);
