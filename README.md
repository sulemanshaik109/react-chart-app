# My Chart Application

This project is a web application that visualizes time-series data using Chart.js. Users can interact with the chart by zooming, panning, and switching between daily, weekly, and monthly data views.

## Features

- **Interactive Line Chart**: Visualize time-series data with interactive features.
- **Timeframe Selection**: Switch between daily, weekly, and monthly data views.
- **Zoom and Pan**: Use mouse wheel and pinch to zoom and pan through the data.
- **Tooltips**: Display detailed information on hover.

## Technologies Used

- React
- Chart.js
- chartjs-plugin-zoom

## Screenshot

<div style="text-align: center;">
     <img src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1719481439/Screenshot_107_cj91dw.png" alt="chart-page">
</div>
<br/>

## Installation

To run this project locally, follow these steps:

- Clone the repository:
   ```
   git clone https://github.com/sulemanshaik109/react-chart-app.git
  ```
- Install Dependencies
  ```
  npm install
  ```
- Run the app
  ```
  npm start
  ```
- Navigate to `http://localhost:3000` to view the application in the browser.

## Project Structure

- `src/components`: Contains React components used in the application.
  - `ChartComponent.js`: The main chart component that renders the line chart.
  - `TimeframeSelector.js`: Component for selecting the timeframe (daily, weekly, monthly).
- `src/utils`: Utility functions for data aggregation.
  - `aggregateData.js`: Functions to aggregate data into weekly and monthly views.
- `src/data`: Contains the sample data in JSON format.
  - `chartData.json`: Sample data used for the chart.

## Usage

### Timeframe Selection

Use the dropdown menu to select the timeframe for viewing the data:

- **Daily**: View data points for each day.
- **Weekly**: Aggregate data points into weekly averages.
- **Monthly**: Aggregate data points into monthly averages.

### Zoom and Pan

- **Zoom**: Use the mouse wheel or pinch on touch devices to zoom in and out.
- **Pan**: Click and drag to pan across the chart.

### Reset Zoom

Click the "Reset Zoom" button to reset the chart to its original zoom level.


### Resources

<details>
<summary>Colors</summary>
<br/>

<div style="background-color: #f0f8ff; width: 150px; padding: 10px; color: white">Hex: #f0f8ff</div>
<div style="background-color: #0b4545; width: 150px; padding: 10px; color: white">Hex: #0b4545</div>
<div style="background-color: #bbf4f4; width: 150px; padding: 10px; color: white">Hex: #bbf4f4</div>
<div style="background-color: #005c5c; width: 150px; padding: 10px; color: black">Hex: #005c5c</div>
<div style="background-color: #ffffff; width: 150px; padding: 10px; color: black">Hex: #ffffff</div>

</details>

# Show Your Support

Give a ⭐️ if you like this project!
