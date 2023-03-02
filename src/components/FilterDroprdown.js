import React from "react";
import styled from "styled-components";
import { Cascader } from "antd";
import Icon from "@ant-design/icons";
import "../assets/css/AntdExternal.css";

const FilterSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="10"
    viewBox="0 0 15 10"
  >
    <g transform="translate(0 -76.5)">
      <g transform="translate(0 76.5)">
        <path
          fill="#767676"
          d="M5.833,86.5H9.167V84.833H5.833ZM0,76.5v1.667H15V76.5Zm2.5,5.833h10V80.667H2.5Z"
          transform="translate(0 -76.5)"
        />
      </g>
    </g>
  </svg>
);
const FilterIcon = (props) => <Icon component={FilterSvg} {...props} />;

const FilterButton = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  color: #767676;

  .filter-icon {
    position: absolute;
    z-index: 3;
    right: 10px;
    top: 18%;
    background: #fff;
    padding: 10px 0;
    visibility: ${(props) => (props.status.length > 1 ? "hidden" : "visible")};
  }
`;

const FilterDropdown = (props) => {
  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    <FilterButton
      id="filter-option"
      style={props.style || null}
      status={props.value}
    >
      <Cascader
        options={props.options || []}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={props.filterOnchange}
        placeholder=" Filter By"
        popupClassName="custom-cascader"
        getPopupContainer={() => document.getElementById("filter-option")}
        className="custom-cascader-input"
        value={props.value}
        suffixIcon={<FilterIcon />}
      />
    </FilterButton>
  );
};

export default FilterDropdown;
