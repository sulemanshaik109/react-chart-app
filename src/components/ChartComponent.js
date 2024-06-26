import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import chartData from '../data/chartData.json';
import TimeframeSelector from './TimeframeSelector';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  TimeScale
);

const ChartComponent = () => {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    setData(chartData)
  }, []);

  const handleTimeframeSelect = (timeframe) => {
    // Handle timeframe selection logic here
    console.log('Selected timeframe:', timeframe);
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">My Chart</h2>
      <TimeframeSelector onSelect={handleTimeframeSelect} />
      <Line
        data={{
          labels: data.map(item => item.timestamp),
          datasets: [
            {
              label: 'Value',
              data: data.map(item => item.value),
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default ChartComponent;