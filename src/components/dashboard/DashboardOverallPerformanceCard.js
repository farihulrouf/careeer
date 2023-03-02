import React, { useState } from "react";
import styled from "styled-components";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import Selector from "../form_selector";

const Div = styled.div`
  .skill-title {
    flex: 1.3;
    font-family: Open Sans Semibold;
    font-size: 1em;
    display: flex;
    align-items: center;
    margin-left: 3%;
  }
  .title-container {
    display: flex;
    margin-bottom: 2em;
  }
  .year-filter {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 0.8em;
    align-items: center;
  }
  .chart-main-container {
    display: flex;
    height: 300px;
    flex-direction: column;
  }

  .chart-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .skill-legend {
    font-size: 0.875em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 3em;
  }
  .individual-legend {
    display: flex;
    align-items: center;
  }
  .pending-rewards-count {
    font-size: 1.2em;
  }
  .legendsHolder {
    display: flex;
    flex-direction: row;
    padding: 1em;
    flex-wrap: wrap;
  }
  .legends {
    align-items: center;
    display: flex;
    padding: 0 1em;
  }
`;

const CustomRadius = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-right: 15px;
  background: ${(props) => props.background};
`;

const COLORS=["#F48B96","#C8AEF6","#A5B5F6","#FBB97D"]
const OverallPerformance = (props) => {
  const filterOption = [
    { name: "1 yr", value: 12 },
    { name: "6 mon", value: 6 },
    { name: "3 mon", value: 3 },
  ];
  const [selectedFilter, setSelectedFilter] = useState("6 mon");

  const filterOptionHandler = (eachvalue, value) => {
    setSelectedFilter(eachvalue);
    props.handleActivities(value)
  };
  return (
    <Div
      className="overall-performance-wrapper"
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginLeft: "2em",
        marginTop: "2em",
      }}
    >
      <div className="title-container">
        <div className="skill-title">
          <spna style={{ paddingRight: "1em" }}>Overall Activity</spna>
          <Selector
            placeHolder="Activity"
            value={props.selectedDepartment}
            onClick={props.onSelectDepartment}
            option={[]}
            style={{
              color: {
                hover: "#FF808B",
                selectedBg: "#FF808B",
                optionHover: "#fbe7e9",
                selectedFont: "#ffffff",
              },
            }}
          />
        </div>
        <div className="year-filter">
          {filterOption.map((eachvalue, index) => (
            <div
              onClick={() =>
                filterOptionHandler(eachvalue.name, eachvalue.value)
              }
              style={{
                color:
                  selectedFilter === eachvalue.name ? "#FF808B" : "#767676",
                margin: "0 0.275em",
                padding: "0.2em 0.575em",
                minWidth: 55,
                border:
                  selectedFilter === eachvalue.name ? "1px solid #FF808B" : "",
                borderRadius: "50px",
                fontSize: "1em",
                cursor: "pointer",
              }}
              key={index}
            >
              {eachvalue.name}
            </div>
          ))}
        </div>
      </div>
      <div className="chart-main-container">
        <div className="chart-container">
          <ResponsiveContainer height={300} width={"100%"}>
            <AreaChart
              width={730}
              height={250}
              data={props.activityData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
              {props.legends.map((prop,id)=>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS[id%COLORS.length]} stopOpacity={0.2} />
                <stop offset="100%" stopColor={COLORS[id%COLORS.length]} stopOpacity={0} />
              </linearGradient>
              )}
              </defs>
              <XAxis dataKey="month" axisLine={false} />
              <YAxis
                axisLine={false}
                allowDecimals={false}
              />
              <CartesianGrid vertical={false} horizontal={false} />

              <Tooltip cursor={false} />
              {props.legends.map((prop,id)=>
                <Area
                dataKey={prop}
                stroke={COLORS[id%COLORS.length]}
                fillOpacity="20px"
                fill={`url(#${id})`}
                isAnimationActive={false}
              />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="legendsHolder">
            {props.legends.map((prop,id)=>
            <div className="legends">
            <CustomRadius key={id} background={COLORS[id%COLORS.length]} />
              {prop}
            </div>
            )}
        </div>
      </div>
    </Div>
  );
};

export default OverallPerformance;
