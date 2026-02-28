import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    (r'<div class="dept-card dept-admin">\s*<div class="dept-card-icon"><i class="fas fa-building-columns"></i></div>\s*<h4>उपायुक्त कार्यालय</h4>',
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://palamu.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-building-columns"></i></div>\n                            <h4>उपायुक्त कार्यालय</h4>'),

    (r'<div class="dept-card dept-admin">\s*<div class="dept-card-icon"><i class="fas fa-shield-halved"></i></div>\s*<h4>पुलिस विभाग</h4>',
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://www.jhpolice.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-shield-halved"></i></div>\n                            <h4>पुलिस विभाग</h4>'),

    (r'<div class="dept-card dept-admin">\s*<div class="dept-card-icon"><i class="fas fa-boxes-stacked"></i></div>\s*<h4>जिला आपूर्ति विभाग</h4>',
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://aahar.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-boxes-stacked"></i></div>\n                            <h4>जिला आपूर्ति विभाग</h4>'),

    (r'<div class="dept-card dept-admin">\s*<div class="dept-card-icon"><i class="fas fa-people-roof"></i></div>\s*<h4>जिला पंचायती राज विभाग</h4>',
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://jharkhandpanchayats.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-people-roof"></i></div>\n                            <h4>जिला पंचायती राज विभाग</h4>'),
     
    (r'<div class="dept-card dept-admin">\s*<div class="dept-card-icon"><i class="fas fa-chart-pie"></i></div>\s*<h4>जिला योजना विभाग</h4>',
     r'<div class="dept-card dept-admin" onclick="window.open(\'https://palamu.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-chart-pie"></i></div>\n                            <h4>जिला योजना विभाग</h4>'),

    (r'<div class="dept-card dept-admin">\s*<div class="dept-card-icon"><i class="fas fa-bullhorn"></i></div>\s*<h4>जिला जनसंपर्क कार्यालय \(DPRO\)</h4>',
     r'<div class="dept-card dept-admin" onclick="window.open(\'http://prdjharkhand.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-bullhorn"></i></div>\n                            <h4>जिला जनसंपर्क कार्यालय (DPRO)</h4>'),


    (r'<div class="dept-card dept-edu">\s*<div class="dept-card-icon"><i class="fas fa-chalkboard-user"></i></div>\s*<h4>जिला शिक्षा पदाधिकारी \(DEO\) कार्यालय</h4>',
     r'<div class="dept-card dept-edu" onclick="window.open(\'https://palamu.nic.in/education/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-chalkboard-user"></i></div>\n                            <h4>जिला शिक्षा पदाधिकारी (DEO) कार्यालय</h4>'),

    (r'<div class="dept-card dept-edu">\s*<div class="dept-card-icon"><i class="fas fa-user-graduate"></i></div>\s*<h4>जिला शिक्षा अधीक्षक \(DSE\) कार्यालय</h4>',
     r'<div class="dept-card dept-edu" onclick="window.open(\'https://palamu.nic.in/education/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-user-graduate"></i></div>\n                            <h4>जिला शिक्षा अधीक्षक (DSE) कार्यालय</h4>'),

    (r'<div class="dept-card dept-edu">\s*<div class="dept-card-icon"><i class="fas fa-book-open"></i></div>\s*<h4>सर्व शिक्षा अभियान \(SSA\)</h4>',
     r'<div class="dept-card dept-edu" onclick="window.open(\'https://jepc.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-book-open"></i></div>\n                            <h4>सर्व शिक्षा अभियान (SSA)</h4>'),

    (r'<div class="dept-card dept-edu">\s*<div class="dept-card-icon"><i class="fas fa-utensils"></i></div>\s*<h4>मध्याह्न भोजन योजना विभाग</h4>',
     r'<div class="dept-card dept-edu" onclick="window.open(\'https://education.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-utensils"></i></div>\n                            <h4>मध्याह्न भोजन योजना विभाग</h4>'),


    (r'<div class="dept-card dept-health">\s*<div class="dept-card-icon"><i class="fas fa-stethoscope"></i></div>\s*<h4>सिविल सर्जन कार्यालय</h4>',
     r'<div class="dept-card dept-health" onclick="window.open(\'https://health.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-stethoscope"></i></div>\n                            <h4>सिविल सर्जन कार्यालय</h4>'),

    (r'<div class="dept-card dept-health">\s*<div class="dept-card-icon"><i class="fas fa-hospital"></i></div>\s*<h4>जिला स्वास्थ्य समिति</h4>',
     r'<div class="dept-card dept-health" onclick="window.open(\'https://palamu.nic.in/health/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-hospital"></i></div>\n                            <h4>जिला स्वास्थ्य समिति</h4>'),

    (r'<div class="dept-card dept-health">\s*<div class="dept-card-icon"><i class="fas fa-hand-holding-medical"></i></div>\s*<h4>राष्ट्रीय स्वास्थ्य मिशन \(NHM\)</h4>',
     r'<div class="dept-card dept-health" onclick="window.open(\'https://jrhms.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-hand-holding-medical"></i></div>\n                            <h4>राष्ट्रीय स्वास्थ्य मिशन (NHM)</h4>'),


    (r'<div class="dept-card dept-revenue">\s*<div class="dept-card-icon"><i class="fas fa-scale-balanced"></i></div>\s*<h4>भूमि सुधार उप समाहर्ता \(LRDC\) कार्यालय</h4>',
     r'<div class="dept-card dept-revenue" onclick="window.open(\'https://jharbhoomi.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-scale-balanced"></i></div>\n                            <h4>भूमि सुधार उप समाहर्ता (LRDC) कार्यालय</h4>'),

    (r'<div class="dept-card dept-revenue">\s*<div class="dept-card-icon"><i class="fas fa-map"></i></div>\s*<h4>अंचल कार्यालय \(CO Office\)</h4>',
     r'<div class="dept-card dept-revenue" onclick="window.open(\'https://jharbhoomi.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-map"></i></div>\n                            <h4>अंचल कार्यालय (CO Office)</h4>'),

    (r'<div class="dept-card dept-revenue">\s*<div class="dept-card-icon"><i class="fas fa-file-signature"></i></div>\s*<h4>निबंधन कार्यालय \(Registry Office\)</h4>',
     r'<div class="dept-card dept-revenue" onclick="window.open(\'https://igrs.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-file-signature"></i></div>\n                            <h4>निबंधन कार्यालय (Registry Office)</h4>'),


    (r'<div class="dept-card dept-rural">\s*<div class="dept-card-icon"><i class="fas fa-person-digging"></i></div>\s*<h4>मनरेगा \(MGNREGA\) विभाग</h4>',
     r'<div class="dept-card dept-rural" onclick="window.open(\'https://nrega.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-person-digging"></i></div>\n                            <h4>मनरेगा (MGNREGA) विभाग</h4>'),

    (r'<div class="dept-card dept-rural">\s*<div class="dept-card-icon"><i class="fas fa-house-chimney"></i></div>\s*<h4>प्रधानमंत्री आवास योजना \(PMAY\)</h4>',
     r'<div class="dept-card dept-rural" onclick="window.open(\'https://pmayg.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-house-chimney"></i></div>\n                            <h4>प्रधानमंत्री आवास योजना (PMAY)</h4>'),

    (r'<div class="dept-card dept-rural">\s*<div class="dept-card-icon"><i class="fas fa-broom"></i></div>\s*<h4>स्वच्छ भारत मिशन \(SBM\)</h4>',
     r'<div class="dept-card dept-rural" onclick="window.open(\'https://sbm.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-broom"></i></div>\n                            <h4>स्वच्छ भारत मिशन (SBM)</h4>'),

    (r'<div class="dept-card dept-rural">\s*<div class="dept-card-icon"><i class="fas fa-building-wheat"></i></div>\s*<h4>जिला ग्रामीण विकास अभिकरण \(DRDA\)</h4>',
     r'<div class="dept-card dept-rural" onclick="window.open(\'https://rdd.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-building-wheat"></i></div>\n                            <h4>जिला ग्रामीण विकास अभिकरण (DRDA)</h4>'),


    (r'<div class="dept-card dept-agri">\s*<div class="dept-card-icon"><i class="fas fa-seedling"></i></div>\s*<h4>जिला कृषि पदाधिकारी कार्यालय</h4>',
     r'<div class="dept-card dept-agri" onclick="window.open(\'https://agri.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-seedling"></i></div>\n                            <h4>जिला कृषि पदाधिकारी कार्यालय</h4>'),

    (r'<div class="dept-card dept-agri">\s*<div class="dept-card-icon"><i class="fas fa-cow"></i></div>\s*<h4>पशुपालन विभाग</h4>',
     r'<div class="dept-card dept-agri" onclick="window.open(\'https://ahd.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-cow"></i></div>\n                            <h4>पशुपालन विभाग</h4>'),

    (r'<div class="dept-card dept-agri">\s*<div class="dept-card-icon"><i class="fas fa-fish"></i></div>\s*<h4>मत्स्य विभाग</h4>',
     r'<div class="dept-card dept-agri" onclick="window.open(\'https://agri.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-fish"></i></div>\n                            <h4>मत्स्य विभाग</h4>'),

    (r'<div class="dept-card dept-agri">\s*<div class="dept-card-icon"><i class="fas fa-handshake"></i></div>\s*<h4>सहकारिता विभाग</h4>',
     r'<div class="dept-card dept-agri" onclick="window.open(\'https://agri.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-handshake"></i></div>\n                            <h4>सहकारिता विभाग</h4>'),


    (r'<div class="dept-card dept-welfare">\s*<div class="dept-card-icon"><i class="fas fa-users-gear"></i></div>\s*<h4>समाज कल्याण विभाग</h4>',
     r'<div class="dept-card dept-welfare" onclick="window.open(\'https://wcd.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-users-gear"></i></div>\n                            <h4>समाज कल्याण विभाग</h4>'),

    (r'<div class="dept-card dept-welfare">\s*<div class="dept-card-icon"><i class="fas fa-children"></i></div>\s*<h4>बाल विकास परियोजना \(ICDS\)</h4>',
     r'<div class="dept-card dept-welfare" onclick="window.open(\'https://wcd.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-children"></i></div>\n                            <h4>बाल विकास परियोजना (ICDS)</h4>'),

    (r'<div class="dept-card dept-welfare">\s*<div class="dept-card-icon"><i class="fas fa-people-group"></i></div>\s*<h4>जिला कल्याण विभाग \(SC/ST/OBC\)</h4>',
     r'<div class="dept-card dept-welfare" onclick="window.open(\'https://ekalyan.cgg.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-people-group"></i></div>\n                            <h4>जिला कल्याण विभाग (SC/ST/OBC)</h4>'),


    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-briefcase"></i></div>\s*<h4>श्रम विभाग</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://shramadhan.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-briefcase"></i></div>\n                            <h4>श्रम विभाग</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-bus"></i></div>\s*<h4>परिवहन विभाग \(DTO Office\)</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://parivahan.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-bus"></i></div>\n                            <h4>परिवहन विभाग (DTO Office)</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-bolt"></i></div>\s*<h4>विद्युत विभाग \(JBVNL\)</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://jbvnl.co.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-bolt"></i></div>\n                            <h4>विद्युत विभाग (JBVNL)</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-faucet-drip"></i></div>\s*<h4>पेयजल एवं स्वच्छता विभाग \(PHED\)</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://dwsd.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-faucet-drip"></i></div>\n                            <h4>पेयजल एवं स्वच्छता विभाग (PHED)</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-tree"></i></div>\s*<h4>वन विभाग</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://forest.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-tree"></i></div>\n                            <h4>वन विभाग</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-industry"></i></div>\s*<h4>उद्योग विभाग</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://jharkhandindustry.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-industry"></i></div>\n                            <h4>उद्योग विभाग</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-city"></i></div>\s*<h4>नगर परिषद / नगर निगम कार्यालय</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://suda.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-city"></i></div>\n                            <h4>नगर परिषद / नगर निगम कार्यालय</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-fire-extinguisher"></i></div>\s*<h4>अग्निशमन विभाग</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://palamu.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-fire-extinguisher"></i></div>\n                            <h4>अग्निशमन विभाग</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-house-flood-water"></i></div>\s*<h4>आपदा प्रबंधन विभाग</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://palamu.nic.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-house-flood-water"></i></div>\n                            <h4>आपदा प्रबंधन विभाग</h4>'),

    (r'<div class="dept-card dept-other">\s*<div class="dept-card-icon"><i class="fas fa-vault"></i></div>\s*<h4>कोषागार \(Treasury\) विभाग</h4>',
     r'<div class="dept-card dept-other" onclick="window.open(\'https://kuber.jharkhand.gov.in/\', \'_blank\')">\n                            <div class="dept-card-icon"><i class="fas fa-vault"></i></div>\n                            <h4>कोषागार (Treasury) विभाग</h4>')
]

for patt, repl in replacements:
    text = re.sub(patt, repl, text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Done')
