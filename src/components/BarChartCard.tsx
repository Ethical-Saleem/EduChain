import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";
import { getCookie } from "@/app/utils/cookies";
import { Demo } from "../../types";
import { SchoolService } from "@/app/services/SchoolService";
import { useRouter, usePathname } from "next/navigation";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

const BarChart = ({ data }: any) => {

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
  const [lineData, setLineData] = useState<ChartData>();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(2023);
  const [fetching, setFetching] = useState(true);

  const router = useRouter();
  const pathName = usePathname();

  const updateChartData = (gradeData: { label: string; value: number }[]) => {
    const transformedData = transformGradeLabels(gradeData);
    const labels = transformedData.map((item) => item.label);
    const data = transformedData.map((item) => item.value);

    const updatedChartData: ChartData = {
      labels: labels,
      datasets: [
        {
          label: "No. Of Records by Grade",
          data: data,
          fill: false,
          backgroundColor: "#86490d",
          borderColor: "#fede57",
          borderRadius: 6,
          borderWidth: 2,
          hoverBackgroundColor: "#421e06",
          tension: 0.4,
          maxBarThickness: 30,
        },
      ],
    };

    setLineData(updatedChartData);
  };

  const transformGradeLabels = (gradeData: { label: string; value: number }[]) => {
    return gradeData.map((item) => {
      let newLabel = item.label;
      if (item.label === "SECOND CLASS (UPPER DIVISION) HONORS" || item.label === "SECOND CLASS (UPPER DIVISION) HONOURS") {
        newLabel = "SECOND CLASS UPPER";
      } else if (item.label === "SECOND CLASS (LOWER DIVISION) HONORS" || item.label === "SECOND CLASS (LOWER DIVISION) HONOURS") {
        newLabel = "SECOND CLASS LOWER";
      }
      return { label: newLabel, value: item.value };
    });
  };

  useEffect(() => {
    const user = getCookie("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setCurrentUser(parsedUser);
        getYearsUploaded(parsedUser.school.id);
        getSummaryData(parsedUser.school.id);
      }
    }
  }, []);

  useEffect(() => {
    getSummaryFilteredData()
  }, [currentYear]);

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

  const getSummaryData = async (id: number) => {
    setFetching(true);

    try {
      const res = await SchoolService.dispatchFetchRecordSummaryByGrade(
        id,
        currentYear
      );
      if (res) {
        console.log("summary-res-bar", res);
        setFetching(false);
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

  const getSummaryFilteredData = async () => {
    setFetching(true);

    try {
      const res = await SchoolService.dispatchFetchRecordSummaryByGrade(
        currentUser?.school.id,
        currentYear
      );
      if (res) {
        console.log("summary-res-bar", res);
        setFetching(false);
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
    <div className="h-[400px]">
      <div className="card">
        <div className="w-full text-right">
          <Dropdown
            value={currentYear}
            onChange={(e: DropdownChangeEvent) => setCurrentYear(e.value)}
            options={years}
          />
        </div>
        {fetching && (
            <div className="text-center">
            <span className="pi pi-spin pi-spinner" style={{ fontSize: "2.5rem" }}></span>
        </div>
        )}
        {!fetching && (
            <Chart type="bar" data={lineData} options={lineOptions} />
        )}
      </div>
    </div>
  );
};

export default BarChart;
