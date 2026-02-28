import { db, collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, addDoc, auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from './firebase-config.js';

const ADMIN_EMAILS = ['admin@sanjeevkumartiwari.com', 'sk.tiwari@gmail.com', 'sktjmm@gmail.com']; // Authorized admin list

function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        const loginOverlay = document.getElementById('adminLoginOverlay');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        if (user && ADMIN_EMAILS.includes(user.email)) {
            // Authorized
            if (loginOverlay) loginOverlay.style.display = 'none';
            if (sidebar) sidebar.style.visibility = 'visible';
            if (mainContent) mainContent.style.visibility = 'visible';

            // Start listening to data now that we are authorized
            listenToComplaints();
            listenToGallery();
        } else {
            // Not logged in or not authorized
            if (user) {
                // Logged in but not an admin
                document.getElementById('loginError').textContent = "Unauthorized access attempt.";
                signOut(auth);
            }
            if (loginOverlay) loginOverlay.style.display = 'flex';
            if (sidebar) sidebar.style.visibility = 'hidden';
            if (mainContent) mainContent.style.visibility = 'hidden';
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorMsg = document.getElementById('loginError');
    const btn = document.getElementById('adminLoginBtn');

    errorMsg.textContent = "";
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // onAuthStateChanged will handle the UI switch
        })
        .catch((error) => {
            console.error("Login failed:", error);
            errorMsg.textContent = "Invalid email or password.";
            btn.disabled = false;
            btn.innerHTML = 'Access Panel <i class="fas fa-arrow-right"></i>';
        });
}

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

// ... (rest of the functions remain the same)

// Navigation & Sidebar Logic
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.page-section');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('logout-btn')) {
                e.preventDefault();
                signOut(auth).then(() => window.location.href = 'index.html');
                return;
            }
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

    if (menuToggle) menuToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    if (closeSidebar) closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
}

// ... initUpload, listenToGallery etc ...

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initNavigation();
    initUpload();

    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});

// Re-expose missing logic for module
window.editGalleryCaption = (id, currentCaption) => {
    const modal = document.getElementById('editCaptionModal');
    const input = document.getElementById('editCaptionInput');
    const okBtn = document.getElementById('confirmEditBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');

    if (!modal || !input) return;

    input.value = currentCaption || "";
    modal.classList.add('show');
    input.focus();

    const newOkBtn = okBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    const closeModal = () => modal.classList.remove('show');
    newCancelBtn.addEventListener('click', closeModal);

    newOkBtn.addEventListener('click', async () => {
        const newCaption = input.value.trim();
        if (newCaption !== currentCaption) {
            newOkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            try {
                await updateDoc(doc(db, "gallery", id), { caption: newCaption });
                closeModal();
            } catch (e) {
                console.error("Error updating", e);
                alert("Failed to update caption.");
            }
        } else {
            closeModal();
        }
    });

    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    }
};

window.deleteGalleryItem = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this photo?")) return;
    try { await deleteDoc(doc(db, "gallery", id)); } catch (e) { console.error(e); }
};

function listenToComplaints() {
    const recentBody = document.getElementById('recentComplaintsBody');
    const allBody = document.getElementById('allComplaintsBody');
    if (!recentBody && !allBody) return;
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        let allHTML = '';
        let recentHTML = '';
        let rowCount = 0;
        snapshot.forEach((docSnapshot) => {
            const c = docSnapshot.data();
            const docId = docSnapshot.id;
            const row = `<tr><td><strong>${c.id}</strong></td><td>${c.name}</td><td>${c.block || 'N/A'}</td><td>${c.dept}</td><td>${getStatusBadge(c.status)}</td><td>${c.date}</td><td><button class="action-btn" onclick="editComplaint('${docId}', '${c.status}')"><i class="fas fa-edit"></i></button><button class="action-btn delete" onclick="deleteComplaint('${docId}')"><i class="fas fa-trash"></i></button></td></tr>`;
            allHTML += row;
            if (rowCount < 4) recentHTML += row;
            rowCount++;
        });
        if (allBody) allBody.innerHTML = allHTML;
        if (recentBody) recentBody.innerHTML = recentHTML;
    });
}

function initUpload() {
    const area = document.getElementById('uploadArea');
    if (!area) return;
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dt1m4sosv/upload";
    const uploadPreset = "r1ungxks";
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => area.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }));
    area.addEventListener('drop', e => { if (e.dataTransfer.files.length) upload(e.dataTransfer.files[0]); });
    const btn = area.querySelector('.upload-btn');
    const input = document.createElement('input');
    input.type = 'file';
    btn.onclick = () => input.click();
    input.onchange = () => { if (input.files.length) upload(input.files[0]); };
    async function upload(file) {
        area.innerHTML = `<h3><i class="fas fa-spinner fa-spin"></i> Uploading...</h3>`;
        const fd = new FormData(); fd.append('file', file); fd.append('upload_preset', uploadPreset);
        const res = await fetch(cloudinaryUrl, { method: 'POST', body: fd });
        const d = await res.json();
        if (d.secure_url) {
            await addDoc(collection(db, "gallery"), { url: d.secure_url, caption: document.getElementById('uploadCaption').value, timestamp: new Date() });
            area.innerHTML = `<h3 style="color:green;">Success!</h3><button class="upload-btn" onclick="location.reload()">Upload Another</button>`;
        }
    }
}

function listenToGallery() {
    const tbody = document.getElementById('galleryMediaBody');
    if (!tbody) return;
    onSnapshot(query(collection(db, "gallery"), orderBy("timestamp", "desc")), (s) => {
        tbody.innerHTML = '';
        s.forEach(d => {
            const data = d.data();
            const id = d.id;
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><img src="${data.url}" style="width:60px;"></td><td>${data.caption || ''}</td><td>${data.timestamp?.toDate().toLocaleDateString() || ''}</td><td><button class="action-btn" onclick="editGalleryCaption('${id}', '${(data.caption || '').replace(/'/g, "\\'")}')"><i class="fas fa-edit"></i></button><button class="action-btn" onclick="deleteGalleryItem('${id}')"><i class="fas fa-trash"></i></button></td></tr>`;
            tbody.appendChild(tr);
        });
    });
}

