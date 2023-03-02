import React from "react";
import Styled from "styled-components";
import FormSelector from "../form_selector";
import SearchSelector from "../SearchSelector";
import closeImage from "../../assets/images/closeImage.svg";
import Info from "../../assets/images/info.svg";
import ToolTip from "../ToolTipComponent";
import Button from "../Button";

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
    }
    .close{
      cursor: pointer;
      height: 32px;
      width: 32px;
      position: absolute;
      top: -1%;
      right: -3%;
    }
    #errorMessage{
      visibility:${(props) => (props.valid ? "visible" : "hidden")};
      color:red;
      padding-top:2px;
      font-size:12px;
    }

    .manager-team-selector{
      width: 100%;
      font-size: 14px;
      color: rgb(48, 48, 48);
      margin-top: 8.5%;
    }
    .drawer-info-icon{
      height:12px;
      width:12px;
    }
`;

const ManagerTeamAddEmployeeDrawer = (props) => {
  return (
    <Div isClicked={props.isClicked} valid={props.valid}>
      <div className="container">
        <img
          src={closeImage}
          alt="closeIcon"
          className="close"
          onClick={props.closeHandler}
        />
        <div className="title">Add New Employee</div>

        <div className="manager-team-selector">
          <FormSelector
            label="Department"
            type="selector"
            onClick={(e) => props.formSelectorHandler(e, "selectedDepartment")}
            option={props.departmentList || []}
            value={props.selectedDepartment || ""}
            selector="name"
            placeHolder="Select Department"
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
        <div className="manager-team-selector">
          <FormSelector
            label="Designation"
            type="selector"
            onClick={(e) => props.formSelectorHandler(e, "selectedDesignation")}
            option={props.designationList || []}
            value={props.selectedDesignation || ""}
            selector="name"
            placeHolder="Select Designation"
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
          style={{
            width: "100%",
            fontFamily: "Open Sans Regular",
            fontSize: 14,
            marginTop: "10%",
          }}
        >
          <SearchSelector
            options={props.searchInputData.options}
            placeHolder={props.searchInputData.placeHolder}
            style={{
              color: {
                hover: "#FF808B",
                selectedBg: "#FF808B",
                optionHover: "#fadfe1",
              },
            }}
            onChange={(e) => props.optionSelected(e)}
            onChangeInput={(e) => props.empOptionOnChange(e)}
            value={props.selectedEmployeeName || ""}
          />
          <div id="errorMessage">
            <sup>*</sup>
            {props.errorMessage}
          </div>
        </div>
        <ToolTip
          style={{
            minWidth: 100,
            maxWidth: "max-content",
            minHeight: 20,
            maxHeight: 100,
            marginTop: "4%",
            opacity: 1,
            borderRadius: 1,
            display: props.showInform ? "flex" : "none",
            backgroundColor: "rgb(227, 227, 251)",
            position: "relative",
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
              {`${props.selectedEmployeeName} is reporting to ${
                props.managerList.length
              } ${props.managerList.length > 1 ? "managers" : "manager"}` || ""}
            </div>
          </div>
        </ToolTip>
        <div style={{ fontFamily: "Open Sans Semibold", marginTop: "10%" }}>
          <Button
            label="Add Employee"
            status="enable"
            onClick={props.addButtonHandler}
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

export default ManagerTeamAddEmployeeDrawer;
