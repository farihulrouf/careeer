import React, { Component } from "react";
import styled from "styled-components";
import AdminManagerDashboardTeamGoalItem from "./AdminManagerDashboardTeamGoalItem";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const Div = styled.div`
  background: #ffffff;
  height: inherit;
  box-shadow: 1px 4px 12px #00000027;
  border-radius: 8px;
  display: flex;
  color: #303030;
  font-family: Open Sans Regular;
  #team-goal-container {
    padding: 4%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .team-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .team-title {
    font-size: 1.285711em;
    font-family: Open Sans Semibold;
  }
  .view-all-title {
    color: #f46773;
    text-align: end;
    align-self: center;
    cursor: pointer;
  }
  .team-list-container {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 2%;
    align-items: end;
  }
  .emptyImage {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

class AdminManagerDashboardTeamGoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = { employeeTeamList: this.props.employeeTeamList };
  }

  render() {
    return (
      <Div>
        <div id="team-goal-container">
          <div className="team-title-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="team-title">{this.props.title || ""}</div>
            </div>
            <Link to="learning-goals/assigned-goals">
              <u className="view-all-title" onClick={this.props.onClickViewAll}>
                View all
              </u>
            </Link>
          </div>
          {this.state.employeeTeamList &&
          this.state.employeeTeamList.length > 0 ? (
            <div className="team-list-container">
              {this.state.employeeTeamList &&
                this.state.employeeTeamList.map((eachEmployee, index) => (
                  <div
                    key={eachEmployee.id || index}
                    className="team-goal-item"
                  >
                    <AdminManagerDashboardTeamGoalItem
                      profile={eachEmployee.profilePicture}
                      name={eachEmployee.firstName || ""}
                      designation={eachEmployee.designation}
                      status={eachEmployee.status}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="emptyImage">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </Div>
    );
  }
}

export default AdminManagerDashboardTeamGoalsList;
