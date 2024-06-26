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
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Value',
      data: [],
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
    }],
  });
  const [timeframe, setTimeframe] = useState('daily');
  const [clickedData, setClickedData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Example aggregation functions; replace with your own logic
    if (timeframe === "weekly") {
      setData(aggregateWeeklyData({
        labels: chartData.map(item => item.timestamp),
        datasets: [{
          label: 'Value',
          data: chartData.map(item => item.value),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
        }],
      }));
    } else if (timeframe === "monthly") {
      setData(aggregateMonthlyData({
        labels: chartData.map(item => item.timestamp),
        datasets: [{
          label: 'Value',
          data: chartData.map(item => item.value),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
        }],
      }));
    } else {
      setData({
        labels: chartData.map(item => item.timestamp),
        datasets: [{
          label: 'Value',
          data: chartData.map(item => item.value),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
        }],
      });
    }
  }, [timeframe]);

  const handleTimeframeSelect = (selectedTimeframe) => {
    setTimeframe(selectedTimeframe);
  };

  const handlePointClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedDatasetIndex = elements[0].datasetIndex;
      const clickedDataset = data.datasets[clickedDatasetIndex];
      const clickedValue = clickedDataset.data[clickedIndex];

      // Example: Displaying clicked data in console
      console.log(`Clicked Data: ${clickedValue}`);

      // Set state to trigger UI update with clicked data details
      setClickedData(clickedValue);
    }
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };


  return (
    <div className="chart-container">
      <h2 className="chart-title">My Chart</h2>
      <TimeframeSelector onSelect={handleTimeframeSelect} />
      <button className="reset-zoom-btn" onClick={resetZoom}>Reset Zoom</button>
      <Line
        data={data}
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
          },
          onClick: handlePointClick, // Attach click handler
        }}
        ref={chartRef}
      />
      {clickedData && (
        <div className="clicked-data-details">
          {/* Example: Display clicked data details */}
          <p>Clicked Data: {clickedData}</p>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
