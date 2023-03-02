import React, { Component } from "react";
import DisplayPicture from "../../../../../components/DisplayPicture";
import Star from "../../../../../assets/images/star.svg";
import Medal from "../../../../../assets/images/medal-big.svg";
import Favorites from "../../../../../assets/images/Favorite.svg";
import nonFavorites from "../../../../../assets/images/nonFavorite.svg";
class TableRow extends Component {
  render() {
    return (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          minHeight: 58,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "Open Sans Regular",
          fontSize: "0.875em",
          color: "#303030",
          background: "#FFFFFF",
          borderRadius: "4px",
        }}
      >
        <tr style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
            <div
              style={{
                flex: 0.25,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  height: 34,
                  width: 34,
                  marginRight: "20%",
                }}
              >
                <DisplayPicture profile={this.props.profilePicture} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ flex: 1, marginBottom: "1%" }}>
                {this.props.firstName ? this.props.firstName + " " : ""}
                {this.props.middleName ? this.props.middleName + " " : ""}
                {this.props.lastName ? this.props.lastName : ""}
              </div>
              <div style={{ fontSize: "0.858em", color: "#767676" }}>
                {this.props.designation}
              </div>
            </div>
          </td>
          <td style={{ flex: 0.6 }}>{this.props.department}</td>
          <td style={{ flex: 0.58, display: "flex", alignItems: "center" }}>
            <img
              src={Star}
              alt="star"
              style={{ height: 18, width: 18, marginRight: 8 }}
            />
            <div>{this.props.points}</div>
          </td>
          <td style={{ flex: 0.5, display: "flex", alignItems: "center" }}>
            <img
              src={Medal}
              alt="star"
              style={{ height: 18, width: 18, marginRight: 8 }}
            />
            <div>{this.props.badges}</div>
          </td>
          <td style={{ flex: 0.65, display: "flex", alignItems: "center" }}>
            {this.props.rewards && this.props.rewards.length
              ? this.props.rewards.map((ele, id) => (
                  <div key={id}>
                    {id <= 3 ? (
                      <img
                        src={ele.imageUrl}
                        alt="reward"
                        style={{ height: 26, width: 26, marginRight: 8 }}
                      />
                    ) : (
                      id === 4 && (
                        <div>+{this.props.rewards.length - id + " more"}</div>
                      )
                    )}
                  </div>
                ))
              : "No Rewards"}
          </td>
          {this.props.userRole === "employee" && (
            <td
              style={{
                flex: 0.25,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={this.props.isFavourite ? Favorites : nonFavorites}
                alt="heart"
                onClick={() =>
                  this.props.onClickFavorite(
                    this.props.employeeId,
                    !this.props.isFavourite
                  )
                }
                style={{ height: 20, width: 22, cursor: "pointer" }}
              />
            </td>
          )}
        </tr>
      </table>
    );
  }
}

export default TableRow;
