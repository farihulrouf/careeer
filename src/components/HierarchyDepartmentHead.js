import React from "react";
import styled from "styled-components";
import DefaultImage from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0px 2px 7px #0000002e;
  background: #ffffff;
  border-radius: 10px;
  height: inherit;
  letter-spacing: 0.01em;
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
    margin-top: 4px;
    font-family: "Open Sans Regular";
    color: #767676;
    font-size: 0.88em;
  }
`;
const HierarchyTeamHead = (props) => {
  return (
    <Div>
      <img
        src={props.headData.profilePic || DefaultImage}
        id="profilePicture"
        alt="profile_pic"
      />
      <div className="profileContainer">
        <div className="title">
          {(props.headData.firstName || "") +
            " " +
            `${props.headData.middleName || ""}` +
            " " +
            (props.headData.lastName || "") || ""}
        </div>
        <div className="subtitle">{props.headData.designationTitle || ""}</div>
      </div>
    </Div>
  );
};

export default HierarchyTeamHead;
