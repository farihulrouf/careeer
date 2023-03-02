import React from "react";
import { useLocation, Link } from "react-router-dom";
const styles = {
  linkContainer: {
    width: "100%",
    letterSpacing: "0.03em",
    display: "flex",
    margin: "15px 0",
    fontSize: "16px",
    height: "58px",
    color: "#303030",
    background: "#FFFFFF",
    borderRadius: "8px",
    fontFamily: "Open Sans Regular",
    paddingRight: "1.5%",
  },
};
const ComponentNavigationBarV2 = (props) => {
  const location = useLocation();
  return (
    <div>
      <div
        style={{
          display: props.title ? "" : "none",
          fontSize: "1.125em",
          fontFamily: "Open Sans Semibold",
          color: "#303030",
        }}
      >
        {props.title && props.title}
      </div>
      <div style={styles.linkContainer}>
        <div style={{ display: "flex", flex: 1 }}>
          {props.navLink.map((ele, index) => (
            <div
              style={{
                borderBottom: location.pathname.includes(
                  props.routePath.toLowerCase() +
                  `/` +
                  (typeof ele !== "object" ? ele : ele.title)
                    .replace(/ /g, "-")
                    .toLowerCase()
                )
                  ? (props.style && props.style.selected) || "3px solid #FF808B"
                  : (props.style &&
                    props.style.selected.charAt(0) + "solid #FFFFFF") ||
                  "3px solid #FFFFFF",
                margin: "0 4.5%",
                display: "flex",
                alignItems: "center",
                transition: "0.3s border",
              }}
              key={index}
            >
              <Link
                style={{
                  color: location.pathname.includes(
                    props.routePath.toLowerCase() +
                    `/` +
                    (typeof ele !== "object" ? ele : ele.title)
                      .replace(/ /g, "-")
                      .toLowerCase()
                  )
                    ? "#303030"
                    : "#767676",
                  textDecoration: "none",
                  display: "contents",
                }}
                to={
                  props.routePath.toLowerCase() +
                  `/` +
                  (typeof ele !== "object" ? ele : ele.path)
                    .replace(/ /g, "-")
                    .toLowerCase()
                }
              >
                <label style={{ cursor: "pointer" }}>
                  {typeof ele !== "object" ? ele : ele.title}
                </label>
              </Link>
            </div>
          ))}
         
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            fontSize: "0.875em",
          }}
        >
          {(location.pathname.includes("course") ||
            location.pathname.includes("rewards")) &&
            props.subNavLink &&
            props.subNavLink.map((eachNavLink, index) => (
              <Link
                key={index}
                to={`${props.routePath.toLowerCase()}/${eachNavLink.subPath}`}
                style={{
                  border: location.pathname.includes(
                    eachNavLink.subPath.replace(/ /g, "-").toLowerCase()
                  )
                    ? (props.style && props.style.subSelected) ||
                    "1px solid #FF808B"
                    : (props.style &&
                      props.style.subSelected.charAt(0) + "solid #FFFFFF") ||
                    "1px solid #FFFFFF",
                  borderRadius: "20px",
                  height: "50%",
                  padding: "0 1.2%",
                  display: "flex",
                  alignItems: "center",
                  margin: "0 1%",
                  cursor: "pointer",
                  transition: "0.25s ",
                }}
              >
                
                <div
                  style={{
                    paddingRight: "0.475em",
                    color: location.pathname.includes(
                      eachNavLink.subPath.replace(/ /g, "-").toLowerCase()
                    )
                      ? "#FF808B"
                      : "#767676",
                  }}
                >
                  {eachNavLink.title || ""}
                </div>
                <div
                  style={{
                    fontSize: "0.714em",
                    background: location.pathname.includes(
                      eachNavLink.subPath.replace(/ /g, "-").toLowerCase()
                    )
                      ? "#FF808B"
                      : " #767676",
                    color: "#fff",
                    borderRadius: "50%",
                    minWidth: "20px",
                    width: "max-content",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.25s background",
                  }}
                >
                  {eachNavLink.count || 0}
                </div>
               
              </Link>
              
            ))}
             
        </div>
        
      </div>
    </div>
  );
};

export default ComponentNavigationBarV2;
