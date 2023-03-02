import React, { Component } from "react";
import UserProfileCard from "../../components/UserProfileCard";
import UserProfilePointsAndBadgesCard from "../../components/EmployeeUserProfilePoints";
import SkillScoreCard from "../../components/SkillScoreCard";
import EmployeeMyGoalsPage from "../../components/goals/employee/EmployeeMyGoalsPage";
class EmployeeGoalsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewFeedbackClicked: false,
      leaderboardDetails: {
        earnedPoints: 320,
        earnedBadges: 3,
      },
      mySkillScore: {
        earnedScore: 48,
        totalScore: 100,
      },
      viewProfileFrom: "Learning Goals",
    };
  }
  onClickViewFeedBacks = () => {
    window.open("/employee/goals/feedback", "_self");
  };
  viewProfileHandler = () => {
    window.open("/employee/goals/profile", "_self");
  };
  render() {
    return (
      <div
        style={{
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          fontSize: "16px",
          minHeight: "79%",
        }}
      >
        <div style={{ padding: "20px 30px 30px 30px" }}>
          <div
            style={{
              fontSize: "1.126em",
              fontFamily: "Open Sans Semibold",
            }}
          >
            Learning Goals
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              height: "167px",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: 1, marginRight: "16px" }}>
              <UserProfileCard
                isViewProfile={true}
                viewProfileHandler={this.viewProfileHandler}
              />
            </div>
            <div style={{ flex: 0.7, marginRight: "16px" }}>
              <UserProfilePointsAndBadgesCard {...this.state} />
            </div>
            <div
              style={{
                flex: 0.6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <SkillScoreCard {...this.state} />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <EmployeeMyGoalsPage
              onClickViewFeedBacks={this.onClickViewFeedBacks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeGoalsPage;
