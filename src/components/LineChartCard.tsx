import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";

const LineChart = () => {
    const defaultLineData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
                tension: 0.4
            }
        ]
    };
  const defaultLineOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };
  const [lineOptions, setLineOptions] =
    useState<ChartOptions>(defaultLineOptions);
  const [lineData, setLineData] = 
    useState<ChartData>(defaultLineData);

  return (
    <div className="">
      <div className="card">
        <Chart type="line" data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default LineChart;
