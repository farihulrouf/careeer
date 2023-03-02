import React from "react";
import "../../../../assets/css/slider.css";
import SkillsRating from "./skillRateSlider.js";

const styles = {
  MainCntainer: {
    height: "100%",
    width: "100%",
  },
  Title: {
    fontSize: "24px",
    fontFamily: "Open Sans SemiBold",
  },
  SubTitle: {
    fontSize: "16px",
    fontFamily: "Open Sans Regular",
  },
};

class SkillsRatingFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      skillRates: [],
      rating: 0,
      skillsKeys: this.props.skillsComponent,
      skills: this.props.skills,
    };
  }
  outputUpdate = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    let { skills, skillsKeys } = this.state;
    return (
      <div style={styles.MainCntainer}>
        <div style={{ marginBottom: "40px" }}>
          <div style={styles.Title}>Rate your skills </div>
          <div style={styles.SubTitle}>
            You will be evaluated based on your skills rating.
          </div>
        </div>
        <div
          style={{
            height: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            paddingLeft: "4%",
            fontSize: "14px",
          }}
        >
          {[0, 1, 2].map((items, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.8em",
                  fontFamily: "Open Sans Regular",
                }}
              >
                <div
                  style={{
                    background:
                      index === 0
                        ? "#ACAED8"
                        : index === 1
                        ? "#FFB97D"
                        : "#96ACF9",
                    height: "15px",
                    width: "15px",
                    marginRight: "6px",
                    borderRadius: "100%",
                  }}
                ></div>
                <label>
                  {index === 0
                    ? "Beginner"
                    : index === 1
                    ? "Intermediate"
                    : "Expert"}
                </label>
              </div>
            );
          })}
        </div>
        {skillsKeys &&
          skillsKeys.map((eachKey, index) => {
            return skills[eachKey.fieldName].length && !eachKey.hidden ? (
              <div style={{ width: "100%", marginTop: "30px" }} key={index}>
                <div
                  style={{
                    marginBottom: "10px",
                    fontFamily: "Open Sans SemiBold",
                    fontSize: "16px",
                  }}
                >
                  {eachKey.title}
                </div>
                {skills[eachKey.fieldName].map((eachSkill, id) => (
                  <SkillsRating
                    key={id}
                    value={eachSkill.selfRating || 0}
                    skills={eachSkill.name}
                    rateHandler={(selfRating) =>
                      this.props.handleSkillRatingSlider(
                        selfRating,
                        eachKey.fieldName,
                        id
                      )
                    }
                  />
                ))}
              </div>
            ) : null;
          })}
      </div>
    );
  }
}
export default SkillsRatingFlow;
