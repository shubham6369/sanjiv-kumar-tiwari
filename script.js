// ==========================================
// SANJEEV KUMAR TIWARI - CONSTITUENCY PORTAL
// Full Functionality + Rich Animations
// ==========================================

// ========== DATA STORE ==========
const officersData = [
    { name: 'राजेश सिंह', dept: 'पुलिस', post: 'थानाध्यक्ष', phone: '9876543001', block: 'चैनपुर' },
    { name: 'सुरेश यादव', dept: 'पुलिस', post: 'उप निरीक्षक', phone: '9876543002', block: 'छतरपुर' },
    { name: 'अनिल कुमार', dept: 'पुलिस', post: 'दरोगा', phone: '9876543003', block: 'पिपरा' },
    { name: 'डॉ. प्रिया शर्मा', dept: 'स्वास्थ्य', post: 'मुख्य चिकित्सा अधिकारी', phone: '9876543004', block: 'मेदिनीनगर' },
    { name: 'डॉ. अमित वर्मा', dept: 'स्वास्थ्य', post: 'CHC प्रभारी', phone: '9876543005', block: 'हुसैनाबाद' },
    { name: 'डॉ. रीना गुप्ता', dept: 'स्वास्थ्य', post: 'PHC प्रभारी', phone: '9876543006', block: 'पांकी' },
    { name: 'विजय पाण्डेय', dept: 'शिक्षा', post: 'खण्ड शिक्षा अधिकारी', phone: '9876543007', block: 'पाटन' },
    { name: 'संगीता मिश्रा', dept: 'शिक्षा', post: 'जिला शिक्षा अधिकारी', phone: '9876543008', block: 'विश्रामपुर' },
    { name: 'रमेश तिवारी', dept: 'बिजली', post: 'अधिशासी अभियंता', phone: '9876543009', block: 'मेदिनीनगर' },
    { name: 'सुनील द्विवेदी', dept: 'बिजली', post: 'सहायक अभियंता', phone: '9876543010', block: 'छतरपुर' },
    { name: 'मनोज सिंह', dept: 'सडक', post: 'खण्ड विकास अधिकारी', phone: '9876543011', block: 'चैनपुर' },
    { name: 'कमलेश पटेल', dept: 'सडक', post: 'सहायक अभियंता PWD', phone: '9876543012', block: 'हुसैनाबाद' },
    { name: 'अरुण श्रीवास्तव', dept: 'नगर पालिका', post: 'नगर पालिका अध्यक्ष', phone: '9876543013', block: 'मेदिनीनगर' },
    { name: 'नीरज मिश्रा', dept: 'नगर पालिका', post: 'कार्यकारी अधिकारी', phone: '9876543014', block: 'विश्रामपुर' },
];

