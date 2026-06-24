import { 
  getCurrentThemeClass, 
  getCurrentHolidayName, 
  getAllHolidays,
  themeManager,
  initThemeSystem,
  setStorage,
  getStorage,
} from './utils/index';

App<IAppOption>({
  globalData: {
    holidayTheme: '',
    holidayName: '',
  },
  onLaunch() {
    const logs = getStorage<number[]>('logs', []);
    logs.unshift(Date.now());
    setStorage('logs', logs);

    this.updateHolidayTheme();
    this.initApp();

    wx.login({
      success: res => {
        console.log(res.code);
      },
    });
  },

  initApp() {
    initThemeSystem();
  },
  
  updateHolidayTheme() {
    const themeClass = getCurrentThemeClass();
    const holidayName = getCurrentHolidayName();
    
    this.globalData.holidayTheme = themeClass;
    this.globalData.holidayName = holidayName;
    
    themeManager.setHolidayTheme(themeClass, holidayName);
    
    console.log(`当前节日主题: ${holidayName} (${themeClass})`);
  },
  
  getHolidayTheme(): string {
    return this.globalData.holidayTheme || '';
  },
  
  getHolidayName(): string {
    return this.globalData.holidayName || '';
  },
  
  getHolidayList() {
    return getAllHolidays();
  },
  
  getThemeManager() {
    return themeManager;
  },
})