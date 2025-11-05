import React, { useState } from "react";
import Plot from "react-plotly.js";

// Simple 2D charts
const simpleCharts = ["2D Bar", "2D Line", "2D Scatter", "2D Pie", "2D Doughnut", "2D Radar", "2D PolarArea"];
// Advanced/3D charts
const advancedCharts = ["3D Scatter", "3D Line", "3D Surface"];

const PredictionChart = ({ prediction, userInput }) => {
  const [chartType, setChartType] = useState("2D Bar");

  if (!userInput || prediction === null) return null;

  const labels = Object.keys(userInput);
  const inputValues = Object.values(userInput);
  const outputValues = Array(labels.length).fill(prediction);

  const getData = () => {
    try {
      let data = [];
      switch (chartType) {
        case "2D Bar":
          data = [
            { x: labels, y: inputValues, type: "bar", name: "User Input" },
            { x: labels, y: outputValues, type: "bar", name: "Prediction" },
          ];
          break;
        case "2D Line":
          data = [
            { x: labels, y: inputValues, type: "scatter", mode: "lines+markers", name: "User Input" },
            { x: labels, y: outputValues, type: "scatter", mode: "lines+markers", name: "Prediction" },
          ];
          break;
        case "2D Scatter":
          data = [{ x: inputValues, y: outputValues, type: "scatter", mode: "markers", name: "Input vs Prediction" }];
          break;
        case "2D Pie":
          data = [{ labels: labels, values: inputValues, type: "pie", name: "User Input" }];
          break;
        case "2D Doughnut":
          data = [{ labels: labels, values: inputValues, type: "pie", hole: 0.4, name: "User Input" }];
          break;
        case "2D Radar":
          data = [
            { r: inputValues, theta: labels, type: "scatterpolar", fill: "toself", name: "User Input" },
            { r: outputValues, theta: labels, type: "scatterpolar", fill: "toself", name: "Prediction" },
          ];
          break;
        case "2D PolarArea":
          data = [{ r: inputValues, theta: labels, type: "barpolar", name: "User Input" }];
          break;
        case "3D Scatter":
          data = [
            {
              x: inputValues,
              y: outputValues,
              z: inputValues.map((v, i) => v + outputValues[i]),
              type: "scatter3d",
              mode: "markers",
              marker: { size: 5, color: inputValues, colorscale: "Viridis" },
              name: "3D Scatter",
            },
          ];
          break;
        case "3D Line":
          data = [
            {
              x: labels,
              y: inputValues,
              z: outputValues,
              type: "scatter3d",
              mode: "lines+markers",
              line: { width: 4 },
              name: "3D Line",
            },
          ];
          break;
        case "3D Surface":
          const z = inputValues.map(() => outputValues);
          data = [{ z, type: "surface", name: "3D Surface" }];
          break;
        default:
          return null; // Invalid chart type
      }
      return data;
    } catch (err) {
      return null;
    }
  };

  const data = getData();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="font-semibold">Select Chart Type:</label>
        <select className="border px-2 py-1 rounded" value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <optgroup label="Simple 2D Charts">
            {simpleCharts.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </optgroup>
          <optgroup label="Advanced/3D Charts">
            {advancedCharts.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {!data && (
        <div className="bg-red-500 text-white p-2 rounded mb-2 text-center">
          ⚠️ This chart cannot be rendered with the current data.
        </div>
      )}

      {data && (
        <div style={{ width: "100%", height: "400px" }}>
          <Plot
            data={data}
            layout={{
              autosize: true,
              title: "Prediction vs User Input",
              margin: { t: 50, l: 50, r: 50, b: 50 },
            }}
            config={{ responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default PredictionChart;
