import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";
import { getCookie } from "@/app/utils/cookies";
import { Demo } from "../../types";
import { SchoolService } from "@/app/services/SchoolService";
import { useRouter, usePathname } from "next/navigation";

const LineChart = ({ data }: any) => {
  const defaultLineData: ChartData = {
    labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
    datasets: [
      {
        label: "No. Of Records by Year",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "#2f4860",
        borderColor: "#2f4860",
        tension: 0.4,
      },
    ],
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
  const [lineData, setLineData] = useState<ChartData>(defaultLineData);
  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);
  const [fetching, setFetching] = useState(true);

  const router = useRouter();
  const pathName = usePathname();

  const updateChartData = (gradeData: { label: string; value: number }[]) => {
    const labels = gradeData.map((item) => item.label);
    const data = gradeData.map((item) => item.value);

    const updatedChartData: ChartData = {
      labels: labels,
      datasets: [
        {
          label: "No. Of Records by Year",
          data: data,
          fill: false,
          backgroundColor: "#2f4860",
          borderColor: "#2f4860",
          tension: 0.4,
        },
      ],
    };

    setLineData(updatedChartData);
  };

  useEffect(() => {
    const user = getCookie("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setCurrentUser(parsedUser);
        getSummaryData(parsedUser.school.id);
      }
    }
  }, []);

  const getSummaryData = async (id: number) => {
    setFetching(true);

    try {
      const res = await SchoolService.dispatchFetchRecordSummaryByYear(id);
      if (res) {
        console.log("summary-res", res);
        setFetching(false)
        updateChartData(res);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response?.status === 401) {
          router.replace(
            `/login?redirect=${encodeURIComponent(
              pathName
            )}&message=${`Session expired. Please sign in again.`}`
          );
        }
        if (error.response?.status === 403) {
          router.push("/403");
        } else {
          console.log("line-data-error", error.response.data.message);
        }
      } else if (error.message) {
        console.log("line-data-error", error.message);
      } else {
        console.log("line-data-error", error);
      }
      setFetching(false);
    }
  };

  return (
    <div className="">
      <div className="card">
        {fetching && (
            <div className="text-center">
            <span className="pi pi-spin pi-spinner" style={{ fontSize: "2.5rem" }}></span>
        </div>
        )}
        {!fetching && (
            <Chart type="line" data={lineData} options={lineOptions} />
        )}
      </div>
    </div>
  );
};

export default LineChart;
