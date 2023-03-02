import React from "react";
import "../../css/slider.css";

const styles = {
  SkillAndRatingContainer: {
    minHeight: "65px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  RatingSliderContainer: {
    flex: 4,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  RatingNumbersContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "0.7em",
    marginBottom: "16px",
  },
  RatingSliderHolder: {
    width: "100%",
    height: "4px",
  },
  RatingSlider: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  StartingPoint: {
    height: "14px",
    width: "14px",
    background: "black",
    border: "2px solid #FFFFFF",
    borderRadius: "100px",
    boxShadow: "0 1px 3px 0px #64b5fa",
    position: "relative",
    bottom: "6px",
    left: "10px",
  },
  BeginnerRatingSlider: {
    flex: 4,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    background: "#96ACF9",
  },
  IntermediateRatingSlider: {
    flex: 3,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    background: "#96ACF9",
  },
  ExpertRatingSlider: {
    flex: 3,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    background: "#96ACF9",
  },
  OneTOFourRating: {
    height: "100%",
    background: "#ACAED8",
    width: "9.1%",
  },
  FiveToSevenRating: {
    height: "100%",
    background: "#FFB97D",
    width: "9.1%",
  },
  EightToTenRating: {
    height: "100%",
    background: "#96ACF9",
    width: "9.1%",
  },
  EndPoint: {
    height: "14px",
    width: "14px",
    background: "black",
    border: "2px solid #FFFFFF",
    borderRadius: "100px",
    boxShadow: "0 1px 3px 0px #64b5fa",
    position: "relative",
    bottom: "6px",
    right: "12px",
  },
  SkillResultContainer: {
    flex: 0.4,
    height: "100%",
    display: "flex",
    paddingTop: "3%",
    justifyContent: "flex-end",
  },
};
class PerformanceRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  componentDidMount() {
    this.setState({ value: this.props.percentage ? this.props.percentage : 0 });
  }

  outputUpdate = (e) => {
    this.setState(
      {
        value: e.target.value,
      },
      () =>
        this.props.rateHandler(
          parseInt(this.props.goalCompletionPercentage, 10)
        )
    );
  };
  render() {
    const goalPercentage = parseInt(this.props.goalCompletionPercentage, 10);
    return (
      <div style={styles.SkillAndRatingContainer}>
        <div style={styles.RatingSliderContainer}>
          <div style={styles.RatingNumbersContainer}>
            <div style={{ flex: 3.4, paddingLeft: "16px" }}>
              {goalPercentage !== 0 ? "0" : ""}
            </div>
            <div style={{ flex: 2.7 }}></div>
            <div style={{ flex: 3, display: "flex" }}>
              <div style={{ flex: 0.93 }}></div>
              <div>{goalPercentage !== 100 ? 100 : ""}</div>
            </div>
          </div>
          <div style={styles.RatingSliderHolder}>
            <div style={styles.RatingSlider}>
              <div style={styles.StartingPoint}></div>
              <div style={styles.BeginnerRatingSlider}></div>
              <div style={styles.IntermediateRatingSlider}></div>
              <div style={styles.ExpertRatingSlider}></div>

              <div style={styles.EndPoint}></div>
            </div>
            <div
              style={{
                width: "100.5%",
                height: "100%",
                position: "relative",
                bottom: "18px",
                left:
                  goalPercentage < 1
                    ? "7px"
                    : goalPercentage < 3
                    ? "5px"
                    : goalPercentage < 4
                    ? "2px"
                    : goalPercentage < 7
                    ? "-4px"
                    : goalPercentage <= 9
                    ? "-8px"
                    : goalPercentage > 9
                    ? "-15px"
                    : "",
              }}
            >
              <input
                type="range"
                min={0}
                max={100}
                value={goalPercentage}
                onChange={(e) =>
                  this.props.rateHandler(parseInt(e.target.value, 10))
                }
                className="slider"
              />
              <output
                id="volume"
                style={{
                  position: "absolute",
                  left:
                    goalPercentage * 10 === 0
                      ? "1.5%"
                      : (goalPercentage / 10) * 10 < 30
                      ? (goalPercentage / 10) * 10 + 1 + "%"
                      : (goalPercentage / 10) * 10 > 90
                      ? (goalPercentage / 10) * 10 - 2.5 + "%"
                      : (goalPercentage / 10) * 10 > 60
                      ? (goalPercentage / 10) * 10 - 1 + "%"
                      : (goalPercentage / 10) * 10 >= 30
                      ? (goalPercentage / 10) * 10 + "%"
                      : "",
                  bottom: "8px",
                  fontSize: "0.7em",
                }}
              >
                {this.props.goalCompletionPercentage}
              </output>
            </div>
          </div>
        </div>
        <div style={styles.SkillResultContainer}>
          <div
            style={{
              height: "30px",
              width: "60px",
              letterSpacing: "1px",
              fontSize: "0.8em",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              borderRadius: "2px",
              background: "#96ACF9",
            }}
          >
            {this.props.goalCompletionPercentage}/100
          </div>
        </div>
      </div>
    );
  }
}
export default PerformanceRating;
