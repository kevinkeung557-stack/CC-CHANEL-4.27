// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('appSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const tabItems = document.querySelectorAll('.tab-item');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const pages = document.querySelectorAll('.page');
const checkinBtn = document.getElementById('checkinBtn');
const composeBtn = document.getElementById('composeBtn');
const closeCompose = document.getElementById('closeCompose');
const composeModal = document.getElementById('composeModal');

// Toggle Sidebar
function toggleSidebar() {
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Navigate to page
function navigateTo(pageName) {
  // Update pages
  pages.forEach(page => {
    page.classList.toggle('active', page.id === `page-${pageName}`);
  });

  // Update tabs
  tabItems.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.page === pageName);
  });

  // Update sidebar items
  sidebarItems.forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageName);
  });

  // Close sidebar on mobile
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Tab bar navigation
tabItems.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(tab.dataset.page);
  });
});

// Sidebar navigation
sidebarItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Quick Check-in
checkinBtn.addEventListener('click', () => {
  showToast('Check-in recorded');
});

// Quick Action buttons
document.querySelectorAll('.quick-item').forEach(item => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    const names = {
      expense: 'Submit Expense',
      leave: 'Leave Request',
      meeting: 'Book Meeting',
      report: 'Import Report'
    };
    showToast(`${names[action]} opened`);
  });
});

// Approval actions
document.querySelectorAll('.approval-actions .action-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (btn.classList.contains('approve')) {
      showToast('Approved');
    } else {
      showToast('Rejected');
    }
  });
});

// App cards
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('click', () => {
    showToast('Opening app...');
  });
});

// Contact actions
document.querySelectorAll('.contact-actions button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-phone')) {
      showToast('Calling...');
    } else {
      showToast('Opening email...');
    }
  });
});

// Mail tabs
document.querySelectorAll('.mail-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mail-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showToast(`Switched to ${tab.textContent}`);
  });
});

// Mail items
document.querySelectorAll('.mail-item').forEach(item => {
  item.addEventListener('click', () => {
    showToast('Opening email...');
  });
});

// Mail star toggle
document.querySelectorAll('.mail-star').forEach(star => {
  star.addEventListener('click', (e) => {
    e.stopPropagation();
    const icon = star.querySelector('i');
    if (icon.classList.contains('fa-solid')) {
      icon.classList.replace('fa-solid', 'fa-regular');
      showToast('Removed from starred');
    } else {
      icon.classList.replace('fa-regular', 'fa-solid');
      showToast('Added to starred');
    }
  });
});

// Settings items
document.querySelectorAll('.settings-item').forEach(item => {
  item.addEventListener('click', () => {
    const label = item.querySelector('.settings-label').textContent;
    if (label === 'Sign Out') {
      showToast('Signing out...');
    } else {
      showToast(`Opening ${label}`);
    }
  });
});

// Compose modal
composeBtn.addEventListener('click', () => {
  composeModal.classList.add('active');
});

closeCompose.addEventListener('click', () => {
  composeModal.classList.remove('active');
});

composeModal.addEventListener('click', (e) => {
  if (e.target === composeModal) {
    composeModal.classList.remove('active');
  }
});

// Save draft
document.getElementById('saveDraft').addEventListener('click', () => {
  showToast('Draft saved');
  composeModal.classList.remove('active');
});

// Send mail
document.getElementById('sendMail').addEventListener('click', () => {
  const to = document.getElementById('mailTo').value;
  const subject = document.getElementById('mailSubject').value;

  if (!to) {
    showToast('Please enter recipient');
    return;
  }
  if (!subject) {
    showToast('Please enter subject');
    return;
  }

  showToast('Message sent');
  composeModal.classList.remove('active');
  document.getElementById('mailTo').value = '';
  document.getElementById('mailSubject').value = '';
  document.getElementById('mailContent').value = '';
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    composeModal.classList.remove('active');
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initFromConfig();
  navigateTo('home');
});

// ========== 配置初始化 ==========
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function initFromConfig() {
  const { COMPANY, EMPLOYEE, APP_CONFIG } = window.APP_CONFIG;

  const initials = getInitials(EMPLOYEE.name);

  // Header 公司名
  document.getElementById('headerTitle').textContent = COMPANY.name;

  // Apple Touch Icon（桌面图标）
  document.getElementById('appleTouchIcon').href = COMPANY.logo;

  // 浏览器标签页标题
  document.getElementById('pageTitle').textContent = COMPANY.name;

  // Sidebar 用户信息
  document.querySelector('.user-name').textContent = EMPLOYEE.name;
  document.querySelector('.user-role').textContent = EMPLOYEE.title;
  const sidebarAvatar = document.querySelector('.user-avatar');
  if (EMPLOYEE.avatar) {
    sidebarAvatar.innerHTML = `<img src="${EMPLOYEE.avatar}" alt="avatar">`;
  } else {
    sidebarAvatar.textContent = initials;
  }

  // Profile 页面公司信息（companyBadgeName 保持 HTML 中的静态文本）
  document.getElementById('companyLogo').src = COMPANY.logo;
  document.getElementById('companyLogo').alt = COMPANY.name;

  // Profile 页面员工信息
  const profileAvatar = document.querySelector('.profile-avatar');
  const profileInitials = profileAvatar.querySelector('.avatar-initials');
  const profileImg = profileAvatar.querySelector('.avatar-img');
  if (EMPLOYEE.avatar) {
    profileImg.src = EMPLOYEE.avatar;
    profileImg.style.display = 'block';
    profileInitials.style.display = 'none';
  } else {
    profileImg.style.display = 'none';
    profileInitials.style.display = 'block';
    profileInitials.textContent = initials;
  }
  document.querySelector('.profile-name').textContent = EMPLOYEE.name;
  document.querySelector('.profile-title').textContent = EMPLOYEE.title;
  document.querySelector('.profile-dept').textContent = EMPLOYEE.department;

  // Profile 详细信息
  const infoValues = document.querySelectorAll('.info-value');
  infoValues[0].textContent = EMPLOYEE.employeeId;
  infoValues[1].textContent = EMPLOYEE.startDate;
  infoValues[2].textContent = EMPLOYEE.email;
  infoValues[3].textContent = EMPLOYEE.phone;

  // Profile 操作按钮
  const actionBtns = document.querySelectorAll('.profile-actions .action-button');
  actionBtns[0].href = `mailto:${EMPLOYEE.email}`;
  actionBtns[1].href = `tel:${EMPLOYEE.phone.replace(/\D/g, '')}`;

  // Stats
  const statNums = document.querySelectorAll('.stat-num');
  statNums[0].textContent = APP_CONFIG.stats.pending;
  statNums[1].textContent = APP_CONFIG.stats.messages;
  statNums[2].textContent = APP_CONFIG.stats.meetings;

  // Greeting
  if (APP_CONFIG.greeting.useTimeBased) {
    updateGreeting();
  }
}

// Update greeting based on time
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good evening';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good night';
  }

  const greetingEl = document.querySelector('.greeting-section h1');
  const employeeName = window.APP_CONFIG?.EMPLOYEE?.name || 'Coco';
  if (greetingEl) {
    greetingEl.textContent = `${greeting}, ${employeeName.split(' ')[0]}`;
  }
}

updateGreeting();
