import React from "react";
import Styled from "styled-components";
import FormSelector from "./form_selector";
import closeImage from "../assets/images/closeImage.svg";
import Button from "./Button";

const Div = Styled.div`
    font-family: "Open Sans Regular";
    font-size: 14px;
    width: 100%;
    color:#303030;
    background-color: rgb(255, 255, 255);
    height: inherit;
    position:relative;
   
    .container{
      display:${(props) => (props.isClicked ? "none" : "flex")};
      flex-direction:column;
      padding:4% 4%; 
    }
    .title{
      font-family:Open Sans Semibold;
      font-size:16px;
      color:#252525;
      margin-bottom:10%;  
    }
    .close{
      cursor: pointer;
      height: 32px;
      width: 32px;
      position: absolute;
      top: -1%;
      right: -3%;
    }
  
`;

const EditEmployeeDrawer = (props) => {
  return (
    <Div isClicked={props.isClicked}>
      <div className="container">
        <img
          src={closeImage}
          alt="closeIcon"
          className="close"
          onClick={props.closeHandler}
        />
        <div className="title">Edit Employee</div>
        <div
          style={{
            width: "100%",
            fontSize: "14px",
            color: "#303030",
            marginBottom: "7%",
            marginTop: "1.7%",
          }}
        >
          <FormSelector
            label={props.title || "Department Name"}
            type="selector"
            onClick={(e) => props.formSelectorHandler(e)}
            option={props.formSelectorData}
            value={props.formSelectorSelected}
            msgValid={props.validDepartment}
            borderValid={props.validDepartment}
            placeHolder={props.placeHolder || "Select Department"}
            style={{
              color: {
                hover: "#FF808B",
                selectedBg: "#FF808B",
                optionHover: "#fadfe1",
                selectedFont: "#ffffff",
              },
            }}
          />
        </div>
        <div
          onClick={props.AddButtonHandler}
          style={{ fontFamily: "Open Sans Semibold" }}
        >
          <Button
            label="Save Changes"
            status="enable"
            styles={{
              color: "#ffffff",
              backgroundColor: "#FF808B",
              border: "#F39CA6",
              height: "40px",
            }}
          />
        </div>
      </div>
    </Div>
  );
};

export default EditEmployeeDrawer;
