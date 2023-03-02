import React, { Component } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { InboxOutlined } from "@ant-design/icons";

const styles = {
  status1: {
    display: "flex",
    marginBottom: 10,
    alignItems: "center",
    color: "#ff8c96",
  },
  status2: { display: "flex", alignItems: "center", color: "#96ACF9" },
  dot1: {
    height: 10,
    width: 10,
    borderRadius: "50%",
    background: "#ff8c96",
    marginRight: 10,
  },
  dot2: {
    height: 10,
    width: 10,
    borderRadius: "50%",
    background: "#96ACF9",
    marginRight: 10,
  },
  legends: {
    flex: 0.6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};
class CampMgmtLearningObjective extends Component {
  render() {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {this.props.campusManagement.length > 0 ? (
          <>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <ResponsiveContainer height={180}>
                  <PieChart>
                    <Pie
                      data={this.props.skillGap || []}
                      innerRadius={0}
                      outerRadius={80}
                      startAngle={-270}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {this.props.skillGap.map((entry, index) => (
                        <Cell
                          strokeWidth={index === 0 ? 4 : 0}
                          key={entry.name}
                          fill={index === 0 ? "#96ACF9" : "#ff8c96"}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={styles.legends}>
                <div style={styles.status1}>
                  <div style={styles.dot1}></div>
                  <div>{this.props.skillGap[1].value}% Completed</div>
                </div>
                <div style={styles.status2}>
                  <div style={styles.dot2}></div>
                  <div>{this.props.skillGap[0].value}% Not Started</div>
                </div>
              </div>
            </div>
            {this.props.campMgmtLearningObjectives["Course Types"] &&
              this.props.CourseTypes.length > 0 && (
                <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                  {this.props.CourseTypes.map((ele, id) => (
                    <div
                      key={id}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <ResponsiveContainer height={140}>
                        <PieChart>
                          <Pie
                            data={ele.CourseType || []}
                            innerRadius={0}
                            outerRadius={60}
                            startAngle={-270}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                          >
                            {this.props.skillGap.map((entry, index) => (
                              <Cell
                                strokeWidth={index === 0 ? 4 : 0}
                                key={entry.name}
                                fill={index === 1 ? ele.color : "#96ACF9"}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div
                        title={ele.name}
                        style={{ color: ele.color, fontSize: 14 }}
                      >
                        {ele.name} - {ele.CourseType[1].value}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </>
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
    );
  }
}

export default CampMgmtLearningObjective;
