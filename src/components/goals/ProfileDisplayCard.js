import React from "react";
import styled from "styled-components";
import DefaultPic from "../../assets/images/defaultProfile.svg";
import { COLORS } from "../../theme";
const Div = styled.div`
  display: flex;
  align-items: center;
  height: 13.286em;
  padding: 0 0.875em;
  width: 100%;
  text-align: center;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.153) 1px 4px 12px;
  border-radius: 8px;
  flex-direction: column;
  line-height: 1.4em;
  font-size: 0.875em;
  cursor: default;
  color: #303030;
  min-width: 10em;
  &:hover {
    transition: 0.5s;
    box-shadow: 1px 4px 12px #12121254;
  }

  .user-image {
    height: 5em;
    width: 5em;
    border-radius: 50%;
    margin-top: 1.5em;
    margin-bottom: 0.675em;
    background: ${COLORS.GREY_T_96};
  }
`;

const profileDisplayCard = (props) => {
  return (
    <Div>
      <img
        src={props.profilePicture || DefaultPic}
        alt="pic"
        className="user-image"
      />
      <div>
        {(props.firstName || "") +
          " " +
          `${props.middleName || ""}` +
          " " +
          (props.lastName || "")}
      </div>
      <div style={{ color: "#767676" }}>{props.designation}</div>
    </Div>
  );
};

export default profileDisplayCard;
