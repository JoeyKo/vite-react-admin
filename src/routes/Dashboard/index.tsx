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
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { ArrowUpOutlined } from '@ant-design/icons';

const formatter = (value: string | number) => <CountUp end={Number(value)} separator="," />;

function StatisticCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <Card bordered={false} style={{ width: '100%' }}>
      <Statistic
        title={title}
        value={value}
        precision={2}
        formatter={formatter}
        valueStyle={{ color: '#3f8600' }}
        prefix={<ArrowUpOutlined />}
      />
    </Card>
  )
}

export default function Dashboard() {
  const [lineData, setLineData] = useState<ChartData<"line", (number | ScatterDataPoint | null)[], unknown>>({
    labels: [], datasets: []
  });
  const [barData, setBarData] = useState<ChartData<"bar", (number | ScatterDataPoint | null)[], unknown>>({
    labels: [], datasets: []
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    <>
      <Row gutter={8}>
        <Col span={6}>
          <StatisticCard title="实时销售额" value={21000} />
        </Col>
        <Col span={6}>
          <StatisticCard title="实时销售额" value={21000} />
        </Col>
        <Col span={6}>
          <StatisticCard title="实时销售额" value={21000} />
        </Col>
        <Col span={6}>
          <StatisticCard title="实时销售额" value={21000} />
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: 25 }}>
        <Col span={12}>
          <Card>
            <Line
              options={options}
              width={"100%"}
              height={350}
              data={lineData}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Bar
              options={options}
              width={"100%"}
              height={350}
              data={barData}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}