import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@strapi/design-system";

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
    responsive: true,
    // aspectRatio: 1,
  };

  return (
    <Card>
      <CardHeader style={{ height: '20%' }}>
        <Typography style={{ alignItems: 'center' }} variant="alpha">Devices</Typography>
        </CardHeader>
      <CardContent style={{height: '80%'}}>
        <Doughnut
          data={data}
          options={options}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        />
      </CardContent>
    </Card>
  );
}

export default DevicesChart;