const blocksData = {
    'चैनपुर': {
        name: 'चैनपुर (Chainpur)',
        villages: ['Adar', 'Ajlatua', 'Ajodhya Kolhua', 'Alagdiha', 'Aragara', 'Ausane', 'Babhandih', 'Baghi', 'Bahera', 'Bahera Khurd', 'Baigadih', 'Bairiya', 'Banalat', 'Banjari', 'Bankheta', 'Bansdih', 'Bansdih Khurd', 'Banua', 'Baranw', 'Barhanian', 'Bariman', 'Barkat', 'Basaria Kalan', 'Basaria Khurd', 'Benidih', 'Berma', 'Bhairwa', 'Bhaonadiri', 'Bharganwan', 'Bhat Kolhua', 'Biwabathan', 'Bokeya Kalan', 'Bokeya Khurd', 'Bori', 'Burhibir', 'Chain Pur (CT)', 'Chak Harbhonga', 'Chakwa', 'Chando', 'Chando Alias(Mayapur)', 'Charka', 'Chauparia', 'Chenrabar', 'Chhatwa', 'Chhitra Alias Sonarakhap', 'Chitabar Alias Dinabar', 'Chorhat', 'Chothasa', 'Chungra Bansdih', 'Datam', 'Dhawa', 'Dhelua', 'Dhurhubar', 'Doki', 'Dokra', 'Duba', 'Dulhi', 'Dulsulma', 'Dumri', 'Gangdhara', 'Gangi', 'Garda', 'Gardu', 'Golpa', 'Gore', 'Gurha', 'Haminpur', 'Hansa', 'Hansgara', 'Harbhonga', 'Harnamar', 'Hisra', 'Horanda Alias Ramgarh', 'Hukwa', 'Hutar', 'Itko', 'Jagarnathpur', 'Jainagra', 'Jhalar', 'Jharha', 'Jhariwa', 'Kachan', 'Kakatua', 'Kaleyanpur', 'Kankari', 'Karakat', 'Karamdih', 'Karma', 'Karso', 'Katuwal Kalan', 'Katuwal Khurd', 'Khambhi', 'Khapia', 'Khauraha', 'Khiribar', 'Khohri', 'Khura', 'Khura Kalan', 'Khura Khurd', 'Khutar Kalan', 'Khutar Khurd', 'Kilhar', 'Kini', 'Kokaru', 'Kolhua Khurd', 'Kosiara', 'Kudaga Kalan', 'Kudaga Khurd', 'Kui', 'Kumni', 'Kundpani', 'Kurka', 'Kurkutta', 'Kutti', 'Ladi', 'Lali', 'Lidki', 'Loharsimi', 'Lokeya', 'Mahawat Muria', 'Mahawat Muria Sani', 'Mahugawan', 'Mahuliya', 'Maira', 'Majhgawan', 'Manke', 'Mantuwa', 'Margara', 'Matauli', 'Mathura Dohari', 'Maudiha', 'Muru', 'Musurmu', 'Nagwa', 'Nawa', 'Nawadih', 'Nenua', 'Neura', 'Nimian', 'Pachlewa', 'Paneribandh', 'Parsakhar Alias Barwakhar', 'Parsiya', 'Patarhia Kalan', 'Patarhia Khurd', 'Pataria', 'Pathar Alias Narsinhapur', 'Pinrhe', 'Pinrra', 'Purna Majhgawan', 'Rabda', 'Rajhara', 'Rampur', 'Ranital', 'Ranki', 'Salatua', 'Saram', 'Sarhauwa', 'Sarja', 'Semaria', 'Semra', 'Serka', 'Shah Pur (CT)', 'Sheopur', 'Sokra', 'Sonpurwa', 'Sukri', 'Talapara', 'Taleya Khas', 'Tali', 'Temrain', 'Tenla', 'Tolapara Jhalbar', 'Turuk Taleya Alias Purubdih', 'Uldanda', 'Ulman', 'Uter', 'Wornar'],
    },
    'छतरपुर': {
        name: 'छतरपुर (Chhatarpur)',
        villages: ['Akabasa', 'Amwa', 'Arar', 'Arjundih', 'Bachkoma', 'Bagaiya', 'Baghamara', 'Baijna', 'Bamhandih', 'Bandhudih', 'Bansdiha Alias Latea', 'Bara', 'Bardiha', 'Basantpur', 'Basdiha', 'Belwanr', 'Bergain', 'Bhadwa', 'Bhalubar', 'Bhandardih', 'Bhikhi', 'Birwadohar', 'Bisaipur', 'Bogna Alias Ahri', 'Champa', 'Charai', 'Chatar Chati', 'Chauchhia', 'Chaukhara Bandhudih', 'Chengwana', 'Chhatarpur', 'Chilho Kalan', 'Chilho Khurd', 'Chipo', 'Chiru', 'Chorar Alias Udaigarh', 'Chuchrumanr', 'Chunautwa', 'Dali', 'Dantuta', 'Deogan', 'Dhobidih', 'Dinadag', 'Dumaria', 'Dundur', 'Gamharia', 'Gangdari', 'Gontha', 'Gopalpur', 'Gosaindih', 'Gundri', 'Gurdi', 'Hathgara', 'Hisag', 'Hulsam', 'Hutukdag', 'Itakdag', 'Jaura', 'Jobna Alias Ramgarh', 'Jolahkhap', 'Kachanpur', 'Kailkha', 'Kalapahar', 'Kangalidih', 'Karma', 'Karma Kalan', 'Karupa', 'Kauwal', 'Kekri Kalan', 'Kekri Khurd', 'Khajuri', 'Khajuria', 'Khardiha', 'Kharwardih', 'Khatin', 'Khendhora Khurd', 'Khendhra Kalan', 'Khonrhi', 'Kodwaria', 'Kokro', 'Kui Urf Shashiganj', 'Kurauli', 'Kurkuta', 'Kushmaha', 'Lahanga', 'Lamba', 'Larmi', 'Latdag', 'Lebar', 'Lohrai', 'Loto', 'Lowadag', 'Madanpur', 'Maheshra', 'Mahugain', 'Majhauli', 'Majhganwan', 'Manhu', 'Maradag', 'Marhipta', 'Marumdag', 'Marwa', 'Masihani', 'Munkeri', 'Murumdag', 'Naso', 'Nawdiha', 'Okraha', 'Pahari', 'Pakha', 'Palwa', 'Patsara', 'Pindrahi', 'Pipra Kalan', 'Piprahat', 'Rajbandh', 'Rajderwa', 'Rajmandih', 'Rangnia', 'Rehra', 'Rud', 'Rudwa', 'Sahaedih', 'Saharsawa', 'Sahi', 'Salaia', 'Sarma', 'Shildag', 'Shivdayaldih', 'Solanga', 'Sungri', 'Tardih', 'Tarudag Alias Dindi', 'Telari', 'Tendudih', 'Tepna', 'Thekahi', 'Tilharhwa', 'Tuktuka Alias Kartuka'],
    },
    'हरिहरगंज': {
        name: 'हरिहरगंज (Hariharganj)',
        villages: ['Amba', 'Ararua Kalan', 'Ararua Khurd', 'Baghi', 'Baghna', 'Balra', 'Banapati', 'Baso', 'Bataua', 'Belodar Alias Pirthi Chak', 'Bhagat Tendua', 'Bhandar', 'Bhanwar', 'Bhaurha', 'Bhojua', 'Bijbar', 'Bijnibar Alias Lakhni', 'Bishunpur', 'Chanda', 'Chiraili Alias Gidhi', 'Dema', 'Dhab Kalan', 'Dhab Khurd', 'Dhekeha', 'Digla', 'Duara', 'Dubridih', 'Dura', 'Ghaghra', 'Halkha', 'Harinia Khurd', 'Harsikhap', 'Jagdishpur', 'Jagdishpur Alias Rampur', 'Jahna', 'Jharna', 'Jolrahi Alias Jolhakhap', 'Kajru Kalan', 'Kajru Khurd', 'Karilebra', 'Kathkoma', 'Kauwa Khoh', 'Kauwakhoh', 'Khapkataia', 'Kharagpur', 'Kokro', 'Kolhwara', 'Koshdihra', 'Kotaia', 'Kothila', 'Kulhaia', 'Kurhata Alias Tendur Khurd', 'Kushdih', 'Ladibadi', 'Lalbara', 'Lalgara', "Langurahi'", 'Larbari', 'Largahi', 'Lebabar', 'Lodia', 'Lukuwa', 'Majhganwan', 'Majhganwan Kalan', 'Majhganwan Khurd', 'Mamakha', 'Nath', 'Naudiha Kalan', 'Naudiha Khurd', 'Pachmo', 'Paraia', 'Parsachuan', 'Pathakbigha', 'Pathra', 'Pipra', 'Piroji', 'Rabdi', 'Rajbar', 'Rampur', 'Rengania Alias Goia', 'Salaia', 'Sarsot', 'Satgawan Alias Hariharganj (CT)', 'Semarbar', 'Shikarpur', 'Sobhnath Chak', 'Sultani', 'Tarachak', 'Tarwa Alias Akouni', 'Tarwan', 'Tarwan Khurd', 'Tendua Kalan', 'Tetaria', 'Tharghat', 'Turi'],
    },
    'हैदरनगर': {
        name: 'हैदरनगर (Haidernagar)',
        villages: ['Babhandih', 'Bahar Pura', 'Bahera', 'Banahi', 'Bardanda', 'Barwadih', 'Batan Khap', 'Belaspur', 'Bhadua', 'Bhitar Panti', 'Chaukari', 'Chechariya Kalan', 'Cheladih', 'Dewanbigha', 'Dudhia', 'Golhana', 'Haidar Nagar', 'Hemja', 'Imamnagar Alias Barewa', 'Itwa', 'Jamua Kalan', 'Jamua Khurd', 'Jhari', 'Kabra Kalan', 'Kabra Khurd', 'Kahugarh', 'Kajim Nagar', 'Khardiha', 'Khargara', 'Korma', 'Kuar Khap', 'Kukuhi', 'Kunrwa Khurd', 'Lapea', 'Lohar Purwa', 'Mokhar Khurd', 'Mukhar Kalan', 'Naudiha', 'Nawadih', 'Nokhila', 'Panti', 'Parta', 'Pataria', 'Patkhaulia', 'Rajwandha', 'Ratanbigha', 'Sajwan Salempur', 'Sarea', 'Sargara', 'Semarkhar', 'Semarsot', 'Sewabigha', 'Singhna', 'Soba', 'Tendua Khurd'],
    },
    'हुसैनाबाद': {
        name: 'हुसैनाबाद (Hussainabad)',
        villages: ['Agheria Kalan', 'Ahmad Nagar', 'Akhauri Khap', 'Alinagar', 'Araji Bhairopur', 'Araji Birgain', 'Araji Birgain Alias Khonchi', 'Araji Dangwar', 'Araji Kamgarpur', 'Araji Kusumhara', 'Araji Langarkot', 'Araji Sheikhpura', 'Araji Sinduria', 'Araji Teta Alias Pokhar', 'Arajimajuraha', 'Bahadur Bigha', 'Bahera', 'Baijli', 'Bairaon', 'Bajardih', 'Baniadih', 'Bardiha', 'Barepur', 'Barwadih', 'Basaria', 'Basdiha', 'Bedaulia', 'Begampura', 'Belbigha', 'Beni Kalan', 'Beni Khurd', 'Bhagwan Bigha', 'Bhainsra', 'Bhainsra Alias Labsera', 'Bhairopur', 'Bhawanpur', 'Bihari Bigha', 'Birgain', 'Bishunpur', 'Budhua', 'Buka', 'Buland Bigha', 'Chandarpur', 'Chankar Gopal', 'Chankar Kasturi', 'Chapardag Sikni', 'Chauk Bishun', 'Chaukhanda', 'Chaukhandi', 'Chor Pahra', 'Damdami', 'Dandila', 'Dangwar', 'Darua', 'Deori Khurd', 'Deorikalan', 'Dhania', 'Dhobni Erajikita', 'Dhobni Gairabad', 'Dihri Bisrampur', 'Duara', 'Dulhar', 'Ekauni', 'Ekdari', 'Fatma Chak', 'Gaonkhap', 'Garurahi', 'Ghagra', 'Ghurna Araji Nawadih', 'Ghurwa', 'Hira Sinkni', 'Hussainabad (NP)', 'Hussainbandh', 'Itbandh', 'Itwan', 'Jamua', 'Jhargara', 'Jharha', 'Jhari Khurd', 'Jujhar Sikni', 'Juribandh', 'Kachra', 'Kajibigha', 'Kajrat', 'Kakoria', 'Kamat', 'Kamgarpur', 'Karimandih', 'Kathaundha Kalan', 'Kathaundha Khurd Alias Hussa', 'Kemo', 'Keswahi Alias Chhakauria', 'Keswahi Alias Tenwahi', 'Khaira', 'Khalilpur Alias Tikri', 'Khardiha', 'Kishunpur', 'Kodwaria', 'Konpahari', 'Kosi', 'Kunrwa Kalan', 'Kurdag', 'Kurmipur', 'Kusha Naraenpur', 'Kusumhara', 'Kuswa', 'Lamar', 'Langar Kot', 'Lohbandha', 'Lotania', 'Mahuari', 'Mahudand', 'Majhauli', 'Majhiaon', 'Majuraha', 'Malwaria', 'Mandar', 'Mangardah', 'Manikpur Bathani', 'Mankhap', 'Marha', 'Mirheiadih', 'Mobarakpur', 'Naia', 'Nasojamalpur', 'Naukainia', 'Nawadih', 'Nemhat', 'Niadain', 'Nimiahi', 'Noniadih', 'Obra', 'Pachamba', 'Partappur', 'Pathra', 'Patra Kalan', 'Patra Khurd', 'Phatia', 'Piparbar', 'Pokhra', 'Pokhraha', 'Pokhrahi', 'Poldih', 'Raghubir Bigha', 'Rak Sahi', 'Repura', 'Reria', 'Reriya', 'Rupnaraenpur', 'Sabano', 'Sadajal', 'Salaiatikar', 'Salima', 'Sandha', 'Sarhu', 'Satbahini', 'Sewari Alias Mangaldih', 'Sheikhpura', 'Shiupur', 'Sinduria', 'Sonbarsa', 'Sonpurwa', 'Supha', 'Takea', 'Takea Araji Pajardih', 'Tendua', 'Tenwahi Alias Hathbajhwa', 'Teta', 'Tongra', 'Upri Kalan', 'Upri Khurd', 'Urdwar'],
    },
    'लेस्लीगंज': {
        name: 'नीलाम्बर-पीताम्बरपुर (Lesliganj)',
        villages: ['Akhauri Dumi', 'Akhauripatra', 'Akhourididri', 'Alampur', 'Alaula', 'Amwa', 'Amwa Khurd', 'Asalpahari', 'Babhandih', 'Babu Dumi', 'Bairia', 'Bakas Khap', 'Baksidabra', 'Bansdih', 'Bansdohar', 'Banua', 'Baraon Alias Tetardih', 'Bariatu', 'Basaura', 'Baurakhar', 'Bhakasi', 'Bhalmanda', 'Chak', 'Chak Maribhang', 'Chaknawadih', 'Chandaigir', 'Chaukhara', 'Chaura', 'Cheri', 'Dabra', 'Darudih', 'Dhaganw', 'Dhela', 'Dhobdiha', 'Dugila', 'Erua', 'Gentha', 'Gopalganj', 'Goradih Jagatpurwa', 'Goradih Khas', 'Goradih Kothilwa', 'Goradih Piprahat', 'Goradihtoli', 'Gurua', 'Haratua', 'Harsongoa', 'Itahe', 'Jaingra', 'Jaitukhanr', 'Jamudih', 'Jhagarpur', 'Jharha', 'Jharna', 'Jhaskatia', 'Jogiasohri', 'Julanga', 'Juru', 'Kamal Keria', 'Kamalpur', 'Kanande Alias Nizpatchatti', 'Kanauda', 'Kathaundha', 'Khairant', 'Kirto', 'Koiripatra', 'Kotkhas', 'Kubua', 'Kundri', 'Kurainpatra', 'Kusha', 'Lesliganj', 'Lohra', 'Lotwa', 'Madhodidri Thakurdidri', 'Maharja', 'Marabhang Jagir', 'Maribhang Ijara', 'Munaria', 'Murmusi', 'Murubar', 'Muswa Khap', 'Nakti', 'Naudiha', 'Nawgarh', 'Oria Kalan', 'Oria Khurd', 'Pachmo', 'Pahari Kalan', 'Pahari Khurd', 'Patharhi', 'Patkhauliya', 'Phudia', 'Phulang', 'Phutharwa', 'Pipra Khurd', 'Purnadih', 'Pursuram Khap', 'Rajbaria', 'Rajhara', 'Rajogari', 'Rajpur', 'Ramanand Dabra', 'Ramsagar', 'Sahad', 'Sangbar', 'Sewai', 'Shonsh', 'Sirrampur', 'Sitadih', 'Sohgora', 'Sonbarsa', 'Sonhi Sarai', 'Sotamdabra Alias Panredobra', 'Tenar Alias Nawadih', 'Teugri', 'Thakuraididri Chakaididri', 'Turkadih', 'Urhulia'],
    },
    'मनातू': {
        name: 'मनातू (Manatu)',
        villages: ['Abduldih', 'Adauriya', 'Apti', 'Banasam Alias Murdhoi', 'Bansikhurd', 'Baskatia', 'Bhainsasur', 'Bhitdiha', 'Bhitiahi', 'Bhitkila', 'Bihra', 'Birhorwa', 'Bisranw', 'Budhandih', 'Chak', 'Chanpi', 'Chiri Khurd', 'Chunka', 'Daldalia', 'Dewdih', 'Dhanibigha', 'Dhumkhar', 'Dumri', 'Garhganw', 'Garhwat', 'Garwat', 'Gauhi', 'Gaurwatanr', 'Ghanghri', 'Ghirsiri', 'Jagirha', 'Jaleya', 'Jaspur', 'Jhanti', 'Kairadih', 'Karaila', 'Karma', 'Karma Alias Tilha', 'Karmahi', 'Karwat', 'Kasha', 'Kedal', 'Kekrahi', 'Khaira', 'Kharikdag', 'Korda', 'Kundilpur', 'Kusri', 'Madheya', 'Maghouli', 'Manatu', 'Masuria', 'Mitar', 'Morainia', 'Mukta', 'Nagad', 'Naudiha', 'Nawa', 'Paduma', 'Pakariadih', 'Pannadih', 'Pasiya', 'Patra', 'Purnadih', 'Rabda', 'Rahea', 'Rajkheta', 'Rangeya', 'Semri', 'Sikda', 'Sikni', 'Sildag', 'Sildiliya Khurd', 'Sohe', 'Surgiya', 'Tanrwa', 'Teliyadohar', 'Tetar', 'Tetardih', 'Tilha', 'Tilo', 'Turiadih', 'Urur'],
    },
    'मोहम्मदगंज': {
        name: 'मोहम्मदगंज (Mohammadganj)',
        villages: ['Adhaura', 'Asiknagar Alias Kardanga', 'Baldihri', 'Bataua', 'Bhagrd', 'Bhajania', 'Bhali', 'Bharuhi', 'Birdhaur', 'Checharia', 'Dali', 'Dhawalpura', 'Duba', 'Gajibehra', 'Gajrahi', 'Gangapur Alias Lankasur', 'Gonradih', 'Hathidaha', 'Jharha', 'Kadal Kurmi', 'Kararia', 'Kewalpura', 'Khar Khol', 'Koiriadih', 'Kolhua Sonbarsa', 'Koshiara', 'Latpauri', 'Mahur', 'Mali', 'Mohsinnagar Alias Muhammadga', 'Pachpokhri', 'Pansa', 'Piprobandh Alias Basariaohar', 'Poto', 'Rambandh', 'Ranadih', 'Ranidewa', 'Rasulpur', 'Sabanwa', 'Saharbehra', 'Sitachuan', 'Tara', 'Tendua Kalan'],
    },
    'नौडीहा बाजार': {
        name: 'नौडीहा बाजार (Nawadiha)',
        villages: ['Adar', 'Amola', 'Anata Kalan', 'Anata Khurd', 'Balra', 'Bara', 'Bara Khanr Alias Kahuakhanr', 'Barwadih Alias Koshiara', 'Birhordih', 'Biwadohar', 'Charain', 'Chaukhara', 'Chordanda', 'Chuchru', 'Dagra', 'Debnar', 'Dumri', 'Gamhariadih', 'Gansa', 'Ghujwa', 'Goreathan', 'Gorho', 'Guadag', 'Gulabjhari', 'Guruain', 'Haraiya', 'Harna', 'Harni', 'Hulsi Kalan', 'Hulsi Khurd', 'Jamalpur', 'Jamua Alias Bishunpur', 'Jamuna', 'Jawar', 'Jhardag', 'Jharha', 'Karkata', 'Karma', 'Karnima', 'Kathautia', 'Kauwal', 'Khairadohar', 'Kharar', 'Khardiha', 'Korami', 'Kuku Kalan', 'Kuku Khurd Alias Barhania', 'Kulhia', 'Kundil', 'Lachhmipur', 'Lakrahi', 'Lalgara', 'Madheya', 'Mahuari', 'Mahugain', 'Mahurawan', 'Majurahi', 'Manandohar', 'Mangara', 'Maradag', 'Marar', 'Matnag', 'Mayapur', 'Mednipur', 'Mohadih', 'Namudag', 'Naudiha', 'Nawadih', 'Nawatanr', 'Nima', 'Pathra Alias Palhe', 'Pichhulia', 'Pokhraha', 'Rabda', 'Raebar', 'Rajha', 'Rakoi', 'Ramsadeya', 'Rasida', 'Ratnag Alias Sirha', 'Risyapa', 'Sahiyar', 'Salaia Khurd', 'Salaiya', 'Salwe', 'Saraidih', 'Shahpur', 'Shiupur', 'Silda Kalan', 'Silda Khurd', 'Singhna', 'Taridih', 'Teliadih', 'Thekha', 'Turkadih'],
    },
    'पाटन': {
        name: 'पाटन (Patan)',
        villages: ['Ajan Mayapur', 'Amwa', 'Angra', 'Aredana', 'Bagaia', 'Baghmari Alias Pakhalmar', 'Baida Kalan', 'Baida Khurd', 'Balgara Kalan', 'Balgara Khurd', 'Bandua', 'Banjari', 'Barahmoriya', 'Bardiha', 'Basabar', 'Basdah', 'Bhonga', 'Bijra', 'Bikua', 'Bisunpura', 'Boradah', 'Buka', 'Burhi', 'Chandeya', 'Chatma', 'Chaugain', 'Chetma', 'Churadohar', 'Dandai', 'Darha', 'Dhangain', 'Dhangardiha', 'Diharia', 'Dipaua', 'Durhi', 'Gahar Pathra', 'Gamhetha', 'Gangatua', 'Garo', 'Ghurdewa', 'Haraiya', 'Haraiya Kalan', 'Haraiya Khurd Alias Doomba', 'Hari Alias Barsaita', 'Hesla Alias Kaswa Khar', 'Hisra Alias Barwadih', 'Homia', 'Hurdaga', 'Huruhansa', 'Imli Khas', 'Jagodih', 'Jaipur', 'Janghasi', 'Jhari Nimia', 'Jitadih', 'Jonra Kalan', 'Jonra Khurd', 'Juimaran Pathra', 'Kaireadih Khurd', 'Kalapahar', 'Kanaudi', 'Kanchanpur', 'Kanke Kalan', 'Kanke Khurd', 'Karar Kalan', 'Karar Khurd', 'Kariahar', 'Katri', 'Kelhar', 'Khairdohar', 'Khajuri', 'Khamhi', 'Khapar Manda', 'Kharaundha', 'Kisaini', 'Kishunpur', 'Koiriadih Kalan', 'Kolhua', 'Kosiara', 'Kumhwa', 'Kunarbandh', 'Kundri', 'Kurwa', 'Lamba', 'Larbandhhwa', 'Ledgani', 'Loinga', 'Mahulia', 'Mahuliya', 'Majhauli', 'Majhauli', 'Manika', 'Marariya', 'Mayapur Kalan', 'Mayapur Khurd', 'Meral', 'Moreya', 'Nagesar', 'Naudiha', 'Naudiha', 'Nawa Khas', 'Nawada', 'Nawadih', 'Nawadih Bhurwa', 'Nimiya', 'Pachkeria', 'Pahartarlami Alias Nawadih', 'Pakaria', 'Pakri', 'Palhe Kalan', 'Palhe Khurd', 'Pandepura', 'Patan', 'Phusna Pathra', 'Pokharia', 'Rabdi', 'Rajhara', 'Rol', 'Rudidih', 'Sadhpur', 'Saguna', 'Saguni', 'Sahdewa', 'Sakaldipa', 'Sakaldipi', 'Sakanpirhi', 'Sakhui', 'Sanda', 'Satantola', 'Sathe', 'Satua', 'Semri', 'Siki Kalan', 'Siki Khurd', 'Sirma', 'Sole', 'Somadih', 'Sonpurwa', 'Suntha', 'Tandwa', 'Tetaria', 'Tilaiya', 'Tilkudih', 'Tisibar', 'Tola Nawada', 'Tola Tandwa', 'Tuia', 'Tusra', 'Utaki'],
    },
    'पांकी': {
        name: 'पांकी (Panki)',
        villages: ['Abun', 'Ahirgurha', 'Ambabar', 'Ambalori', 'Andag', 'Angara', 'Aparmanri', 'Ara', 'Asarhia', 'Aseahar', 'Auka', 'Bahera', 'Baherwatanr', 'Baida', 'Balmuwan', 'Baludih', 'Banai', 'Bandubar', 'Baniadih', 'Banki Kalan', 'Banki Khurd', 'Banri Pakariya', 'Bara', 'Barahmoria', 'Bardaga', 'Barkadaha', 'Barodiri', 'Barwadih', 'Barwaiya', 'Basariya', 'Basdiha', 'Bela', 'Bhang', 'Bhanwardah', 'Bhari', 'Bhuinya Kurha', 'Bidra', 'Bidra', 'Bihari Khap', 'Bihra', 'Birbir', 'Biritiya Dandar', 'Birtia', 'Biru', 'Bochdohar', 'Burhabar', 'Burhi', 'Chakaminan', 'Chandarpur', 'Chandarpur', 'Chandwar', 'Chanpi Kalan', 'Chanpi Khurd', 'Chauphal', 'Chhapar', 'Chorea', 'Churra', 'Dandar Kalan', 'Daryapur', 'Dema', 'Dhub', 'Dumar Khar', 'Dundar Khurd', 'Duriatu', 'Duwarika', 'Ganeshpur', 'Gareriadih', 'Garhganw', 'Giri', 'Gogar', 'Gongo', 'Gopaldih', 'Gorihara', 'Gudipahari', 'Haldi', 'Haldiminhai', 'Harkhuwa', 'Harlaung', 'Harna', 'Hatwar', 'Herum', 'Hesatu', 'Hiringbar', 'Hoiyo', 'Husenigurh Alias Misir Gurha', 'Hutai', 'Irgu', 'Janjo', 'Jaspur', 'Jiro', 'Jobla', 'Jolah Bigha', 'Jotang', 'Kakargarh', 'Kakrigarh', 'Kamal', 'Kamat', 'Kamtola', 'Kaparphuta', 'Karar', 'Karma', 'Kasmar', 'Kelwa', 'Kerki', 'Khaira', 'Khajuri', 'Khamdih', 'Khankhar', 'Khap', 'Khapar Manda', 'Kolhua', 'Korwatanr', 'Koseri', 'Kotiya', 'Kunwai', 'Kusri', 'Lawabar', 'Loharsi', 'Lukuwa', 'Maduli', 'Mahe', 'Mahugain', 'Mahugain', 'Majhauli', 'Manatu', 'Mangarpur', 'Manhi Pipra', 'Manran', 'Maran', 'Matnag', 'Matuli', 'Maulaganj', 'Mukta', 'Nagri', 'Naudiha', 'Naudiha', 'Nawa Garh', 'Nawadih', 'Nima Chak', 'Nuru', 'Pachamba', 'Pagar', 'Pagar Kalan', 'Pakariya', 'Panki', 'Parasia', 'Pardohar', 'Parhiya Tola', 'Parsawan', 'Parsotimpur', 'Pathra Kalan', 'Pathra Khurd', 'Phulwaria', 'Pipra Kalan', 'Pipratanr', 'Pokhraha', 'Porsam', 'Pundru', 'Puraini', 'Radhadih', 'Ranadah', 'Ranne', 'Ratanpur', 'Rengai', 'Sagalim', 'Salamdiri', 'Salgas', 'Sangbar', 'Saraidih', 'Saraiya', 'Sarauna', 'Sarjamatu', 'Sirma', 'Sons', 'Sorath', 'Sunri', 'Surjaun', 'Surjaun', 'Taiya', 'Tal', 'Taledih', 'Tarwadih', 'Tatidiri', 'Teldiha', 'Tetariadih', 'Tetrain', 'Thekhi', 'Tilamba', 'Tilra', 'Titlangi', 'Tola Chatti', 'Tola Manran', 'Tunudag', 'Uchahra Kalan', 'Uchahra Khurd', 'Udih', 'Uksu', 'Ulgara'],
    },
    'पांडू': {
        name: 'पांडू (Pandu)',
        villages: ['Achanga Alias Harka', 'Asnaulia', 'Balar', 'Basdiha', 'Belhara', 'Bhaduma', 'Bhatwalia', 'Burhkhaira', 'Chanau Khar', 'Chapia', 'Chaura', 'Checharia', 'Chhatarpur', 'Dala Kalan', 'Dala Khurd', 'Darua', 'Dhachabar', 'Dhanudih', 'Fuliya', 'Gaurletwa', 'Golpa', 'Guasarai', 'Hisra', 'Jhargara', 'Jharna Kalan', 'Jharna Khurd', 'Kajru Kalan', 'Kajru Khurd', 'Kanti', 'Karamdih', 'Khaira', 'Khura', 'Kulia', 'Kundwa Kalan', 'Kunrwa Khurd', 'Kusa Alias Hengabar', 'Kutmu', 'Lahar Banjari', 'Lawar Pandu', 'Lotra', 'Lumba Satbahini', 'Mahugawan', 'Mahuli', 'Malwaria', 'Murma Kala', 'Murma Khurd', 'Murumatu', 'Musi Khap', 'Nawgarh', 'Neori', 'Obra', 'Ordiha', 'Pandu', 'Panrepura', 'Paratappur', 'Pipri', 'Pokhri', 'Rabra', 'Rabri', 'Ratnag', 'Salhana', 'Semri', 'Sihaldeo', 'Sikni', 'Sildili', 'Sirha', 'Tisibar Kala'],
    },
    'सतबरवा': {
        name: 'सतबरवा (Satbarwa)',
        villages: ['Bakoria', 'Bari', 'Bhogu', 'Bohita', 'Chanpi', 'Chaparna', 'Charwadih', 'Chatti Satbarwa', 'Chetma', 'Daruna', 'Dhabadih', 'Dodang', 'Duba', 'Dulsulma', 'Dulsulmi', 'Ekta', 'Gaura', 'Ghutua', 'Gurha', 'Hurmur', 'Jogiyapokhri', 'Jora Hunhe alias Jora', 'Kamaru', 'Karma', 'Kasiadih', 'Kasmar', 'Khoundih', 'Kulia', 'Kumrahi', 'Ledwa khar', 'Lohrapokhri', 'Lonhri', 'Maangatgorea', 'Manasoti', 'Mukrum', 'Mukta', 'Murma', 'Nalumanr', 'Nauranga', 'Nawadih', 'Pinrra', 'Pipra Kalan', 'Ponchi', 'Purnadih', 'Rabda', 'Rajderwa', 'Ranki khurd', 'Rebaratu', 'Rupaundha', 'Salaia', 'Sehra', 'Sembhuchak', 'Serandag', 'Shahganj', 'Siuri', 'Sohri', 'Tabar', 'Thema', 'Themi', 'Tumagara'],
    },
    'तरहसी': {
        name: 'तरहसी (Tarhasi)',
        villages: ['Dhanigara', 'Tarhasi', 'Gurha', 'Goa', 'Belakumba', 'Manaj', 'Manatu', 'Mahuadar', 'Khamta', 'Baragaon', 'Ambabar', 'Bahuara', 'Baidabad', 'Banjari', 'Banshipur', 'Barwadih', 'Basal', 'Basantpur', 'Belsar', 'Bhanwardah', 'Bhaunradaha', 'Birkur', 'Birsanididih', 'Bishunpur', 'Budhui', 'Chak barewa', 'Chama', 'Champi', 'Chandarpur', 'Charea', 'Chelia', 'Dagar', 'Dali', 'Danduba', 'Darchua', 'Dhanmahu', 'Dhunua', 'Dumari Kalan', 'Gahora', 'Gajna', 'Gangi', 'Garda', 'Garhwat', 'Gari', 'Ghagra', 'Ghoghar', 'Ghosalwa', 'Ghogri', 'Giria', 'Gobardaha', 'Harda', 'Hesla', 'Hutar', 'Jagarkala', 'Jagdishpur', 'Janjo', 'Jhabar', 'Jharia', 'Jiro', 'Kachra', 'Kadhwan', 'Kajra', 'Kakra', 'Kalapahar', 'Karamdih', 'Karuwa', 'Kasmar', 'Khamankhurd', 'Kharagpur', 'Khariadih', 'Khashmi', 'Khatin', 'Khemra', 'Khuranda', 'Kundri', 'Kusri', 'Lali', 'Lathea', 'Lawabar', 'Lowagara', 'Madhua', 'Maghouli', 'Majhganwan', 'Marwa', 'Mednipur', 'Mithu', 'Mukta', 'Nagad', 'Naktipur', 'Nawadih', 'Nimtola', 'Paharchakra', 'Pahari', 'Pathar', 'Pinda', 'Pipra', 'Rabda', 'Rajkheta', 'Rajpur', 'Rehla', 'Rengania', 'Salai', 'Semaria', 'Sikni', 'Sirma', 'Sokra', 'Sua', 'Tali'],
    },
    'विश्रामपुर': {
        name: 'विश्रामपुर (Bishrampur)',
        villages: ['Arhi', 'Ataria', 'Bagh Mandwa', 'Bairganwan', 'Bairia', 'Bhandar', 'Bishrampur (NP)', 'Choratia', 'Dulsulma', 'Gaura', 'Gerua', 'Ghaghua', 'Gharatia', 'Ghasidag', 'Gurha Kalan', 'Gurha Khurd', 'Guri', 'Halga', 'Hansdaga', 'Jamari', 'Jarka', 'Jenjira', 'Jhani', 'Jhantinath', 'Jharapdih', 'Jharha Kalan', 'Jharha Khurd', 'Kadhwan', 'Kamta', 'Kauria', 'Ketat Kalan', 'Ketat Khurd', 'Kundi', 'Lalgara', 'Lohardaga', 'Lotar', 'Lumba', 'Makai', 'Mallahtoli', 'Murma Kalan', 'Murma Khurd', 'Naudiha', 'Naugarha', 'Nawadih Khurd', 'Nimia', 'Oria', 'Pahargerua', 'Panjri Kalan', 'Panjri Khurd', 'Pathe', 'Pipra', 'Ragda', 'Rajkhar', 'Sankha', 'Semri Kalan', 'Semri Khurd', 'Seora', 'Shankardih', 'Sigsigi', 'Sulumdag', 'Supwa Alias Amwa', 'Tati Pathal', 'Tendua', 'Tolra', 'Tona', 'Ulipahari', 'Urdwar'],
    },
    'उंटारी रोड': {
        name: 'उंटारी रोड (Untari)',
        villages: ['Bhaduma', 'Bhitihara', 'Binhua', 'Birja', 'Checharia', 'Chhatarpur', 'Darua', 'Deodanr', 'Gaurletwa', 'Jamdiha', 'Joga', 'Kalianpur', 'Karkata', 'Kulhi', 'Kutmu', 'Lahar Banjari', 'Lumaratbahini', 'Malwaria', 'Murma Kalan', 'Murma Khurd', 'Nawgarh', 'Panrepura', 'Paratappur', 'Sahaspura', 'Semri', 'Sirha', 'Titahi'],
    },
    'मेदिनीनगर': {
        name: 'मेदिनीनगर (Daltonganj)',
        villages: ['Aru', 'Babunebhi', 'Bairia', 'Bajrha', 'Bakhari', 'Bakoia', 'Banua Alias Sala', 'Baratola (CT)', 'Barkinebhi', 'Bhogu', 'Chak Barewa', 'Chama', 'Chatti', 'Chianki', 'Chukru', 'Dhangardiha Alias Khanwan', 'Duba', 'Ganke', 'Gorho', 'Hisra Alias Pokhraha', 'Hutar', 'Jamune', 'Jhabar', 'Jonr', 'Jorkat', 'Karma', 'Kasia', 'Kauria', 'Kewatbar', 'Kishunpur', 'Kumar Alias Barkagaon', 'Kundelwa', 'Kusi', 'Lahlahe', 'Madhunebhi', 'Medininagar (Daltonganj) (Nagar Parishad)', 'Nauadhonrha', 'Nawadih', 'Nawatoli', 'Nimia', 'Pirhia', 'Pokhraha Kalan', 'Pokhraha Khurd', 'Polpol Kalan', 'Polpol Khurd', 'Rajwadih', 'Rerma (CT)', 'Sarja', 'Sembhuchak', 'Sinduria', 'Singraha Kalan', 'Singraha Khurd', 'Sonpurwa', 'Sua', 'Sundna (CT)', 'Tikuliya'],
    },
    'पिपरा': {
        name: 'पिपरा (Pipra)',
        villages: ['Samail', 'Ajania', 'Ambajharana', 'Andharibag Kalan', 'Andharibag Khurd', 'Babhan Sarhu', 'Babhandih', 'Bagsara', 'Baijua', 'Balha', 'Banadih', 'Banahi', 'Bansdohar', 'Bardag', 'Barwadih', 'Bhanga', 'Bhitiha', 'Bishrampur', 'Bishunpur', 'Burhronga', 'Chaitu Bigha', 'Chaparbar', 'Chaukhra', 'Chingua', 'Dalpatpur', 'Damwa', 'Dhusarua', 'Dihria', 'Gahora', 'Gajna', 'Ghansikhap', 'Guriauta', 'Hasanpur', 'Holea', 'Jarka', 'Jharna', 'Jhumri', 'Jitpur', 'Kalipur', 'Karma', 'Khajuria', 'Kodwaria', 'Kuarbandh', 'Kumhaia', 'Kumhara', 'Kunrwa', 'Labhra', 'Madhubana', 'Mahugain', 'Mahugain Alias Jadudih', 'Majuraha', 'Mali', 'Marwa', 'Masuria', 'Naktibar', 'Naudiha', 'Nawadih', 'Ordana', 'Pahaldewa', 'Paharpur', 'Patrenga', 'Pipra', 'Pithari', 'Pithoura', 'Polda Alias Majhauli', 'Rahria', 'Rajokhar Alias Ronga', 'Ranjitpur', 'Rongha Alias Belaudar', 'Saguna', 'Saraia', 'Semaria', 'Shakaldipa', 'Shiripalpur', 'Sirnia', 'Sobhichak', 'Sonbe', 'Tarwa Alias Jagdishpur', 'Tarwan Kalan', 'Tendua Pipra', 'Tendudih', 'Tendui'],
    },
    'नावाबाजार': {
        name: 'नावाबाजार (Nawabazar)',
        villages: ['Arapur', 'Bana', 'Banaudha', 'Bandua', 'Bankheta', 'Barahmoria Kalan', 'Barahmoria Khurd', 'Basauna', 'Basna', 'Chanea', 'Chechanha', 'Checharia', 'Damaro', 'Dindi', 'Hatai', 'Itko', 'Kanda Khas', 'Karcha', 'Khamdiha', 'Khokhma', 'Korta', 'Kumbhi Kalan', 'Kumbhi Khurd', 'Ladi', 'Lathea', 'Mahugain', 'Malhatoli', 'Nawa', 'Nenua', 'Odhkunda', 'Pataria', 'Pipra', 'Rabda', 'Rajdiria', 'Rajhara', 'Sarauna', 'Sinjo', 'Sohdag Kalan', 'Sohdag Khurd', 'Tali', 'Tamdaga', 'Thekhi', 'Tukbera', 'Tulbula', 'Turidag'],
    },
    'पंडवा': {
        name: 'पंडवा (Pandwa)',
        villages: ['Ahori', 'Barwadih', 'Basu', 'Batsara', 'Bhusra', 'Buchi Lami', 'Chakrudarpur', 'Chhechhauri', 'Chilhi', 'Derwa', 'Dulhi', 'Dumri', 'Gareriadih', 'Gari Khas', 'Golhana', 'Jhari', 'Kajarma', 'Kajri', 'Kathautia', 'Kokarsa', 'Lami', 'Lohandi', 'Lohanra', 'Majhiganw', 'Manahar', 'Murma', 'Pandwa', 'Patra', 'Rabdi', 'Sakhua', 'Sakhui', 'Saraiya', 'Sarma', 'Sika'],
    },
};

