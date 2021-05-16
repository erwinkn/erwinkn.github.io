import { BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    BoxPlotController,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "'Fira Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
Chart.defaults.plugins.tooltip.enabled = false;

window.Chart = Chart

window.hexToRgb = function (hex) {
  var hex_split = hex.match(/.{1,2}/g);
  return hex_split.map(val => parseInt(val, 16));
}

window.hexToRgba = function(hex, opacity) {
  var hexCode = hex.replace('#', '');
  var rgb = hexToRgb(hexCode);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}

window.downloadChart = function(chartId) {
  const a = document.createElement('a');
  const chartCanvas = document.getElementById(chartId);
  a.href = chartCanvas.toDataURL("image/png");
  a.download = chartId + ".png";
  a.click();
}

