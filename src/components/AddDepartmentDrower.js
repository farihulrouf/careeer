import React, { useState } from "react";
import Styled from "styled-components";
import SingleSearchInput from "./SearchSelector";
import closeImage from "../assets/images/closeImage.svg";
import Button from "./Button";
import FormSelector from "./form_selector";
import Info from "../assets/images/info.svg";
import ToolTip from "./ToolTipComponent";

const Div = Styled.div`
    font-family: "Open Sans Regular";
    font-size: 14px;
    width: 100%;
    color:#303030;
    background-color: rgb(255, 255, 255);
    grid-row-gap: 24px;
    grid-template-columns: 1fr;
    grid-auto-rows: 65px;
    height: inherit;
    position:relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
    .container{
      display:${(props) => (props.isClicked ? "none" : "flex")};
      flex-direction:column;
      padding:8% 10%; 
    }
    .title{
      font-family:Open Sans Semibold;
      font-size:16px;
      color:#252525;
      margin-bottom: 10%;  
    }
    .close{
      cursor: pointer;
      height: 32px;
      width: 32px;
      position: absolute;
      top: 3%;
      right: 5%;
    }

`;
const AdminAddDepartment = (props) => {
  const [showInfo, setInfo] = useState(false);

  return (
    <Div isClicked={props.isClicked}>
      <div className="container">
        <img
          src={closeImage}
          alt="closeIcon"
          className="close"
          onClick={props.closeHandler}
        />
        <div className="title">Add New Department</div>
        <div
          style={{
            width: "100%",
            fontSize: "14px",
            color: "#303030",
          }}
        >
          <FormSelector
            label="Department"
            placeHolder="Select department "
            msgValid={props.validDept}
            borderValid={props.validDept}
            value={props.selectedDepartment}
            onClick={props.onSelectDepartment}
            option={props.departmentNameList}
            selector={"name"}
            style={{
              color: {
                hover: "#FF808B",
                selectedBg: "#FF808B",
                optionHover: "#fbe7e9",
                selectedFont: "#ffffff",
              },
            }}
          />
        </div>
        <div>
          <ToolTip
            style={{
              minWidth: 100,
              maxWidth: "max-content",
              minHeight: 20,
              maxHeight: 100,
              margin: "3% 0 -1% 0px",
              opacity: showInfo ? 1 : 0,
              borderRadius: 1,
              transition: "0.5s opacity",
              backgroundColor: "rgb(227, 227, 251)",
              position: "relative",
              zIndex: 0,
            }}
            toolTip={{ placement: "bottomLeft", width: "10px" }}
          >
            <div
              style={{
                width: "inherit",
                height: "inherit",
                outline: "none",
                display: "flex",
                padding: 10,
                textAlign: "center",
              }}
            >
              <div>
                <img src={Info} alt="icon" className="drawer-info-icon" />
              </div>
              <div
                style={{
                  fontSize: "0.955em",
                  color: "#4D4CAC",
                  marginLeft: "10px",
                }}
              >
                Please select the department
              </div>
            </div>
          </ToolTip>
        </div>
        <div
          style={{
            width: "100%",
            fontFamily: "Open Sans Regular",
            fontSize: 14,
            marginBottom: "10%",
          }}
          onMouseOver={() => setInfo(!props.selectedDepartment)}
          onMouseLeave={() => setInfo(false)}
        >
          <div style={{ paddingBottom: 6 }}>
            Add Department Head
            <sup
              style={{
                display: props.validManager ? "" : "none",
                color: " red",
                fontSize: "1.5em",
                position: "relative",
                top: "-4px",
              }}
            >
              *
            </sup>
          </div>
          <div
            style={{
              width: "100%",
              fontFamily: "Open Sans Regular",
              fontSize: 14,
              pointerEvents: props.selectedDepartment ? "auto" : "none",
            }}
          >
            <SingleSearchInput
              options={props.searchManagerList || []}
              placeHolder={"Search & Select Employee"}
              value={
                typeof props.selectedManager !== "object"
                  ? props.selectedManager
                  : props.selectedManager.name
              }
              style={{
                color: {
                  hover: "#F4A6AE",
                  selectedBg: "#F4A6AE",
                  optionHover: "#fadfe1",
                },
              }}
              onChangeInput={props.onSearchManager}
              onChange={props.onSelectManager}
            />
          </div>
        </div>

        <div onClick={props.saveDepartment}>
          <Button
            label="Add Department"
            status="enable"
            styles={{
              color: "#ffffff",
              backgroundColor: "#F17E8A",
              border: "#F39CA6",
              height: "40px",
            }}
          />
        </div>
      </div>
    </Div>
  );
};
export default AdminAddDepartment;