// No local complaint data tracking. Data is fetched directly from Firebase.
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
async function submitComplaint(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
        const fileInput = form.querySelector('input[type="file"]');
        let photoUrl = "";

        // If a photo is selected, upload it to Cloudinary first
        if (fileInput && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            formData.append('upload_preset', "r1ungxks"); // Using the existing preset from admin.js

            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dt1m4sosv/upload", {
                method: 'POST',
                body: formData
            });
            const cloudData = await cloudRes.json();
            photoUrl = cloudData.secure_url || "";
        }

        // We will dynamically import firebase to not block initial page load load
        const { db, collection, addDoc, auth } = await import('./firebase-config.js');
        const user = auth.currentUser;

        const timestamp = new Date();
        const num = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
        const id = `CMP-${timestamp.getFullYear()}-${num}`;

        await addDoc(collection(db, "complaints"), {
            id: id,
            uid: user ? user.uid : 'anonymous',
            email: user ? user.email : 'anonymous',
            name: form.querySelectorAll('input[type="text"]')[0].value,
            mobile: form.querySelector('input[type="tel"]').value,
            block: form.querySelectorAll('select')[0].value,
            village: form.querySelectorAll('input[type="text"]')[1].value,
            dept: form.querySelectorAll('select')[1].value,
            description: form.querySelector('textarea').value,
            status: 'Pending',
            date: timestamp.toLocaleDateString('hi-IN'),
            createdAt: timestamp,
            photoUrl: photoUrl // Store the uploaded image URL
        });

        closeModal('complaintModal');
        form.reset();
        showToast(`शिकायत सफलतापूर्वक दर्ज! ID: ${id}`);
    } catch (error) {
        console.error("Error adding complaint: ", error);
        showToast("Error! Please try again later.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ========== CHECK STATUS ==========
async function checkStatus(e) {
    e.preventDefault();
    const input = document.getElementById('statusInput').value.trim().toUpperCase();
    const resultDiv = document.getElementById('statusResult');
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    btn.disabled = true;

    try {
        const { db, collection, getDocs, query, where } = await import('./firebase-config.js');
        // Because id is stored as a field, let's query documents where id == input

        const q = query(collection(db, "complaints"), where("id", "==", input));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Document found
            let data = null;
            querySnapshot.forEach((doc) => {
                data = doc.data();
            });

            resultDiv.className = 'status-result found';
            resultDiv.innerHTML = `
                <strong>✅ शिकायत मिली! / Complaint Found!</strong><br>
                <strong>ID:</strong> ${data.id}<br>
                <strong>नाम:</strong> ${data.name}<br>
                <strong>विभाग:</strong> ${data.dept}<br>
                <strong>तिथि:</strong> ${data.date}<br>
                <strong>स्टेटस:</strong> <span style="color:var(--saffron);font-weight:700">${data.status}</span>`;
        } else {
            resultDiv.className = 'status-result not-found';
            resultDiv.innerHTML = `❌ <strong>शिकायत नहीं मिली! / Not Found!</strong><br>कृपया सही ID दर्ज करें (e.g. CMP-2026-0001)`;
        }
    } catch (error) {
        console.error("Error fetching status: ", error);
        resultDiv.className = 'status-result not-found';
        resultDiv.innerHTML = `❌ <strong>Error loading data. Please try again later.</strong>`;
    } finally {
        resultDiv.style.display = 'block';
        resultDiv.style.animation = 'slideInBounce .5s ease';
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
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

    // Village display logic
    const initialVillages = block.villages.slice(0, 5).join(', ');
    const moreVillages = block.villages.slice(5).join(', ');
    const totalVillagesCount = block.villages.length;

    document.getElementById('blockDetailTitle').innerHTML = `<i class="fas fa-map-pin"></i> ${block.name}`;
    document.getElementById('blockDetailBody').innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:#e8f5e9;padding:16px;border-radius:12px;animation:slideInBounce .4s ease">
                <strong>📍 ब्लॉक:</strong> ${block.name}
            </div>
            <div class="village-container-modal" style="background:#f5f5f5;padding:16px;border-radius:12px;animation:slideInBounce .4s .1s ease both">
                <strong>🏘️ मुख्य गाँव:</strong> ${initialVillages}${totalVillagesCount > 5 ? '...' : ''}
                
                ${totalVillagesCount > 5 ? `
                <div id="extraVillages" style="display:none; margin-top: 10px; border-top: 1px dashed #ccc; padding-top: 10px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px;">
                        ${block.villages.map(v => `<span style="background: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; border: 1px solid #eee;">${v}</span>`).join('')}
                    </div>
                </div>
                <button onclick="toggleVillages()" id="villageToggleBtn" style="margin-top: 10px; background: var(--green); color: white; border: none; padding: 6px 15px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                    <i class="fas fa-plus"></i> सभी ${totalVillagesCount} गाँव देखें
                </button>
                ` : ''}
            </div>
        </div>`;
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    openModal('blockDetailModal');
}

function toggleVillages() {
    const extra = document.getElementById('extraVillages');
    const btn = document.getElementById('villageToggleBtn');
    if (extra.style.display === 'none') {
        extra.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-minus"></i> संक्षिप्त देखें';
    } else {
        extra.style.display = 'none';
        btn.innerHTML = btn.dataset.originalText || `<i class="fas fa-plus"></i> सभी गाँव देखें`;
    }
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

async function submitReport(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
        const fileInput = form.querySelector('input[type="file"]');
        let photoUrl = "";

        if (fileInput && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            formData.append('upload_preset', "r1ungxks");

            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dt1m4sosv/upload", {
                method: 'POST', body: formData
            });
            const cloudData = await cloudRes.json();
            photoUrl = cloudData.secure_url || "";
        }

        const { db, collection, addDoc, auth } = await import('./firebase-config.js');
        const user = auth.currentUser;
        const timestamp = new Date();
        const id = `RPT-${timestamp.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        await addDoc(collection(db, "complaints"), { // Storing in same collection for simplicity in admin panel
            id: id,
            type: 'Issue Report',
            uid: user ? user.uid : 'anonymous',
            name: "Public User",
            dept: "General Issue",
            description: form.querySelector('textarea').value,
            status: 'Pending',
            date: timestamp.toLocaleDateString('hi-IN'),
            createdAt: timestamp,
            photoUrl: photoUrl
        });

        closeModal('reportIssueModal');
        form.reset();
        showToast(`मुद्दा रिपोर्ट सफल! ID: ${id}`);
    } catch (error) {
        console.error("Error:", error);
        showToast("Error! Please try again.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function submitReporter(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Submitting... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
        const fileInput = form.querySelector('input[type="file"]');
        let photoUrl = "";

        if (fileInput && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            formData.append('upload_preset', "r1ungxks");

            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dt1m4sosv/upload", {
                method: 'POST', body: formData
            });
            const cloudData = await cloudRes.json();
            photoUrl = cloudData.secure_url || "";
        }

        const { db, collection, addDoc } = await import('./firebase-config.js');

        await addDoc(collection(db, "reporter_applications"), {
            name: form.querySelectorAll('input[type="text"]')[0].value,
            mobile: form.querySelector('input[type="tel"]').value,
            village: form.querySelectorAll('input[type="text"]')[1].value,
            block: form.querySelector('select').value,
            reason: form.querySelector('textarea').value,
            photoUrl: photoUrl,
            status: 'Pending',
            createdAt: new Date()
        });

        closeModal('reporterModal');
        form.reset();
        showToast('आवेदन सफलतापूर्वक भेजा गया! 🎉');
    } catch (error) {
        console.error("Error:", error);
        showToast("Error! Please try again.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ========== TOAST ==========
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ========== USER AUTHENTICATION ==========
async function handleGoogleLogin() {
    try {
        const { auth, googleProvider, signInWithPopup } = await import('./firebase-config.js');
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        closeModal('loginModal');
        showToast(`स्वागत है, ${user.displayName}!`);
    } catch (error) {
        console.error("Login Error:", error);
        showToast("लॉगिन विफल रहा। / Login Failed.");
    }
}

async function handleLogout() {
    try {
        const { auth, signOut } = await import('./firebase-config.js');
        await signOut(auth);
        showToast("सफलतापूर्वक लॉगआउट! / Logged Out Successfully!");
    } catch (error) {
        console.error("Logout Error:", error);
    }
}

async function initAuthListener() {
    const { auth, onAuthStateChanged } = await import('./firebase-config.js');
    onAuthStateChanged(auth, (user) => {
        updateAuthUI(user);
    });
}

function updateAuthUI(user) {
    const loginBtn = document.getElementById('loginBtnHeader');
    const profileDropdown = document.getElementById('userProfileDropdown');
    const userPhoto = document.getElementById('userPhotoImg');
    const userName = document.getElementById('userNameText');

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileDropdown) profileDropdown.style.display = 'flex';
        if (userPhoto) {
            if (user.photoURL) {
                userPhoto.innerHTML = `<img src="${user.photoURL}" alt="User">`;
            } else {
                userPhoto.innerHTML = `<i class="fa-regular fa-user"></i>`;
            }
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (profileDropdown) profileDropdown.style.display = 'none';
    }
}

// Global state for auth mode
let authMode = 'login';

function switchAuthMode(mode) {
    authMode = mode;
    const regFields = document.getElementById('registerFields');
    const submitBtn = document.getElementById('authSubmitBtn');
    const title = document.getElementById('authTitle');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    if (mode === 'register') {
        regFields.style.display = 'block';
        submitBtn.textContent = 'Register Now';
        title.innerHTML = '<i class="fas fa-user-plus"></i> पंजीकरण / Register';
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    } else {
        regFields.style.display = 'none';
        submitBtn.textContent = 'Login';
        title.innerHTML = '<i class="fas fa-sign-in-alt"></i> लॉगिन / Login';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const btn = document.getElementById('authSubmitBtn');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Processing...';

    try {
        const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, db, doc, setDoc } = await import('./firebase-config.js');

        if (authMode === 'register') {
            const name = document.getElementById('authName').value;
            const phone = document.getElementById('authPhone').value;

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            // Save extra data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                phone: phone,
                createdAt: new Date()
            });

            showToast(`पंजीकरण सफल! / Registered successfully! Welcome ${name}`);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
            showToast("लॉगिन सफल! / Logged in successfully!");
        }
        closeModal('loginModal');
    } catch (error) {
        console.error("Auth Error:", error);
        let msg = "Error: " + error.message;
        if (error.code === 'auth/email-already-in-use') msg = "Email already in use!";
        if (error.code === 'auth/wrong-password') msg = "Incorrect password!";
        if (error.code === 'auth/user-not-found') msg = "User not found!";
        showToast(msg);
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
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
        if (window.innerWidth <= 768) return;
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

    // Initialize Auth
    initAuthListener();
});

// Expose functions to window for HTML access
window.goSlide = goSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.openModal = openModal;
window.closeModal = closeModal;
window.submitComplaint = submitComplaint;
window.checkStatus = checkStatus;
window.showBlock = showBlock;
window.toggleVillages = toggleVillages;
window.showOfficers = showOfficers;
window.submitRegistration = submitRegistration;
window.submitReport = submitReport;
window.submitReporter = submitReporter;
window.filterBlocks = filterBlocks;
window.filterOfficers = filterOfficers;
window.handleGoogleLogin = handleGoogleLogin;
window.handleLogout = handleLogout;
window.switchAuthMode = switchAuthMode;
window.handleAuthSubmit = handleAuthSubmit;
