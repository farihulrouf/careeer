import React, { Component } from "react";
import DefaultPic from "../assets/images/defaultProfile.svg";
const styles = {
  NearerViewMainCard: {
    width: "100%",
    height: "100%",
  },
  Details: {
    background: "#F9FAFE",
    padding: "10px",
    borderRadius: "8px",
    height: "100%",
  },
  DetailsDiv: {
    display: "flex",
    alignItems: "center",
  },
  Profileimage: {
    flex: "0.3",
    margin: "8px",
  },
  Name_designation: {
    flex: "1",
  },
  name: {
    font: "1em/24px Open Sans SemiBold",
  },
  profilePicture: {
    height: "37px",
    width: "37px",
    borderRadius: "50%",
  },
};

export default class EmployeeDashboardLeaderBoardNearerView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.NearerViewMainCard}>
        {this.props.leaderboardNearerViewArray.length > 0 && (
          <div style={styles.Details}>
            {this.props.leaderboardNearerViewArray.map(
              (nearerViewDetailsEach, nearerViewDetailsId) => (
                <div
                  key={nearerViewDetailsId}
                  style={{
                    marginBottom: 10,
                    borderRadius: "38px",
                    border:
                      this.props.firstName ===
                        nearerViewDetailsEach.firstName &&
                        this.props.lastName === nearerViewDetailsEach.lastName &&
                        this.props.points === nearerViewDetailsEach.points
                        ? "2px solid #ABADD0"
                        : "none",
                    background:
                      this.props.firstName ===
                        nearerViewDetailsEach.firstName &&
                        this.props.lastName === nearerViewDetailsEach.lastName &&
                        this.props.points === nearerViewDetailsEach.points
                        ? "#ABADD0"
                        : "none",
                    color:
                      this.props.firstName ===
                        nearerViewDetailsEach.firstName &&
                        this.props.lastName === nearerViewDetailsEach.lastName &&
                        this.props.points === nearerViewDetailsEach.points
                        ? "white"
                        : "#303030",
                  }}
                >
                  <div style={styles.DetailsDiv}>
                    <div style={styles.Profileimage}>
                      <img
                        src={nearerViewDetailsEach.profilePicture || DefaultPic}
                        onError={(e)=>{e.target.onerror = null; e.target.src=DefaultPic}}
                        style={styles.profilePicture}
                        alt='profilePic2'
                      />
                    </div>
                    <div style={styles.Name_designation}>
                      <div style={styles.name}>
                        <b>
                          {(nearerViewDetailsEach.firstName
                            ? nearerViewDetailsEach.firstName + " "
                            : "") +
                            (nearerViewDetailsEach.middleName
                              ? nearerViewDetailsEach.middleName.charAt(0) + " "
                              : "") +
                            (nearerViewDetailsEach.lastName
                              ? nearerViewDetailsEach.lastName.charAt(0) + " "
                              : "")}

                          {nearerViewDetailsEach.name}
                        </b>
                      </div>
                      <div
                        style={{
                          font: " 12px/14px Open Sans Regular",
                          color:
                            this.props.firstName ===
                              nearerViewDetailsEach.firstName &&
                              this.props.lastName ===
                              nearerViewDetailsEach.lastName &&
                              this.props.points === nearerViewDetailsEach.points
                              ? "white"
                              : "#8E8E8E",
                        }}
                      >
                        {nearerViewDetailsEach.designation}
                      </div>
                    </div>
                    <div
                      style={{
                        margin: "5px",
                        paddingRight: "15px",
                        flex: "0.3",
                        display: "flex",
                        justifyContent: "flex-end",
                        font: " 14px/24px Open Sans SemiBold",
                        color:
                          this.props.firstName ===
                            nearerViewDetailsEach.firstName &&
                            this.props.lastName ===
                            nearerViewDetailsEach.lastName &&
                            this.props.points === nearerViewDetailsEach.points
                            ? "white"
                            : "#767676",
                      }}
                    >
                      {nearerViewDetailsEach.points}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        {this.props.leaderboardNearerViewArray.length === 0 && (
          <div style={styles.Details}>There are no records</div>
        )}
      </div>
    );
  }
}
