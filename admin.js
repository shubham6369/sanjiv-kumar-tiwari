import { db, collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, addDoc, adminAuth as auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from './firebase-config.js';

const ADMIN_EMAILS = ['admin@sanjeevkumartiwari.com', 'sk.tiwari@gmail.com', 'sktjmm@gmail.com']; // Authorized admin list

// FORCE FRESH LOGIN: Sign out immediately when entering the admin page
// This ensures they see the login panel every time they access /admin.html
signOut(auth);

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
            const loginBtn = document.getElementById('adminLoginBtn');
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.innerHTML = 'Access Panel <i class="fas fa-arrow-right"></i>';
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

    // Set persistence to SESSION ONLY so it doesn't stay logged in after closing the tab
    // and doesn't interfere with the long-term User login on the home page.
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
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

    const forgotPasswordBtn = document.getElementById('adminForgotPassword');
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value.trim();
            const errorMsg = document.getElementById('loginError');

            if (!email) {
                errorMsg.textContent = "Please enter your admin email first to reset password.";
                errorMsg.style.color = "#e74c3c";
                return;
            }

            if (!ADMIN_EMAILS.includes(email)) {
                errorMsg.textContent = "Unauthorized email address.";
                errorMsg.style.color = "#e74c3c";
                return;
            }

            try {
                forgotPasswordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                await sendPasswordResetEmail(auth, email);
                errorMsg.textContent = "Password reset email sent! Please check your inbox.";
                errorMsg.style.color = "#2ecc71"; // Green success message
            } catch (error) {
                console.error("Password reset error:", error);
                errorMsg.textContent = "Error sending reset email. Try again.";
                errorMsg.style.color = "#e74c3c"; // Red error message
            } finally {
                forgotPasswordBtn.textContent = "Forgot Password?";
            }
        });
    }


    const signOutLink = document.getElementById('adminSignOutBtn');
    if (signOutLink) signOutLink.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            document.getElementById('loginError').textContent = "Signed out. Please log in with an admin account.";
        });
    });
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

        // Stats counters
        let total = 0;
        let pending = 0;
        let resolved = 0;

        snapshot.forEach((docSnapshot) => {
            const c = docSnapshot.data();
            const docId = docSnapshot.id;

            total++;
            if (c.status === 'Pending') pending++;
            if (c.status === 'Resolved') resolved++;

            // ... rest of row generation ...
            const row = `
                <tr class="animate-row" style="animation-delay: ${rowCount * 0.05}s">
                    <td><strong>${c.id}</strong></td>
                    <td>${c.name}</td>
                    <td>${c.block || 'N/A'}</td>
                    <td>${c.dept}</td>
                    <td>
                        ${c.photoUrl ? `
                            <div style="display:flex; flex-direction:column; gap:5px; align-items:center;">
                                <a href="${c.photoUrl}" target="_blank" class="table-img-link">
                                    <img src="${c.photoUrl}" alt="Photo" class="table-thumb">
                                </a>
                                <a href="${c.photoUrl.replace('/upload/', '/upload/fl_attachment/')}" target="_blank" download style="font-size: 0.8rem; background: #0b5c3b; color: white; padding: 3px 8px; border-radius: 4px; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                                    <i class="fas fa-download"></i> Download
                                </a>
                            </div>
                        ` : '<span style="color:#ccc; font-size:0.8rem;">N/A</span>'}
                    </td>
                    <td><span class="date-chip">${c.date}</span></td>
                    <td>
                        <div class="steps-cell">
                            <input type="text" class="steps-input" value="${c.stepsTaken || ''}" 
                                placeholder="Add action taken..." 
                                onblur="updateStepsTaken('${docId}', this.value)">
                            <i class="fas fa-edit edit-hint"></i>
                        </div>
                    </td>
                    <td>
                        ${c.statusDocUrl ? `
                            <div style="display:flex; align-items:center; gap:5px;">
                                <a href="${c.statusDocUrl}" target="_blank" class="badge-status" style="background:#e6f7ff; color:#1890ff; padding:4px 8px; text-decoration:none;"><i class="fas fa-eye"></i> View</a>
                                <button class="action-item-btn" style="color:#ef4444; width:24px; height:24px;" onclick="removeStatusDoc('${docId}')" title="Remove Doc"><i class="fas fa-times"></i></button>
                            </div>
                        ` : `
                            <label class="action-item-btn" style="background:#0b5c3b; color:white; cursor:pointer;" title="Upload Status Document">
                                <i class="fas fa-upload"></i>
                                <input type="file" accept="image/*,application/pdf" style="display:none;" onchange="uploadStatusDoc('${docId}', this)">
                            </label>
                        `}
                    </td>
                    <td>
                        <select class="status-select status-${c.status?.replace(/\s+/g, '-')}" onchange="updateComplaintStatus('${docId}', this.value)">
                            <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                        </select>
                    </td>
                    <td>
                        <button class="action-item-btn delete" onclick="deleteComplaint('${docId}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
                <tr class="animate-row" style="background:#f1f5f9; border-bottom: 2px solid #cbd5e1; animation-delay: ${(rowCount * 0.05) + 0.02}s">
                    <td colspan="10" style="padding: 12px 15px;">
                        <div style="display:flex; gap:20px; align-items:center; flex-wrap:wrap; font-size: 0.85rem;">
                            <!-- 1. PDF/Image -->
                            <div style="display:flex; align-items:center; gap:10px; background: white; padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6;">
                                <strong><i class="fas fa-paperclip"></i> Extra Doc:</strong>
                                ${c.extraDocUrl ?
                    `<div style="display:flex; gap:10px; align-items:center;">
                                        <a href="${c.extraDocUrl}" target="_blank" style="color:#0ea5e9;text-decoration:none;font-weight:600;"><i class="fas fa-eye"></i> View</a>
                                        <button onclick="copyDocToClipboard('${c.extraDocUrl}')" style="color:#8b5cf6;border:none;background:none;cursor:pointer;" title="Copy Document Link"><i class="fas fa-copy"></i></button>
                                        <button onclick="removeExtraDoc('${docId}')" style="color:#ef4444;border:none;background:none;cursor:pointer;" title="Remove Document"><i class="fas fa-times-circle"></i></button>
                                     </div>` :
                    `<div style="position:relative; overflow:hidden;">
                                        <input type="file" accept="image/*,.pdf" onchange="uploadExtraDoc('${docId}', this)" style="max-width:180px;font-size:0.8rem;">
                                     </div>`
                }
                            </div>

                            <!-- 2. Email -->
                            <div style="display:flex; align-items:center; gap:8px; background: white; padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b;">
                                <strong><i class="fas fa-envelope"></i> Email:</strong>
                                <input type="email" id="email-${docId}" placeholder="Enter Email" value="" style="padding:4px 8px; border:1px solid #cbd5e1; border-radius:4px; width:150px; font-size:0.8rem;">
                                <button onclick="sendEmail('${docId}')" style="background:#f59e0b; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" title="Send Email via Gmail"><i class="fas fa-paper-plane"></i></button>
                            </div>

                            <!-- 3. WhatsApp -->
                            <div style="display:flex; align-items:center; gap:8px; background: white; padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #22c55e;">
                                <strong><i class="fab fa-whatsapp"></i> WA No:</strong>
                                <input type="text" id="wa-${docId}" placeholder="Mobile Number" value="" style="padding:4px 8px; border:1px solid #cbd5e1; border-radius:4px; width:110px; font-size:0.8rem;">
                                <button onclick="openWhatsapp('${docId}')" style="background:#22c55e; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" title="Open WhatsApp Chat"><i class="fas fa-share"></i></button>
                            </div>

                            <!-- 4. Post Number -->
                            <div style="display:flex; align-items:center; gap:8px; background: white; padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #8b5cf6;">
                                <strong><i class="fas fa-box"></i> Post No:</strong>
                                <input type="text" id="post-${docId}" placeholder="Tracking / Post No" value="${c.postNumber || ''}" onblur="updateComplaintField('${docId}', 'postNumber', this.value)" style="padding:4px 8px; border:1px solid #cbd5e1; border-radius:4px; width:140px; font-size:0.8rem;">
                                <button onclick="copyDocToClipboard('${c.extraDocUrl || ''}')" style="background:#8b5cf6; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" title="Copy Document Link"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                    </td>
                </tr>`;

            allHTML += row;
            if (rowCount < 5) recentHTML += row;
            rowCount++;
        });

        // Update Dashboard Stats UI
        if (document.getElementById('totalComplaints')) document.getElementById('totalComplaints').textContent = total;
        if (document.getElementById('pendingComplaints')) document.getElementById('pendingComplaints').textContent = pending;
        if (document.getElementById('resolvedComplaints')) document.getElementById('resolvedComplaints').textContent = resolved;

        if (allBody) allBody.innerHTML = allHTML;
        if (recentBody) recentBody.innerHTML = recentHTML;
    });
}

