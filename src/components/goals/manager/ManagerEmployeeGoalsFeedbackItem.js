import React, { Component } from "react";
import EmployeeGoalItem from "./ManagerEmployeeGoalsItem";
import PerformanceRating from "./PerformanceRating";
import Button from "../../../components/Button";
import Info from "../../../assets/images/info.svg";
import ToolTip from "../../ToolTipComponent";
import InputField from "../../InputField";
class ManagerEmployeeGoalsFeedbackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousPercentage: this.props.goalCompletionPercentage,
    };
  }

  onInfoHover = () => {
    this.setState({ showInfo: true });
  };
  onInfoLeave = () => {
    this.setState({ showInfo: false });
  };

  render() {
    const { previousPercentage, showInfo } = this.state;
    return (
      <div
        style={{
          fontFamily: "Open Sans Regular",
          color: "#303030",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 0.3, fontSize: "0.875em" }}>Assigned Goals</div>
          <div style={{ flex: 1 }}>
            <EmployeeGoalItem {...this.props} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "0.875em",
            margin: "28px 0 10px 0",
          }}
        >
          <div style={{ flex: 0.3 }}>
            <div>Goal Status Update</div>
          </div>
          <div style={{ flex: 1, color: "#767676" }}>
            <textarea
              disabled
              value={this.props.goalStatusUpdate}
              style={{
                fontSize: "1em",
                color: "#767676",
                width: "100%",
                background: "#F7F7F751",
                border: "1px solid #E2E2E2",
                borderRadius: "4px",
                outline: "none",
                resize: "none",
                padding: "14px 0px 0px 16px",
                fontFamily: "Open Sans Regular",
              }}
              placeholder="Type here"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "0.875em",
            position: "relative",
          }}
        >
          <div
            style={{
              flex: 0.48,
              display: "flex",
              alignItems: "center",
              paddingTop: "18px",
            }}
          >
            <div>
              Completion Percentage
              <sup
                style={{
                  display:
                    this.props.goalCompletionPercentage < previousPercentage
                      ? ""
                      : "none",
                  color: " red",
                  fontSize: "1.5em",
                  top: "-4px",
                }}
              >
                *
              </sup>
            </div>
            <div style={{ margin: "0% 0 0 10px" }}>
              <img
                src={Info}
                alt="icon"
                className="feedback-info-icon"
                onMouseOver={this.onInfoHover}
                onMouseLeave={this.onInfoLeave}
                style={{
                  height: 15,
                  width: 15,
                  cursor: "pointer",
                }}
              />

              <ToolTip
                style={{
                  minWidth: 238,
                  maxWidth: "max-content",
                  minHeight: 20,
                  maxHeight: 200,
                  borderRadius: 1,
                  opacity: showInfo ? 1 : 0,
                  transition: "0.5s opacity",
                  backgroundColor: "rgb(227, 227, 251)",
                  width: "166px",
                  top: "100%",
                  left: "18.5%",
                }}
                toolTip={{ placement: "bottomLeft", width: "10px" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "inherit",
                    outline: "none",
                    padding: 4,
                    textAlign: "center",
                    fontSize: "0.955em",
                    color: "#4D4CAC",
                  }}
                >
                  Once the completion percentage is set, it cannot be reduced.
                </div>
              </ToolTip>
            </div>
          </div>
          <div style={{ flex: 1.3, marginRight: "8%" }}>
            <PerformanceRating
              {...this.props}
              rateHandler={this.props.rateHandler}
            />
          </div>
        </div>
        <div
          style={{
            opacity:
              this.props.goalCompletionPercentage < previousPercentage ? 1 : 0,
            fontSize: "0.83em",
            color: "red",
            transition: "0.5s opacity",
            margin: "1% 0 3% 23%",
          }}
        >
          Cannot reduce completion percentage than set during the previous
          feedback.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "0.875em",
            marginTop: 20,
          }}
        >
          <div style={{ flex: 0.3 }}>
            <div>
              Add Note
              <sup
                style={{
                  display: this.props.comment ? "none" : "",
                  color: " red",
                  fontSize: "1.5em",
                  top: "-4px",
                }}
              >
                *
              </sup>
            </div>
          </div>
          <div style={{ flex: 1, color: "#767676", fontSize: "1em" }}>
            <div>
              <InputField
                type="textArea"
                placeHolder="Type here"
                error={this.props.validComment}
                required={true}
                onChange={this.props.onChange}
                value={this.props.comment}
                rows="2.5"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 0 20px 0",
          }}
        >
          <div
            style={{ width: 106, marginLeft: 16 }}
            onClick={() => {
              this.props.submitGoalFeedback(
                this.props.goalId,
                this.props.goalCompletionPercentage,
                this.props.comment,
                this.props.index
              );
            }}
          >
            <Button
              label={"Submit"}
              disabled={
                this.props.goalCompletionPercentage < previousPercentage
              }
              styles={{
                color: "#FFFFFF",
                backgroundColor:
                  this.props.goalCompletionPercentage < previousPercentage
                    ? "#8f8e8e"
                    : "#FF808B",
                border:
                  this.props.goalCompletionPercentage < previousPercentage
                    ? "#8f8e8e"
                    : "#FF808B",
                height: "40px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerEmployeeGoalsFeedbackItem;
