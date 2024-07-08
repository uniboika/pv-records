import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Utils } from "./Utils";

export default function BarChart() {
  const chartRef = useRef(null);

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(25, 118, 210)",
        borderColor: "rgb(25, 118, 210)",
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChart = new Chart(chartRef.current, config);
      return () => myChart.destroy(); // Cleanup on unmount
    }
  }, []);

  return (
    <div style={{height:"700px"}}>
      <canvas ref={chartRef} className="h-50"></canvas>
    </div>
  );
}
