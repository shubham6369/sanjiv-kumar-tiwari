import { db, collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from './firebase-config.js';

function getStatusBadge(status) {
    if (status === 'Pending') return `<span class="badge-status badge-pending"><i class="fas fa-clock"></i> Pending</span>`;
    if (status === 'Resolved') return `<span class="badge-status badge-resolved"><i class="fas fa-check-circle"></i> Resolved</span>`;
    return `<span class="badge-status badge-progress"><i class="fas fa-spinner fa-spin"></i> In Progress</span>`;
}

// Global functions so they can be triggered from HTML buttons
window.editComplaint = async (id, currentStatus) => {
    const newStatus = prompt("Enter new status (Pending, In Progress, Resolved):", currentStatus);
    if (!newStatus || newStatus === currentStatus) return;
    try {
        await updateDoc(doc(db, "complaints", id), { status: newStatus });
    } catch (e) { console.error("Error updating", e); }
};

window.deleteComplaint = async (id) => {
    if (!confirm("Are you sure you want to delete this complaint?")) return;
    try {
        await deleteDoc(doc(db, "complaints", id));
    } catch (e) { console.error("Error deleting", e); }
};

// Populate Tables Live Info
function listenToComplaints() {
    const recentBody = document.getElementById('recentComplaintsBody');
    const allBody = document.getElementById('allComplaintsBody');

    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        let allHTML = '';
        let recentHTML = '';
        let rowCount = 0;

        snapshot.forEach((docSnapshot) => {
            const c = docSnapshot.data();
            const docId = docSnapshot.id;

            const row = `
                <tr>
                    <td><strong>${c.id}</strong></td>
                    <td>${c.name}</td>
                    <td>${c.block || 'N/A'}</td>
                    <td>${c.dept}</td>
                    <td>${getStatusBadge(c.status)}</td>
                    <td>${c.date}</td>
                    <td>
                        <button class="action-btn" title="Edit" onclick="editComplaint('${docId}', '${c.status}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete" title="Delete" onclick="deleteComplaint('${docId}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;

            allHTML += row;
            if (rowCount < 4) recentHTML += row; // only put 4 in Dashboard
            rowCount++;
        });

        if (allBody) allBody.innerHTML = allHTML;
        if (recentBody) recentBody.innerHTML = recentHTML;
    });
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
    listenToComplaints();
    initCharts();
    initUpload();
});
