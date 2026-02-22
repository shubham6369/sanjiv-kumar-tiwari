// ==========================================
// SANJEEV KUMAR TIWARI - CONSTITUENCY PORTAL
// Full Functionality + Rich Animations
// ==========================================

// ========== DATA STORE ==========
const officersData = [
    { name: 'राजेश सिंह', dept: 'पुलिस', post: 'थानाध्यक्ष', phone: '9876543001', block: 'Block 1' },
    { name: 'सुरेश यादव', dept: 'पुलिस', post: 'उप निरीक्षक', phone: '9876543002', block: 'Block 2' },
    { name: 'अनिल कुमार', dept: 'पुलिस', post: 'दरोगा', phone: '9876543003', block: 'Block 3' },
    { name: 'डॉ. प्रिया शर्मा', dept: 'स्वास्थ्य', post: 'मुख्य चिकित्सा अधिकारी', phone: '9876543004', block: 'Block 1' },
    { name: 'डॉ. अमित वर्मा', dept: 'स्वास्थ्य', post: 'CHC प्रभारी', phone: '9876543005', block: 'Block 2' },
    { name: 'डॉ. रीना गुप्ता', dept: 'स्वास्थ्य', post: 'PHC प्रभारी', phone: '9876543006', block: 'Block 3' },
    { name: 'विजय पाण्डेय', dept: 'शिक्षा', post: 'खण्ड शिक्षा अधिकारी', phone: '9876543007', block: 'Block 1' },
    { name: 'संगीता मिश्रा', dept: 'शिक्षा', post: 'जिला शिक्षा अधिकारी', phone: '9876543008', block: 'Block 2' },
    { name: 'रमेश तिवारी', dept: 'बिजली', post: 'अधिशासी अभियंता', phone: '9876543009', block: 'Block 1' },
    { name: 'सुनील द्विवेदी', dept: 'बिजली', post: 'सहायक अभियंता', phone: '9876543010', block: 'Block 3' },
    { name: 'मनोज सिंह', dept: 'सडक', post: 'खण्ड विकास अधिकारी', phone: '9876543011', block: 'Block 1' },
    { name: 'कमलेश पटेल', dept: 'सडक', post: 'सहायक अभियंता PWD', phone: '9876543012', block: 'Block 4' },
    { name: 'अरुण श्रीवास्तव', dept: 'नगर पालिका', post: 'नगर पालिका अध्यक्ष', phone: '9876543013', block: 'Block 1' },
    { name: 'नीरज मिश्रा', dept: 'नगर पालिका', post: 'कार्यकारी अधिकारी', phone: '9876543014', block: 'Block 2' },
];

const blocksData = {
    'Block 1': { name: 'Block 1 - रामपुर', villages: ['रामपुर', 'सोनाल्डा', 'हरिपुर', 'मोहनपुर', 'लालगंज'], population: 45000, complaints: 320 },
    'Block 2': { name: 'Block 2 - शिवपुर', villages: ['शिवपुर', 'गंगापुर', 'देवनगर', 'कमलापुर', 'बिहारपुर'], population: 38000, complaints: 245 },
    'Block 3': { name: 'Block 3 - कृष्णपुर', villages: ['कृष्णपुर', 'लक्ष्मीपुर', 'नवादा', 'प्रतापगढ़', 'रायबरेली'], population: 52000, complaints: 410 },
    'Block 4': { name: 'Block 4 - विष्णुपुर', villages: ['विष्णुपुर', 'जनकपुर', 'सीतापुर', 'अयोध्या', 'फैजाबाद'], population: 41000, complaints: 289 },
    'Block 5': { name: 'Block 5 - भरतपुर', villages: ['भरतपुर', 'मथुरा', 'वृंदावन', 'आगरा', 'अलीगढ़'], population: 36000, complaints: 198 },
    'Block 6': { name: 'Block 6 - गोकुल', villages: ['गोकुल', 'बरसाना', 'नंदगाँव', 'गोवर्धन', 'बलदेव'], population: 47000, complaints: 356 },
};

