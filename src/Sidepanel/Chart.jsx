import './Chart.css';
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, Legend, PieChart, Pie, Cell
} from "recharts";
import { toPng } from "html-to-image";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

function Chart() {
  const chartRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const fileName = location.state?.fileName;

  const [chartType, setChartType] = useState("bar");
  const [xAxisKey, setXAxisKey] = useState("");
  const [yAxisKey, setYAxisKey] = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) {
      navigate("/dashboardlayout/upload");
    }
  }, [data, navigate]);

  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  const handleGenerateChart = () => {
    if (!xAxisKey || !yAxisKey) {
      alert("Please select valid X and Y/Value fields.");
      return;
    }

    if (chartType === "bar" && xAxisKey === yAxisKey) {
      alert("X and Y Axis cannot be the same for Bar Chart.");
      return;
    }

    setShowChart(true);
  };

  const handleDownload = () => {
    if (!chartRef.current) return;
    toPng(chartRef.current).then((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "chart.png";
      link.click();
    });
  };

  const getPieChartData = (data, labelKey, valueKey) => {
    const isNumeric = data.every(item => !isNaN(Number(item[valueKey])));

    if (isNumeric) {
      return data;
    }

    const countMap = {};
    data.forEach(item => {
      const label = item[labelKey];
      countMap[label] = (countMap[label] || 0) + 1;
    });

    return Object.entries(countMap).map(([key, value]) => ({
      [labelKey]: key,
      [valueKey]: value
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📁 {fileName || "Excel Chart Generator"}</h2>

      <button
        onClick={() => navigate("/dashboardlayout/upload")}
      >
        ⬅ Back to Upload
      </button>

      <div style={{ marginBottom: 20 }}>
        <label>Chart Type: </label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>

        <label style={{ marginLeft: 20 }}>X-Axis: </label>
        <select value={xAxisKey} onChange={(e) => setXAxisKey(e.target.value)}>
          <option value="">-- Select --</option>
          {headers.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <label style={{ marginLeft: 20 }}>
          {chartType === "bar" ? "Y-Axis" : "Value Field"}:
        </label>
        <select value={yAxisKey} onChange={(e) => setYAxisKey(e.target.value)}>
          <option value="">-- Select --</option>
          {headers.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <button onClick={handleGenerateChart} style={{ marginLeft: 20 }}>
          Generate Chart
        </button>
      </div>

      {showChart && (
        <div ref={chartRef} className="chart">
          {chartType === "bar" ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} label={{ value: xAxisKey, position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: yAxisKey, angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey={yAxisKey} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={getPieChartData(data, xAxisKey, yAxisKey)}
                  dataKey={yAxisKey}
                  nameKey={xAxisKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {getPieChartData(data, xAxisKey, yAxisKey).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
          <button onClick={handleDownload} style={{ marginTop: 20 }}>
            📥 Download Chart as Image
          </button>
        </div>
      )}
    </div>
  );
}

export default Chart;