window.updateStepsTaken = async (docId, value) => {
    try {
        await updateDoc(doc(db, "complaints", docId), { stepsTaken: value });
    } catch (e) { console.error("Update failed", e); }
};

window.updateComplaintStatus = async (docId, newStatus) => {
    try {
        await updateDoc(doc(db, "complaints", docId), { status: newStatus });
    } catch (e) {
        console.error("Update failed", e);
        alert("Failed to update status.");
    }
};

window.uploadStatusDoc = async (docId, inputEl) => {
    const file = inputEl.files[0];
    if (!file) return;

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dt1m4sosv/upload";
    const uploadPreset = "r1ungxks";

    // Change label temporarily to loading state
    const label = inputEl.parentElement;
    const originalHtml = label.innerHTML;
    label.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', uploadPreset);

        const res = await fetch(cloudinaryUrl, { method: 'POST', body: fd });
        const d = await res.json();

        if (d.secure_url) {
            await updateDoc(doc(db, "complaints", docId), { statusDocUrl: d.secure_url });
        } else {
            alert("Upload failed.");
            label.innerHTML = originalHtml;
        }
    } catch (e) {
        console.error("Status Doc Upload error:", e);
        alert("Upload error.");
        label.innerHTML = originalHtml;
    }
};

window.removeStatusDoc = async (docId) => {
    if (!confirm("Are you sure you want to remove the status document from this complaint?")) return;
    try {
        await updateDoc(doc(db, "complaints", docId), { statusDocUrl: null });
    } catch (e) { console.error("Update failed", e); }
};

