import React, { Component } from "react";
import styled from "styled-components";
import DefaultPic from "../../../assets/images/defaultProfile.svg";
import "antd/dist/antd.css";
import CloseIcon from "../../../assets/images/closeImage.svg";
import Button from "../../Button";
import { DatePicker } from "antd";
import InputField from "../../InputField";
import moment from "moment";
import { COLORS } from "../../../theme";
const Div = styled.div`
  color: rgb(48, 48, 48);
  font-family: "Open Sans Regular";
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 0.475em;
  padding: 6% 5% 0.5% 7%;
  position: relative;
  .drawer-title {
    font-family: Open Sans Semibold;
    font-size: 1.125em;
  }
  .title-container {
    display: flex;
  }
  .sub-title {
    font-size: 0.875em;
    margin-bottom: 5px;
  }
  .icon-container {
    position: absolute;
    right: 26px;
    top: 5%;
  }
  .close-icon {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  #employee-image {
    height: 3.429em;
    width: 3.429em;
    border-radius: 50%;
    margin-right: 1em;
    background: ${COLORS.GREY_T_96};
  }
  #employee-image-container {
    display: flex;
    font-size: 0.875em;
    align-items: center;
  }
  #employee-designation {
    color: #767676;
  }
  .goals-icon-container {
    display: flex;
    flex-wrap: wrap;
  }
  .goal-icon-card {
    width: 17.523%;
    color: #767676;
    height: 11vh;
    background: #ffffff;
    box-shadow: 0px 3px 6px #6a38b533;
    border: ${(props) =>
      props.iconValid ? "1px solid red" : "1px solid ##ffffff"};
    border-radius: 4px;
    margin: 0 0.675em 0.675em 0em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      transition: 0.3s box-shadow;
      cursor: pointer;
      box-shadow: 0px 3px 10px #00000033;
    }
  }

  .goal-icon-card-active {
    border: 1px solid #ff808b;
    color: #ff808b;
  }

  .goal-type-icon {
    width: 1.3em;
    opacity: 0.6;
  }
  .goal-type-icon-active {
    filter: invert(172%) sepia(22%) saturate(5351%) hue-rotate(298deg)
      brightness(63%) contrast(394%);
  }

  .goal-icon-title {
    font-size: 0.645em;
  }

  .goal-text-area {
    font-size: 0.875em;
    width: 100%;
  }
  .set-goal-button {
    height: 36px;
    width: 138px;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  .date-picker {
    height: 36px;
    width: 80%;
  }
`;
const ErrorMessage = styled.sup`
  color: red;
  font-size: 1.5em;
  top: -2px;
`;

class ManagerAddEmployeeGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  disabledDate = (current) => {
    return current && current <= moment().startOf("day");
  };

  render() {
    const {
      employee,
      goalTitle,
      goalInputHandler,
      description,
      selectedGoalType,
      dateInputHandler,
      startDate,
      endDate,
    } = this.props;
    return (
      <Div iconValid={selectedGoalType.isValid}>
        <div className="title-container">
          <div className="drawer-title">{this.props.title || ""}</div>
          <div className="icon-container">
            <img
              src={CloseIcon}
              alt="close-icon"
              className="close-icon"
              onClick={this.props.drawerHandler}
              draggable={false}
            />
          </div>
        </div>
        <div id="employee-image-container">
          <img
            src={employee.profilePicture || DefaultPic}
            id="employee-image"
            alt="pic"
            draggable={false}
          />
          <div>
            <div id="employee-name">
              {(employee.firstName || "") +
                " " +
                `${employee.middleName || ""}` +
                " " +
                (employee.lastName || "")}
            </div>
            <div id="employee-designation">{employee.designation}</div>
          </div>
        </div>
        <div className="goal-type-container">
          <div className="sub-title pd-13">
            Goal Type
            <ErrorMessage>*</ErrorMessage>
          </div>
          <div className="goals-icon-container" draggable={false}>
            {this.props.goalTypes &&
              this.props.goalTypes.map((eachgoal, index) => (
                <div
                  className={
                    selectedGoalType.value === eachgoal.id
                      ? "goal-icon-card goal-icon-card-active"
                      : "goal-icon-card"
                  }
                  key={index}
                  onClick={() =>
                    goalInputHandler("selectedGoalType", eachgoal.id)
                  }
                  draggable={false}
                >
                  <div>
                    <img
                      draggable={false}
                      src={eachgoal.image}
                      alt={eachgoal.title}
                      className={
                        selectedGoalType.value === eachgoal.id
                          ? "goal-type-icon goal-type-icon-active"
                          : "goal-type-icon"
                      }
                    />
                  </div>
                  <div className="goal-icon-title">{eachgoal.title}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="sub-title pd-13">
          <InputField
            label="Goal Title"
            value={goalTitle.value}
            error={goalTitle.isValid}
            required={true}
            placeHolder="Add Title"
            onChange={(value) => goalInputHandler("goalTitle", value)}
          />
        </div>
        <div className="goal-text-area ">
          <InputField
            label="Description"
            type="textArea"
            placeHolder="Add Description"
            error={description.isValid}
            required={true}
            onChange={(value) => goalInputHandler("description", value)}
            value={description.value}
            rows="2"
          />
        </div>
        <div
          style={{ display: "flex", position: "relative", marginBottom: "8px" }}
          id="date-time-container"
        >
          <div style={{ flex: 1, marginRight: "10px" }}>
            <div className="sub-title pd-13">
              Start Date
              <ErrorMessage>*</ErrorMessage>
            </div>
            <div className="date-picker">
              <DatePicker
                format="DD-MM-YYYY"
                value={startDate.value}
                placeholder="Date"
                getPopupContainer={() =>
                  document.getElementById("date-time-container")
                }
                style={{
                  border: startDate.isValid
                    ? "1px solid red"
                    : "1px solid #D9D9D9",
                  width: "100%",
                }}
                popupStyle={{ bottom: "100%", top: "5px" }}
                disabledDate={this.disabledDate}
                onChange={(date, dateString) =>
                  dateInputHandler(date, dateString, "startDate")
                }
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="sub-title pd-13">
              End Date
              <ErrorMessage>*</ErrorMessage>
            </div>

            <div className="date-picker">
              <DatePicker
                format="DD-MM-YYYY"
                value={endDate.value}
                placeholder="Date"
                disabledDate={(current) =>
                  this.props.disabledEndDate(current, startDate.value)
                }
                popupStyle={{ bottom: "100%", top: "5px" }}
                style={{
                  border: endDate.isValid
                    ? "1px solid red"
                    : "1px solid #D9D9D9",
                  width: "100%",
                }}
                getPopupContainer={() =>
                  document.getElementById("date-time-container")
                }
                onChange={(date, dateString) =>
                  dateInputHandler(date, dateString, "endDate")
                }
                disabled={!startDate.value}
                showToday={false}
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="set-goal-button" onClick={this.props.onSetGoalDrawer}>
            <Button
              label="Set Goal"
              status="disable"
              styles={{
                color: "#ffffff",
                backgroundColor: "#F17E8A",
                border: "#F39CA6",
                height: "36px",
              }}
            />
          </div>
        </div>
      </Div>
    );
  }
}

export default ManagerAddEmployeeGoal;
