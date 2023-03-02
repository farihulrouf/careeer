import React from "react";

const styles = {
  linkContainer: {
    fontSize: "1em",
    color: "inherit",
    width: "100%",
    background: "inherit",
    borderRadius: "inherit",
    height: "58px",
    letterSpacing: "0.03em",
    display: "flex",
    fontFamily: "inherit",
  },
};

const ComponentNavigationBar = (props) => {
  return (
    <div style={styles.linkContainer}>
      <div style={{ display: "flex", flex: 1 }}>
        {props.navLink.map((ele, index) => (
          <div
            style={{
              borderBottom:
                props.linkStatus === ele
                  ? (props.style && props.style.selected) || "3px solid #FF808B"
                  : (props.style &&
                      props.style.selected.charAt(0) + "solid #FFFFFF") ||
                    "3px solid #FFFFFF",
              margin: "0 4.5%",
              display: "flex",
              alignItems: "center",
              transition: "0.3s border",
              color: props.linkStatus === ele ? "#303030" : "inherit",
            }}
            key={index}
          >
            <label
              style={{ cursor: "pointer" }}
              onClick={() => props.navLinkHandler(ele)}
            >
              {ele}
            </label>
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
        {props.subNavLink &&
          props.subNavLink.map((eachNavLink, index) => (
            <div
              key={index}
              onClick={() => props.subNavLinkHandler(eachNavLink)}
              style={{
                border:
                  props.selectedSubNavLink.title === eachNavLink.title
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
                  color:
                    props.selectedSubNavLink.title === eachNavLink.title
                      ? "#FF808B"
                      : "#767676",
                }}
              >
                {eachNavLink.title || ""}
              </div>
              <div
                style={{
                  fontSize: "0.714em",
                  background:
                    props.selectedSubNavLink.title === eachNavLink.title
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default ComponentNavigationBar;
