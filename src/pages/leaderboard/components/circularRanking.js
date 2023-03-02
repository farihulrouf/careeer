import React from "react";
import BadgeImage from "../../../assets/images/Badge.png";
import DefaultPic from "../../../assets/images/defaultProfile.svg";
import { COLORS } from "../../../theme";

export default function App(props) {
  const [state] = React.useState({
    datas: [
      {
        level: 1,
        badges: [
          {
            points: 1200,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 1300,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
        ],
      },
      {
        level: 2,
        badges: [
          {
            points: 1000,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 900,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 1100,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 1200,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 1000,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
        ],
      },
      {
        level: 3,
        badges: [
          {
            points: 500,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 600,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 100,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 80,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 90,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 0,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
          {
            points: 99999,
            profilePicture:
              "http://www.venmond.com/demo/vendroid/img/avatar/big.jpg",
          },
        ],
      },
    ],
  });
  const heightNWidthofGraph = 300;
  React.useEffect(() => {
    document.querySelectorAll(".ciclegraph").forEach((ciclegraph, id) => {
      let circles = ciclegraph.querySelectorAll(".circle");
      let angle = 0 - 10,
        dangle = 180 / circles.length;
      for (let i = 0; i < circles.length; ++i) {
        dangle = id === 0 ? dangle / 1.28 : dangle;
        let circle = circles[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${
          ciclegraph.clientWidth / 2
        }px) rotate(-${angle}deg)`;
      }
    });
  });
  const getLeftSpace = (id) => {
    let maxLength = (heightNWidthofGraph + (state.datas.length - 1) * 270) / 2;
    let currentGraphLength = (heightNWidthofGraph + id * 270) / 2;
    let gap = maxLength - currentGraphLength;
    return gap;
  };
  const getMarginTop = (id) => {
    if (id === 1) {
      id = 1.2;
    } else if (id === 2) {
      id = 2.1;
    }
    let heightOfGraph = id * (heightNWidthofGraph / 1.8);
    let spaceToRemove = -(heightNWidthofGraph / (500 * 2)) - heightOfGraph;
    return spaceToRemove;
  };
  return (
    <div style={{ margin: "0", textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          left: getLeftSpace(0),
          width: heightNWidthofGraph - 200,
          height: 0,
        }}
      >
        Nearer
      </div>
      <div
        style={{
          position: "relative",
          left: getLeftSpace(1),
          width: heightNWidthofGraph - 200,
          height: 0,
        }}
      >
        Favourite
      </div>
      <div
        style={{
          position: "relative",
          left: getLeftSpace(2),
          width: heightNWidthofGraph - 200,
          whiteSpace: "nowrap",
        }}
      >
        Team Members
      </div>
      <div
        style={{
          position: "relative",
          left: getLeftSpace(0.8),
          width: heightNWidthofGraph + 1.1 * 300,
        }}
      >
        <div
          className="circle"
          style={{
            position: "absolute",
            left: "50%",
            width: 80,
            height: 80,
            margin: "calc( -100px / 3.3 )",
            background: COLORS.GREY_T_96,
            backgroundImage: `url(${
              (props.employee && props.employee.profilePicture) || DefaultPic
            })`,
            borderRadius: "50%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "80%",
              left: "-40%",
              backgroundImage: `url(${BadgeImage})`,
              height: 50,
              width: 120,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              content: "",
            }}
          >
            <span
              style={{
                color: "#ffff",
                position: "absolute",
                top: "33%",
                fontSize: "0.9em",
              }}
            >
              {(props.employee && props.employee.points) || 0}
            </span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {props.employeeRadialData &&
          props.employeeRadialData.map((item, id) => {
            return (
              <div
                className="ciclegraph"
                style={{
                  position: "relative",
                  width: heightNWidthofGraph + id * 270,
                  height: (heightNWidthofGraph + id * 300) / 2,
                  margin: "calc(100px / 2 + 0px)",
                  marginTop: getMarginTop(id),
                  left: getLeftSpace(id),
                  borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                  backgroundColor: "transparent",
                  backgroundClip: "content-box",
                  padding: "40px",
                  border: "1px solid #cacaca",
                  borderTop: 0,
                }}
                key={id}
              >
                {item.badges.map((ele, index) => {
                  return (
                    <div
                      className="circle"
                      style={{
                        position: "absolute",
                        left:
                          index === item.badges.length - 1 ? "51%" : "50.5%",
                        width: 50,
                        height: 50,
                        margin: "calc( -100px / 3.3 )",
                        background: COLORS.GREY_T_96,
                        backgroundImage: `url(${
                          (ele.profilePicture && ele.profilePicture) ||
                          DefaultPic
                        })`,
                        borderRadius: "50%",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        top: "4%",
                      }}
                      key={index}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "74%",
                          left: "-60%",
                          backgroundImage: `url(${BadgeImage})`,
                          height: 40,
                          width: 100,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          content: "",
                        }}
                      >
                        <span
                          style={{
                            color: "#ffff",
                            position: "absolute",
                            top: "33%",
                            fontSize: "0.9em",
                          }}
                        >
                          {ele.points || 0}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
