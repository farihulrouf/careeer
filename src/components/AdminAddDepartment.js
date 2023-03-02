import React from "react";
import Styled from "styled-components";
import FormInput from "./form_input";
import SingleSearchInput from "./SingleSearchInput";
import closeImage from "../assets/images/closeImage.svg";
import Button from "./Button";

const Div = Styled.div`
    font-family: "Open Sans Regular";
    font-size: 14px;
    width: 100%;
    padding:8% 10%;
    color:#303030;
    background-color: rgb(255, 255, 255);
    display:${props => (props.isClicked ? "none" : "grid")};
    grid-row-gap: 24px;
    grid-template-columns: 1fr;
    grid-auto-rows: 65px;
    height: inherit;
    position:relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;

    .title{
      font-family:Open Sans Semibold;
      font-size:16px;
      color:#252525;
      margin-bottom:12px;  
    }
    .close{
      cursor: pointer;
      height: 32px;
      width: 32px;
      position: absolute;
      top: 5%;
      right: 12%;
    }

`;

const AdminAddDepartment = props => {
  return (
    <Div isClicked={props.isClicked}>
      <img
        src={closeImage}
        alt="closeIcon"
        className="close"
        onClick={props.closeHandler}
      />
      <div className="title">Add New Department</div>
      <div style={{ width: "100%", fontSize: "14px", color: "#303030" }}>
        <FormInput
          label="Department Name"
          placeHolder="Enter department name"
          type="text"
          value={props.inputValue}
          onChange={props.textHandler}
          style={{
            color: {
              hover: "#F4A6AE"
            }
          }}
        />
      </div>
      <div
        style={{ width: "100%", fontFamily: "Open Sans Regular", fontSize: 14 }}
      >
        <div style={{ paddingBottom: 6 }}>Add Department Head</div>
        <SingleSearchInput
          options={props.searchInputData.options}
          placeHolder={props.searchInputData.placeHolder}
          style={{
            color: {
              hover: "#F4A6AE",
              selectedBg: "#F4A6AE",
              optionHover: "#fadfe1"
            }
          }}
          onChange={e => props.optionSelected(e)}
        />
      </div>
      <div onClick={props.AddButtonHandler}>
        <Button
          label="Add Department"
          status="enable"
          styles={{
            color: "#ffffff",
            backgroundColor: "#F17E8A",
            border: "#F39CA6",
            height: "40px"
          }}
        />
      </div>
    </Div>
  );
};

export default AdminAddDepartment;
