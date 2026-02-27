import { db, collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, addDoc } from './firebase-config.js';

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


// Live Cloudinary Upload
function initUpload() {
    const area = document.getElementById('uploadArea');
    if (!area) return;

    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/dt1m4sosv/upload";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "r1ungxks";

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

    // Also allow clicking to browse
    const browseBtn = area.querySelector('.upload-btn');
    if (browseBtn) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,video/*';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        browseBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) uploadToCloudinary(e.target.files[0]);
        });
    }

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        if (files.length > 0) {
            uploadToCloudinary(files[0]);
        }
    }

    async function uploadToCloudinary(file) {
        const captionInput = document.getElementById('uploadCaption');
        const captionText = captionInput ? captionInput.value.trim() : "";

        const originalHtml = area.innerHTML;
        area.innerHTML = `<h3><i class="fas fa-spinner fa-spin"></i> Uploading ${file.name}...</h3>`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.secure_url) {
                // Success! We have the public URL to the image/video
                area.innerHTML = `
                    <h3 style="color: #10b981;"><i class="fas fa-check-circle"></i> Upload Successful!</h3>
                    <p style="word-break: break-all; font-size: 0.8rem; margin-top: 10px;">
                        <a href="${data.secure_url}" target="_blank" style="color: #d4af37;">${data.secure_url}</a>
                    </p>
                `;

                const btn = document.createElement('button');
                btn.className = 'upload-btn';
                btn.style.marginTop = '15px';
                btn.textContent = 'Upload Another';
                btn.onclick = () => {
                    area.innerHTML = originalHtml;
                    initUpload();
                };
                area.appendChild(btn);

                // Save to Firebase securely
                try {
                    await addDoc(collection(db, "gallery"), {
                        url: data.secure_url,
                        caption: captionText,
                        timestamp: new Date()
                    });
                    if (captionInput) captionInput.value = ''; // Reset input after success
                } catch (ferr) {
                    console.error("Firebase save error:", ferr);
                }
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            console.error(err);
            area.innerHTML = `
                <h3 style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Upload Error</h3>
            `;
            const errBtn = document.createElement('button');
            errBtn.className = 'upload-btn';
            errBtn.style.marginTop = '15px';
            errBtn.textContent = 'Try Again';
            errBtn.onclick = () => {
                area.innerHTML = originalHtml;
                initUpload();
            };
            area.appendChild(errBtn);
        }
    }
}

// Manage Gallery Items
function listenToGallery() {
    const tbody = document.getElementById('galleryMediaBody');
    if (!tbody) return;

    const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
        tbody.innerHTML = '';
        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No media uploaded yet.</td></tr>';
            return;
        }

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;
            const tr = document.createElement('tr');

            // Safe fallback text
            const caption = data.caption || 'No Caption Provided';
            const date = data.timestamp && data.timestamp.toDate ? data.timestamp.toDate().toLocaleDateString('hi-IN') : 'Unknown Date';

            tr.innerHTML = `
                <td>
                    <a href="${data.url}" target="_blank">
                        <img src="${data.url}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px;" alt="Thumbnail">
                    </a>
                </td>
                <td style="max-width: 300px; white-space: normal;">${caption}</td>
                <td>${date}</td>
                <td>
                    <button class="action-btn" onclick="editGalleryCaption('${id}', '${caption.replace(/'/g, "\\'")}')" title="Edit Caption">
                        <i class="fas fa-edit" style="color: var(--blue);"></i>
                    </button>
                    <button class="action-btn" onclick="deleteGalleryItem('${id}')" title="Delete Photo">
                        <i class="fas fa-trash-alt" style="color: var(--crimson);"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }, (error) => {
        console.error("Gallery Sync error:", error);
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error loading data.</td></tr>';
    });
}

// Global Gallery Actions
window.deleteGalleryItem = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this photo from the gallery?")) return;
    try {
        await deleteDoc(doc(db, "gallery", id));
    } catch (e) {
        console.error("Error deleting", e);
        alert("Deletion failed.");
    }
};

window.editGalleryCaption = (id, currentCaption) => {
    const modal = document.getElementById('editCaptionModal');
    const input = document.getElementById('editCaptionInput');
    const okBtn = document.getElementById('confirmEditBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');

    if (!modal || !input) return;

    input.value = currentCaption || "";
    modal.classList.add('show');
    input.focus();

    // Clone buttons to avoid duplicate event listeners from previous modal opens
    const newOkBtn = okBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    const closeModal = () => modal.classList.remove('show');

    newCancelBtn.addEventListener('click', closeModal);

    newOkBtn.addEventListener('click', async () => {
        const newCaption = input.value.trim();
        if (newCaption !== currentCaption) {
            const originalText = newOkBtn.innerHTML;
            newOkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            try {
                await updateDoc(doc(db, "gallery", id), { caption: newCaption });
                closeModal();
            } catch (e) {
                console.error("Error updating", e);
                alert("Failed to update caption.");
                newOkBtn.innerHTML = originalText;
            }
        } else {
            closeModal();
        }
    });

    // Close on overlay click
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    listenToComplaints();
    initUpload();
    listenToGallery();
});
