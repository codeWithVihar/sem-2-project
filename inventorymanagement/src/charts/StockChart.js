import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function StockChart({ data }) {
  const chartData = {
    labels: data.map((p) => p.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: data.map((p) => p.stock),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  return <Bar data={chartData} />;
}

export default StockChart;
