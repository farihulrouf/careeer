import React, { Component } from "react";
import Curriculum from "./Curriculum";
import { InboxOutlined } from "@ant-design/icons";
class CampusManagementCurriculum extends Component {
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
        {this.props.campusManagement.length !== 0 ? (
          <>
            {this.props.campusManagement.map((ele, id) => (
              <div key={id} style={{ marginBottom: 10 }}>
                <Curriculum
                  element={ele["LP Name"]}
                  id={id}
                  isMgmtCurriculum={true}
                  status={ele.Status}
                  selectedId={this.props.campMgmtselectedId}
                  onClick={() => this.props.onClickCampMgmtCurriculum(id)}
                />
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

export default CampusManagementCurriculum;
