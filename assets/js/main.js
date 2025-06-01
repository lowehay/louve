// main.js
// Core JS for Louve admin template
// Handles login form validation, password visibility toggle, and events

document.addEventListener('DOMContentLoaded', function () {
    // Louve Sidebar Collapse Toggle
    const sidebar = document.getElementById('louveSidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const body = document.body;
    function setSidebarCollapsed(collapsed) {
        if (collapsed) {
            sidebar.classList.add('louve-sidebar-collapsed');
            body.classList.add('sidebar-collapsed');
            sidebarToggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            sidebar.classList.remove('louve-sidebar-collapsed');
            body.classList.remove('sidebar-collapsed');
            sidebarToggleBtn.setAttribute('aria-expanded', 'true');
        }
    }
    // Collapse by default on mobile
    function handleSidebarOnResize() {
        if (window.innerWidth < 992) {
            setSidebarCollapsed(true);
        } else {
            setSidebarCollapsed(false);
        }
    }
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', function () {
            const isCollapsed = sidebar.classList.toggle('louve-sidebar-collapsed');
            body.classList.toggle('sidebar-collapsed');
            sidebarToggleBtn.setAttribute('aria-expanded', !isCollapsed);
        });
        window.addEventListener('resize', handleSidebarOnResize);
        handleSidebarOnResize();
    }

    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePassword.classList.toggle('fa-eye', !isPassword);
            togglePassword.classList.toggle('fa-eye-slash', isPassword);
        });
    }

    // Login form validation (demo)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = passwordInput.value.trim();
            // Basic validation (expand as needed)
            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }
            // Demo: Show success, replace with real auth logic later
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Please wait a moment',
                text: 'Redirecting to dashboard...',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didClose: () => {
                    // Redirect or load dashboard here
                    // window.location.href = '/dashboard.html';
                }
            });
        });
    }

    // ApexCharts - Louve Dashboard
    // Destroy existing charts if hot-reloaded
    if (window.salesOverviewChart && window.salesOverviewChart.destroy) {
        window.salesOverviewChart.destroy();
    }
    if (window.ordersBreakdownChart && window.ordersBreakdownChart.destroy) {
        window.ordersBreakdownChart.destroy();
    }

    // Sales Overview Area Chart
    var salesOptions = {
        chart: {
            type: 'area',
            height: 320,
            toolbar: { show: false },
            fontFamily: 'Public Sans, system-ui, sans-serif',
        },
        colors: ['#696cff'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        grid: { borderColor: '#eceef1', strokeDashArray: 4 },
        series: [{
            name: 'Sales',
            data: [1200, 1700, 1500, 2000, 1800, 2200, 2100, 2500, 2300, 2800, 2600, 3000]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { style: { colors: '#8b909a' } }
        },
        fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] }
        },
        tooltip: { y: { formatter: function (val) { return '$' + val.toLocaleString(); } } }
    };
    var salesChartEl = document.querySelector('#sales-overview-chart');
    if (salesChartEl && typeof ApexCharts !== 'undefined') {
        window.salesOverviewChart = new ApexCharts(salesChartEl, salesOptions);
        window.salesOverviewChart.render();
    }

    // Orders Breakdown Line Chart (Clean Style)
    var ordersOptions = {
        chart: {
            type: 'bar',
            height: 320,
            toolbar: { show: false },
            fontFamily: 'Public Sans, system-ui, sans-serif',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 8,
                barHeight: '60%',
                columnWidth: '50%',
                dataLabels: {
                    position: 'right'
                }
            }
        },
        colors: ['#696cff', '#00cfe8'],
        dataLabels: { enabled: false },
        grid: {
            show: false
        },
        series: [
            {
                name: 'Income',
                data: [320, 400, 350, 500, 420, 520]
            },
            {
                name: 'Earning',
                data: [430, 480, 510, 420, 610, 580]
            }
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: { style: { colors: '#b2b2c4', fontWeight: 500, fontSize: '15px' } },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            labels: { style: { colors: '#b2b2c4', fontWeight: 500, fontSize: '15px' } }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '15px',
            fontWeight: 500,
            labels: { colors: ['#696cff', '#00cfe8'] },
            markers: { width: 14, height: 14, radius: 8 }
        },
        tooltip: { y: { formatter: function (val) { return val.toLocaleString(); } } }
    };
    var ordersChartEl = document.querySelector('#orders-breakdown-chart');
    if (ordersChartEl && typeof ApexCharts !== 'undefined') {
        window.ordersBreakdownChart = new ApexCharts(ordersChartEl, ordersOptions);
        window.ordersBreakdownChart.render();
    }
});

// Total Income Sparkline Chart
var totalIncomeOptions = {
  chart: {
    type: 'bar',
    height: 220,
    toolbar: { show: true },
    dropShadow: {
      enabled: true,
      top: 4,
      left: 0,
      blur: 8,
      opacity: 0.12,
      color: '#696cff'
    },
    background: 'transparent'
  },
  series: [{
    name: 'Income',
    data: [3500, 11200, 5800, 4300, 6800, 12700, 10400, 13000, 6800, 9200, 12900, 13400]
  }],
  colors: ['#696cff'], // Louve/Sneat primary
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 8,
      distributed: false
    }
  },
  grid: {
    borderColor: '#f5f5f9',
    strokeDashArray: 0
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: { style: { colors: '#8b909a', fontWeight: 500, fontSize: '12px' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: { style: { colors: '#8b909a', fontWeight: 500, fontSize: '12px' } }
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function(val) { return '$' + val.toLocaleString(); }
    }
  }
};
  var totalIncomeChartEl = document.querySelector('#total-income-chart');
  if (totalIncomeChartEl && typeof ApexCharts !== 'undefined') {
    window.totalIncomeChart = new ApexCharts(totalIncomeChartEl, totalIncomeOptions);
    window.totalIncomeChart.render();
  }