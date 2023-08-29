import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Card } from "@strapi/design-system";

interface Device {
  name: string;
  value: number;
}

const DevicesChart = ({ devices }: { devices: Device[] }) => {
  const data = {
    labels: devices.map((device) => device.name),
    datasets: [
      {
        label: "Devices",
        data: devices.map((device) => device.value),
        backgroundColor: ["#003049", "#D62828", "#F77F00", "#FCBF49"],
        hoverBackgroundColor: ["#003049", "#D62828", "#F77F00", "#FCBF49"],
      },
    ],
  };

  const options: any = {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "white",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card style={{ width: "100%", height: "100%", padding: '1em' }}>
      <Doughnut
        data={data}
        options={options}
      />
    </Card>
  );
}

export default DevicesChart;