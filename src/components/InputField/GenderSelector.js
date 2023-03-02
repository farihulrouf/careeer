import React from "react";
import styled from "styled-components";
import MaleActive from "../../assets/images/MaleActive.svg";
import MaleInactive from "../../assets/images/MaleInactive.svg";
import FemaleActive from "../../assets/images/FemaleActive.svg";
import FemaleInactive from "../../assets/images/FemaleInactive.svg";
const Div = styled.div`
  .gender-main-title {
    font-size: 1em;
    text-transform: capitalize;
    padding-bottom: 6px;
    letter-spacing: 0.02em;
  }
  .gender-main-container {
    display: flex;
  }
  .gender-container {
    margin-right: 10px;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.09) 1px 3px 7px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.22) 1px 2px 11px;
    }
  }
  .gender-icon {
    height: 24px;
    width: 24px;
  }
  .gender-title {
    margin-top: 15%;
  }
`;
const genderSelector = (props) => {
  const gender = [
    {
      title: "Male",
      icon: { active: MaleActive, inActive: MaleInactive },
      value: "m",
    },
    {
      title: "Female",
      icon: { active: FemaleActive, inActive: FemaleInactive },
      value: "f",
    },
  ];
  return (
    <Div>
      <div className="gender-main-title" id={props.id || ""}>
        {props.label}
        {props.required && (
          <sup
            style={{
              color: "red",
              fontSize: "1.5em",
              position: "relative",
              top: "-4px",
              left: "4px",
            }}
          >
            *
          </sup>
        )}
      </div>
      <div className="gender-main-container">
        {gender.map((eachGender, genderIndex) => {
          return (
            <div
              key={genderIndex}
              className="gender-container"
              onClick={() => props.onClick(eachGender.value) || null}
              style={{
                border:
                  ((props.value && props.value.toLowerCase()) || "") ===
                  eachGender.value
                    ? "1px solid #ff808b"
                    : props.error
                    ? "1px solid red"
                    : "1px solid #fcfcfc",
                color:
                  ((props.value && props.value.toLowerCase()) || "") ===
                  eachGender.value
                    ? "#ff808b"
                    : "#767676",
              }}
            >
              <div>
                <img
                  src={
                    ((props.value && props.value.toLowerCase()) || "") ===
                    eachGender.value
                      ? eachGender.icon.active
                      : eachGender.icon.inActive
                  }
                  className="gender-icon"
                  alt={eachGender.title}
                />
              </div>
              <div className="gender-title">{eachGender.title}</div>
            </div>
          );
        })}
      </div>
    </Div>
  );
};

export default genderSelector;
