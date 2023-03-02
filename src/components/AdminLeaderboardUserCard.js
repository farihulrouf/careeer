import React from "react";
import styled from "styled-components";
import DefaultPic from "../assets/images/defaultProfile.svg";

const Div = styled.div`
  #leaderboard-user-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2em;
    padding-top: 10px;
  }
  #leaderboard-user-image {
    height: 3.375em;
    width: 3.375em;
    border-radius: 50%;
  }
  #leaderboard-user-score-container {
    display: flex;
    text-align: center;
    justify-content: space-evenly;
    padding-bottom: 0.4em;
    line-height: 1.2em;
  }
  #leaderboard-title {
    font-size: 0.875em;
    color: #252525;
    padding-top: 0.4em;
  }
  .leaderboard-subTitle {
    font-size: 0.75em;
    color: #767676;
    text-transform: capitalize;
  }
  .leaderboard-numberLabel {
    font-family: Open Sans Semibold;
    color: #303030;
    font-size: 0.875em;
  }
  &:hover {
    box-shadow: 0px 4px 18px #04040454;
  }
`;

const adminLeaderbordUserCard = (props) => {
  const user = props.cardDetails;
  return (
    <Div>
      <div id="leaderboard-user-container">
        <img
          src= {user.profilePicture || DefaultPic} onError={(e)=>{e.target.onerror = null; e.target.src=DefaultPic}}
          id="leaderboard-user-image"
          alt="pic"
        />
        <div id="leaderboard-title">
          {(user.firstName || "") +
            " " +
            `${user.middleName || ""} ` +
            (user.lastName.substring(0, 1) || "")}
        </div>
        <div className="leaderboard-subTitle">{user.designation || ""}</div>
      </div>
      <div id="leaderboard-user-score-container">
        <div>
          <div className="leaderboard-numberLabel">{user.points || 0}</div>
          <div className="leaderboard-subTitle">Points</div>
        </div>
        <div>
          <div className="leaderboard-numberLabel">{user.badges || 0}</div>
          <div className="leaderboard-subTitle">Badges</div>
        </div>
      </div>
    </Div>
  );
};

export default adminLeaderbordUserCard;
