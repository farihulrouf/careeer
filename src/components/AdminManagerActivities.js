import React, { Component } from "react";
import "./css/admin-manager-activities.css";
import { getEmployeeActivities } from "../core/apiClient/assessment";
import { decryptData } from "../utils/encryptDecrypt";
import styled from "styled-components";

const RadioButton = styled.button`
  width: 10px;
  height: 10px;
  background-color: rgb(172, 174, 216);
  border-radius: 50%;
  margin-right: 10px;
  border: none;
  padding: 0;
`;

class AdminManagerActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userActivities: [],
    };
  }

  componentDidMount = async () => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      try {
        let { data, status } = await getEmployeeActivities(this.props.employeeId || employeeId, 0, 50, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          let userActivities = this.state.userActivities;
          let date = "";
          data.data.map((activity, index) => {
            return (
              (date = this.getFormattedDate(activity.createdAt)),
              userActivities.push({
                description: activity.description,
                createdAt: date,
              })
            );
          });
          this.setState({ userActivities: userActivities });
        } else if (status === 404) {
          this.setState({
            userActivities: [],
          });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };
  getFormattedDate = (timestamp) => {
    let date = new Date(timestamp);
    let splittedDate = date.toDateString().toUpperCase().split(" ");
    let formattedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[3]}`;
    let formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  render() {
    return (
      <div className="main-container">
        {this.state.userActivities.length > 0 ? (
          this.state.userActivities.map((value, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "4px 10px 4px ",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    padding: "6px 40px 6px 0px",
                  }}
                >
                  <RadioButton />
                  {value.description}
                </div>
                <div>{value.createdAt}</div>
              </div>
            );
          })
        ) : (
          <div className="no-activities-message">No Activities Found</div>
        )}
      </div>
    );
  }
}

export default AdminManagerActivities;
