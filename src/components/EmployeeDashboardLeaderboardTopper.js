import React, { Component } from "react";
import styled from "styled-components";
import star from "../assets/images/star.svg";
import medal from "../assets/images/medal.svg";
import DefaultPic from "../assets/images/defaultProfile.svg";
import "../assets/css/PoppinsFont.css";
import { COLORS } from "../theme";
const Div = styled.div`
  display: flex;
  position: relative;
  .rank-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: Open Sans Regular;
  }
  .third-rank {
    width: 55%;
    height: 2.31em;
    background: linear-gradient(#938db1, #9d9fbf, #a8aacc);
    transform: perspective(2px) rotateX(-1deg) scaleX(1.6);
    position: relative;
    z-index: 1;
    rigth: -7%;
  }
  .second-rank {
    width: 90%;
    height: 3.33em;
    background: linear-gradient(#938db1, #9d9fbf, #a8aacc);
    transform: perspective(5px) rotateX(-1deg) scaleX(1.3);
    position: relative;
    z-index: 1;
    left: 32%;
  }
  .first-rank {
    width: 100%;
    height: 4.9em;
    background: linear-gradient(#938db1, #9d9fbf, #a8aacc);
    transform: perspective(4px) rotateX(-1deg) scaleY(1.12);
    position: relative;
    z-index: 2;
  }
  .ranker-center-text {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 600;
  }
  .second-rank-text {
    font-family: "Poppins-Italic";
    font-size: 2.3em;
    margin-right: 14px;
  }
  .first-rank-text {
    font-family: "Poppins-Italic";
    font-size: 3.6em;
  }
  .third-rank-text {
    font-family: "Poppins-Italic";
    font-size: 1.5em;
    margin-left: 12px;
  }
  .profile-pic {
    height: 3em;
    width: 3em;
    border: 2px solid #e4e4e4;
    border-radius: 50%;
    margin-bottom: 10px;
    background: ${COLORS.GREY_T_96};
  }
  .profile-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .points-container {
    width: 81%;
    height: 25px;
    border-radius: 20px;
    background: #ff8c96;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.78em;
    color: #ffffff;
    padding: 0 10px;
    margin-top: 20px 0;
  }
  .points {
    height: 10px;
    background: #fff;
    border-radius: 50%;
    padding: 3px;
    margin-right: 4px;
  }
  .points-badges {
    display: flex;
    margin-right: 10px;
    align-items: center;
  }
  .second-profile-rank {
    position: relative;
    margin-right: 20px;
  }
  .third-profile-container {
    position: relative;
    margin-left: 20px;
  }
  .first-rank-profile-container {
    margin-bottom: 30px;
  }
  .badgesSpan {
    margin-right: 15px;
  }
`;
class EmployeeDashboardLeaderBoardTopper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankData: [],
    };
  }
  render() {
    const rankData = this.props.rankData;
    let index0 = this.props.rankData.findIndex(({ rank }) => rank === 2);
    let index1 = this.props.rankData.findIndex(({ rank }) => rank === 1);
    let index2 = this.props.rankData.findIndex(({ rank }) => rank === 3);
    return (
      <Div>
        <div className="rank-container ">
          <div
            className="profile-container second-profile-rank"
            style={{ visibility: rankData[index0] ? "visible" : "hidden" }}
          >
            <img
              src={
                (rankData[index0] && rankData[index0].profilePicture) ||
                DefaultPic
              }
              alt="profile"
              className="profile-pic"
            />
            <div>
              {((rankData[index0] && rankData[index0].firstName) || "") +
                " " +
                ((rankData[index0] && rankData[index0].lastName.charAt(0)) ||
                  "")}
            </div>
            <div className="points-container">
              <div className="points-badges">
                <img src={star} alt="points" className="points" />
                <span>{rankData[index0] && rankData[index0].points}</span>
              </div>
              <div className="points-badges">
                <img src={medal} alt="badges" className="points" />
                <span className="badgesSpan">
                  {rankData[index0] && rankData[index0].badges}
                </span>
              </div>
            </div>
          </div>
          <div className="second-rank ranker-center-text">
            <span className="second-rank-text"> 2</span>
          </div>
        </div>
        <div className="rank-container ">
          <div
            className="profile-container first-rank-profile-container"
            style={{ visibility: rankData[index1] ? "visible" : "hidden" }}
          >
            <img
              src={
                (rankData[index1] && rankData[index1].profilePicture) ||
                DefaultPic
              }
              alt="profile"
              className="profile-pic"
            />
            <div>
              {((rankData[index1] && rankData[index1].firstName) || "") +
                " " +
                ((rankData[index1] && rankData[index1].lastName.charAt(0)) ||
                  "")}
            </div>
            <div className="points-container">
              <div className="points-badges">
                <img src={star} alt="points" className="points" />
                <span>{rankData[index1] && rankData[index1].points}</span>
              </div>
              <div className="points-badges">
                <img src={medal} alt="badges" className="points" />
                <span className="badgesSpan">
                  {rankData[index1] && rankData[index1].badges}
                </span>
              </div>
            </div>
          </div>
          <div className="first-rank ranker-center-text">
            <span className="first-rank-text"> 1</span>
          </div>
        </div>
        <div className="rank-container ">
          <div
            className="profile-container third-profile-container"
            style={{ visibility: rankData[index2] ? "visible" : "hidden" }}
          >
            <img
              src={
                (rankData[2] && rankData[index2].profilePicture) || DefaultPic
              }
              alt="profile"
              className="profile-pic"
            />
            <div>
              {((rankData[index2] && rankData[index2].firstName) || "") +
                " " +
                ((rankData[index2] && rankData[index2].lastName.charAt(0)) ||
                  "")}
            </div>
            <div className="points-container">
              <div className="points-badges">
                <img src={star} alt="points" className="points" />
                <span>{rankData[index2] && rankData[index2].points}</span>
              </div>
              <div className="points-badges">
                <img src={medal} alt="badges" className="points" />
                <span className="badgesSpan">
                  {rankData[index2] && rankData[index2].badges}
                </span>
              </div>
            </div>
          </div>
          <div className="third-rank ranker-center-text">
            <span className="third-rank-text"> 3</span>
          </div>
        </div>
      </Div>
    );
  }
}

export default EmployeeDashboardLeaderBoardTopper;
