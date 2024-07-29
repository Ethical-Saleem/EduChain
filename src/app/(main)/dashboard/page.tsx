"use client";

import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { withAuth } from "@/app/hoc/WithAuth";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";
import LineChart from "@/components/LineChartCard";
import { SchoolService } from "@/app/services/SchoolService";
import { getCookie } from "@/app/utils/cookies";
import { Demo } from "../../../../types";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarChart from "@/components/BarChartCard";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);
  const [years, setYears] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const user = getCookie("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setCurrentUser(parsedUser);
        getYearsUploaded(parsedUser.school.id);
        getTotalCount(parsedUser.school.id);
      }
    }
  }, []);

  const getYearsUploaded = async (id: number) => {
    try {
      const res = await SchoolService.dispatchFetchUploadedRecordYears(id);
      if (res) {
        setYears(res);
        console.log("years-res", res);
      }
    } catch (error) {
      console.log("years-error", error);
    }
  };

  const getTotalCount = async (id: number) => {
    try {
      const res = await SchoolService.dispatchFetchRecordUploadedCount(id);
      if (res) {
        setTotalCount(res);
        console.log("years-res", res);
      }
    } catch (error) {
      console.log("years-error", error);
    }
  };

  return (
    <main className="px-3 lg:px-0">
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
                <span className="block text-500 font-medium mb-3">Total Records Published</span>
                <div className="font-semibold text-uiyellow-700 text-2xl">{ totalCount }</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-uisky-200 border-round"
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
                <span className="block text-500 font-medium mb-3">No. of Years Published</span>
                <div className="font-semibold text-uiyellow-700 text-2xl">{ years.length }</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-uisky-200 ring-2 ring-uisky-800 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 xl:col-6">
          <BarChart />
        </div>
        <div className="col-12 xl:col-6">
          <LineChart />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default withAuth(Dashboard);
