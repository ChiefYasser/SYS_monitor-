
Chart.defaults.font.family = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = "#666666";


let perfChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

async function initDashboard() {
 
    await loadRevenueChart();
    await loadStatsCards();
    
  
    renderUserChart();

    initPerformanceChart(); 
    setInterval(updateSystemStatus, 2000);
    updateSystemStatus(); // Run immediate
}


async function loadRevenueChart() {
    try {
        const response = await fetch('/api/revenue');
        const dbData = await response.json();

        const labels = dbData.map(item => item.month);
        const actualData = dbData.map(item => item.amount);

       
        const forecastData = actualData.map(val => val * 1.2); 

        const ctx = document.getElementById("revenueChart").getContext("2d");
        
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Actual Revenue",
                        data: actualData, // FROM DB
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
                        data: forecastData, // Calculated
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
                        labels: { padding: 15, usePointStyle: true },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "rgba(0, 0, 0, 0.05)", drawBorder: false },
                        ticks: { color: "#999" },
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: "#999" },
                    },
                },
            },
        });
    } catch (err) {
        console.error("Error loading revenue:", err);
    }
}


function renderUserChart() {
    const ctx = document.getElementById("userChart").getContext("2d");
    new Chart(ctx, {
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
                    labels: { padding: 15, usePointStyle: true },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: "rgba(0, 0, 0, 0.05)", drawBorder: false },
                    ticks: { color: "#999" },
                },
                x: {
                    grid: { display: false },
                    ticks: { color: "#999" },
                },
            },
        },
    });
}


function initPerformanceChart() {
    const ctx = document.getElementById("performanceChart").getContext("2d");
    perfChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["CPU", "Memory", "Disk", "Network"],
            datasets: [
                {
                    data: [0, 0, 0, 0], // Starts empty, fills via API
                    backgroundColor: [
                        "rgba(79, 70, 229, 0.8)", // Purple
                        "rgba(6, 182, 212, 0.8)", // Cyan
                        "rgba(245, 158, 11, 0.8)", // Orange
                        "rgba(236, 72, 153, 0.8)", // Pink
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
                    labels: { padding: 15, usePointStyle: true },
                },
            },
        },
    });
}

async function updateSystemStatus() {
    try {
        const response = await fetch('/api/system');
        const data = await response.json();

        // 1. Update HTML Bars
        const items = document.querySelectorAll('.status-item');
        const updateBar = (idx, val) => {
            if(items[idx]) {
                items[idx].querySelector('.percentage').innerText = val + '%';
                items[idx].querySelector('.progress-fill').style.width = val + '%';
            }
        };
        updateBar(0, data.cpu);
        updateBar(1, data.memory);
        updateBar(2, data.disk);
        updateBar(3, data.network);

        // 2. Update Pie Chart (Real-time animation)
        if (perfChartInstance) {
            perfChartInstance.data.datasets[0].data = [
                data.cpu, 
                data.memory, 
                data.disk, 
                data.network
            ];
            perfChartInstance.update();
        }

    } catch (err) {
        console.error("System monitor error:", err);
    }
}


async function loadStatsCards() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        const cards = document.querySelectorAll('.stat-card .stat-content');

        data.forEach((stat, index) => {
            if (cards[index]) {
                const card = cards[index];
                card.querySelector('.stat-label').innerText = stat.label;
                card.querySelector('.stat-value').innerText = stat.value;
                const changeElem = card.querySelector('.stat-change');
                changeElem.innerText = stat.change;
                changeElem.style.color = stat.change.includes('+') ? '#10b981' : '#ef4444';
            }
        });
    } catch (err) { console.error(err); }
}