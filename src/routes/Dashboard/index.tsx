import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartData,
  ScatterDataPoint,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
import { faker } from '@faker-js/faker';
import { Col, Row } from 'antd';

export default function Dashboard() {
  const [lineData, setLineData] = useState<ChartData<"line", (number | ScatterDataPoint | null)[], unknown>>({
    labels: [], datasets: []
  });
  const [barData, setBarData] = useState<ChartData<"bar", (number | ScatterDataPoint | null)[], unknown>>({
    labels: [], datasets: []
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  useEffect(() => {
    setLineData({
      labels,
      datasets: [
        {
          fill: true,
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
    setBarData({
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  }, []);

  return (
    <Row>
      <Col span={12}>
      <Line options={options} data={lineData} />
      </Col>
      <Col span={12}>
      <Bar options={options} data={barData} />
      </Col>
    </Row>
  )
}