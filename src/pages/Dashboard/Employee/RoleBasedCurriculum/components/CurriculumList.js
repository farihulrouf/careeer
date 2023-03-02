import React, { Component } from "react";
import Curriculum from "./Curriculum";
import { InboxOutlined } from "@ant-design/icons";
class CurriculumActivities extends Component {
  render() {
    return (
      <div
        className="scroll-container"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {this.props.curriculums.length !== 0 && this.props.selectedId !== 0 ? (
          <>
            {this.props.curriculums.map((ele, id) => (
              <div
                key={id}
                style={{
                  display: ele.curriculum.length !== 0 ? "flex" : "none",
                  flexDirection: "column",
                  paddingRight: 10,
                }}
              >
                <div
                  style={{
                    color: "#303030",
                    fontFamily: "Open Sans Semibold",
                  }}
                >
                  {ele.skillType.toUpperCase()}
                </div>
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  {ele.curriculum.map((element, index) => (
                    <div key={index}>
                      <Curriculum
                        element={element.knowledgeComponent}
                        id={element.id}
                        selectedId={this.props.selectedId}
                        onClick={() =>
                          this.props.onClickCurriculum(element.id, index)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div
            style={{
              flex: 1,
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
    );
  }
}

export default CurriculumActivities;
