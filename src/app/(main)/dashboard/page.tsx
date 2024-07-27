"use client";

import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { withAuth } from "@/app/hoc/WithAuth";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";
import { Card } from "primereact/card";

const lineData: ChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "#86490d",
      borderColor: "#fede57",
      borderRadius: 6,
      borderWidth: 2,
      hoverBackgroundColor: "#421e06",
      tension: 0.4,
      maxBarThickness: 30,
    }
  ],
};

const Dashboard = () => {
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

  return (
    <main className="px-3 lg:px-4">
      <p
        className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
      >
        <strong>Welcome to your dashboard</strong>
      </p>
      <div className="grid">
        <div className="col-12 l:col-6 xl:col-4">
          <div className="card">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Records Published</span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 l:col-6 xl:col-4">
          <div className="card">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Orders</span>
                <div className="font-medium text-uiyellow-950 text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 l:col-6 xl:col-4">
          <div className="card rounded-md ring-2 ring-uiyellow-400">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Orders</span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-uisky-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 xl:col-6">
          <div className="card">
            <Chart type="bar" data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Dashboard);
