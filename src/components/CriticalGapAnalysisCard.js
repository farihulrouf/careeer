import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  color: #303030;
  box-shadow: 1px 4px 12px #00000027;
  border-radius: 8px;
  height: inherit;
  padding: 3%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  .title-container {
    display: flex;
  }
  .skill-title {
    flex: 1;
    font-family: Open Sans Semibold;
    font-size: 1em;
  }
  .year-filter {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 0.8em;
  }
  .chart-main-container {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 0.7fr;
    margin-top: 3%;
  }

  .chart-container {
    display: flex;
    justify-content: center;
  }

  .skill-legend {
    font-size: 0.875em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .individual-legend {
    display: flex;
    align-items: baseline;
  }
  .skill-legend-label {
    display: flex;
    flex-direction: column;
  }
  .skill-label-value {
    font-size: 2em;
    font-weight: 700;
  }
  .skill-label-key {
    font-size: 1em;
    color: #a1a1a1;
  }
`;
const CustomRadius = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-right: 15px;
  background: ${(props) => props.background};
`;

const RADIAN = Math.PI / 160;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (index === 0) {
    return (
      <text
        fontFamily="Open Sans Regular"
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="2em"
        fontWeight="700"
        style={{ display: "none" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
};
const CriticalGapAnalysis = (props) => {
  const filterOption = [
    { label: "1 yr", months: 12 },
    { label: "6 mon", months: 6 },
    { label: "3 mon", months: 3 },
  ];
  const [selectedFilter, setSelectedFilter] = useState("6 mon");

  const filterOptionHandler = (eachvalue, months) => {
    props.filterHandler(months);
    setSelectedFilter(eachvalue);
  };
  return (
    <Div>
      <div className="title-container">
        <div className="skill-title">Overall Skill Gap</div>
        <div className="year-filter">
          {filterOption.length > 0 &&
            filterOption.map((eachvalue, index) => (
              <div
                onClick={() =>
                  filterOptionHandler(eachvalue.label, eachvalue.months)
                }
                style={{
                  color:
                    selectedFilter === eachvalue.label ? "#FF808B" : "#767676",
                  margin: "0 0.275em",
                  padding: "0.2em 0.575em",
                  border:
                    selectedFilter === eachvalue.label
                      ? "1px solid #FF808B"
                      : "",
                  borderRadius: "50px",
                  fontSize: "1em",
                  cursor: "pointer",
                }}
                key={index}
              >
                {eachvalue.label}
              </div>
            ))}
        </div>
      </div>
      <div className="chart-main-container">
        <div className="chart-container">
          <ResponsiveContainer width="55%" height={221}>
            <PieChart>
              <Pie
                data={props.skillGap||[]}
                innerRadius={0}
                outerRadius={96}
                startAngle={-270}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {props.skillGap.map((entry, index) => (
                  <Cell strokeWidth={index===0?8:0}  key={entry.name} fill={index===1?"#ff8c96":"#96ACF9"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="skill-legend">
          <div className="individual-legend">
            <CustomRadius background="#ff8c96"></CustomRadius>
            <div className="skill-legend-label">
              <div className="skill-label-value">
                {props.skillGap[1].value || 0}%
              </div>
              <div className="skill-label-key">skill gap</div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default CriticalGapAnalysis;
