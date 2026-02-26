// Mock Data Set for Complaints
const mockComplaints = [
    { id: 'CMP-2026-0012', name: 'Ramesh Singh', block: 'Medininagar', dept: 'Electricity', status: 'Pending', date: '26 Feb 2026' },
    { id: 'CMP-2026-0011', name: 'Sanjay Yadav', block: 'Chainpur', dept: 'Health', status: 'In Progress', date: '25 Feb 2026' },
    { id: 'CMP-2026-0010', name: 'Anita Devi', block: 'Patan', dept: 'Police', status: 'Resolved', date: '25 Feb 2026' },
    { id: 'CMP-2026-0009', name: 'Mohammad Ali', block: 'Hussainabad', dept: 'Education', status: 'Resolved', date: '24 Feb 2026' },
    { id: 'CMP-2026-0008', name: 'Vikash Tiwari', block: 'Palamu', dept: 'Water', status: 'Pending', date: '24 Feb 2026' },
    { id: 'CMP-2026-0007', name: 'Rani Kumari', block: 'Bishrampur', dept: 'Health', status: 'Resolved', date: '23 Feb 2026' },
];

function getStatusBadge(status) {
    if (status === 'Pending') return `<span class="badge-status badge-pending"><i class="fas fa-clock"></i> Pending</span>`;
    if (status === 'Resolved') return `<span class="badge-status badge-resolved"><i class="fas fa-check-circle"></i> Resolved</span>`;
    return `<span class="badge-status badge-progress"><i class="fas fa-spinner fa-spin"></i> In Progress</span>`;
}

// Populate Tables
function populateTables() {
    const recentBody = document.getElementById('recentComplaintsBody');
    const allBody = document.getElementById('allComplaintsBody');

    // Recent 4 for Dashboard
    let recentHTML = '';
    mockComplaints.slice(0, 4).forEach(c => {
        recentHTML += `
            <tr>
                <td><strong>${c.id}</strong></td>
                <td>${c.name}</td>
                <td>${c.dept}</td>
                <td>${c.date}</td>
                <td>${getStatusBadge(c.status)}</td>
                <td>
                    <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    });
    if (recentBody) recentBody.innerHTML = recentHTML;

    // All Complaints for Complaints Section
    let allHTML = '';
    mockComplaints.forEach(c => {
        allHTML += `
            <tr>
                <td><strong>${c.id}</strong></td>
                <td>${c.name}</td>
                <td>${c.block}</td>
                <td>${c.dept}</td>
                <td>${getStatusBadge(c.status)}</td>
                <td>${c.date}</td>
                <td>
                    <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    });
    if (allBody) allBody.innerHTML = allHTML;
}

// Navigation & Sidebar Logic
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.page-section');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('logout-btn')) return;
            e.preventDefault();

            // Active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Switch sections
            const target = link.getAttribute('data-target');
            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === target) {
                    sec.classList.add('active');
                }
            });

            // Mobile: Close sidebar after click
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
}

// Chart.js Setup
function initCharts() {
    const ctx1 = document.getElementById('complaintsChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                datasets: [{
                    label: 'Total Complaints',
                    data: [120, 190, 150, 290, 210, 325],
                    borderColor: '#0b5c3b',
                    backgroundColor: 'rgba(11, 92, 59, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const ctx2 = document.getElementById('deptChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Police', 'Health', 'Education', 'Water', 'Electricity'],
                datasets: [{
                    data: [35, 20, 15, 20, 10],
                    backgroundColor: ['#0b5c3b', '#d4af37', '#1565c0', '#00bcd4', '#ff9933'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter' } } }
                },
                cutout: '70%'
            }
        });
    }
}

// Drag & Drop Upload Mock
function initUpload() {
    const area = document.getElementById('uploadArea');
    if (!area) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        area.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }

    ['dragenter', 'dragover'].forEach(eventName => {
        area.addEventListener(eventName, () => area.style.borderColor = '#d4af37', false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        area.addEventListener(eventName, () => area.style.borderColor = '#e2e8f0', false);
    });

    area.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        if (files.length > 0) {
            alert(`Ready to upload: ${files[0].name}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    populateTables();
    initCharts();
    initUpload();
});
