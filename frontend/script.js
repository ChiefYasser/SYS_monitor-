import { Chart } from "@/components/ui/chart"
// Chart.js configuration
const chartDefaults = {
  font: {
    family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    size: 11,
  },
  color: "#666666",
}

Chart.defaults.set(chartDefaults)

// Revenue Chart
const revenueCtx = document.getElementById("revenueChart").getContext("2d")
new Chart(revenueCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Actual Revenue",
        data: [4000, 3000, 2000, 2780, 1890, 2390],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Forecast",
        data: [2400, 1398, 9800, 3908, 4800, 3800],
        borderColor: "#0ea5e9",
        borderDash: [5, 5],
        borderWidth: 2.5,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#0ea5e9",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#999",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#999",
        },
      },
    },
  },
})

// User Activity Chart
const userCtx = document.getElementById("userChart").getContext("2d")
new Chart(userCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users",
        data: [2400, 2210, 2290, 2000, 2181, 2500],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.15)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#4f46e5",
      },
      {
        label: "Inactive Users",
        data: [1200, 1290, 1000, 1108, 1100, 900],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.15)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#06b6d4",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#999",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#999",
        },
      },
    },
  },
})

// Performance Pie Chart
const performanceCtx = document.getElementById("performanceChart").getContext("2d")
new Chart(performanceCtx, {
  type: "doughnut",
  data: {
    labels: ["CPU", "Memory", "Disk", "Network"],
    datasets: [
      {
        data: [67, 45, 82, 34],
        backgroundColor: [
          "rgba(79, 70, 229, 0.8)",
          "rgba(6, 182, 212, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderColor: "#f9f9f6",
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
        },
      },
    },
  },
})
