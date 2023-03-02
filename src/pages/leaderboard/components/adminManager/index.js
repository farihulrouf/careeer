import React, { Component } from "react";
import { Empty } from "antd";
import { withRouter, Link } from "react-router-dom";
import AdminLeaderboardEmployeeList from "../../../../components/AdminLeaderboardEmployeeList";
import FormSelector from "../../../../components/form_selector";
import LeaderboardRanks from "../../components/LeaderboardTopFiveRankers";
import UserGroup from "../../../../assets/images/userGroup.svg";
import styled from "styled-components";
const Div = styled.div`
  background-color: #f8f8f8;
  font-family: Open Sans Regular;
  color: #303030;
  .title {
    font-family: Open Sans Semibold;
    font-size: 1.125em;
  }
  .navgation-container {
    margin: 15px 0px;
    font-size: 16px;
    height: 58px;
    color: rgb(118, 118, 118);
    background: rgb(255, 255, 255);
    border-radius: 8px;
    font-family: "Open Sans Regular";
  }
  .leaderboard-sub-container {
    margin-top: 20px;
    background-color: #ffffff;
    box-shadow: 1px 4px 12px #00000027;
    padding: 0 1.4%;
  }
  .leaderboard-team-selector-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5em;
    min-height: 58px;
  }
  .leaderboard-team-selector {
    width: 130px;
    font-size: 0.9em;
    margin-right: 3em;
  }
  .leaderboard-view-label {
    text-align: center;
    text-decoration: underline;
    color: #ff808b;
    cursor: pointer;
    font-size: 1em;
  }
  .leaderboard-rank-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .leaderboard-employee-list {
    padding-bottom: 2%;
  }
  .group-icon {
    height: 135px;
    width: 135px;
  }
  .leaderboard-employee-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

class AdminManagerLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkStatus: this.props.linkStatus,
    };
  }
  componentDidMount = () => { };

  render() {
    return (
      <Div>
        {this.props.referenceId && this.props.scopeType ? (
          <div className="leaderboard-sub-container">
            <div className="leaderboard-team-selector-container">
              <div
                className="leaderboard-team-selector"
                style={{
                  display:
                    this.props.linkStatus === "Region" || false ? "" : "none",
                }}
              >
                {this.props.referenceId && (
                  <FormSelector
                    type="selector"
                    value={this.props.selectedOption}
                    onClick={this.props.onClickSelector}
                    option={this.props.selectorOptions}
                    placeHolder="Region"
                    style={{
                      color: {
                        hover: "#ff808b",
                        selectedBg: "#ff808b",
                        optionHover: "rgb(253, 185, 191)",
                        selectedFont: "#ffffff",
                      },
                      height: "36px",
                    }}
                  />
                )}
              </div>
              {this.props.employeeDataLength > 0 && (
                <Link
                  to={`/${this.props.role}/leaderboard/view-all/${
                    this.props.referenceId
                    }/${
                    this.props.scopeType === "root"
                      ? "global"
                      : this.props.scopeType
                    }`}
                >
                  <div
                    className="leaderboard-view-label"
                    onClick={this.props.hiddenViewHandler}
                  >
                    View all
                  </div>
                </Link>
              )}
            </div>
            <div className="leaderboard-rank-container">
              <div style={{ width: "80%" }}>
                <LeaderboardRanks
                  referenceId={this.props.referenceId}
                  scopeType={this.props.scopeType}
                />
              </div>
            </div>
            <div className="leaderboard-employee-list">
              {this.props.leaderboardEmployeeLists.ranksList.length > 5 ? (
                <AdminLeaderboardEmployeeList
                  leaderboardEmployeeLists={
                    (this.props.leaderboardEmployeeLists &&
                      this.props.leaderboardEmployeeLists.ranksList) ||
                    []
                  }
                />
              ) : (
                  <div className="leaderboard-employee-list">
                    <div>
                      <img src={UserGroup} alt="icon" className="group-icon" />
                    </div>
                    <div className="title">You don't have any data yet</div>
                  </div>
                )}
            </div>
          </div>
        ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "10%",
              }}
            >
              <Empty description={<span>No Data available</span>} />
            </div>
          )}
      </Div>
    );
  }
}

export default withRouter(AdminManagerLeaderboard);
