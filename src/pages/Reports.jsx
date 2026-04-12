import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Reports() {

  // 🔥 Weekly Data
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [120, 200, 150, 300, 250, 400, 350],
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd",
        tension: 0.4,
      },
    ],
  };

  // 🔥 Yearly Data (Monthly basis)
  const yearlyData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Yearly Sales",
        data: [800, 900, 1200, 1100, 1500, 1400, 1700, 1600, 1800, 2000, 2200, 2500],
        borderColor: "#10b981",
        backgroundColor: "#6ee7b7",
        tension: 0.4,
      },
    ],
  };

  const stats = [
    { title: "Total Sales", value: "$5000", color: "bg-blue-500" },
    { title: "Today Sales", value: "$320", color: "bg-green-500" },
    { title: "Monthly Sales", value: "$1200", color: "bg-purple-500" },
    { title: "Orders", value: "120", color: "bg-orange-500" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">📊 Reports & Analytics</h1>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl text-white shadow-lg hover:scale-105 transition ${s.color}`}
          >
            <h3 className="text-sm">{s.title}</h3>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* 🔥 GRAPH SECTION */}
      <div className="grid grid-cols-2 gap-4">

        {/* Weekly */}
        <div className="bg-white p-4 rounded-xl shadow h-[280px]">
          <h2 className="text-md font-semibold mb-2">Weekly Sales</h2>

          <Line
            data={weeklyData}
            options={{ maintainAspectRatio: false }}
          />
        </div>

        {/* Yearly */}
        <div className="bg-white p-4 rounded-xl shadow h-[280px]">
          <h2 className="text-md font-semibold mb-2">Yearly Sales</h2>

          <Line
            data={yearlyData}
            options={{ maintainAspectRatio: false }}
          />
        </div>

      </div>

    </div>
  );
}