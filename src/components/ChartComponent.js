import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';
import chartData from '../data/chartData.json';
import TimeframeSelector from './TimeframeSelector';
import { aggregateWeeklyData, aggregateMonthlyData } from '../utils/aggregateData';
import '../styles/ChartComponent.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  TimeScale,
  zoomPlugin
);

const ChartComponent = () => {
  const [data, setData] = useState(chartData);
  const [timeframe, setTimeframe] = useState('daily');
  const chartRef = useRef(null);

  useEffect(() => {
    if (timeframe === "weekly") {
      setData(aggregateWeeklyData(chartData));
    } else if (timeframe === "monthly") {
      setData(aggregateMonthlyData(chartData));
    } else {
      setData(chartData);
    }
  }, [timeframe]);

  const updatedData = {
    labels: data.map(item => new Date(item.timestamp).toDateString()),
    datasets: [{
      label: 'Value',
      data: data.map(item => item.value),
      borderColor: '#4bc0c0',
    }],
  };

  const handleTimeframeSelect = (selectedTimeframe) => {
    setTimeframe(selectedTimeframe);
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="chart-container">
      <TimeframeSelector onSelect={handleTimeframeSelect} selectedTimeframe={timeframe} />
      <Line
        data={updatedData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
            },
            tooltip: {
              enabled: true,
              mode: 'nearest',
              intersect: false,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw.toFixed(2);
                  return label;
                },
                title: function(tooltipItems) {
                  const timestamp = data[tooltipItems[0].dataIndex].timestamp;
                  return `Timestamp: ${new Date(timestamp).toDateString()}`;
                },
              },
            },
          },
        }}
        ref={chartRef}
      />
      <button className="reset-zoom-btn" onClick={resetZoom}>Reset Zoom</button>
    </div>
  );
};

export default ChartComponent;
