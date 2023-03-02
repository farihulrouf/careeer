import React from "react";
import "../../../../assets/css/slider.css";

const styles = {
  SkillAndRatingContainer: {
    minHeight: "65px",
    width: "100%",
    marginBottom: "14px",
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
    marginBottom: "8px",
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
    marginRight: "3px",
  },
  IntermediateRatingSlider: {
    flex: 3,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
  },
  ExpertRatingSlider: {
    flex: 3,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    marginLeft: "3px",
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
    paddingTop: "1.5%",
    justifyContent: "flex-end",
  },
};
class SkillRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  componentDidMount() {
    this.setState({ value: this.props.value ? this.props.value : 0 });
  }

  outputUpdate = (e) => {
    this.setState(
      {
        value: parseInt(e.target.value, 10),
      },
      () => this.props.rateHandler(parseInt(this.state.value, 10))
    );
  };
  render() {
    return (
      <div style={styles.SkillAndRatingContainer}>
        <div
          style={{
            fontSize: "14px",
            flex: 0.8,
            fontFamily: "Open Sans Regular",
            padding: "10px 0 0 0",
          }}
        >
          {this.props.skills}
        </div>
        <div style={styles.RatingSliderContainer}>
          <div style={styles.RatingNumbersContainer}>
            <div style={{ flex: 3.6, paddingLeft: "16px" }}>
              {this.state.value !== 0 ? "0" : ""}
            </div>
            <div style={{ flex: 2.7 }}>{this.state.value !== 4 ? 4 : ""}</div>
            <div style={{ flex: 3, display: "flex" }}>
              <div style={{ flex: 0.93 }}>
                {this.state.value !== 7 ? 7 : ""}
              </div>
              <div>{this.state.value !== 10 ? 10 : ""}</div>
            </div>
          </div>
          <div style={styles.RatingSliderHolder}>
            <div style={styles.RatingSlider}>
              <div style={styles.StartingPoint}></div>
              <div style={styles.BeginnerRatingSlider}>
                {[0, 1, 2, 3].map((item, index) => {
                  return (
                    <div
                      key={item}
                      style={{ background: "#ACAED8", width: "24%" }}
                    ></div>
                  );
                })}
              </div>
              <div style={styles.IntermediateRatingSlider}>
                {[0, 1, 2].map((item, index) => {
                  return (
                    <div
                      key={item}
                      style={{ background: "#FFB97D", width: "32%" }}
                    ></div>
                  );
                })}
              </div>
              <div style={styles.ExpertRatingSlider}>
                {[0, 1, 2].map((item, index) => {
                  return (
                    <div
                      key={item}
                      style={{ background: "#96ACF9", width: "32%" }}
                    ></div>
                  );
                })}
              </div>

              <div style={styles.EndPoint}></div>
            </div>
            <div
              style={{
                width: "100.5%",
                height: "100%",
                position: "relative",
                bottom: "18px",
                left:
                  this.state.value < 1
                    ? "7px"
                    : this.state.value < 3
                    ? "5px"
                    : this.state.value < 4
                    ? "2px"
                    : this.state.value < 7
                    ? "-4px"
                    : this.state.value <= 9
                    ? "-8px"
                    : this.state.value > 9
                    ? "-15px"
                    : "",
              }}
            >
              <input
                type="range"
                min={0}
                max={10}
                value={this.state.value}
                onChange={this.outputUpdate}
                className="slider"
              />
              <output
                id="volume"
                style={{
                  position: "absolute",
                  left:
                    this.state.value * 10 === 0
                      ? "1.5%"
                      : this.state.value * 10 < 30
                      ? this.state.value * 10 + 1 + "%"
                      : this.state.value * 10 > 90
                      ? this.state.value * 10 - 2.5 + "%"
                      : this.state.value * 10 > 60
                      ? this.state.value * 10 - 1 + "%"
                      : this.state.value * 10 >= 30
                      ? this.state.value * 10 + "%"
                      : "",
                  bottom: "8px",
                  fontSize: "0.7em",
                }}
              >
                {this.state.value}
              </output>
            </div>
          </div>
        </div>
        <div style={styles.SkillResultContainer}>
          <div
            style={{
              height: "30px",
              width: "40px",
              marginbottom: "20%",
              letterSpacing: "1px",
              fontSize: "0.8em",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              borderRadius: "2px",
              background:
                this.state.value <= 4
                  ? "#ACAED8"
                  : this.state.value > 7
                  ? "#96ACF9"
                  : "#FFB97D",
            }}
          >
            {this.state.value}/10
          </div>
        </div>
      </div>
    );
  }
}
export default SkillRating;
