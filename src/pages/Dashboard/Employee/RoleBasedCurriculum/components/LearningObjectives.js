import React, { Component } from "react";
import Button from "../../../../../components/Button";
import { InboxOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class componentName extends Component {
  render() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#FF808B",
            fontSize: "1.126em",
            fontFamily: "Open Sans Semibold",
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          LEARNING OBJECTIVE
        </div>
        <div
          className="scroll-container"
          style={{
            overflowY: "auto",
            flex: 1,
          }}
        >
          {this.props.learningObjectives.length !== 0 ? (
            <div>
              {this.props.learningObjectives.map((ele, id) => (
                <>
                  <div key={id} style={{ marginBottom: 10 }}>
                    {ele.title}
                    <span
                      style={{
                        fontSize: "1.3em",
                        color: this.props.checkMarkIndexes.includes(id)
                          ? "green"
                          : "#dde0dd",
                        marginLeft: 12,
                      }}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#767676",
              }}
            >
              <span>
                <InboxOutlined style={{ fontSize: "8em" }} />
              </span>
              <span>No Data</span>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "18px",
            fontFamily: "Open Sans Semibold",
            fontSize: "1em",
          }}
        >
          <Link
            to={
              this.props.learningObjectives.length !== 0 && "/employee/training"
            }
          >
            <div style={{ width: "240px" }}>
              <Button
                label="START MY LEARNING"
                disabled={
                  this.props.learningObjectives.length !== 0 ? false : true
                }
                styles={{
                  color: "#FFFFFF",
                  backgroundColor: "#FF808B",
                  border: "#FF808B",
                  height: "40px",
                }}
              />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default componentName;
