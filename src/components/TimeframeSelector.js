import React from 'react';

const TimeframeSelector = ({ selectedTimeframe, onSelect }) => (
  <div>
    <select
        value={selectedTimeframe}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
  </div>
);

export default TimeframeSelector;
