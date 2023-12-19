import React from "react";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarController, BarElement);

const EnergyChart = ({ energyData, total }) => {
  const totalStats = energyData.reduce((sum, start) => sum + start.base_stat, 0);
  const boxCount = Math.ceil(totalStats / total);
  const filledBoxes = Math.floor(totalStats / total);


  return (
    <>
      <div>
        {Array.from({ length: boxCount }, (_, index) => (
          <div
            key={index}
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: index < filledBoxes ? "green" : "grey",
              marginRight: '5px'
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default EnergyChart;
