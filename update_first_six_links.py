import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    # 2. Police
    (r"<div class=\"dept-card dept-admin\" onclick=\"window.open\('https://palamu.nic.in/police/', '_blank'\)\">\s*<div class=\"dept-card-icon\"><i class=\"fas fa-shield-halved\"></i></div>\s*<h4>पुलिस विभाग</h4>",
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://www.jhpolice.gov.in/palamu\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-shield-halved"></i></div>\n                            <h4>पुलिस विभाग</h4>'),

    # 3. Supply
    (r"<div class=\"dept-card dept-admin\" onclick=\"window.open\('https://palamu.nic.in/departments/supply/', '_blank'\)\">\s*<div class=\"dept-card-icon\"><i class=\"fas fa-boxes-stacked\"></i></div>\s*<h4>जिला आपूर्ति विभाग</h4>",
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://palamu.nic.in/notice_category/short-term-tender-notice-district-supply-office-palamu/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-boxes-stacked"></i></div>\n                            <h4>जिला आपूर्ति विभाग</h4>'),

    # 4. Panchayati Raj
    (r"<div class=\"dept-card dept-admin\" onclick=\"window.open\('https://palamu.nic.in/', '_blank'\)\">\s*<div class=\"dept-card-icon\"><i class=\"fas fa-people-roof\"></i></div>\s*<h4>जिला पंचायती राज विभाग</h4>",
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://www.jharkhandpanchayats.gov.in\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-people-roof"></i></div>\n                            <h4>जिला पंचायती राज विभाग</h4>'),

    # 5. Planning
    (r"<div class=\"dept-card dept-admin\" onclick=\"window.open\('https://jharkhand.gov.in/planning-and-development', '_blank'\)\">\s*<div class=\"dept-card-icon\"><i class=\"fas fa-chart-pie\"></i></div>\s*<h4>जिला योजना विभाग</h4>",
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://palamu.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-chart-pie"></i></div>\n                            <h4>जिला योजना विभाग</h4>'),

    # 6. DPRO
    (r"<div class=\"dept-card dept-admin\" onclick=\"window.open\('https://prdjharkhand.in/', '_blank'\)\">\s*<div class=\"dept-card-icon\"><i class=\"fas fa-bullhorn\"></i></div>\s*<h4>जिला जनसंपर्क कार्यालय \(DPRO\)</h4>",
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://palamu.nic.in\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-bullhorn"></i></div>\n                            <h4>जिला जनसंपर्क कार्यालय (DPRO)</h4>')
]

for patt, repl in replacements:
    text = re.sub(patt, repl, text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Done updating the first 6 specific links!')
