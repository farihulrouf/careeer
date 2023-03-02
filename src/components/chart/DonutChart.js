import { Chart } from "react-google-charts";
import React from "react";
export const data = [
    ["Task", "Hours per Day"],
    ["C1 = Beginner", 11],
    ["C2 = Intermediete", 2],
    ["C3 = Expert", 2],
  ];
  
  export const options = {
    pieHole: 0.4,
    is3D: false,
  };
const DonutChart = () => {
    return (
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={data}
          options={options}
        />
      );
}
export default DonutChart