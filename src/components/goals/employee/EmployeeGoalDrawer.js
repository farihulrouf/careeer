import React from "react";
import DisplayPicture from "../../DisplayPicture";
import Button from "../../Button";
import close from "../../../assets/images/closeImage.svg";
import InputField from "../../InputField";
class EmployeeGoalDrawer extends React.Component {
  props = {};
  render() {
    return (
      <div
        style={{
          fontFamily: "Open Sans Regular",
          color: "#303030",
          fontSize: "16px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            onClick={this.props.onCloseDrawer}
            src={close}
            alt="close"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ height: 50, width: 50, marginRight: 20 }}>
            <DisplayPicture profile={this.props.profilePicture} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.875em" }}>
              {this.props.managerFirstName
                ? this.props.managerFirstName + " "
                : ""}
              {this.props.managerMiddleName
                ? this.props.managerMiddleName + " "
                : ""}
              {this.props.managerLastName ? this.props.managerLastName : ""}
            </div>
            <div style={{ fontSize: "0.75em", color: "#767676" }}>
              {this.props.managerDesignation}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "#E2E2E2", marginTop: 20 }}></div>
        <div style={{ fontSize: "0.875em", marginTop: 10 }}>
          <div style={{ fontFamily: "Open Sans Regular" }}>Goal Title</div>
          <div style={{ color: "#767676" }}>{this.props.title}</div>
        </div>
        <div style={{ fontSize: "0.875em", marginTop: 20 }}>
          <div style={{ fontFamily: "Open Sans Regular" }}>
            Goal Description
          </div>
          <div style={{ color: "#767676" }}>
            <textarea
              disabled
              value={this.props.description}
              style={{
                fontSize: "1em",
                color: "#767676",
                width: "98%",
                background: "#F7F7F751",
                border: "1px solid #E2E2E2",
                borderRadius: "4px",
                outline: "none",
                resize: "none",
                padding: "10px 15px",
              }}
              placeholder="Type here"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div style={{ fontSize: "0.875em", marginTop: 20 }}>
          <div>
            <InputField
              label="Goal Status Update"
              type="textArea"
              placeHolder="Type here"
              error={this.props.statusUpdate.isValid}
              disabled={
                this.props.feedbackPending || this.props.isGoalCompleted
              }
              required={true}
              onChange={this.props.onChange}
              value={this.props.statusUpdate.value}
              rows="3"
            />
          </div>
          {this.props.feedbackPending && (
            <div style={{ color: "#FF808B" }}>
              Previous feedback request for this goal is still pending
            </div>
          )}
          {this.props.isGoalCompleted && (
            <div style={{ color: "#FF808B" }}>
              And this goal has reach 100% completion
            </div>
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 30,
            paddingRight: 10,
            fontSize: "0.875em",
          }}
        >
          <div style={{ width: 106 }} onClick={this.props.onCloseDrawer}>
            <Button
              label={"Cancel"}
              styles={{
                color: "#FF808B",
                backgroundColor: "#ffffff",
                border: "#FF808B",
                height: "40px",
              }}
            />
          </div>
          <div
            style={{
              width: 150,
              marginLeft: 16,
              pointerEvents:
                this.props.feedbackPending || this.props.isGoalCompleted
                  ? "none"
                  : "auto",
            }}
            onClick={() => this.props.requestfeedbackHandler()}
          >
            <Button
              notAllValid={
                this.props.feedbackPending || this.props.isGoalCompleted
              }
              label={"Request Feedback"}
              styles={{
                color: "#FFFFFF",
                backgroundColor:
                  this.props.feedbackPending || this.props.isGoalCompleted
                    ? "#C6C6C6"
                    : "#FF808B",
                border:
                  this.props.feedbackPending || this.props.isGoalCompleted
                    ? "#C6C6C6"
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

export default EmployeeGoalDrawer;
