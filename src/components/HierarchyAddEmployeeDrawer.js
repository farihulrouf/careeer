import React from "react";
import Styled from "styled-components";
import FormSelector from "./form_selector";
import SearchSelector from "./SearchSelector";
import closeImage from "../assets/images/closeImage.svg";
import Info from "../assets/images/info.svg";
import Button from "./Button";
import ToolTip from "./ToolTipComponent";
const Div = Styled.div`
  font-family: "Open Sans Regular";
  font-size: 14px;
  width: 100%;
  color:#303030;
  background-color: rgb(255, 255, 255);
  height: inherit;
  position:relative;
    .container{
      display:flex;
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
`;

const HierarchyAddEmployeeDrawer = (props) => {
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

        <div
          style={{
            width: "100%",
            fontSize: "14px",
            color: "#303030",
            marginBottom: "7%",
            marginTop: "10%",
          }}
        >
          <FormSelector
            label="Designation"
            type="selector"
            onClick={(e) => props.formSelectorHandler(e)}
            option={props.formSelectorData || []}
            selector="name"
            value={props.formSelectorSelected || ""}
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
            height: "40px",
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
        </div>
        <div id="errorMessage">
          <sup>*</sup>
          {props.errorMessage || ""}
        </div>
        <ToolTip
          style={{
            minWidth: 100,
            maxWidth: "max-content",
            minHeight: 20,
            maxHeight: 100,
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
        <div
          onClick={props.addButtonHandler}
          style={{ fontFamily: "Open Sans Semibold", marginTop: "5%" }}
        >
          <Button
            label="Add Employee"
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

export default HierarchyAddEmployeeDrawer;
