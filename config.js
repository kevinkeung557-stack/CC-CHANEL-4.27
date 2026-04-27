// ========== 公司配置 ==========
const COMPANY = {
  name: "Chanel",
  logo: "Chanel-logo.png"
};

// ========== 员工信息配置 ==========
const EMPLOYEE = {
  name: "Coco Chanel",
  title: "Creative Director",
  department: "Fashion House",
  employeeId: "CH-1921-0001",
  startDate: "January 1921",
  email: "c.chanel@chanel.com",
  phone: "+33 1 55 35 58 00",
  status: "online",
  avatar: "coco.png"  // 头像图片路径，留空显示首字母缩写
};

// ========== 应用配置 ==========
const APP_CONFIG = {
  greeting: {
    enabled: true,
    useTimeBased: true  // true = 根据时间显示 Good morning/afternoon/evening
  },
  quickCheckin: {
    enabled: true,
    defaultMessage: "Check-in recorded"
  },
  stats: {
    pending: 3,
    messages: 12,
    meetings: 5
  }
};

// ========== 导出供全局使用 ==========
window.APP_CONFIG = { COMPANY, EMPLOYEE, APP_CONFIG };
