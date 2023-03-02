import React, { Component } from "react";
import UserManagement from "./UserManagement";
import UserManagementUserProfilePage from "./UserManagementUserProfilePage";
import profilePic from "../assets/images/human1.jpg";
import goalIcon from "../assets/images/goalsIcon.svg";
import activityLogIcon from "../assets/images/activityLogIcon.svg";
import empProfile from "../assets/images/empProfile.svg";
import AdminManagerActivities from "./AdminManagerActivities";
import AdminViewEmployeeProfileDetails from "./AdminViewEmployeeProfileDetails";
import GoalStatusCardGroup from "./GoalStatusCardGroup";
class UserMain extends Component {
  state = {
    displayUserProfile: false,
    userData: [],
    adminData: [],
    Goals: false,
    ActivityLog: false,
    EmployeeProfileDetails: false,
    personalDetails: {
      profilePicture: profilePic,
    },
    selectedUser: null,
  };

  toggleHandler = (title) => {
    let name = title.replace(/\s/g, "");
    if (name === "Goals") {
      this.setState({
        [name]: !this.state.Goals,
        ActivityLog: false,
        EmployeeProfileDetails: false,
      });
    } else if (name === "ActivityLog") {
      this.setState({
        [name]: !this.state.ActivityLog,
        Goals: false,
        EmployeeProfileDetails: false,
      });
    } else {
      this.setState({
        [name]: !this.state.EmployeeProfileDetails,
        Goals: false,
        ActivityLog: false,
      });
    }
  };
  onClickOfList = (prop) => {
    this.setState({
      displayUserProfile: !this.state.displayUserProfile,
      selectedUser: prop.id,
      Goals: false,
      ActivityLog: false,
      EmployeeProfileDetails: false,
    });
  };
  render() {
    return (
      <div style={{ padding: "1.5% 2%", background: "#F8F8F8" }}>
        {!this.state.displayUserProfile ? (
          <UserManagement
            adminData={this.state.adminData}
            userData={this.state.userData}
            location={this.props.location}
            onClickOfList={this.onClickOfList}
          />
        ) : (
          <UserManagementUserProfilePage
            viewProfileFrom={"User Management"}
            onClickBack={this.onClickOfList}
            {...this.state}
            leaderboardDetails={{
              earnedPoints: 500,
              earnedBadges: 3,
            }}
            title={"My Skill Score"}
            mySkillScore={{
              earnedScore: 58,
              totalScore: 100,
            }}
            bgColor={"#FF8C96"}
            activityData={[
              {
                month: "Jan",
                skills: 80,
                activity: 80,
              },
              {
                month: "Feb",
                skills: 60,
                activity: 55,
              },
              {
                month: "Mar",
                skills: 50,
                activity: 75,
              },
              {
                month: "Apr",
                skills: 70,
                activity: 90,
              },
              {
                month: "May",
                skills: 50,
                activity: 50,
              },
              {
                month: "Jun",
                skills: 30,
                activity: 50,
              },
              {
                month: "Jul",
                skills: 40,
                activity: 24,
              },
              {
                month: "Aug",
                skills: 30,
                activity: 13,
              },
              {
                month: "Sept",
                skills: 20,
                activity: 98,
              },
              {
                month: "Oct",
                skills: 27,
                activity: 39,
              },
              {
                month: "Nov",
                skills: 18,
                activity: 48,
              },
              {
                month: "Dec",
                skills: 23,
                activity: 38,
              },
            ]}
            firstDuration="1 yr"
            secondDuration="6 mon"
            thirdDuration="3 mon"
            assessment={[
              {
                title: "Assessment 4",
                createdAt: "12/JUN/2019",
                skillScore: { earnedPoints: 90, totalPoints: 100 },
                id: 1,
              },
              {
                title: "Assessment 3",
                createdAt: "22/APR/2019",
                skillScore: { earnedPoints: 80, totalPoints: 100 },
                id: 1,
              },
              {
                title: "Assessment 2",
                createdAt: "02/FEB/2019",
                skillScore: { earnedPoints: 60, totalPoints: 100 },
                id: 1,
              },
              {
                title: "Assessment 1",
                createdAt: "12/DEC/2018",
                skillScore: { earnedPoints: 40, totalPoints: 100 },
                id: 1,
              },
            ]}
            accordionOptions={[
              {
                displayToggle: this.state.Goals,
                icon: goalIcon,
                title: "Goals",
                component: (
                  <GoalStatusCardGroup selectedUser={this.state.selectedUser} />
                ),
                onClick: this.toggleHandler,
              },
              {
                displayToggle: this.state.ActivityLog,
                icon: activityLogIcon,
                title: "Activity Log",
                component: <AdminManagerActivities />,
                onClick: this.toggleHandler,
              },
              {
                displayToggle: this.state.EmployeeProfileDetails,
                icon: empProfile,
                title: "Employee Profile Details",
                component: <AdminViewEmployeeProfileDetails {...this.state} />,
                onClick: this.toggleHandler,
              },
            ]}
            userDetails={{
              profilePic: profilePic,
              name: "Santhosh Kumar",
              designation: "Implementation Consultant",
            }}
            requestModel={{
              managerName: "Abhinandan",
              title: "Career Path Request",
              subTitle: "Request for discussion with your manager",
            }}
          />
        )}
      </div>
    );
  }
}

export default UserMain;
