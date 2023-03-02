import React from "react";
import styled from "styled-components";

const Div = styled.div`
height: 60px;
width:100%;
display: grid;
grid-template-columns: 1fr 2fr 0.3fr;
align-items: center;
font-family:Open Sans Regular;
color:inherit;

  .range-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    background: #00000000;
    outline: none;
    opacity: 1;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    padding-bottom: 5px;
    &:hover {
        opacity: 1;
    }
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width:${(props) =>
              (props.rangeStyle && props.rangeStyle.width) || "20px"} ;
            height:${(props) =>
              (props.rangeStyle && props.rangeStyle.height) || "20px"} ;
            background:${(props) =>
              (props.rangeStyle && props.rangeStyle.background) || "#4d0a80"} ;
            cursor: pointer;
            border-radius: 50%;
            border:${(props) =>
              (props.rangeStyle && props.rangeStyle.border) ||
              "3px solid #fff"} ;
            padding-top: 2px;
            box-shadow: 1px 4px 10px #00000027;
          }
          &::-moz-range-thumb {
            width:${(props) =>
              (props.rangeStyle && props.rangeStyle.width) || "15px"} ;
            height:${(props) =>
              (props.rangeStyle && props.rangeStyle.height) || "15px"} ;
            background:${(props) =>
              (props.rangeStyle && props.rangeStyle.background) || "#4d0a80"} ;
            cursor: pointer;
            border-radius: 50%;
          }
  


`;

class ManagerFeedbackItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  outputUpdate = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const skill = this.props.skillRatingDetails;
    const ratingValue = parseInt(this.state.value, 10);
    const skillRating = skill && parseInt(skill.rating, 10);
    return (
      <Div rangeStyle={this.props.rangeStyle} style={this.props.style || null}>
        <div style={{ fontSize: "0.875em" }}>{skill.name || ""}</div>
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: " 0 3% 3% 0%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              fontSize: "0.7em",
              paddingBottom: "8px",
              color: "#828282",
            }}
          >
            <div style={{ flex: 3.8, paddingLeft: "0.2%" }}>
              {ratingValue || skillRating !== 0 ? "0" : ""}
            </div>
            <div style={{ flex: 2.7 }}>
              {ratingValue || skillRating !== 4 ? "" : ""}
            </div>
            <div style={{ flex: 3, display: "flex" }}>
              <div style={{ flex: 1 }}>
                {ratingValue || skillRating !== 7 ? "" : ""}
              </div>
              <div>{ratingValue || skillRating !== 10 ? "10" : ""}</div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "2px",
              paddingBottom: "14px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "3px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  background: "black",
                  borderRadius: "100px",
                  position: "relative",
                  bottom: " 5px",
                  border: "2px solid #fff",
                  boxShadow: "1px 4px 8px #ccc",
                }}
              ></div>
              {[1, 2, 3, 4].map((item) => {
                return (
                  <div
                    key={item + 10}
                    style={{
                      height: "100%",
                      background:
                        (this.props.sliderBackgroundStyle &&
                          this.props.sliderBackgroundStyle.background) ||
                        "#65B5FA",
                      width: "8.5%",
                    }}
                  ></div>
                );
              })}
              {[1, 2, 3].map((item) => {
                return (
                  <div
                    key={item + 100}
                    style={{
                      height: "100%",
                      background:
                        (this.props.sliderBackgroundStyle &&
                          this.props.sliderBackgroundStyle.background) ||
                        "#FA8585",
                      width: "8.5%",
                    }}
                  ></div>
                );
              })}
              {[1, 2, 3].map((item) => {
                return (
                  <div
                    key={item * 6}
                    style={{
                      height: "100%",
                      background:
                        (this.props.sliderBackgroundStyle &&
                          this.props.sliderBackgroundStyle.background) ||
                        "#F55B96",
                      width: "8.5%",
                    }}
                  ></div>
                );
              })}
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  background: "black",
                  borderRadius: "50%",
                  position: "relative",
                  bottom: " 5px",
                  border: "2px solid #fff",
                  boxShadow: "1px 4px 8px #ccc",
                }}
              ></div>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                bottom: "15px",
                right: ratingValue || skillRating < 5 ? "6px" : "0px",
              }}
            >
              <input
                type="range"
                min={0}
                max={10}
                value={ratingValue || skill.rating}
                onChange={this.props.sliderChangeHandler || this.outputUpdate}
                className="range-slider"
              />
              <output
                id="volume"
                style={{
                  position: "absolute",
                  left:
                    ratingValue || skillRating * 10 === 0
                      ? "2%"
                      : ratingValue || skillRating * 10 <= 30
                      ? ratingValue || skillRating * 10 + 1 + "%"
                      : ratingValue || skillRating * 10 > 90
                      ? ratingValue || skillRating * 10 - 3 + "%"
                      : ratingValue || skillRating * 10 === 60
                      ? ratingValue || skillRating * 10 - 1 + "%"
                      : ratingValue || skillRating * 10 > 60
                      ? ratingValue || skillRating * 10 - 2 + "%"
                      : ratingValue || skillRating * 10 > 30
                      ? ratingValue || skillRating * 10 + "%"
                      : "",
                  bottom: "4px",
                  fontSize: "0.7em",
                }}
              >
                {ratingValue || skillRating}
              </output>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "55.34%",
            width: "3.25em",
            fontSize: "0.8em",
            fontFamily: "Open Sans Semibold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifySelf: "end",
            color: "#FFFFFF",
            borderRadius: "2px",
            boxShadow: "1px 1px 6px #66666627",
            background:
              skillRating <= 0
                ? "#D3D3D3"
                : (this.props.sliderBackgroundStyle &&
                    this.props.sliderBackgroundStyle.background) ||
                  "#65B5FA",
          }}
        >
          {ratingValue || skillRating}/10
        </div>
      </Div>
    );
  }
}
export default ManagerFeedbackItem;
