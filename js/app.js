// Main Application State & Logic for LArts TU Room Booking System (Formal & Clean Edition)

const STORAGE_KEY = 'lartstu_room_booking_v2';

// Seed Data
const DEFAULT_ROOMS = [
  {
    id: 'room-1',
    code: 'LP-201',
    name: 'ห้อง 201 (ไพโรจน์ เกษแม่นกิจ)',
    campus: 'thaprachan',
    campusName: 'ท่าพระจันทร์',
    building: 'อาคาร 32 ปี คณะศิลปศาสตร์',
    floor: 'ชั้น 2',
    capacity: 40,
    type: 'Boardroom / Seminar',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    facilities: ['projector', 'hybrid', 'mic', 'aircon', 'wifi', 'whiteboard'],
    facilityLabels: ['จอ Smart TV 85"', 'ระบบ Hybrid (Zoom/Teams)', 'ไมโครโฟนไร้สาย 4 ตัว', 'เครื่องปรับอากาศ', 'Wi-Fi ความเร็วสูง', 'กระดานไวท์บอร์ด'],
    suitableFor: 'การประชุมภาควิชา, สัมมนาวิชาการ, ประชุมกลุ่มคณาจารย์'
  },
  {
    id: 'room-2',
    code: 'LP-301',
    name: 'ห้องประชุมใหญ่ 301',
    campus: 'thaprachan',
    campusName: 'ท่าพระจันทร์',
    building: 'อาคาร 32 ปี คณะศิลปศาสตร์',
    floor: 'ชั้น 3',
    capacity: 85,
    type: 'Theater / Lecture',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    facilities: ['projector', 'hybrid', 'mic', 'recording', 'aircon', 'wifi'],
    facilityLabels: ['จอโปรเจกเตอร์คู่ 150"', 'ระบบ Hybrid คอนเฟอเรนซ์', 'ระบบเครื่องเสียง + ไมค์ 8 ตัว', 'ระบบบันทึกภาพและเสียง', 'เครื่องปรับอากาศ'],
    suitableFor: 'การประชุมคณาจารย์ทั้งคณะ, การบรรยายพิเศษ, พิธีปฐมนิเทศ'
  },
  {
    id: 'room-3',
    code: 'LP-405',
    name: 'ห้องสัมมนาขนาดเล็ก 405',
    campus: 'thaprachan',
    campusName: 'ท่าพระจันทร์',
    building: 'อาคาร 32 ปี คณะศิลปศาสตร์',
    floor: 'ชั้น 4',
    capacity: 16,
    type: 'Round Table / Discussion',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    facilities: ['projector', 'aircon', 'wifi', 'power'],
    facilityLabels: ['จอ LCD 65"', 'เครื่องปรับอากาศ', 'Wi-Fi ความเร็วสูง', 'ปลั๊กไฟประจำที่นั่ง'],
    suitableFor: 'สอบวิทยานิพนธ์, สัมภาษณ์งาน, ประชุมกลุ่มย่อย'
  },
  {
    id: 'room-4',
    code: 'RS-215',
    name: 'ห้องประชุมวิชาการ ศศ.215',
    campus: 'rangsit',
    campusName: 'ศูนย์รังสิต',
    building: 'อาคารคณะศิลปศาสตร์ รังสิต',
    floor: 'ชั้น 2',
    capacity: 50,
    type: 'Classroom / U-Shape',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    facilities: ['projector', 'hybrid', 'mic', 'aircon', 'wifi', 'power'],
    facilityLabels: ['จอ Interactive Touch Board', 'ระบบ Hybrid Meeting', 'ไมค์ตั้งโต๊ะรอบทิศทาง', 'ปลั๊กไฟทุกที่นั่ง', 'ระบบปรับแสงไฟ'],
    suitableFor: 'อบรมเชิงปฏิบัติการ, ประชุมคณะกรรมการหลักสูตร'
  },
  {
    id: 'room-5',
    code: 'RS-304',
    name: 'ห้องประชุมบอร์ดบริหาร ศศ.304',
    campus: 'rangsit',
    campusName: 'ศูนย์รังสิต',
    building: 'อาคารคณะศิลปศาสตร์ รังสิต',
    floor: 'ชั้น 3',
    capacity: 28,
    type: 'Executive Boardroom',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    facilities: ['projector', 'hybrid', 'mic', 'recording', 'aircon', 'wifi'],
    facilityLabels: ['จอ LED Video Wall', 'กล้อง PTZ ติดตามผู้พูด', 'ไมค์ก้านไร้สายทุกที่นั่ง', 'ระบบโหวตอิเล็กทรอนิกส์'],
    suitableFor: 'การประชุมคณะกรรมการบริหารคณะฯ'
  },
  {
    id: 'room-6',
    code: 'RS-108',
    name: 'ห้องเอนกประสงค์ ศศ.108',
    campus: 'rangsit',
    campusName: 'ศูนย์รังสิต',
    building: 'อาคารคณะศิลปศาสตร์ รังสิต',
    floor: 'ชั้น 1',
    capacity: 35,
    type: 'Flexible Modular',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    facilities: ['projector', 'aircon', 'wifi', 'whiteboard'],
    facilityLabels: ['โต๊ะเก้าอี้พับปรับเปลี่ยนได้', 'โปรเจกเตอร์ความสว่างสูง', 'กระดานกระจก 3 ด้าน', 'เครื่องปรับอากาศ'],
    suitableFor: 'กิจกรรม Workshop, ระดมสมอง, ประชุมโครงการพิเศษ'
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: 'ART-2026-0810',
    roomId: 'room-1',
    title: 'การประชุมคณะกรรมการพัฒนาหลักสูตรศิลปศาสตรบัณฑิต',
    organizer: 'อ.ดร.กานต์ นพรัตน์',
    department: 'ภาควิชาภาษาอังกฤษ',
    email: 'karn.n@arts.tu.ac.th',
    phone: '081-445-6789',
    date: '2026-11-16',
    startTime: '09:00',
    endTime: '12:00',
    attendees: 18,
    layout: 'U-Shape',
    objective: 'ทบทวนและปรับปรุงโครงสร้างรายวิชาประจำปีการศึกษา 2027',
    catering: {
      required: true,
      morningBreak: true,
      lunch: false,
      afternoonBreak: false,
      pax: 20,
      notes: 'กาแฟดำ/ชาเขียว และเบเกอรี่ (มังสวิรัติ 2 ชุด)',
      status: 'served'
    },
    equipment: {
      required: true,
      items: ['ไมโครโฟนไร้สาย 2 ตัว', 'เชื่อมต่อระบบ Hybrid Zoom'],
      notes: 'ต้องการทดสอบระบบเสียงก่อนเริ่ม 15 นาที',
      status: 'installed'
    },
    status: 'confirmed',
    checkedIn: true,
    checkInTime: '08:48',
    createdAt: '2026-11-12 10:30'
  },
  {
    id: 'ART-2026-0824',
    roomId: 'room-1',
    title: 'ประชุมหารือความร่วมมือทางวิชาการกับมหาวิทยาลัยเกียวโต',
    organizer: 'ผศ.ดร.วรรณภา สุขสม',
    department: 'สาขาวิชาภาษาญี่ปุ่น',
    email: 'wannapa.s@arts.tu.ac.th',
    phone: '089-123-4567',
    date: '2026-11-16',
    startTime: '13:30',
    endTime: '16:00',
    attendees: 12,
    layout: 'Boardroom',
    objective: 'เจรจาโครงการแลกเปลี่ยนนักศึกษาและอาจารย์วิจัย',
    catering: {
      required: true,
      morningBreak: false,
      lunch: false,
      afternoonBreak: true,
      pax: 15,
      notes: 'ชุดน้ำชาและขนมว่างสำหรับผู้บริหาร',
      status: 'pending'
    },
    equipment: {
      required: true,
      items: ['กล้อง PTZ Hybrid', 'จอเสริมสำหรับแปลภาษา'],
      notes: 'การประชุมเชื่อมต่อระบบ Teams ข้ามประเทศ',
      status: 'pending'
    },
    status: 'pending',
    checkedIn: false,
    createdAt: '2026-11-15 14:20'
  },
  {
    id: 'ART-2026-0831',
    roomId: 'room-2',
    title: 'โครงการอบรมเชิงปฏิบัติการ: AI เพื่อการแปลและการวิจัยทางมนุษยศาสตร์',
    organizer: 'ฝ่ายบริการวิชาการและวิจัย',
    department: 'งานวิจัยและวิเทศสัมพันธ์',
    email: 'research@arts.tu.ac.th',
    phone: '02-613-2600',
    date: '2026-11-16',
    startTime: '09:00',
    endTime: '16:30',
    attendees: 65,
    layout: 'Classroom',
    objective: 'อบรมพัฒนาทักษะอาจารย์และนักวิจัยในการประยุกต์ใช้ AI ในงานวิชาการ',
    catering: {
      required: true,
      morningBreak: true,
      lunch: true,
      afternoonBreak: true,
      pax: 70,
      notes: 'อาหารกลางวันแบบกล่อง และเครื่องดื่มตลอดวัน (อาหารฮาลาล 15 กล่อง)',
      status: 'pending'
    },
    equipment: {
      required: true,
      items: ['ไมค์ลอย 4 ตัว', 'บันทึกวิดีโอตลอดการอบรม', 'ระบบ Live Streaming'],
      notes: 'มีวิทยากรภายนอก 2 ท่าน ต้องการเจ้าหน้าที่ประจำห้อง',
      status: 'installed'
    },
    status: 'confirmed',
    checkedIn: false,
    createdAt: '2026-11-10 16:00'
  },
  {
    id: 'ART-2026-0842',
    roomId: 'room-4',
    title: 'การสอบประมวลความรู้ (Comprehensive Exam) ระดับบัณฑิตศึกษา',
    organizer: 'อ.ดร.พิชัย ธนสาร',
    department: 'ภาควิชาประวัติศาสตร์',
    email: 'pichai.t@arts.tu.ac.th',
    phone: '084-555-8899',
    date: '2026-11-17',
    startTime: '10:00',
    endTime: '13:00',
    attendees: 8,
    layout: 'U-Shape',
    objective: 'การสอบปากเปล่าดุษฎีนิพนธ์นักศึกษาปริญญาเอก',
    catering: {
      required: true,
      morningBreak: true,
      lunch: false,
      afternoonBreak: false,
      pax: 10,
      notes: 'กาแฟร้อนและผลไม้สดสำหรับคณะกรรมการ',
      status: 'pending'
    },
    equipment: {
      required: false,
      items: [],
      notes: '',
      status: 'pending'
    },
    status: 'confirmed',
    checkedIn: false,
    createdAt: '2026-11-14 11:15'
  }
];

const DEFAULT_SETTINGS = {
  emergencyBanner: {
    active: true,
    message: 'ประกาศแจ้งปิดปรับปรุง: ห้อง 201 อาคาร 32 ปี คณะศิลปศาสตร์ ท่าพระจันทร์ ปิดปรับปรุงระบบปรับอากาศระหว่างวันที่ 20 - 22 พฤศจิกายน 2026',
    level: 'warning'
  },
  rules: {
    minAdvanceHours: 2,
    maxContinuousHours: 8,
    requireApproval: true,
    autoReleaseMinutes: 15
  }
};

