document.addEventListener("DOMContentLoaded", () => {
  // Placeholder dynamic stats
  const stats = {
    totalUsers: 1520,
    totalTickets: 3678,
    totalRevenue: 1254000,
    activeDraws: 4
  };

  document.getElementById("totalUsers").textContent = stats.totalUsers;
  document.getElementById("totalTickets").textContent = stats.totalTickets;
  document.getElementById("totalRevenue").textContent = `₦${stats.totalRevenue.toLocaleString()}`;
  document.getElementById("activeDraws").textContent = stats.activeDraws;
});



// Charts placeholder
const usersChartCtx = document.getElementById('usersChart').getContext('2d');
const ticketsChartCtx = document.getElementById('ticketsChart').getContext('2d');
const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');

const usersChart = new Chart(usersChartCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'New Users',
            data: [12, 19, 14, 20, 25, 22, 30],
            backgroundColor: 'rgba(0,102,255,0.2)',
            borderColor: 'rgba(0,102,255,1)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

const ticketsChart = new Chart(ticketsChartCtx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Tickets Sold',
            data: [50, 75, 60, 80, 120, 90, 150],
            backgroundColor: 'rgba(0,102,255,0.6)'
        }]
    },
    options: { responsive: true }
});

const revenueChart = new Chart(revenueChartCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Revenue (₦)',
            data: [5000, 8000, 7000, 12000, 15000, 13000, 20000],
            backgroundColor: 'rgba(0,204,102,0.2)',
            borderColor: 'rgba(0,204,102,1)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: { responsive: true }
});



// Simple admin login (placeholder)
// In real project, replace with backend authentication & hashing
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Demo credentials
    if(username === "admin" && password === "admin123") {
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful!";
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Invalid credentials!";
    }
  });
}


