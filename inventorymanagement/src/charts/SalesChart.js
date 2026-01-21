import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesChart({ sales }) {
  const chartData = {
    labels: sales.map((s) =>
      new Date(s.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Sales Amount",
        data: sales.map((s) => s.grandTotal),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false
      }
    ]
  };

  return <Line data={chartData} />;
}

export default SalesChart;
