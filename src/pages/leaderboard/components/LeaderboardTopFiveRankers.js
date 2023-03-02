import React, { Component } from "react";
import styled from "styled-components";
import "../../../assets/css/PoppinsFont.css";
import star from "../../../assets/images/star.svg";
import medal from "../../../assets/images/medal.svg";
import DefaultPic from "../../../assets/images/defaultProfile.svg";
import { message, Empty } from "antd";
import { COLORS } from "../../../theme";
import { decryptData } from "../../../utils/encryptDecrypt";
import { getLeaderboardTopFiveRanks } from "../../../core/apiClient/leaderboard/leaderboardClient";
const TopFiveWrapper = styled.div`
  display: flex;
  position: relative;
  font-size: 16px;
  width: 100%;
  margin-bottom: 5%;
`;

const RankContainer = styled.div`
  flex: ${(props) => (props.rankPosition === 1 ? "0.57" : "1")};
  display: flex;
  flex-direction: column;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  .leaderboard-ranker-label-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
  .leaderboard-rank-text {
    font-size: ${(props) =>
      props.rankPosition === 1
        ? "3.6em"
        : props.rankPosition < 4
        ? "2.4em"
        : "1.8em"};
    font-family: "Poppins-SemiBoldItalic";
  }

  .leaderboard-profile-pic {
    height: 5.35vw;
    width: 5.35vw;
    border: 2px solid #e4e4e4;
    background: ${COLORS.GREY_T_96};
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .leaderboard-profile-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: ${(props) => (props.rankPosition === 1 ? "35px" : "20px")};
    position: relative;
    right: ${(props) =>
      props.rankPosition === 1
        ? "8%"
        : props.rankPosition % 2 === 0
        ? (props.rankPosition % 3) * 13 + "%"
        : props.rankPosition * 10 - 38 + "%"};
  }
  .leaderboard-points-container {
    width: ${(props) => (props.rankPosition === 1 ? "105%" : "61%")};
    height: 33px;
    border-radius: 20px;
    background: #ff8c96;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9em;
    color: #ffffff;
    padding: 0 10px;
    margin-top: 5%;
  }
  .points {
    height: 20px;
    background: #fff;
    border-radius: 50%;
    padding: 3px;
    margin-right: 4px;
  }
  .points-badges {
    display: flex;
  }

  .leaderboard-rank {
    width: 100%;
    height: ${(props) =>
      props.rankPosition === 1
        ? "5.57em"
        : props.rankPosition <= 3
        ? "3.93em"
        : "2.63em"};
    background: linear-gradient(#86819f, #a2a4cc, #bbbcd7);
    transform: ${(props) =>
      props.rankPosition === 1
        ? " perspective(5px) rotateX(-1deg) scaleY(1.1999)"
        : props.rankPosition <= 3
        ? " perspective(6px) rotateX(-1deg) scaleY(1.12)"
        : " perspective(6px) rotateX(-1deg) scaleY(1.09)"};
    position: relative;
    z-index: ${(props) => 5 - props.rankPosition};
    left: ${(props) =>
      props.rankPosition !== 1 && props.rankPosition % 2 === 0
        ? props.rankPosition * 10 - 13 + "%"
        : "-" + props.rankPosition * 10 + "%"};
  }
`;

class LeaderboardTopFiveRankers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topFiveList: [
        { rank: 4 },
        { rank: 2 },
        { rank: 1 },
        { rank: 3 },
        { rank: 5 },
      ],
      topFiveResponse: [],
    };
  }

  componentDidMount() {
    this.loadTopFiveRanks();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.linkStatus !== this.props.linkStatus ||
      prevProps.referenceId !== this.props.referenceId
    ) {
      this.loadTopFiveRanks();
    }
  }

  async loadTopFiveRanks() {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getLeaderboardTopFiveRanks(
          orgId,
          employeeId,
          this.props.scopeType,
          this.props.referenceId,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let format = [
            { rank: 4 },
            { rank: 2 },
            { rank: 1 },
            { rank: 3 },
            { rank: 5 },
          ];
          let topFiveResponse = response.data;
          if (topFiveResponse.length) {
            for (let i = 0; i < format.length; i++) {
              for (let j = 0; j < format.length; j++) {
                if (
                  topFiveResponse[i] &&
                  topFiveResponse[i].hasOwnProperty("rank") &&
                  topFiveResponse[i].rank === format[j].rank
                ) {
                  format[j] = topFiveResponse[i];
                  break;
                }
              }
            }
            this.setState({ topFiveList: format });
          }
          this.setState({ topFiveResponse });
        }
      } catch (error) {
        console.log(error);
        message.error("Unable to fetch details, please try after sometime");
      }
      document.toggleLoading();
    }
  }

  render() {
    return (
      <>
        {this.state.topFiveResponse.length > 0 ? (
          <TopFiveWrapper>
            {this.state.topFiveList.map((eachEmp, empIndex) => (
              <RankContainer
                key={empIndex}
                rankPosition={eachEmp.rank}
                isVisible={eachEmp.hasOwnProperty("firstName")}
              >
                <div className="leaderboard-profile-container ">
                  <img
                    src={eachEmp.profilePicture || DefaultPic}
                    alt="profile"
                    className="leaderboard-profile-pic"
                  />
                  <div>
                    {(eachEmp.firstName || "") +
                      " " +
                      ((eachEmp.lastName && eachEmp.lastName.substr(0, 1)) ||
                        "")}
                  </div>
                  <div className="leaderboard-points-container">
                    <div className="points-badges">
                      <img src={star} alt="points" className="points" />
                      <span>{eachEmp.points || 0}</span>
                    </div>
                    <div className="points-badges">
                      <img src={medal} alt="badges" className="points" />
                      <span>{eachEmp.badges || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="leaderboard-rank leaderboard-ranker-label-container">
                  <span className="leaderboard-rank-text">{eachEmp.rank}</span>
                </div>
              </RankContainer>
            ))}
          </TopFiveWrapper>
        ) : (
          <div>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </>
    );
  }
}

export default LeaderboardTopFiveRankers;
