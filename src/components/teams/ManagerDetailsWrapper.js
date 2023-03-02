import React from "react";
import styled from "styled-components";
import Button from "../Button";
import DefaultPic from "../../assets/images/defaultProfile.svg";
import { COLORS } from "../../theme";
const Div = styled.div`
  display: flex;
  font-family: "Open Sans Regular";
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: #ffffff;
  height: inherit;
  letter-spacing: 0.01em;
  .manager-profile-card {
    box-shadow: 0px 2px 5px #0000003b;
    border-radius: 10px;
    padding: 8% 0;
    width: 80%;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
  }
  #profilePicture {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin: 0 8% 4% 8%;
    background: ${COLORS.GREY_T_96};
  }
  .profileContainer {
    line-height: 13px;
    padding-top: 2px;
  }
  .title {
    font-family: "Open Sans Semibold";
    font-size: 1em;
    color: #303030;
  }
  .subtitle {
    color: #767676;
    font-size: 0.86em;
    margin-top:3%;
  }
  .deptSubTitle {
    color: #767676;
    font-size: 1em;
    margin-bottom: 5px;
    margin-top: 15px;
  }
  .numberDisplay {
    font-family: "Open Sans Semibold";
    font-size: 1.429em;
    color: #303030;
  }
`;
const ManagerDetailsWrapper = (props) => {
  return (
    <Div>
      <div className="manager-profile-card">
        <div style={{ flex: 1 }}>
          <img
            src={props.headData.profilePicture || DefaultPic}
            id="profilePicture"
            alt="profile_pic"
          />
        </div>
        <div className="profileContainer ">
          <div className="title">
            {(props.headData.firstName || "") +
              " " +
              `${props.headData.middleName || ""}` +
              " " +
              (props.headData.lastName || "") || ""}
          </div>
          <div className="subtitle">
            {props.headData.designationTitle || ""}
          </div>
        </div>
      </div>
      <div className="deptSubTitle">Number of People</div>
      <div className="numberDisplay">{props.teamMembersCount || 0}</div>
      <div
        onClick={props.openDrawer}
        style={{ width: "100%", marginTop: "10%" }}
      >
        <Button
          label="Add Employee"
          styles={{
            color: "#FF808B",
            backgroundColor: "#FFFFFF",
            border: "#FF808B",
            height: "40px",
          }}
        />
      </div>
    </Div>
  );
};

export default ManagerDetailsWrapper;