let complaintCount = 1582;
const complaints = {};

// ========== SLIDER ==========
let currentSlide = 0;
const totalSlides = 3;
let sliderInterval;

function goSlide(n) {
    // Remove active class from current slide
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide]?.classList.remove('active-slide');

    currentSlide = n;

    // Add active class to new slide
    slides[currentSlide]?.classList.add('active-slide');
    updateSlider();
}

function nextSlide() {
    goSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    goSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function updateSlider() {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active-dot', i === currentSlide);
    });
}

function startSlider() {
    sliderInterval = setInterval(nextSlide, 4500);
}

// ========== MODALS ==========
function openModal(id) {
    document.getElementById(id).classList.add('show');
    document.body.style.overflow = 'hidden';
    if (id === 'findOfficerModal') filterOfficers();
    if (id === 'allOfficersModal') populateAllOfficers();
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('show')) {
        e.target.classList.remove('show');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
        document.body.style.overflow = '';
    }
});

// ========== COMPLAINT FORM ==========
function submitComplaint(e) {
    e.preventDefault();
    complaintCount++;
    const id = `CMP-2026-${String(complaintCount).padStart(4, '0')}`;
    const form = e.target;
    complaints[id] = {
        name: form.querySelector('input[type="text"]').value,
        status: 'पेंडिंग / Pending',
        date: new Date().toLocaleDateString('hi-IN'),
        dept: form.querySelector('select:nth-of-type(2)')?.value || 'सामान्य'
    };
    closeModal('complaintModal');
    form.reset();
    showToast(`शिकायत सफलतापूर्वक दर्ज! ID: ${id}`);
    updateReportNumber(0, complaintCount);
}

// ========== CHECK STATUS ==========
function checkStatus(e) {
    e.preventDefault();
    const input = document.getElementById('statusInput').value.trim().toUpperCase();
    const resultDiv = document.getElementById('statusResult');
    if (complaints[input]) {
        resultDiv.className = 'status-result found';
        resultDiv.innerHTML = `
            <strong>✅ शिकायत मिली!</strong><br>
            <strong>ID:</strong> ${input}<br>
            <strong>नाम:</strong> ${complaints[input].name}<br>
            <strong>विभाग:</strong> ${complaints[input].dept}<br>
            <strong>तिथि:</strong> ${complaints[input].date}<br>
            <strong>स्टेटस:</strong> <span style="color:var(--saffron);font-weight:700">${complaints[input].status}</span>`;
    } else {
        const demoStatuses = ['समाधान पूर्ण ✅', 'प्रक्रिया में 🔄', 'पेंडिंग ⏳', 'गंभीर - प्राथमिकता 🔴'];
        if (input.startsWith('CMP')) {
            resultDiv.className = 'status-result found';
            resultDiv.innerHTML = `
                <strong>📋 शिकायत विवरण</strong><br>
                <strong>ID:</strong> ${input}<br>
                <strong>स्टेटस:</strong> ${demoStatuses[Math.floor(Math.random() * demoStatuses.length)]}<br>
                <strong>अंतिम अपडेट:</strong> ${new Date().toLocaleDateString('hi-IN')}`;
        } else {
            resultDiv.className = 'status-result not-found';
            resultDiv.innerHTML = `❌ <strong>शिकायत नहीं मिली!</strong><br>कृपया सही ID दर्ज करें (e.g. CMP-2026-0001)`;
        }
    }
    resultDiv.style.display = 'block';
    resultDiv.style.animation = 'slideInBounce .5s ease';
}

// ========== BLOCK SEARCH ==========
function filterBlocks() {
    const query = document.getElementById('blockSearchInput').value.toLowerCase();
    document.querySelectorAll('#blockSearchResults li').forEach(li => {
        li.classList.toggle('hidden', !li.textContent.toLowerCase().includes(query));
    });
}

