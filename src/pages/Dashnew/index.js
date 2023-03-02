import React from "react"
import ProgressBar from "../../components/dashnew/ProgressBar"
import { Data } from '../../components/dashnew/Data'
import PieChart from "../../components/dashnew/PieChart";
import DonutChart from "../../components/dashnew/DonutChart";
import Bar from "../../components/dashnew/Bar";
import { Chart } from "react-google-charts";

import { useState } from "react";
import { BarChart } from "recharts";


const Dashnew = () => {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div>
             <ProgressBar key={1} bgcolor={"#6a1b9a"} completed={60} />
             <PieChart />
             <DonutChart />
             <Bar />
        </div>
    )
}
export default Dashnew