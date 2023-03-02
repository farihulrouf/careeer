import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import FormSelector from "./form_selector";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { decryptData } from "../utils/encryptDecrypt";
const Nav = Styled.nav`
font-family:Open Sans Regular;
font-size:16px;
background-color:#ffffff;
color:#767676;
display:flex;
height:60px;

.navigationContainer{
    flex:1;
    padding:10px;
    display:flex;
}
.navigationData{
    width: max-content;
    white-space : nowrap;
    display:flex;
    flex:2;
    padding:0 0% 0 3%;
   
}
.viweContainer{
    flex:0.9;
    font-size:14px;
    display: flex;
    justify-content: center;
    align-items:center;

}
.anchor{
  color:#767676;
  text-decoration:none;
  display:contents;
}

`;
const Div = Styled.div`
height:38px;
display:flex;
justify-content:center;
align-items:center;
padding:0 2.5%;
border-radius: 6px;
cursor:pointer;

.navBarLabel{
  cursor:pointer;
  margin-bottom: 0px;
}

.navIcon{
  width: 16px;
  height: 21px;
  padding-right:3%;
 
}

`;

const NavigationBar = (props) => {
  let location = useLocation();
  useEffect(() => loadConfiguration(), []);
  const [managerConfigHidden, setManagerConfigHidden] = useState([]);
  const loadConfiguration = () => {
    const managerConfigHidden =
      localStorage.configurationHidden &&
      JSON.parse(decryptData(localStorage.configurationHidden)).manager
        ? JSON.parse(decryptData(localStorage.configurationHidden)).manager
            .hidden
        : [];
    setManagerConfigHidden(managerConfigHidden);
  };
  return (
    <Nav>
      <div className="navigationContainer">
        <div className="navigationData">
          {props.navigationData.map((element, index) => (
            <>
              {props.view === "manager" ? (
                !managerConfigHidden.includes(element.label) && (
                  <Link
                    to={
                      `/` +
                      props.view.toLowerCase() +
                      `/` +
                      element.label.toLowerCase().replace(/ /g, "-")
                    }
                    className="anchor"
                    key={index}
                  >
                    <Div
                      onClick={() => props.navBarLinkHandler(index)}
                      style={{
                        background: location.pathname.includes(
                          `/` +
                            props.view.toLowerCase() +
                            `/` +
                            element.label.replace(/ /g, "-").toLowerCase()
                        )
                          ? "#EEEEF8"
                          : "",
                        color: location.pathname.includes(
                          `/` +
                            props.view.toLowerCase() +
                            `/` +
                            element.label.replace(/ /g, "-").toLowerCase()
                        )
                          ? "#4D4CAC"
                          : "",
                      }}
                    >
                      <img
                        src={element.img}
                        alt="icon"
                        className="navIcon"
                        style={{
                          filter: location.pathname.includes(
                            `/` +
                              props.view.toLowerCase() +
                              `/` +
                              element.label.replace(/ /g, "-").toLowerCase()
                          )
                            ? "invert(190%) sepia(83%) saturate(5841%) hue-rotate(244deg) brightness(70%) contrast(150%)"
                            : "",
                        }}
                      />
                      <label className="navBarLabel">{element.label}</label>
                    </Div>
                  </Link>
                )
              ) : (
                <Link
                  to={
                    `/` +
                    props.view.toLowerCase() +
                    `/` +
                    element.label.toLowerCase().replace(/ /g, "-")
                  }
                  className="anchor"
                  key={index}
                >
                  <Div
                    onClick={() => props.navBarLinkHandler(index)}
                    style={{
                      background: location.pathname.includes(
                        `/` +
                          props.view.toLowerCase() +
                          `/` +
                          element.label.replace(/ /g, "-").toLowerCase()
                      )
                        ? "#EEEEF8"
                        : "",
                      color: location.pathname.includes(
                        `/` +
                          props.view.toLowerCase() +
                          `/` +
                          element.label.replace(/ /g, "-").toLowerCase()
                      )
                        ? "#4D4CAC"
                        : "",
                    }}
                  >
                    <img
                      src={element.img}
                      alt="icon"
                      className="navIcon"
                      style={{
                        filter: location.pathname.includes(
                          `/` +
                            props.view.toLowerCase() +
                            `/` +
                            element.label.replace(/ /g, "-").toLowerCase()
                        )
                          ? "invert(190%) sepia(83%) saturate(5841%) hue-rotate(244deg) brightness(70%) contrast(150%)"
                          : "",
                      }}
                    />
                    <label className="navBarLabel">{element.label}</label>
                  </Div>
                </Link>
              )}
            </>
          ))}
        </div>
        <div className="viweContainer">
          <div
            style={{
              maxWidth: 120,
              marginLeft: "10%",
              display: props.viewOptions.length > 0 ? "flex" : "none",
            }}
          >
            <FormSelector
              type="selector"
              onClick={(e) => props.viewHandler(e, location.pathname)}
              option={props.viewOptions || []}
              placeHolder={props.viewAs || ""}
              style={{
                color: {
                  hover: "#8359C1",
                  selectedBg: "#8359C1",
                  optionHover: "#C4B0E2",
                  selectedFont: "#ffffff",
                },
                height: "34px",
              }}
            />
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default NavigationBar;