function showBlock(blockName) {
    let blockKey = Object.keys(blocksData).find(k => blockName.includes(k)) || Object.keys(blocksData)[0];
    const block = blocksData[blockKey];
    document.getElementById('blockDetailTitle').innerHTML = `<i class="fas fa-map-pin"></i> ${block.name}`;
    document.getElementById('blockDetailBody').innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:#e8f5e9;padding:16px;border-radius:12px;animation:slideInBounce .4s ease">
                <strong>📍 ब्लॉक:</strong> ${block.name}
            </div>
            <div style="background:#f5f5f5;padding:16px;border-radius:12px;animation:slideInBounce .4s .1s ease both">
                <strong>🏘️ गाँव:</strong> ${block.villages.join(', ')}
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div style="background:#e3f2fd;padding:16px;border-radius:12px;text-align:center;animation:slideInBounce .4s .2s ease both">
                    <div style="font-size:1.8rem;font-weight:900;color:#1565c0">${block.population.toLocaleString()}</div>
                    <small>जनसंख्या</small>
                </div>
                <div style="background:#fff3e0;padding:16px;border-radius:12px;text-align:center;animation:slideInBounce .4s .3s ease both">
                    <div style="font-size:1.8rem;font-weight:900;color:#e65100">${block.complaints}</div>
                    <small>कुल शिकायतें</small>
                </div>
            </div>
            <div style="animation:slideInBounce .4s .4s ease both">
                <strong>अधिकारी:</strong>
                <ul style="list-style:none;margin-top:8px;">
                    ${officersData.filter(o => o.block === blockKey).map(o =>
        `<li style="padding:8px 0;border-bottom:1px solid #eee;font-size:.9rem">
                            <strong>${o.name}</strong> - ${o.post} (${o.dept})<br><small>📞 ${o.phone}</small>
                        </li>`).join('')}
                </ul>
            </div>
        </div>`;
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    openModal('blockDetailModal');
}

// ========== OFFICERS ==========
function filterOfficers() {
    const dept = document.getElementById('officerDeptSelect').value;
    const list = dept === 'all' ? officersData : officersData.filter(o => o.dept === dept);
    renderOfficerList('officerListResults', list);
}

function showOfficers(dept) {
    openModal('findOfficerModal');
    document.getElementById('officerDeptSelect').value = dept;
    filterOfficers();
}

function populateAllOfficers() {
    renderOfficerList('allOfficersList', officersData);
}

function renderOfficerList(containerId, list) {
    const container = document.getElementById(containerId);
    container.innerHTML = list.map((o, i) => `
        <div class="off-list-item" onclick="showOfficerDetail('${o.name}')" style="animation:slideInBounce .4s ${i * .06}s ease both">
            <div class="off-list-avatar"><i class="fas fa-user-tie"></i></div>
            <div class="off-list-info">
                <strong>${o.name}</strong>
                <small>${o.post} | ${o.dept} | ${o.block}</small>
            </div>
            <span class="off-list-badge">${o.dept}</span>
        </div>`).join('');
    if (!list.length) container.innerHTML = '<p style="text-align:center;color:#999;padding:20px">कोई अधिकारी नहीं मिला</p>';
}

function showOfficerDetail(name) {
    const o = officersData.find(of => of.name === name);
    if (!o) return;
    document.getElementById('officerDetailTitle').innerHTML = `<i class="fas fa-user-tie"></i> ${o.name}`;
    document.getElementById('officerDetailBody').innerHTML = `
        <div style="text-align:center;margin-bottom:18px;">
            <div style="width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#c8e6c9,#a5d6a7);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;border:4px solid #2e7d32;animation:bounceIn .5s ease">
                <i class="fas fa-user-tie" style="font-size:34px;color:#1b5e20"></i>
            </div>
            <h3>${o.name}</h3>
            <p style="color:#666;font-size:.9rem">${o.post}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:#f5f5f5;padding:12px;border-radius:10px;display:flex;align-items:center;gap:12px;animation:slideInBounce .4s .1s ease both">
                <i class="fas fa-building" style="color:#2e7d32;font-size:18px"></i> <strong>विभाग:</strong> ${o.dept}
            </div>
            <div style="background:#f5f5f5;padding:12px;border-radius:10px;display:flex;align-items:center;gap:12px;animation:slideInBounce .4s .2s ease both">
                <i class="fas fa-map-pin" style="color:#e65100;font-size:18px"></i> <strong>ब्लॉक:</strong> ${o.block}
            </div>
            <div style="background:#f5f5f5;padding:12px;border-radius:10px;display:flex;align-items:center;gap:12px;animation:slideInBounce .4s .3s ease both">
                <i class="fas fa-phone" style="color:#1565c0;font-size:18px"></i> <strong>फोन:</strong> <a href="tel:${o.phone}" style="color:#1565c0">${o.phone}</a>
            </div>
        </div>
        <button onclick="navigator.clipboard?navigator.clipboard.writeText('${o.phone}').then(()=>showToast('नंबर कॉपी हुआ!')):showToast('${o.phone}')" style="width:100%;margin-top:16px;padding:12px;background:linear-gradient(135deg,#43a047,#2e7d32);color:#fff;border:0;border-radius:10px;font-weight:700;cursor:pointer;font-size:.95rem;transition:all .3s;animation:slideInBounce .4s .4s ease both">
            <i class="fas fa-copy"></i> नंबर कॉपी करें
        </button>`;
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    openModal('officerDetailModal');
}

// ========== FORM SUBMISSIONS ==========
function submitRegistration(e) {
    e.preventDefault();
    closeModal('registerModal');
    e.target.reset();
    showToast('पंजीकरण सफलतापूर्वक हुआ! ✅');
}

function submitReport(e) {
    e.preventDefault();
    complaintCount++;
    closeModal('reportIssueModal');
    e.target.reset();
    showToast(`समस्या रिपोर्ट हुई! ID: RPT-2026-${String(complaintCount).padStart(4, '0')}`);
}

function submitReporter(e) {
    e.preventDefault();
    closeModal('reporterModal');
    e.target.reset();
    showToast('आवेदन सफलतापूर्वक भेजा गया! 🎉');
}

// ========== TOAST ==========
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ========== COUNTER ANIMATION ==========
function animateNumber(el, start, end, duration) {
    const step = Math.ceil(end / (duration / 16));
    let current = start;
    const timer = setInterval(() => {
        current += step;
        if (current >= end) { current = end; clearInterval(timer); }
        el.textContent = current.toLocaleString();
    }, 16);
}

function updateReportNumber(index, value) {
    const el = document.querySelectorAll('.rpt-num')[index];
    if (el) {
        el.setAttribute('data-target', value);
        animateNumber(el, parseInt(el.textContent.replace(/,/g, '')) || 0, value, 600);
    }
}

// ========== SCROLL REVEAL SYSTEM ==========
function initScrollReveal() {
    // Add reveal classes to sections and their children
    const revealMap = [
        { selector: '.sec-title', class: 'reveal reveal-up' },
        { selector: '.svc-card', class: 'reveal reveal-up', stagger: true },
        { selector: '.off-card', class: 'reveal reveal-zoom', stagger: true },
        { selector: '.rpt-card', class: 'reveal reveal-up', stagger: true },
        { selector: '.rep-card', class: 'reveal reveal-up', stagger: true },
        { selector: '.action-btn', class: 'reveal reveal-up', stagger: true },
        { selector: '.block-map-box', class: 'reveal reveal-left' },
        { selector: '.block-list-box', class: 'reveal reveal-right' },
    ];

    revealMap.forEach(({ selector, class: cls, stagger }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            cls.split(' ').forEach(c => el.classList.add(c));
            if (stagger) el.classList.add(`stagger-${Math.min(i + 1, 6)}`);
        });
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== ANIMATED COUNTERS ==========
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateNumber(el, 0, target, 1400);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.rpt-num').forEach(n => observer.observe(n));
}

// ========== SCROLL PROGRESS BAR ==========
function initScrollProgress() {
    // Create the progress bar
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

// ========== FLOATING PARTICLES ==========
function initParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    document.body.prepend(container);

    const colors = ['rgba(46,125,50,.15)', 'rgba(255,153,51,.12)', 'rgba(21,101,192,.1)', 'rgba(198,40,40,.08)'];

    function createParticle() {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 8 + 4;
        const x = Math.random() * 100;
        const tx = (Math.random() - 0.5) * 300;
        const ty = -(Math.random() * 600 + 300);
        const duration = Math.random() * 8 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];

        p.style.cssText = `
            width:${size}px;height:${size}px;
            left:${x}%;bottom:-10px;
            background:${color};
            --tx:${tx}px;--ty:${ty}px;
            animation:particleFloat ${duration}s ease-in infinite;
            animation-delay:${Math.random() * 5}s;
        `;
        container.appendChild(p);
    }

    for (let i = 0; i < 20; i++) createParticle();
}

// ========== TILT EFFECT ON CARDS ==========
function initTiltCards() {
    const cards = document.querySelectorAll('.svc-card, .rpt-card, .rep-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========== PARALLAX ON SLIDER ==========
function initParallax() {
    window.addEventListener('scroll', () => {
        const slider = document.querySelector('.slider-section');
        if (!slider) return;
        const rect = slider.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const speed = 0.3;
            const offset = rect.top * speed;
            slider.style.backgroundPositionY = offset + 'px';
        }
    });
}

// ========== RIPPLE EFFECT ON BUTTONS ==========
function initRipple() {
    document.querySelectorAll('.submit-btn, .view-all-btn, .join-btn, .slide-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position:absolute;width:${size}px;height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
                background:rgba(255,255,255,.3);border-radius:50%;
                animation:ripple .6s ease-out;pointer-events:none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========== TYPED TEXT EFFECT ==========
function initTypedText() {
    const tagline = document.querySelector('.site-tagline');
    if (!tagline) return;
    const html = tagline.innerHTML;
    tagline.innerHTML = '';
    tagline.style.visibility = 'visible';

    let i = 0;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent;

    function type() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            tagline.innerHTML = html; // Restore HTML with <strong>
            tagline.classList.add('typing-cursor');
            setTimeout(() => tagline.classList.remove('typing-cursor'), 2000);
        }
    }
    setTimeout(type, 500);
}

// ========== NAV SHADOW ON SCROLL ==========
function initNavScroll() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.style.boxShadow = '0 6px 30px rgba(0,0,0,.25)';
        } else {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,.2)';
        }
    });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.querySelector('i').className =
            navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// ========== ACTIVE NAV LINK ==========
function initActiveNav() {
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 120;
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                links.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === '#' + sec.id) l.classList.add('active');
                });
            }
        });
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const nav = document.getElementById('mainNav');
                window.scrollTo({ top: target.offsetTop - (nav?.offsetHeight || 0), behavior: 'smooth' });
            }
        });
    });
}

// ========== CURSOR GLOW TRAIL ==========
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position:fixed;width:18px;height:18px;
        background:radial-gradient(circle,rgba(46,125,50,.25),transparent 70%);
        border-radius:50%;pointer-events:none;z-index:9998;
        transition:transform .15s ease,opacity .3s;
        transform:translate(-50%,-50%);opacity:0;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    startSlider();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initNavScroll();

    // Animations
    initScrollReveal();
    initCounters();
    initScrollProgress();
    initParticles();
    initTiltCards();
    initParallax();
    initRipple();
    initTypedText();
    initCursorGlow();
});