// Application State
const App = {
  state: {
    currentRole: 'staff',
    currentUser: {
      name: 'อ.ดร.กานต์ นพรัตน์',
      role: 'staff',
      roleLabel: 'อาจารย์ / บุคลากร',
      department: 'ภาควิชาภาษาอังกฤษ',
      email: 'karn.n@arts.tu.ac.th'
    },
    activeTab: 'catalog',
    myBookingsFilter: 'all', // 'all' | 'pending' | 'confirmed' | 'checked_in'
    scheduleModalDate: '2026-11-16',
    rooms: [],
    bookings: [],
    settings: {},
    selectedRoomId: null,
    selectedDate: '2026-11-16',
    selectedStartTime: null,
    selectedEndTime: null,
    holdTimer: {
      active: false,
      secondsLeft: 600,
      timerId: null
    },
    filters: {
      campus: 'all',
      capacity: 'all',
      search: ''
    },
    notifications: [
      { id: 1, title: 'คำขอจองห้องได้รับการอนุมัติ', body: 'ห้อง 201 วันที่ 16 พ.ย. 09:00 - 12:00 น. อนุมัติเรียบร้อยแล้ว', time: '10 นาทีที่แล้ว', read: false },
      { id: 2, title: 'แจ้งเตือนกำหนดการประชุม', body: 'การประชุมของท่านจะเริ่มในอีก 1 ชั่วโมง กรุณาสแกน QR Code หน้าห้องเพื่อเช็กอิน', time: '1 ชั่วโมงที่แล้ว', read: false }
    ]
  },

  init() {
    this.loadState();
    this.setupEventListeners();
    this.renderHeader();
    this.renderBanner();
    this.renderCurrentView();
    this.refreshIcons();
  },

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state.rooms = parsed.rooms || DEFAULT_ROOMS;
        this.state.bookings = parsed.bookings || DEFAULT_BOOKINGS;
        this.state.settings = parsed.settings || DEFAULT_SETTINGS;
      } else {
        this.state.rooms = DEFAULT_ROOMS;
        this.state.bookings = DEFAULT_BOOKINGS;
        this.state.settings = DEFAULT_SETTINGS;
        this.saveState();
      }
    } catch (e) {
      this.state.rooms = DEFAULT_ROOMS;
      this.state.bookings = DEFAULT_BOOKINGS;
      this.state.settings = DEFAULT_SETTINGS;
    }
  },

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        rooms: this.state.rooms,
        bookings: this.state.bookings,
        settings: this.state.settings
      }));
    } catch (e) {
      // Ignore storage quota errors
    }
  },

  setRole(role) {
    this.state.currentRole = role;
    if (role === 'guest') {
      this.state.currentUser = {
        name: 'นักศึกษา / บุคคลทั่วไป',
        role: 'guest',
        roleLabel: 'บุคคลทั่วไป (สืบค้นข้อมูล)',
        department: '-',
        email: '-'
      };
      if (['admin_timeline', 'admin_kanban', 'admin_dispatch', 'admin_stats', 'admin_settings', 'my_bookings'].includes(this.state.activeTab)) {
        this.state.activeTab = 'catalog';
      }
    } else if (role === 'staff') {
      this.state.currentUser = {
        name: 'อ.ดร.กานต์ นพรัตน์',
        role: 'staff',
        roleLabel: 'อาจารย์ / บุคลากร',
        department: 'ภาควิชาภาษาอังกฤษ',
        email: 'karn.n@arts.tu.ac.th'
      };
      if (['admin_timeline', 'admin_kanban', 'admin_dispatch', 'admin_stats', 'admin_settings'].includes(this.state.activeTab)) {
        this.state.activeTab = 'catalog';
      }
    } else if (role === 'admin') {
      this.state.currentUser = {
        name: 'คุณสมพร อารีย์',
        role: 'admin',
        roleLabel: 'ผู้ดูแลระบบ (งานบริหารกลาง)',
        department: 'สำนักงานเลขานุการคณะศิลปศาสตร์',
        email: 'admin.arts@tu.ac.th'
      };
      this.state.activeTab = 'admin_timeline';
    } else if (role === 'housekeeping') {
      this.state.currentUser = {
        name: 'คุณสมใจ ใจดี',
        role: 'housekeeping',
        roleLabel: 'ฝ่ายอาคารสถานที่ / จัดเลี้ยง',
        department: 'หน่วยอาคารสถานที่',
        email: 'catering@arts.tu.ac.th'
      };
      this.state.activeTab = 'admin_dispatch';
    } else if (role === 'it_support') {
      this.state.currentUser = {
        name: 'คุณธวัชชัย มั่นคง',
        role: 'it_support',
        roleLabel: 'ฝ่ายโสตทัศนูปกรณ์',
        department: 'หน่วยเทคโนโลยีการศึกษา',
        email: 'av.arts@tu.ac.th'
      };
      this.state.activeTab = 'admin_dispatch';
    }

    this.renderHeader();
    this.renderCurrentView();
    this.refreshIcons();
    this.showToast(`เปลี่ยนบทบาทเป็น: ${this.state.currentUser.roleLabel}`);
  },

  switchTab(tab) {
    if (this.state.currentRole === 'guest') {
      if (tab === 'booking') {
        this.showLoginRequiredModal();
        return;
      }
      if (tab === 'my_bookings' || tab.startsWith('admin_')) {
        this.showToast('หน้านี้สงวนสิทธิ์เฉพาะอาจารย์และบุคลากรคณะศิลปศาสตร์', 'error');
        return;
      }
    }

    if (this.state.currentRole === 'staff' && tab.startsWith('admin_')) {
      this.showToast('หน้านี้สำหรับผู้ดูแลระบบและเจ้าหน้าที่ปฏิบัติการเท่านั้น', 'error');
      return;
    }

    this.state.activeTab = tab;
    this.renderHeader();
    this.renderCurrentView();
    this.refreshIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderHeader() {
    const roleSelect = document.getElementById('role-selector');
    if (roleSelect) roleSelect.value = this.state.currentRole;

    const userBadge = document.getElementById('user-profile-badge');
    if (userBadge) {
      userBadge.innerHTML = `
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-300">
            ${this.state.currentUser.name.charAt(0)}
          </div>
          <div class="text-left hidden sm:block">
            <div class="text-xs font-bold text-slate-800 leading-tight">${this.state.currentUser.name}</div>
            <div class="text-[11px] text-slate-500">${this.state.currentUser.roleLabel}</div>
          </div>
        </div>
      `;
    }

    // Notifications render
    this.renderNotifications();

    // Desktop navigation active state
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const tab = btn.dataset.tab;
      if (tab === this.state.activeTab) {
        btn.className = 'nav-tab-btn px-3.5 py-2 rounded-lg text-sm font-semibold bg-red-800 text-white flex items-center gap-2 transition-colors';
      } else {
        btn.className = 'nav-tab-btn px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2 transition-colors';
      }
    });

    // Control visibility of admin vs staff nav items & Mobile Nav
    const isAdminRole = ['admin', 'housekeeping', 'it_support'].includes(this.state.currentRole);
    const adminNavGroup = document.getElementById('admin-nav-group');
    const userNavGroup = document.getElementById('user-nav-group');
    const mobileNavBar = document.getElementById('mobile-nav-bar');

    if (adminNavGroup && userNavGroup) {
      if (isAdminRole) {
        adminNavGroup.classList.remove('hidden');
        userNavGroup.classList.add('hidden');
      } else {
        adminNavGroup.classList.add('hidden');
        userNavGroup.classList.remove('hidden');
      }
    }

    if (mobileNavBar) {
      const mobileTabs = isAdminRole
        ? [
            { id: 'admin_timeline', label: 'ตารางภาพรวม' },
            { id: 'admin_kanban', label: 'กระดานสถานะ' },
            { id: 'admin_dispatch', label: 'คิวงานปฏิบัติการ' },
            { id: 'admin_stats', label: 'สถิติการใช้พื้นที่' },
            { id: 'admin_settings', label: 'ตั้งค่าระบบ' }
          ]
        : [
            { id: 'catalog', label: 'ข้อมูลห้องและตารางว่าง' },
            { id: 'booking', label: 'จองห้องประชุม' },
            { id: 'my_bookings', label: 'รายการจองของฉัน' }
          ];

      mobileNavBar.innerHTML = mobileTabs.map(t => {
        const isActive = this.state.activeTab === t.id;
        return `
          <button 
            onclick="App.switchTab('${t.id}')" 
            class="px-3 py-1.5 rounded-lg font-medium transition-colors ${isActive ? 'bg-red-800 text-white font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
          >
            ${t.label}
          </button>
        `;
      }).join('');
    }
  },

  renderNotifications() {
    const unreadCount = this.state.notifications.filter(n => !n.read).length;
    const badgeEl = document.getElementById('notif-badge');
    if (badgeEl) {
      if (unreadCount > 0) {
        badgeEl.textContent = unreadCount;
        badgeEl.classList.remove('hidden');
      } else {
        badgeEl.classList.add('hidden');
      }
    }

    const listEl = document.getElementById('notif-list');
    if (listEl) {
      if (this.state.notifications.length === 0) {
        listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">ไม่มีการแจ้งเตือน</div>`;
      } else {
        listEl.innerHTML = this.state.notifications.map(n => `
          <div class="p-3.5 text-xs ${n.read ? 'bg-white' : 'bg-red-50/40'}">
            <div class="flex items-start justify-between gap-2">
              <span class="font-bold text-slate-800">${n.title}</span>
              ${!n.read ? '<span class="w-2 h-2 rounded-full bg-red-700 shrink-0 mt-1"></span>' : ''}
            </div>
            <p class="text-slate-600 mt-1 leading-relaxed">${n.body}</p>
            <div class="text-[10px] text-slate-400 mt-1.5">${n.time}</div>
          </div>
        `).join('');
      }
    }
  },

  toggleNotifDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  },

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => n.read = true);
    this.renderNotifications();
  },

  renderBanner() {
    const bannerContainer = document.getElementById('emergency-banner-container');
    if (!bannerContainer) return;

    if (this.state.settings.emergencyBanner && this.state.settings.emergencyBanner.active) {
      bannerContainer.innerHTML = `
        <div class="bg-amber-50 text-amber-950 px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between border-b border-amber-200">
          <div class="flex items-center gap-2.5 max-w-7xl mx-auto flex-1">
            <i data-lucide="alert-circle" class="w-4 h-4 text-amber-700 shrink-0"></i>
            <span>${this.state.settings.emergencyBanner.message}</span>
          </div>
          <button onclick="App.dismissBanner()" class="text-amber-800 hover:text-amber-950 p-1 rounded" aria-label="ปิดประกาศ">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      bannerContainer.classList.remove('hidden');
      this.refreshIcons();
    } else {
      bannerContainer.innerHTML = '';
      bannerContainer.classList.add('hidden');
    }
  },

  dismissBanner() {
    const bannerContainer = document.getElementById('emergency-banner-container');
    if (bannerContainer) bannerContainer.classList.add('hidden');
  },

  renderCurrentView() {
    const container = document.getElementById('main-content');
    if (!container) return;

    switch (this.state.activeTab) {
      case 'catalog':
        this.renderCatalogView(container);
        break;
      case 'booking':
        this.renderBookingView(container);
        break;
      case 'my_bookings':
        this.renderMyBookingsView(container);
        break;
      case 'admin_timeline':
        this.renderAdminTimelineView(container);
        break;
      case 'admin_kanban':
        this.renderAdminKanbanView(container);
        break;
      case 'admin_dispatch':
        this.renderAdminDispatchView(container);
        break;
      case 'admin_stats':
        this.renderAdminStatsView(container);
        break;
      case 'admin_settings':
        this.renderAdminSettingsView(container);
        break;
      default:
        this.renderCatalogView(container);
    }
    this.refreshIcons();
  },

  // 1. PUBLIC ROOM DIRECTORY & AVAILABILITY VIEW
  renderCatalogView(container) {
    let filteredRooms = this.state.rooms.filter(room => {
      if (this.state.filters.campus !== 'all' && room.campus !== this.state.filters.campus) return false;
      if (this.state.filters.capacity === 'small' && room.capacity > 20) return false;
      if (this.state.filters.capacity === 'medium' && (room.capacity <= 20 || room.capacity > 50)) return false;
      if (this.state.filters.capacity === 'large' && room.capacity <= 50) return false;
      if (this.state.filters.search) {
        const query = this.state.filters.search.toLowerCase();
        const matchName = room.name.toLowerCase().includes(query);
        const matchBuilding = room.building.toLowerCase().includes(query);
        const matchFacility = room.facilityLabels.some(f => f.toLowerCase().includes(query));
        if (!matchName && !matchBuilding && !matchFacility) return false;
      }
      return true;
    });

    let html = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <!-- Formal Institutional Header -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 mb-6 shadow-xs">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 text-red-800 font-semibold text-xs uppercase tracking-wider mb-2">
                <span class="w-2 h-2 rounded-full bg-red-800"></span>
                <span>คณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">ระบบสืบค้นข้อมูลและจองห้องประชุม</h1>
              <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                ตรวจสอบรายละเอียดห้องประชุม อุปกรณ์โสตทัศนูปกรณ์ และตารางการใช้งานรายวันได้ทันที 
                ระบบรองรับการล็อกช่วงเวลาชั่วคราว 10 นาทีระหว่างทำรายการ และการยืนยันเข้าใช้งานด้วย QR Code
              </p>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 lg:max-w-sm shrink-0">
              <div class="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <i data-lucide="info" class="w-4 h-4 text-slate-500"></i>
                <span>ข้อกำหนดสิทธิ์การเข้าใช้งาน</span>
              </div>
              <p class="leading-relaxed">
                นักศึกษาและบุคคลทั่วไปสามารถสืบค้นข้อมูลและตรวจสอบตารางว่างได้โดยไม่ต้องเข้าสู่ระบบ 
                สำหรับการยื่นคำขอจองห้อง สงวนสิทธิ์เฉพาะคณาจารย์และบุคลากรของคณะฯ เท่านั้น
              </p>
            </div>
          </div>
        </div>

        <!-- Search & Filter Bar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div class="relative flex-1">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="catalog-search" 
              placeholder="ค้นหาชื่อห้อง อาคาร หรืออุปกรณ์ เช่น Hybrid, โปรเจกเตอร์..." 
              value="${this.state.filters.search}"
              oninput="App.onFilterSearch(this.value)"
              class="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800"
            />
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-slate-600 shrink-0">ศูนย์การศึกษา:</label>
              <select 
                id="filter-campus" 
                onchange="App.onFilterCampus(this.value)"
                class="border border-slate-300 rounded-lg text-xs sm:text-sm py-2 px-3 focus:outline-none focus:border-red-800 bg-white flex-1"
              >
                <option value="all" ${this.state.filters.campus === 'all' ? 'selected' : ''}>ทุกศูนย์การศึกษา</option>
                <option value="thaprachan" ${this.state.filters.campus === 'thaprachan' ? 'selected' : ''}>ท่าพระจันทร์</option>
                <option value="rangsit" ${this.state.filters.campus === 'rangsit' ? 'selected' : ''}>ศูนย์รังสิต</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-slate-600 shrink-0">ขนาดความจุ:</label>
              <select 
                id="filter-capacity" 
                onchange="App.onFilterCapacity(this.value)"
                class="border border-slate-300 rounded-lg text-xs sm:text-sm py-2 px-3 focus:outline-none focus:border-red-800 bg-white flex-1"
              >
                <option value="all" ${this.state.filters.capacity === 'all' ? 'selected' : ''}>ทุกขนาดความจุ</option>
                <option value="small" ${this.state.filters.capacity === 'small' ? 'selected' : ''}>ขนาดเล็ก (ไม่เกิน 20 ที่นั่ง)</option>
                <option value="medium" ${this.state.filters.capacity === 'medium' ? 'selected' : ''}>ขนาดกลาง (21 - 50 ที่นั่ง)</option>
                <option value="large" ${this.state.filters.capacity === 'large' ? 'selected' : ''}>ขนาดใหญ่ (มากกว่า 50 ที่นั่ง)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Room Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    if (filteredRooms.length === 0) {
      html += `
        <div class="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          <i data-lucide="search-x" class="w-8 h-8 text-slate-400 mx-auto mb-2"></i>
          <div class="text-sm font-semibold text-slate-800">ไม่พบห้องประชุมที่ตรงกับเงื่อนไขการค้นหา</div>
          <div class="text-xs text-slate-500 mt-1">กรุณาปรับเปลี่ยนคำค้นหาหรือตัวกรองศูนย์การศึกษา</div>
        </div>
      `;
    } else {
      filteredRooms.forEach(room => {
        const todayBookings = this.state.bookings.filter(b => b.roomId === room.id && b.date === this.state.selectedDate && b.status !== 'cancelled');
        const isFreeNow = todayBookings.length === 0;

        html += `
          <div class="room-card bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors flex flex-col">
            <!-- Room Image Container -->
            <div class="relative h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
              <img 
                src="${room.image}" 
                alt="${room.name}" 
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute top-3 left-3 bg-slate-900/85 text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3 h-3"></i>
                <span>${room.campusName}</span>
              </div>
              <div class="absolute top-3 right-3 bg-white/95 text-slate-900 border border-slate-200 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                <i data-lucide="users" class="w-3.5 h-3.5 text-slate-600"></i>
                <span>${room.capacity} ที่นั่ง</span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-5 flex-1 flex flex-col">
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="text-xs font-medium text-slate-500">${room.building} (${room.floor})</span>
                ${isFreeNow 
                  ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2 py-0.5 rounded">ว่างตลอดวัน</span>'
                  : `<span class="bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold px-2 py-0.5 rounded">มี ${todayBookings.length} คิวจองวันนี้</span>`
                }
              </div>

              <h3 class="text-base font-bold text-slate-900 leading-snug">${room.name}</h3>
              <p class="text-xs text-slate-500 mt-1 mb-4 line-clamp-1">${room.suitableFor}</p>

              <!-- Facilities Badges -->
              <div class="mb-5">
                <div class="text-[11px] font-semibold text-slate-500 mb-1.5">อุปกรณ์และสิ่งอำนวยความสะดวก:</div>
                <div class="flex flex-wrap gap-1.5">
                  ${room.facilityLabels.slice(0, 4).map(f => `
                    <span class="bg-slate-50 text-slate-700 text-[11px] px-2 py-0.5 rounded border border-slate-200">
                      ${f}
                    </span>
                  `).join('')}
                  ${room.facilityLabels.length > 4 ? `
                    <span class="bg-slate-50 text-slate-500 text-[11px] px-2 py-0.5 rounded border border-slate-200">
                      +${room.facilityLabels.length - 4} รายการ
                    </span>
                  ` : ''}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                <button 
                  onclick="App.showRoomScheduleModal('${room.id}')"
                  class="w-full py-2 px-3 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                  <span>ตรวจสอบตารางว่าง</span>
                </button>

                <button 
                  onclick="App.startBookingRoom('${room.id}')"
                  class="w-full py-2 px-3 bg-red-800 text-white rounded-lg text-xs font-semibold hover:bg-red-900 transition-colors flex items-center justify-center gap-1.5"
                >
                  <i data-lucide="file-edit" class="w-3.5 h-3.5"></i>
                  <span>ยื่นคำขอจองห้อง</span>
                </button>
              </div>
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // 2. CONSOLIDATED SMART BOOKING FORM
  renderBookingView(container) {
    const selectedRoom = this.state.rooms.find(r => r.id === this.state.selectedRoomId) || this.state.rooms[0];
    const today = this.state.selectedDate;

    let html = `
      <div class="max-w-4xl mx-auto px-4 py-8">
        <!-- Floating Hold Timer Badge -->
        <div id="hold-timer-bar" class="mb-6 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${this.state.holdTimer.active ? '' : 'hidden'}">
          <div class="flex items-center gap-3">
            <i data-lucide="clock" class="w-5 h-5 text-amber-400 shrink-0"></i>
            <div>
              <div class="text-xs text-slate-300">ระบบสงวนสิทธิ์ช่วงเวลาที่เลือกให้ท่านชั่วคราวระหว่างกรอกข้อมูล</div>
              <div class="text-sm font-semibold flex items-center gap-2 mt-0.5">
                <span>เวลาคงเหลือ:</span>
                <span id="hold-countdown" class="font-mono text-sm bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-amber-300">10:00</span>
              </div>
            </div>
          </div>
          <button type="button" onclick="App.cancelHold()" class="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 self-start sm:self-center">
            ยกเลิกการสงวนสิทธิ์
          </button>
        </div>

        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <button onclick="App.switchTab('catalog')" class="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-1.5">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>กลับหน้ารายการห้องประชุม</span>
            </button>
            <h1 class="text-2xl font-bold text-slate-900">แบบฟอร์มขอใช้ห้องประชุม</h1>
          </div>
          <div class="bg-white border border-slate-200 text-slate-700 text-xs px-3.5 py-2 rounded-lg font-medium flex items-center gap-2 self-start">
            <i data-lucide="user" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>ผู้ยื่นคำขอ: <strong class="text-slate-900">${this.state.currentUser.name}</strong></span>
          </div>
        </div>

        <form id="smart-booking-form" onsubmit="App.handleBookingSubmit(event)" class="space-y-6">
          
          <!-- STEP 1: ห้องและช่วงเวลา -->
          <div class="bg-white p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
              <span class="w-6 h-6 rounded-full bg-red-800 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 class="text-base font-bold text-slate-900">เลือกห้องประชุมและช่วงเวลาที่ต้องการ</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">ห้องประชุม</label>
                <select 
                  id="booking-room-select" 
                  onchange="App.onBookingRoomChange(this.value)"
                  class="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-red-800"
                >
                  ${this.state.rooms.map(r => `
                    <option value="${r.id}" ${r.id === selectedRoom.id ? 'selected' : ''}>
                      ${r.name} (${r.campusName} - ความจุ ${r.capacity} ที่นั่ง)
                    </option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">วันที่ต้องการใช้ห้อง</label>
                <input 
                  type="date" 
                  id="booking-date-input" 
                  value="${today}" 
                  min="2026-11-16"
                  onchange="App.onBookingDateChange(this.value)"
                  class="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-red-800"
                />
              </div>
            </div>

            <!-- Selected Room Summary -->
            <div class="bg-slate-50 p-3.5 rounded-lg border border-slate-200 mb-5 flex items-center justify-between gap-4 text-xs">
              <div>
                <div class="font-bold text-slate-900">${selectedRoom.name} &bull; ${selectedRoom.building} (${selectedRoom.floor})</div>
                <div class="text-slate-600 mt-0.5">ความจุสูงสุด ${selectedRoom.capacity} ที่นั่ง | อุปกรณ์หลัก: ${selectedRoom.facilityLabels.slice(0, 3).join(', ')}</div>
              </div>
              <span class="bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded shrink-0">
                ${selectedRoom.campusName}
              </span>
            </div>

            <!-- Visual Timeline Picker Container -->
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span class="text-xs font-semibold text-slate-700">คลิกเลือกช่วงเวลาเริ่มต้นและสิ้นสุด:</span>
                <div class="flex items-center gap-3 text-[11px] text-slate-600">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-white border border-slate-300"></span> ว่าง</span>
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-blue-900"></span> ช่วงเวลาที่เลือก</span>
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-100 border border-amber-300"></span> รออนุมัติ</span>
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-200"></span> ติดจอง</span>
                </div>
              </div>

              <div id="booking-slot-picker-container" class="mt-2"></div>

              <div id="time-selection-error" class="hidden error-msg mt-2">
                <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                <span>กรุณาเลือกช่วงเวลาที่ต้องการใช้งานอย่างน้อย 30 นาที</span>
              </div>

              <div class="mt-3.5 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-slate-700">ช่วงเวลาที่เลือก:</span>
                  <span id="selected-time-display" class="font-bold text-blue-900 font-mono text-sm">
                    ${this.state.selectedStartTime ? `${this.state.selectedStartTime} - ${this.state.selectedEndTime} น.` : 'ยังไม่ได้เลือกช่วงเวลา'}
                  </span>
                </div>
                <button 
                  type="button" 
                  onclick="App.clearTimeSelection()" 
                  class="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  ล้างค่าเวลา
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 2: รายละเอียดการประชุม & บริการเสริม -->
          <div class="bg-white p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
              <span class="w-6 h-6 rounded-full bg-red-800 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h2 class="text-base font-bold text-slate-900">รายละเอียดการประชุมและบริการสนับสนุน</h2>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">หัวข้อการประชุม / ชื่อโครงการ <span class="text-red-700">*</span></label>
                <input 
                  type="text" 
                  id="form-title" 
                  placeholder="ระบุชื่อการประชุมหรือกิจกรรมทางวิชาการ" 
                  class="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-red-800"
                  oninput="App.clearInlineError('title')"
                />
                <div id="error-title" class="hidden error-msg">
                  <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                  <span>กรุณาระบุหัวข้อการประชุม</span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">จำนวนผู้เข้าร่วม (คน) <span class="text-red-700">*</span></label>
                  <input 
                    type="number" 
                    id="form-attendees" 
                    placeholder="ระบุจำนวน" 
                    min="1" 
                    max="${selectedRoom.capacity}"
                    class="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-red-800"
                    oninput="App.clearInlineError('attendees')"
                  />
                  <div id="error-attendees" class="hidden error-msg">
                    <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                    <span>ระบุจำนวนระหว่าง 1 - ${selectedRoom.capacity} คน</span>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">รูปแบบการจัดห้อง</label>
                  <select id="form-layout" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-red-800">
                    <option value="U-Shape">รูปตัวยู (U-Shape)</option>
                    <option value="Classroom">แบบห้องเรียน (Classroom)</option>
                    <option value="Boardroom">แบบโต๊ะประชุม (Boardroom)</option>
                    <option value="Theater">แบบบรรยาย (Theater)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">หมายเลขโทรศัพท์ติดต่อ <span class="text-red-700">*</span></label>
                  <input 
                    type="tel" 
                    id="form-phone" 
                    placeholder="08X-XXX-XXXX" 
                    value="081-445-6789"
                    class="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-red-800"
                    oninput="App.clearInlineError('phone')"
                  />
                  <div id="error-phone" class="hidden error-msg">
                    <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                    <span>กรุณาระบุหมายเลขโทรศัพท์ติดต่อ</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">วัตถุประสงค์และรายละเอียดเพิ่มเติม</label>
                <textarea 
                  id="form-objective" 
                  rows="2" 
                  placeholder="ระบุรายละเอียดโดยสังเขปเพื่อประกอบการพิจารณา" 
                  class="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-red-800"
                ></textarea>
              </div>
            </div>

            <!-- Optional Services Accordions -->
            <div class="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <div class="text-xs font-semibold text-slate-500">บริการสนับสนุนเพิ่มเติม (เลือกเฉพาะกรณีที่ต้องการใช้งาน):</div>

              <!-- Accordion 1: บริการอาหารและเครื่องดื่ม -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 flex items-center justify-between cursor-pointer" onclick="App.toggleAccordion('catering-accordion')">
                  <label class="flex items-center gap-2.5 cursor-pointer font-semibold text-xs sm:text-sm text-slate-800" onclick="event.stopPropagation()">
                    <input 
                      type="checkbox" 
                      id="opt-catering-toggle" 
                      onchange="App.onCateringToggle(this.checked)"
                      class="w-4 h-4 text-red-800 rounded border-slate-300 focus:ring-red-800" 
                    />
                    <span>บริการอาหารว่างและเครื่องดื่มจัดเลี้ยง</span>
                  </label>
                  <span id="catering-accordion-icon" class="text-slate-500 text-xs font-medium">แสดงรายละเอียด</span>
                </div>

                <div id="catering-accordion-body" class="p-4 border-t border-slate-200 bg-white hidden space-y-3">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <label class="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="catering-m-break" class="rounded text-red-800" />
                      <span>อาหารว่างรอบเช้า</span>
                    </label>
                    <label class="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="catering-lunch" class="rounded text-red-800" />
                      <span>อาหารกลางวัน</span>
                    </label>
                    <label class="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="catering-a-break" class="rounded text-red-800" />
                      <span>อาหารว่างรอบบ่าย</span>
                    </label>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">จำนวนชุดที่ต้องการ (ชุด)</label>
                      <input type="number" id="catering-pax" placeholder="ระบุจำนวนชุด" class="w-full border border-slate-300 rounded-lg p-2 text-xs" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">ข้อจำกัดด้านอาหาร (เช่น อาหารฮาลาล, มังสวิรัติ)</label>
                      <input type="text" id="catering-notes" placeholder="ระบุรายละเอียดเพิ่มเติม" class="w-full border border-slate-300 rounded-lg p-2 text-xs" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Accordion 2: อุปกรณ์โสตทัศนูปกรณ์พิเศษ -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 flex items-center justify-between cursor-pointer" onclick="App.toggleAccordion('av-accordion')">
                  <label class="flex items-center gap-2.5 cursor-pointer font-semibold text-xs sm:text-sm text-slate-800" onclick="event.stopPropagation()">
                    <input 
                      type="checkbox" 
                      id="opt-av-toggle" 
                      onchange="App.onAVToggle(this.checked)"
                      class="w-4 h-4 text-red-800 rounded border-slate-300 focus:ring-red-800" 
                    />
                    <span>บริการอุปกรณ์โสตทัศนูปกรณ์และเจ้าหน้าที่เทคนิค</span>
                  </label>
                  <span id="av-accordion-icon" class="text-slate-500 text-xs font-medium">แสดงรายละเอียด</span>
                </div>

                <div id="av-accordion-body" class="p-4 border-t border-slate-200 bg-white hidden space-y-3">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <label class="flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="av-item-mic" value="ไมโครโฟนไร้สายเสริม" class="rounded text-red-800" />
                      <span>ไมโครโฟนไร้สายเพิ่มเติม</span>
                    </label>
                    <label class="flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="av-item-hybrid" value="ระบบ Hybrid Zoom/Teams" class="rounded text-red-800" />
                      <span>เชื่อมต่อระบบประชุมทางไกล (Zoom / Teams)</span>
                    </label>
                    <label class="flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="av-item-recording" value="บันทึกวิดีโอการประชุม" class="rounded text-red-800" />
                      <span>บันทึกภาพและเสียงการประชุม</span>
                    </label>
                    <label class="flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <input type="checkbox" id="av-item-tech" value="เจ้าหน้าที่เทคนิคประจำห้อง" class="rounded text-red-800" />
                      <span>ขอเจ้าหน้าที่โสตฯ ประจำห้อง</span>
                    </label>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">หมายเหตุถึงฝ่ายโสตทัศนูปกรณ์</label>
                    <input type="text" id="av-notes" placeholder="เช่น ต้องการทดสอบระบบก่อนเริ่มการประชุม 15 นาที" class="w-full border border-slate-300 rounded-lg p-2 text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: ข้อตกลงและยืนยันการจอง -->
          <div class="bg-white p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
              <span class="w-6 h-6 rounded-full bg-red-800 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h2 class="text-base font-bold text-slate-900">ระเบียบการใช้ห้องประชุมและการยืนยันคำขอ</h2>
            </div>

            <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed mb-4">
              <div class="font-bold text-slate-800 mb-1.5">แนวปฏิบัติการใช้ห้องประชุม คณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์:</div>
              <ol class="list-decimal pl-5 space-y-1">
                <li>ผู้ขอใช้ห้องต้องสแกน QR Code บริเวณหน้าห้องประชุมเพื่อยืนยันการเข้าใช้งานภายใน 15 นาทีนับจากเวลาเริ่มต้น หากพ้นกำหนดระบบจะยกเลิกรายการจองโดยอัตโนมัติ</li>
                <li>กรุณาดูแลความเรียบร้อย ปิดอุปกรณ์ไฟฟ้า และเครื่องปรับอากาศทุกครั้งหลังเสร็จสิ้นการใช้งาน</li>
                <li>หากมีความจำเป็นต้องยกเลิกการใช้งาน กรุณาดำเนินการยกเลิกผ่านระบบล่วงหน้าอย่างน้อย 1 วันทำการ</li>
              </ol>
            </div>

            <div class="flex items-start gap-2.5 mb-5">
              <input 
                type="checkbox" 
                id="form-terms" 
                class="mt-0.5 w-4 h-4 text-red-800 rounded border-slate-300 focus:ring-red-800" 
                onchange="App.clearInlineError('terms')"
              />
              <label for="form-terms" class="text-xs text-slate-700 select-none">
                ข้าพเจ้ารับทราบและยินยอมปฏิบัติตามระเบียบการใช้ห้องประชุมของคณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์ <span class="text-red-700">*</span>
              </label>
            </div>
            <div id="error-terms" class="hidden error-msg mb-4">
              <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
              <span>กรุณาทำเครื่องหมายยอมรับเงื่อนไขการใช้ห้องประชุมก่อนส่งคำขอ</span>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onclick="App.switchTab('catalog')" 
                class="w-full sm:w-auto px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
              >
                ยกเลิก
              </button>

              <button 
                type="submit" 
                class="w-full sm:w-auto px-6 py-2.5 bg-red-800 text-white rounded-lg text-xs font-semibold hover:bg-red-900 flex items-center justify-center gap-2"
              >
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                <span>ยืนยันการส่งคำขอจองห้อง</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    `;

    container.innerHTML = html;
    this.renderBookingSlotPicker();
  },

  renderBookingSlotPicker() {
    const selectedRoom = this.state.rooms.find(r => r.id === this.state.selectedRoomId) || this.state.rooms[0];
    TimelineComponent.renderSlotPicker(
      'booking-slot-picker-container',
      selectedRoom.id,
      this.state.selectedDate,
      this.state.selectedStartTime,
      this.state.selectedEndTime,
      this.state.bookings,
      (start, end) => {
        this.state.selectedStartTime = start;
        this.state.selectedEndTime = end;
        const disp = document.getElementById('selected-time-display');
        if (disp) disp.textContent = (start && end) ? `${start} - ${end} น.` : 'ยังไม่ได้เลือกช่วงเวลา';
        if (start && end) { this.clearInlineError('time'); this.startHoldTimer(); }
        this.renderBookingSlotPicker();
      }
    );
  },

  startHoldTimer() {
    if (this.state.holdTimer.active) return;

    this.state.holdTimer.active = true;
    this.state.holdTimer.secondsLeft = 600;

    const bar = document.getElementById('hold-timer-bar');
    if (bar) bar.classList.remove('hidden');

    if (this.state.holdTimer.timerId) clearInterval(this.state.holdTimer.timerId);

    this.state.holdTimer.timerId = setInterval(() => {
      this.state.holdTimer.secondsLeft--;
      const countdownEl = document.getElementById('hold-countdown');
      if (countdownEl) {
        const m = Math.floor(this.state.holdTimer.secondsLeft / 60).toString().padStart(2, '0');
        const s = (this.state.holdTimer.secondsLeft % 60).toString().padStart(2, '0');
        countdownEl.textContent = `${m}:${s}`;
      }

      if (this.state.holdTimer.secondsLeft <= 0) {
        this.cancelHold();
        this.showDialog({
          title: 'สิ้นสุดระยะเวลาสงวนสิทธิ์ชั่วคราว',
          message: 'ครบกำหนดเวลา 10 นาทีในการทำรายการ ระบบได้คืนสิทธิ์ช่วงเวลาดังกล่าวกลับสู่ตารางกลางแล้ว กรุณาเลือกช่วงเวลาใหม่อีกครั้ง',
          confirmText: 'รับทราบ'
        });
      }
    }, 1000);
  },

  cancelHold() {
    if (this.state.holdTimer.timerId) clearInterval(this.state.holdTimer.timerId);
    this.state.holdTimer.active = false;
    this.state.holdTimer.secondsLeft = 600;
    this.clearTimeSelection();
    const bar = document.getElementById('hold-timer-bar');
    if (bar) bar.classList.add('hidden');
  },

  clearTimeSelection() {
    this.state.selectedStartTime = null;
    this.state.selectedEndTime = null;
    const disp = document.getElementById('selected-time-display');
    if (disp) disp.textContent = 'ยังไม่ได้เลือกช่วงเวลา';
    this.renderBookingSlotPicker();
  },

  onBookingRoomChange(roomId) {
    this.state.selectedRoomId = roomId;
    this.clearTimeSelection();
    this.renderCurrentView();
  },

  onBookingDateChange(date) {
    this.state.selectedDate = date;
    this.clearTimeSelection();
    this.renderBookingSlotPicker();
  },

  toggleAccordion(id) {
    const body = document.getElementById(`${id}-body`);
    const icon = document.getElementById(`${id}-icon`);
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      if (icon) icon.textContent = 'ซ่อนรายละเอียด';
    } else {
      body.classList.add('hidden');
      if (icon) icon.textContent = 'แสดงรายละเอียด';
    }
  },

  onCateringToggle(checked) {
    const body = document.getElementById('catering-accordion-body');
    const icon = document.getElementById('catering-accordion-icon');
    if (checked) {
      body.classList.remove('hidden');
      if (icon) icon.textContent = 'ซ่อนรายละเอียด';
    }
  },

  onAVToggle(checked) {
    const body = document.getElementById('av-accordion-body');
    const icon = document.getElementById('av-accordion-icon');
    if (checked) {
      body.classList.remove('hidden');
      if (icon) icon.textContent = 'ซ่อนรายละเอียด';
    }
  },

  clearInlineError(field) {
    if (field === 'title') {
      document.getElementById('form-title').classList.remove('input-error');
      document.getElementById('error-title').classList.add('hidden');
    } else if (field === 'attendees') {
      document.getElementById('form-attendees').classList.remove('input-error');
      document.getElementById('error-attendees').classList.add('hidden');
    } else if (field === 'phone') {
      document.getElementById('form-phone').classList.remove('input-error');
      document.getElementById('error-phone').classList.add('hidden');
    } else if (field === 'time') {
      document.getElementById('time-selection-error').classList.add('hidden');
    } else if (field === 'terms') {
      document.getElementById('error-terms').classList.add('hidden');
    }
  },

  handleBookingSubmit(e) {
    e.preventDefault();

    let hasError = false;

    if (!this.state.selectedStartTime || !this.state.selectedEndTime) {
      document.getElementById('time-selection-error').classList.remove('hidden');
      hasError = true;
    }

    const titleVal = document.getElementById('form-title').value.trim();
    if (!titleVal) {
      document.getElementById('form-title').classList.add('input-error');
      document.getElementById('error-title').classList.remove('hidden');
      hasError = true;
    }

    const selectedRoom = this.state.rooms.find(r => r.id === this.state.selectedRoomId) || this.state.rooms[0];
    const attendeesVal = parseInt(document.getElementById('form-attendees').value, 10);
    if (!attendeesVal || attendeesVal <= 0 || attendeesVal > selectedRoom.capacity) {
      document.getElementById('form-attendees').classList.add('input-error');
      document.getElementById('error-attendees').classList.remove('hidden');
      hasError = true;
    }

    const phoneVal = document.getElementById('form-phone').value.trim();
    if (!phoneVal) {
      document.getElementById('form-phone').classList.add('input-error');
      document.getElementById('error-phone').classList.remove('hidden');
      hasError = true;
    }

    const termsChecked = document.getElementById('form-terms').checked;
    if (!termsChecked) {
      document.getElementById('error-terms').classList.remove('hidden');
      hasError = true;
    }

    if (hasError) {
      this.showToast('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error');
      return;
    }

    const cateringRequired = document.getElementById('opt-catering-toggle').checked;
    let cateringData = { required: false };
    if (cateringRequired) {
      cateringData = {
        required: true,
        morningBreak: document.getElementById('catering-m-break').checked,
        lunch: document.getElementById('catering-lunch').checked,
        afternoonBreak: document.getElementById('catering-a-break').checked,
        pax: parseInt(document.getElementById('catering-pax').value, 10) || attendeesVal,
        notes: document.getElementById('catering-notes').value.trim(),
        status: 'pending'
      };
    }

    const avRequired = document.getElementById('opt-av-toggle').checked;
    let avData = { required: false, items: [], notes: '', status: 'pending' };
    if (avRequired) {
      const items = [];
      if (document.getElementById('av-item-mic').checked) items.push('ไมโครโฟนไร้สายเพิ่มเติม');
      if (document.getElementById('av-item-hybrid').checked) items.push('ระบบ Hybrid Zoom/Teams');
      if (document.getElementById('av-item-recording').checked) items.push('บันทึกวิดีโอการประชุม');
      if (document.getElementById('av-item-tech').checked) items.push('เจ้าหน้าที่เทคนิคประจำห้อง');

      avData = {
        required: true,
        items: items,
        notes: document.getElementById('av-notes').value.trim(),
        status: 'pending'
      };
    }

    const newBookingId = `ART-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newBookingId,
      roomId: selectedRoom.id,
      title: titleVal,
      organizer: this.state.currentUser.name,
      department: this.state.currentUser.department,
      email: this.state.currentUser.email,
      phone: phoneVal,
      date: this.state.selectedDate,
      startTime: this.state.selectedStartTime,
      endTime: this.state.selectedEndTime,
      attendees: attendeesVal,
      layout: document.getElementById('form-layout').value,
      objective: document.getElementById('form-objective').value.trim(),
      catering: cateringData,
      equipment: avData,
      status: this.state.settings.rules.requireApproval ? 'pending' : 'confirmed',
      checkedIn: false,
      createdAt: new Date().toLocaleString('th-TH')
    };

    this.state.bookings.unshift(newBooking);
    this.saveState();

    if (this.state.holdTimer.timerId) clearInterval(this.state.holdTimer.timerId);
    this.state.holdTimer.active = false;

    this.showBookingSuccessModal(newBooking, selectedRoom);
  },

  // 3. SUCCESS & CONFIRMATION MODAL
  showBookingSuccessModal(booking, room) {
    const modal = document.getElementById('generic-modal');
    const content = document.getElementById('generic-modal-content');

    const qrData = `LARTS-BOOKING:${booking.id}:${room.code}:${booking.date}`;
    const simulatedQR = this.generateSimulatedQR(qrData);

    content.innerHTML = `
      <div class="p-6 text-center">
        <div class="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="check" class="w-6 h-6"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-900">บันทึกคำขอจองห้องประชุมเรียบร้อย</h3>
        <p class="text-xs text-slate-500 mt-1">รหัสอ้างอิงรายการ: <span class="font-mono font-bold text-slate-800">${booking.id}</span></p>

        <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-4 text-left text-xs space-y-2">
          <div class="flex justify-between"><span class="text-slate-500">ห้องประชุม:</span> <span class="font-semibold text-slate-900">${room.name}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">สถานที่:</span> <span class="text-slate-800">${room.building} (${room.campusName})</span></div>
          <div class="flex justify-between"><span class="text-slate-500">วันและเวลา:</span> <span class="font-semibold text-slate-900 font-mono">${booking.date} (${booking.startTime} - ${booking.endTime} น.)</span></div>
          <div class="flex justify-between items-center"><span class="text-slate-500">สถานะคำขอ:</span> 
            <span class="${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'} border font-semibold px-2 py-0.5 rounded text-[11px]">
              ${booking.status === 'confirmed' ? 'อนุมัติเรียบร้อย' : 'รอเจ้าหน้าที่ตรวจสอบ'}
            </span>
          </div>
        </div>

        <!-- QR Code Check-in Section -->
        <div class="bg-white border border-slate-200 rounded-lg p-4 mb-4 flex flex-col items-center">
          <div class="text-xs font-bold text-slate-800 mb-2">รหัส QR สำหรับยืนยันเข้าใช้ห้องประชุม</div>
          <div class="p-2 bg-white rounded border border-slate-200">
            ${simulatedQR}
          </div>
          <p class="text-[11px] text-slate-500 mt-2 max-w-xs leading-relaxed">
            กรุณาสแกนรหัสนี้บริเวณหน้าห้องประชุมภายใน 15 นาทีนับจากเวลาเริ่มต้น เพื่อยืนยันการใช้งาน
          </p>
        </div>

        <!-- Calendar Sync Section -->
        <div class="mb-5">
          <div class="text-xs font-semibold text-slate-700 mb-2">เพิ่มกำหนดการลงในปฏิทินส่วนตัว:</div>
          <div class="grid grid-cols-3 gap-2">
            <button 
              onclick="CalendarExport.openGoogleCalendar(App.getBookingById('${booking.id}'), App.getRoomById('${booking.roomId}'))"
              class="py-2 px-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium"
            >
              Google Calendar
            </button>
            <button 
              onclick="CalendarExport.openOutlookCalendar(App.getBookingById('${booking.id}'), App.getRoomById('${booking.roomId}'))"
              class="py-2 px-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium"
            >
              Outlook
            </button>
            <button 
              onclick="CalendarExport.downloadICS(App.getBookingById('${booking.id}'), App.getRoomById('${booking.roomId}'))"
              class="py-2 px-2 bg-slate-50 border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-medium"
            >
              ดาวน์โหลด .ics
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2">
          <button 
            onclick="App.showLineSimulatorModal('${booking.id}')"
            class="w-full sm:flex-1 py-2.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold"
          >
            ตัวอย่างการแจ้งเตือนผ่าน LINE
          </button>
          <button 
            onclick="App.closeGenericModal(); App.switchTab('my_bookings');"
            class="w-full sm:w-auto py-2.5 px-4 bg-red-800 hover:bg-red-900 text-white rounded-lg text-xs font-semibold"
          >
            ไปหน้ารายการจองของฉัน
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    this.refreshIcons();
  },

  // 4. MY BOOKINGS VIEW (With Working Filter Tabs)
  setMyBookingsFilter(filterKey) {
    this.state.myBookingsFilter = filterKey;
    this.renderCurrentView();
    this.refreshIcons();
  },

  renderMyBookingsView(container) {
    const allUserBookings = this.state.bookings.filter(b => b.organizer === this.state.currentUser.name || this.state.currentRole === 'admin');
    
    const counts = {
      all: allUserBookings.length,
      pending: allUserBookings.filter(b => b.status === 'pending').length,
      confirmed: allUserBookings.filter(b => b.status === 'confirmed' && !b.checkedIn).length,
      checked_in: allUserBookings.filter(b => b.status === 'checked_in' || b.checkedIn).length
    };

    const filteredBookings = allUserBookings.filter(b => {
      if (this.state.myBookingsFilter === 'all') return true;
      if (this.state.myBookingsFilter === 'pending') return b.status === 'pending';
      if (this.state.myBookingsFilter === 'confirmed') return b.status === 'confirmed' && !b.checkedIn;
      if (this.state.myBookingsFilter === 'checked_in') return b.status === 'checked_in' || b.checkedIn;
      return true;
    });

    const filterTabs = [
      { key: 'all', label: `ทั้งหมด (${counts.all})` },
      { key: 'pending', label: `รอตรวจสอบ (${counts.pending})` },
      { key: 'confirmed', label: `อนุมัติแล้ว (${counts.confirmed})` },
      { key: 'checked_in', label: `เช็กอินแล้ว (${counts.checked_in})` }
    ];

    let html = `
      <div class="max-w-5xl mx-auto px-4 py-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">รายการจองห้องประชุมของฉัน</h1>
            <p class="text-xs text-slate-500 mt-0.5">ตรวจสอบสถานะคำขอ ยืนยันการเข้าใช้ห้อง และส่งออกข้อมูลลงปฏิทิน</p>
          </div>
          <button 
            onclick="App.switchTab('catalog')"
            class="px-4 py-2 bg-red-800 text-white rounded-lg text-xs font-semibold hover:bg-red-900 flex items-center gap-1.5 self-start"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>จองห้องประชุมใหม่</span>
          </button>
        </div>

        <!-- Functional Filter Tabs -->
        <div class="flex items-center gap-1.5 border-b border-slate-200 pb-3 mb-6 overflow-x-auto text-xs">
          ${filterTabs.map(t => {
            const active = this.state.myBookingsFilter === t.key;
            return `
              <button 
                onclick="App.setMyBookingsFilter('${t.key}')" 
                class="px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${active ? 'bg-slate-900 text-white font-semibold' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}"
              >
                ${t.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Bookings List -->
        <div class="space-y-4">
    `;

    if (filteredBookings.length === 0) {
      html += `
        <div class="text-center py-14 bg-white rounded-xl border border-slate-200 p-8">
          <div class="text-sm font-bold text-slate-800">ไม่พบรายการจองห้องในหมวดหมู่นี้</div>
          <p class="text-xs text-slate-500 mt-1 mb-4">ท่านสามารถเลือกดูรายการทั้งหมด หรือดำเนินการจองห้องประชุมใหม่ได้</p>
          <button onclick="App.switchTab('catalog')" class="px-4 py-2 bg-red-800 text-white rounded-lg text-xs font-semibold">
            สืบค้นห้องประชุมว่าง
          </button>
        </div>
      `;
    } else {
      filteredBookings.forEach(b => {
        const room = this.state.rooms.find(r => r.id === b.roomId) || { name: 'ห้องประชุม', building: '-' };
        
        let statusBadge = '';
        if (b.status === 'confirmed') {
          statusBadge = '<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded">อนุมัติแล้ว</span>';
        } else if (b.status === 'pending') {
          statusBadge = '<span class="bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold px-2.5 py-0.5 rounded">รอเจ้าหน้าที่ตรวจสอบ</span>';
        } else if (b.status === 'checked_in') {
          statusBadge = '<span class="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-semibold px-2.5 py-0.5 rounded">เช็กอินเข้าใช้งานแล้ว</span>';
        } else if (b.status === 'cancelled') {
          statusBadge = '<span class="bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-medium px-2.5 py-0.5 rounded">ยกเลิกแล้ว</span>';
        }

        html += `
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-1.5">
                  <span class="font-mono text-xs font-semibold text-slate-500">${b.id}</span>
                  ${statusBadge}
                  ${b.checkedIn ? '<span class="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200">ยืนยัน QR Code แล้ว</span>' : ''}
                </div>
                
              <h3 class="text-base font-bold text-slate-900">${b.title}</h3>
              </div>
              <div class="text-xs text-slate-500 shrink-0 font-mono">${b.date}</div>
            </div>
            <div class="flex flex-wrap gap-x-6 gap-y-1.5 pt-3 text-xs text-slate-600">
              <span><span class="text-slate-400">ห้อง:</span> ${(this.state.rooms.find(r => r.id === b.roomId) || {}).name || '-'}</span>
              <span><span class="text-slate-400">เวลา:</span> ${b.startTime} – ${b.endTime} น.</span>
              <span><span class="text-slate-400">ผู้จอง:</span> ${b.organizer}</span>
              <span><span class="text-slate-400">ผู้เข้าร่วม:</span> ${b.attendees} คน</span>
            </div>
            <div class="flex flex-wrap gap-2 mt-3.5 pt-3 border-t border-slate-100">
              ${(b.status === 'confirmed' && !b.checkedIn) ? `
                <button onclick="App.doCheckIn('${b.id}')" class="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1.5">
                  <i data-lucide="qr-code" class="w-3.5 h-3.5"></i> เช็กอิน QR Code
                </button>
              ` : ''}
              ${(b.status === 'confirmed' || b.status === 'checked_in') ? `
                <button onclick="CalendarExport.openGoogleCalendar(${JSON.stringify(b)}, ${JSON.stringify(this.state.rooms.find(r => r.id === b.roomId) || {})})" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5">
                  <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i> เพิ่มเข้า Google Calendar
                </button>
                <button onclick="CalendarExport.downloadICS(${JSON.stringify(b)}, ${JSON.stringify(this.state.rooms.find(r => r.id === b.roomId) || {})})" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5">
                  <i data-lucide="download" class="w-3.5 h-3.5"></i> ดาวน์โหลด .ics
                </button>
              ` : ''}
              ${(b.status === 'pending' || (b.status === 'confirmed' && !b.checkedIn)) ? `
                <button onclick="App.cancelBooking('${b.id}')" class="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 flex items-center gap-1.5">
                  <i data-lucide="x-circle" class="w-3.5 h-3.5"></i> ยกเลิกการจอง
                </button>
              ` : ''}
            </div>
          </div>
        `;
      });
    }

    html += `</div></div>`;
    container.innerHTML = html;
    this.refreshIcons();
  },

  doCheckIn(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    booking.checkedIn = true;
    booking.status = 'checked_in';
    booking.checkInTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    this.saveState();
    this.showToast('เช็กอินสำเร็จ! ยินดีต้อนรับสู่ห้องประชุม', 'success');
    this.renderCurrentView();
  },

  cancelBooking(bookingId) {
    if (!confirm('ยืนยันการยกเลิกการจองนี้?')) return;
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    booking.status = 'cancelled';
    this.saveState();
    this.showToast('ยกเลิกการจองเรียบร้อยแล้ว', 'info');
    this.renderCurrentView();
  },

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const colors = { success: 'bg-emerald-700', error: 'bg-red-700', info: 'bg-slate-700' };
    toast.className = `fixed bottom-4 right-4 z-[99] px-5 py-3 rounded-xl text-white text-sm font-medium shadow-xl ${colors[type] || colors.info}`;
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
  },

  // ============================================================
  // ADMIN VIEWS
  // ============================================================

  renderAdminTimelineView(container) {
    const { bookings, rooms } = this.state;
    const slots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];

    const timeToMin = t => { const [h,m] = t.split(':').map(Number); return h*60+m; };

    let html = `
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-900">ปฏิทินคิวงาน (Timeline รวมทุกห้อง)</h1>
          <p class="text-xs text-slate-500 mt-0.5">มุมมองแนวนอนแสดงการจองห้องทุกห้องพร้อมกัน</p>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 overflow-auto shadow-sm">
          <table class="min-w-full text-xs border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="sticky left-0 z-10 bg-slate-50 px-3 py-2.5 text-left font-semibold text-slate-700 border-r border-slate-200 min-w-[150px]">ห้อง</th>
                ${slots.map(s => `<th class="px-2 py-2.5 text-center text-slate-500 font-medium border-r border-slate-100 min-w-[48px]">${s}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rooms.map(room => {
                const roomBookings = bookings.filter(b => b.roomId === room.id && b.status !== 'cancelled');
                return `
                  <tr class="border-b border-slate-100 hover:bg-slate-50/50">
                    <td class="sticky left-0 z-10 bg-white px-3 py-2.5 font-medium text-slate-800 border-r border-slate-200">
                      <div class="font-semibold text-[11px]">${room.code}</div>
                      <div class="text-slate-500 text-[10px] leading-tight">${room.campusName}</div>
                    </td>
                    ${slots.map(slot => {
                      const slotMin = timeToMin(slot);
                      const hit = roomBookings.find(b => {
                        const s = timeToMin(b.startTime), e = timeToMin(b.endTime);
                        return slotMin >= s && slotMin < e;
                      });
                      if (hit) {
                        const isStart = timeToMin(hit.startTime) === slotMin;
                        const statusColor = hit.status === 'confirmed' || hit.status === 'checked_in' ? 'bg-emerald-500' : 'bg-amber-400';
                        return `<td class="${statusColor} border-r border-white/40 relative" title="${hit.title} (${hit.startTime}-${hit.endTime})">
                          ${isStart ? `<span class="absolute inset-0 flex items-center px-1 text-white text-[10px] font-semibold truncate">${hit.id}</span>` : ''}
                        </td>`;
                      }
                      return `<td class="border-r border-slate-100 hover:bg-slate-100 cursor-default"></td>`;
                    }).join('')}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="flex gap-4 mt-4 text-xs text-slate-600">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500 inline-block"></span>อนุมัติแล้ว / เช็กอินแล้ว</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-400 inline-block"></span>รอตรวจสอบ</span>
        </div>
      </div>
    `;
    container.innerHTML = html;
    this.refreshIcons();
  },

  renderAdminKanbanView(container) {
    const { bookings, rooms } = this.state;
    const columns = [
      { key: 'pending',   label: 'รอตรวจสอบ',  color: 'border-amber-400',  bg: 'bg-amber-50',  badge: 'bg-amber-100 text-amber-800' },
      { key: 'confirmed', label: 'อนุมัติแล้ว', color: 'border-emerald-500', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-800' },
      { key: 'checked_in', label: 'เช็กอินแล้ว', color: 'border-blue-400', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-800' },
      { key: 'cancelled', label: 'ยกเลิก',       color: 'border-slate-300', bg: 'bg-slate-50',  badge: 'bg-slate-100 text-slate-600' },
    ];

    let html = `
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-900">กระดานคิวงาน (Kanban Board)</h1>
          <p class="text-xs text-slate-500 mt-0.5">ติดตามสถานะการจองห้องทุกใบในมุมมองกระดาน</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${columns.map(col => {
            const items = bookings.filter(b => {
              if (col.key === 'checked_in') return b.status === 'checked_in' || (b.status === 'confirmed' && b.checkedIn);
              if (col.key === 'confirmed') return b.status === 'confirmed' && !b.checkedIn;
              return b.status === col.key;
            });
            return `
              <div class="rounded-xl border-t-4 ${col.color} ${col.bg} p-3 min-h-[300px]">
                <div class="flex items-center justify-between mb-3">
                  <span class="font-semibold text-sm text-slate-800">${col.label}</span>
                  <span class="text-xs font-bold px-2 py-0.5 rounded-full ${col.badge}">${items.length}</span>
                </div>
                <div class="space-y-2">
                  ${items.length === 0 ? `<p class="text-xs text-slate-400 text-center py-6">ไม่มีรายการ</p>` :
                    items.map(b => {
                      const room = rooms.find(r => r.id === b.roomId) || {};
                      return `
                        <div class="bg-white rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow cursor-pointer" onclick="App.adminApprove('${b.id}')">
                          <div class="font-mono text-[10px] text-slate-400 mb-0.5">${b.id}</div>
                          <div class="text-xs font-semibold text-slate-900 leading-tight mb-1.5 truncate">${b.title}</div>
                          <div class="text-[10px] text-slate-500">${room.code || '-'} · ${b.date}</div>
                          <div class="text-[10px] text-slate-500">${b.startTime}–${b.endTime} · ${b.attendees} คน</div>
                          ${b.catering && b.catering.required ? `<span class="inline-block mt-1.5 text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-medium">มีอาหาร</span>` : ''}
                          ${b.equipment && b.equipment.required ? `<span class="inline-block mt-1.5 ml-1 text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">ขออุปกรณ์</span>` : ''}
                        </div>
                      `;
                    }).join('')
                  }
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    container.innerHTML = html;
    this.refreshIcons();
  },

  adminApprove(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    if (booking.status === 'pending') {
      if (confirm(`อนุมัติการจอง "${booking.title}" ?`)) {
        booking.status = 'confirmed';
        this.saveState();
        this.showToast('อนุมัติการจองเรียบร้อยแล้ว', 'success');
        this.renderCurrentView();
      }
    } else {
      this.showToast(`สถานะปัจจุบัน: ${booking.status}`, 'info');
    }
  },

  renderAdminDispatchView(container) {
    const { bookings, rooms } = this.state;
    const activeBookings = bookings.filter(b => b.status !== 'cancelled');

    const cateringJobs = activeBookings.filter(b => b.catering && b.catering.required);
    const equipmentJobs = activeBookings.filter(b => b.equipment && b.equipment.required);

    let html = `
      <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">คิวงานบริการปฏิบัติการ</h1>
          <p class="text-xs text-slate-500 mt-0.5">หน้าจอแยกเฉพาะฝ่ายจัดเลี้ยงและฝ่ายโสตทัศนูปกรณ์</p>
        </div>

        <!-- CATERING -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <i data-lucide="coffee" class="w-5 h-5 text-orange-600"></i>
            <h2 class="text-lg font-bold text-slate-800">คิวงานจัดเลี้ยง / เบรก</h2>
            <span class="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">${cateringJobs.length} รายการ</span>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            ${cateringJobs.length === 0 ? `<p class="text-sm text-slate-400 text-center py-10">ไม่มีรายการอาหาร/เบรกในวันนี้</p>` :
              `<table class="w-full text-xs">
                <thead class="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-slate-600 font-semibold">ห้อง / เวลา</th>
                    <th class="px-4 py-2.5 text-left text-slate-600 font-semibold">รายการ</th>
                    <th class="px-4 py-2.5 text-left text-slate-600 font-semibold">หมายเหตุ</th>
                    <th class="px-4 py-2.5 text-center text-slate-600 font-semibold">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  ${cateringJobs.map(b => {
                    const room = rooms.find(r => r.id === b.roomId) || {};
                    const items = [
                      b.catering.morningBreak ? 'เบรกเช้า' : '',
                      b.catering.lunch ? 'อาหารกลางวัน' : '',
                      b.catering.afternoonBreak ? 'เบรกบ่าย' : '',
                    ].filter(Boolean).join(', ') || '-';
                    const statusDone = b.catering.status === 'served';
                    return `
                      <tr class="border-b border-slate-100 hover:bg-slate-50">
                        <td class="px-4 py-3">
                          <div class="font-semibold text-slate-800">${room.code || '-'}</div>
                          <div class="text-slate-500">${b.startTime}–${b.endTime} · ${b.attendees} คน</div>
                        </td>
                        <td class="px-4 py-3 text-slate-700">${items} (${b.catering.pax || b.attendees} ชุด)</td>
                        <td class="px-4 py-3 text-slate-500">${b.catering.notes || '-'}</td>
                        <td class="px-4 py-3 text-center">
                          <span class="px-2 py-1 rounded text-[11px] font-semibold ${statusDone ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                            ${statusDone ? 'เสิร์ฟแล้ว' : 'รอเสิร์ฟ'}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>`
            }
          </div>
        </div>

        <!-- EQUIPMENT -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <i data-lucide="monitor" class="w-5 h-5 text-blue-600"></i>
            <h2 class="text-lg font-bold text-slate-800">คิวงานโสตทัศนูปกรณ์ / IT</h2>
            <span class="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">${equipmentJobs.length} รายการ</span>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            ${equipmentJobs.length === 0 ? `<p class="text-sm text-slate-400 text-center py-10">ไม่มีรายการขออุปกรณ์เสริม</p>` :
              `<table class="w-full text-xs">
                <thead class="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-slate-600 font-semibold">ห้อง / เวลา</th>
                    <th class="px-4 py-2.5 text-left text-slate-600 font-semibold">อุปกรณ์ที่ขอ</th>
                    <th class="px-4 py-2.5 text-left text-slate-600 font-semibold">หมายเหตุ</th>
                    <th class="px-4 py-2.5 text-center text-slate-600 font-semibold">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  ${equipmentJobs.map(b => {
                    const room = rooms.find(r => r.id === b.roomId) || {};
                    const statusDone = b.equipment.status === 'installed';
                    return `
                      <tr class="border-b border-slate-100 hover:bg-slate-50">
                        <td class="px-4 py-3">
                          <div class="font-semibold text-slate-800">${room.code || '-'}</div>
                          <div class="text-slate-500">${b.startTime}–${b.endTime}</div>
                        </td>
                        <td class="px-4 py-3 text-slate-700">${(b.equipment.items || []).join(', ') || '-'}</td>
                        <td class="px-4 py-3 text-slate-500">${b.equipment.notes || '-'}</td>
                        <td class="px-4 py-3 text-center">
                          <span class="px-2 py-1 rounded text-[11px] font-semibold ${statusDone ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}">
                            ${statusDone ? 'ติดตั้งแล้ว' : 'รอดำเนินการ'}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>`
            }
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
    this.refreshIcons();
  },

  renderAdminStatsView(container) {
    const { bookings, rooms } = this.state;
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked_in').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const checkedIn = bookings.filter(b => b.checkedIn || b.status === 'checked_in').length;
    const noShow = bookings.filter(b => b.status === 'confirmed' && !b.checkedIn).length;

    // Room usage count
    const roomUsage = rooms.map(r => ({
      ...r,
      count: bookings.filter(b => b.roomId === r.id && b.status !== 'cancelled').length
    })).sort((a,b) => b.count - a.count);

    // Hour heatmap (overall)
    const hourCounts = Array(24).fill(0);
    bookings.forEach(b => {
      if (b.status === 'cancelled') return;
      const startH = parseInt(b.startTime);
      const endH = parseInt(b.endTime);
      for (let h = startH; h < endH; h++) hourCounts[h]++;
    });
    const maxHour = Math.max(...hourCounts, 1);

    // Static sample day‑hour density matrix (placeholder)
    const dayHourData = [
      // Monday
      [35,75,90,85,40,70,88,92,60,25],
      // Tuesday
      [40,80,95,90,45,85,95,90,70,30],
      // Wednesday
      [30,85,90,80,35,90,92,85,65,20],
      // Thursday
      [50,90,98,95,50,92,95,90,75,40],
      // Friday
      [25,65,80,70,30,60,70,50,35,15]
    ];
    const hoursLabels = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
    const daysLabels = ['จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์'];

    let html = `
      <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">สรุปสถิติการใช้ห้องประชุม</h1>
          <p class="text-xs text-slate-500 mt-0.5">ข้อมูลรวมจากระบบ · อัปเดตแบบ Real-time</p>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          ${[
            { label: 'จองทั้งหมด', value: total, color: 'text-slate-900', bg: 'bg-white' },
            { label: 'อนุมัติแล้ว', value: confirmed, color: 'text-emerald-700', bg: 'bg-emerald-50' },
            { label: 'รอตรวจสอบ', value: pending, color: 'text-amber-700', bg: 'bg-amber-50' },
            { label: 'เช็กอินแล้ว', value: checkedIn, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'ยกเลิก', value: cancelled, color: 'text-slate-500', bg: 'bg-slate-50' }
          ].map(k => `
            <div class="${k.bg} rounded-xl border border-slate-200 p-4 text-center">
              <div class="text-3xl font-bold ${k.color}">${k.value}</div>
              <div class="text-xs text-slate-500 mt-1">${k.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Overall Hour Heatmap -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i data-lucide="bar-chart-2" class="w-4 h-4 text-slate-500"></i>
            ช่วงเวลาที่มีการใช้งานสูงสุด (Heatmap)
          </h2>
          <div style="display:flex; align-items:flex-end; gap:4px; height:96px;">
            ${hourCounts.slice(7,20).map((count,i)=>{
                const h = i+7;
                const pct = Math.round((count / maxHour) * 100);
                const barH = Math.max(Math.round(pct * 72 / 100),4);
                const color = pct > 70 ? '#ef4444' : pct > 40 ? '#fbbf24' : pct > 10 ? '#34d399' : '#e2e8f0';
                return `
                  <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; height:96px; justify-content:flex-end;">
                    <div style="width:100%; background:${color}; border-radius:3px 3px 0 0; height:${barH}px;" title="${h}:00 น. — ${count} รายการ"></div>
                    <span style="font-size:9px; color:#94a3b8;">${h}</span>
                  </div>
                `;}).join('')}
          </div>
          <div class="flex gap-4 mt-3 text-xs text-slate-500">
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-red-500 inline-block"></span>หนาแน่นมาก</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-amber-400 inline-block"></span>ปานกลาง</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-emerald-400 inline-block"></span>น้อย</span>
          </div>
        </div>

        <!-- Day‑Hour Matrix Heatmap -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm overflow-x-auto">
          <h2 class="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <i data-lucide="grid" class="w-4 h-4 text-slate-500"></i>
            การใช้ห้องตามวันและช่วงเวลา
          </h2>
          <table class="min-w-full text-xs border-collapse">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-2 py-1 text-center"></th>
                ${hoursLabels.map(h=>`<th class="px-2 py-1">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${dayHourData.map((row,ri)=>{
                const day = daysLabels[ri];
                return `
                  <tr>
                    <td class="px-2 py-1 font-medium text-slate-700">${day}</td>
                    ${row.map(pct=>{
                      const bg = pct > 75 ? 'bg-red-600' : pct > 50 ? 'bg-amber-500' : pct > 30 ? 'bg-emerald-400' : 'bg-slate-200';
                      return `<td class="px-2 py-1 text-center ${bg} text-white rounded" title="${pct}%">${pct}%</td>`;
                    }).join('')}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Room Usage Ranking -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i data-lucide="trophy" class="w-4 h-4 text-slate-500"></i>
            อันดับการใช้งานห้อง (Top 5)
          </h2>
          <div class="space-y-3">
            ${roomUsage.slice(0,5).map((r,i)=>{
                const pct = total > 0 ? Math.round((r.count / total) * 100) : 0;
                return `
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-700">${i+1}. ${r.code} – ${r.campusName}</span>
                    <span class="text-slate-500">${r.count} ครั้ง</span>
                  </div>
                  <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-red-800 rounded-full" style="width:${pct}%"></div>
                  </div>
                `;
            }).join('')}
          </div>
        </div>

        <!-- Under‑utilized rooms -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i data-lucide="alert-circle" class="w-4 h-4 text-slate-500"></i>
            ห้องที่มีอัตราการใช้งานต่ำ
          </h2>
          <div class="space-y-3">
            ${roomUsage.filter(r=> r.count/total < 0.1).map(r=>`
              <div class="flex items-center justify-between text-xs">
                <span class="font-medium text-slate-700">${r.name}</span>
                <span class="text-slate-500">${r.count} ครั้ง (${Math.round((r.count/total)*100)}%)</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- No‑Show Warning -->
        ${noShow > 0 ? `
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-sm font-semibold text-amber-800">พบการจองที่อนุมัติแล้วแต่ยังไม่เช็กอิน ${noShow} รายการ</div>
              <div class="text-xs text-amber-700 mt-0.5">กรุณาติดต่อผู้จองหรือพิจารณายกเลิกอัตโนมัติหากเกินเวลา 15 นาที</div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
    container.innerHTML = html;
    this.refreshIcons();
  },

  renderAdminSettingsView(container) {
    const { settings } = this.state;
    let html = `
      <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">ตั้งค่าระบบจองห้องประชุม</h1>
          <p class="text-xs text-slate-500 mt-0.5">กำหนดกฎเกณฑ์และประกาศสำหรับผู้ใช้งาน</p>
        </div>

        <!-- Booking Rules -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 class="text-sm font-bold text-slate-800 flex items-center gap-2">
            <i data-lucide="settings" class="w-4 h-4 text-slate-500"></i>
            กฎการจองห้อง
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">จองล่วงหน้าขั้นต่ำ (ชั่วโมง)</label>
              <input type="number" value="${settings.minAdvanceHours || 2}" min="0"
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                onchange="App.updateSetting('minAdvanceHours', this.value)">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">จองล่วงหน้าสูงสุด (วัน)</label>
              <input type="number" value="${settings.maxAdvanceDays || 30}" min="1"
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                onchange="App.updateSetting('maxAdvanceDays', this.value)">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">จองต่อเนื่องสูงสุด (ชั่วโมง)</label>
              <input type="number" value="${settings.maxBookingHours || 8}" min="1"
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                onchange="App.updateSetting('maxBookingHours', this.value)">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Buffer time ระหว่างการจอง (นาที)</label>
              <input type="number" value="${settings.bufferMinutes || 15}" min="0" step="5"
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                onchange="App.updateSetting('bufferMinutes', this.value)">
            </div>
          </div>
          <div class="flex items-center gap-3 pt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" ${settings.autoApprove ? 'checked' : ''} class="rounded"
                onchange="App.updateSetting('autoApprove', this.checked)">
              <span class="text-sm text-slate-700">อนุมัติอัตโนมัติ (Instant Booking) สำหรับห้องขนาดเล็ก</span>
            </label>
          </div>
        </div>

        <!-- Emergency Banner -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h2 class="text-sm font-bold text-slate-800 flex items-center gap-2">
            <i data-lucide="megaphone" class="w-4 h-4 text-slate-500"></i>
            ประกาศแจ้งเตือนฉุกเฉิน (Banner)
          </h2>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">ข้อความประกาศ (เว้นว่างเพื่อซ่อน)</label>
            <input type="text" value="${settings.bannerMessage || ''}"
              placeholder="เช่น ปิดปรับปรุงห้อง 201 วันที่ 20-22 พ.ย."
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
              onchange="App.updateSetting('bannerMessage', this.value)">
          </div>
          <button onclick="App.saveBanner()" class="px-4 py-2 bg-red-800 text-white rounded-lg text-xs font-semibold hover:bg-red-900">
            บันทึกและแสดงประกาศ
          </button>
        </div>
      </div>
    `;
    container.innerHTML = html;
    this.refreshIcons();
  },

  updateSetting(key, value) {
    this.state.settings[key] = isNaN(value) ? value : Number(value);
    this.saveState();
    this.showToast('บันทึกการตั้งค่าแล้ว', 'success');
  },

  saveBanner() {
    this.renderBanner();
    this.showToast('อัปเดตประกาศเรียบร้อยแล้ว', 'success');
  },

  showRoomScheduleModal(roomId) {
    const room = this.state.rooms.find(r => r.id === roomId);
    if (!room) return;

    const today = this.state.selectedDate || new Date().toISOString().split('T')[0];
    const todayBookings = this.state.bookings.filter(b => b.roomId === roomId && b.date === today && b.status !== 'cancelled');

    // Build hourly density for this room on this date
    const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
    const hourStatus = hours.map(h => {
      const hh = parseInt(h);
      const booking = todayBookings.find(b => {
        const s = parseInt(b.startTime);
        const e = parseInt(b.endTime);
        return hh >= s && hh < e;
      });
      return { hour: h, booking };
    });

    const modal = document.getElementById('generic-modal');
    const content = document.getElementById('generic-modal-content');

    content.innerHTML = `
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="text-xs text-slate-500 mb-1">📍 ${room.campusName} • ${room.building}</div>
            <h3 class="text-lg font-bold text-slate-900">${room.name}</h3>
            <p class="text-xs text-slate-500 mt-0.5">ความจุ ${room.capacity} ที่นั่ง • ${room.type}</p>
          </div>
          <button onclick="document.getElementById('generic-modal').classList.add('hidden')"
            class="text-slate-400 hover:text-slate-700 text-xl leading-none p-1">×</button>
        </div>

        <!-- Equipment -->
        <div class="mb-4">
          <div class="text-xs font-semibold text-slate-700 mb-2">อุปกรณ์ประจำห้อง:</div>
          <div class="flex flex-wrap gap-1.5">
            ${room.facilityLabels.map(f => `
              <span class="bg-slate-50 text-slate-700 text-[11px] px-2 py-0.5 rounded border border-slate-200">${f}</span>
            `).join('')}
          </div>
        </div>

        <!-- Schedule for today -->
        <div class="mb-4">
          <div class="text-xs font-semibold text-slate-700 mb-2">ตารางการใช้งานประจำวันที่ ${today}:</div>
          <div class="text-xs text-slate-500 mb-3">${todayBookings.length > 0 ? todayBookings.length + ' คิวจอง' : 'ไม่มีการจองในวันนี้'}</div>

          ${todayBookings.length > 0 ? `
            <div class="space-y-2 mb-4">
              ${todayBookings.map(b => `
                <div class="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div class="font-semibold text-sm text-slate-900">${b.title}</div>
                  <div class="text-xs text-slate-600 mt-0.5">${b.organizer} (${b.department})</div>
                  <div class="text-xs font-mono text-red-800 mt-1">${b.startTime} - ${b.endTime}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Hourly heatmap -->
          <div class="text-xs font-semibold text-slate-700 mb-2">สถานะรายชั่วโมง:</div>
          <div class="grid grid-cols-5 gap-1.5">
            ${hourStatus.map(h => {
              const bg = h.booking ? 'bg-red-100 border-red-300 text-red-800' : 'bg-emerald-50 border-emerald-200 text-emerald-700';
              const label = h.booking ? 'ไม่ว่าง' : 'ว่าง';
              return `
                <div class="border rounded-lg p-2 text-center ${bg}">
                  <div class="text-[11px] font-mono font-bold">${h.hour}</div>
                  <div class="text-[10px] mt-0.5">${label}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- CTA -->
        <div class="pt-4 border-t border-slate-100">
          <div class="text-xs text-slate-500 mb-3">ต้องการจองห้องนี้?</div>
          <button onclick="document.getElementById('generic-modal').classList.add('hidden'); App.startBookingRoom('${room.id}')"
            class="w-full py-2.5 bg-red-800 text-white rounded-lg text-sm font-semibold hover:bg-red-900 transition-colors flex items-center justify-center gap-2">
            <i data-lucide="calendar-plus" class="w-4 h-4"></i>
            เริ่มต้นจองห้องนี้
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    this.refreshIcons();
  },

  setupEventListeners() {
    // close modal on backdrop click
    const modal = document.getElementById('generic-modal');
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
