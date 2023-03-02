import React, { Component } from "react";
import styled from "styled-components";
import ManagerEmployeeGeneralFeedbackItem from "./ManagerEmployeeGeneralFeedbackItem.js";

const Div = styled.div`
  .feedback-rating-title {
    font-family: Open Sans Semibold;
    font-size: 1em;
    color: #303030;
  }
  .feedback-rating-skills-container {
    display: grid;
    margin-bottom: 1.5em;
  }
`;

class ManagerEmployeeGeneralFeedbackList extends Component {
  state = {};
  render() {
    return (
      <Div>
        {(this.props.multipleskillRating &&
          this.props.multipleskillRating.map((skillDetails, mainIndex) => (
            <div key={skillDetails.skillTypeId || mainIndex}>
              <div className="feedback-rating-title">
                {skillDetails.skillType}
              </div>
              <div className="feedback-rating-skills-container">
                {skillDetails.skills.map((eachSkillRating, subIndex) => {
                  if (eachSkillRating.skills) {
                    return (
                      <div
                        style={{ margin: "1em 0" }}
                        key={eachSkillRating.skillTypeId || subIndex}
                      >
                        <div style={{ fontSize: "0.875em", marginTop: "1em" }}>
                          {eachSkillRating.name}
                        </div>
                        <ul>
                          {eachSkillRating.skills.map((subSkill, index) => (
                            <li
                              style={{
                                width: "100%",
                                margin: "0.875em 0",
                                color: "#767676",
                              }}
                              key={subSkill.id || index + 1}
                            >
                              <div style={{ color: "#303030", width: "100%" }}>
                                <ManagerEmployeeGeneralFeedbackItem
                                  skillRatingDetails={subSkill}
                                  sliderChangeHandler={(sliderValue) =>
                                    this.props.slideChangeHandler(
                                      sliderValue,
                                      mainIndex,
                                      index
                                    )
                                  }
                                  rangeStyle={{
                                    background: "#FF808B",
                                    border: "3px solid #fff",
                                  }}
                                  sliderBackgroundStyle={{
                                    background: "#96ACF9",
                                  }}
                                  style={{
                                    gridTemplateColumns: "0.84fr 2fr 0.3fr",
                                  }}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  } else
                    return (
                      <div
                        style={{ width: "100%", margin: "1em 0" }}
                        key={eachSkillRating.id || subIndex}
                      >
                        <ManagerEmployeeGeneralFeedbackItem
                          skillRatingDetails={eachSkillRating}
                          sliderChangeHandler={(sliderValue) =>
                            this.props.slideChangeHandler(
                              sliderValue,
                              mainIndex,
                              subIndex
                            )
                          }
                          rangeStyle={{
                            background: "#FF808B",
                            border: "3px solid #fff",
                          }}
                          sliderBackgroundStyle={{ background: "#96ACF9" }}
                        />
                      </div>
                    );
                })}
              </div>
            </div>
          ))) ||
          ""}
      </Div>
    );
  }
}

export default ManagerEmployeeGeneralFeedbackList;