window.updateComplaintField = async (docId, field, value) => {
    try {
        await updateDoc(doc(db, "complaints", docId), { [field]: value });
    } catch (e) { console.error("Update failed", e); }
};

window.copyDocToClipboard = (docUrl) => {
    if (docUrl) {
        navigator.clipboard.writeText(docUrl)
            .then(() => alert("Document link copied to clipboard!"))
            .catch(() => alert("Failed to copy link."));
    } else {
        alert("There is no document available to copy.");
    }
};

window.openWhatsapp = (docId) => {
    const el = document.getElementById(`wa-${docId}`);
    if (el && el.value) {
        let num = el.value.replace(/\D/g, '');
        if (num.length === 10) num = "91" + num;
        let url = `https://wa.me/${num}`;
        window.open(url, '_blank');
    } else {
        alert("Please enter a valid WhatsApp number.");
    }
};

window.sendEmail = (docId) => {
    const el = document.getElementById(`email-${docId}`);
    if (el && el.value) {
        let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(el.value)}`;
        window.open(url, '_blank');
    } else {
        alert("Please enter a valid email address.");
    }
};

window.uploadExtraDoc = async (docId, inputEl) => {
    const file = inputEl.files[0];
    if (!file) return;

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dt1m4sosv/upload";
    const uploadPreset = "r1ungxks";

    const label = inputEl.parentElement;
    const originalHtml = label.innerHTML;
    label.innerHTML = '<span style="color:#3b82f6;"><i class="fas fa-spinner fa-spin"></i> Uploading...</span>';

    try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', uploadPreset);

        const res = await fetch(cloudinaryUrl, { method: 'POST', body: fd });
        const d = await res.json();

        if (d.secure_url) {
            await updateDoc(doc(db, "complaints", docId), { extraDocUrl: d.secure_url });
        } else {
            alert("Upload failed.");
            label.innerHTML = originalHtml;
        }
    } catch (e) {
        console.error("Upload error:", e);
        alert("Upload error.");
        label.innerHTML = originalHtml;
    }
};

window.removeExtraDoc = async (docId) => {
    if (!confirm("Are you sure you want to remove this extra document?")) return;
    try {
        await updateDoc(doc(db, "complaints", docId), { extraDocUrl: null });
    } catch (e) { console.error("Update failed", e); }
};

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
            tr.className = 'animate-row';
            tr.style.animationDelay = `${Array.from(tbody.children).length * 0.05}s`;
            tr.innerHTML = `<td><img src="${data.url}" style="width:60px;"></td><td>${data.caption || ''}</td><td>${data.timestamp?.toDate().toLocaleDateString() || ''}</td><td><button class="action-btn" onclick="editGalleryCaption('${id}', '${(data.caption || '').replace(/'/g, "\\'")}')"><i class="fas fa-edit"></i></button><button class="action-btn" onclick="deleteGalleryItem('${id}')"><i class="fas fa-trash"></i></button></td>`;
            tbody.appendChild(tr);
        });
    });
}


