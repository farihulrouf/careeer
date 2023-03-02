import React, { Component } from "react";
import EmployeeDashboardLeaderBoardTopperView from "./EmployeeDashboardLeaderboardTopper";
import EmployeeDashboardLeaderBoardNearerView from "./EmployeeDashboardLeaderBoardNearerView";
import { getDashboardLeaderboardTopAndNearerDetails } from "../core/apiClient/leaderboard/leaderboardClient";
import { decryptData } from "../utils/encryptDecrypt";

const styles = {
  mainCardView: {
    width: "100%",
    height: "100%",
    fontFamily: "Open Sans Regular",
  },
  maincard: {
    height: "100%",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "1px 4px 12px #00000027",
    borderRadius: "8px",
    opacity: 1,
    padding: "10px 10px",
    display: "flex",
    flexDirection: "column",
  },
  Heading_Link: {
    margin: "10px",
    display: "flex",
  },
  Heading: {
    flex: 0.5,
    fontFamily: "Open Sans Semibold,Regular",
    fontSize: "1.126em",
    color: "#303030",
    opacity: 1,
  },
  link: {
    flex: 0.5,
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "Open Sans Regular",
    fontSize: "0.876em",
    color: "#F46773",
    opacity: 1,
  },
  Components: {
    margin: "10px",
    display: "flex",
    flex: 1,
  },
  TopperView: {
    flex: "0.7",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 0,
    marginRight: 8,
  },
  NearerView: {
    flex: "0.5",
  },
};

export default class EmployeeDashboardLeaderBoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      points: "",
      leaderboardTopper: [],
      leaderboardNearerViewArray: [],
      leaderboardData: [],
    };
  }
  componentDidMount = () => {
    this.loadLeaderboardDetails();
  };
  loadLeaderboardDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        referenceId = decryptData(localStorage.rootTier);
      let token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let response = await getDashboardLeaderboardTopAndNearerDetails(
          orgId,
          employeeId,
          referenceId,
          {
            Authorization: token,
          },
        );
        let responseData = response.data;
        let leaderboardTopper = responseData.topThreeRanks;
        leaderboardTopper = leaderboardTopper.sort(
          (top1, top2) => top1.rank - top2.rank,
        );
        let leaderboardData = responseData.nearerEmployees;
        leaderboardData = leaderboardData.sort(
          (near1, near2) => near2.points - near1.points,
        );
        let leaderboardNearerViewArray = [];
        let points = responseData.currentUser.points;
        let firstName = responseData.currentUser.firstName;
        let lastName = responseData.currentUser.lastName;
        if (leaderboardData.length > 0) {
          for (let i = 0; i < leaderboardData.length + 1; i++) {
            if (i === 1) {
              leaderboardNearerViewArray.push(responseData.currentUser);
            } else {
              if (i === 0) leaderboardNearerViewArray.push(leaderboardData[i]);
              else leaderboardNearerViewArray.push(leaderboardData[i - 1]);
            }
          }
        } else {
          leaderboardNearerViewArray.push(responseData.currentUser);
        }
        this.setState({
          leaderboardTopper: leaderboardTopper,
          firstName,
          lastName,
          points,
          leaderboardNearerViewArray,
        });
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  render() {
    return (
      <div style={styles.mainCardView}>
        <div style={styles.maincard}>
          <div style={styles.Heading_Link}>
            <div style={styles.Heading}>Leaderboard</div>
            <div style={styles.link}>
              <div
                onClick={() => this.props.getViewDetailsRoute("leaderboard")}
                style={{ color: "#F46773", cursor: "pointer" }}
              >
                <u> View details</u>
              </div>
            </div>
          </div>
          <div style={styles.Components}>
            <div style={styles.TopperView}>
              <EmployeeDashboardLeaderBoardTopperView
                rankData={this.state.leaderboardTopper}
              />
            </div>
            <div style={styles.NearerView}>
              <EmployeeDashboardLeaderBoardNearerView
                {...this.state}
                leaderboardNearerViewArray={
                  this.state.leaderboardNearerViewArray || []
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
