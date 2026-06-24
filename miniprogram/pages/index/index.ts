// index.ts
import { themeManager, bindTheme } from '../../utils/theme';
import { getAllHolidays } from '../../utils/holiday';

Component({
  data: {
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    theme: '',
    holidayTheme: '',
    holidayName: '',
    themeColors: themeManager.getCurrentColors(),
    holidayList: getAllHolidays(),
    allThemes: themeManager.getAllThemes(), // 新增：所有主题配置
  },
  lifetimes: {
    attached() {
      const state = themeManager.getState();
      this.setData({
        theme: state.theme,
        holidayTheme: state.holidayTheme,
        holidayName: state.holidayName,
        themeColors: state.colors,
        allThemes: themeManager.getAllThemes(),
      });
      
      (this as any).unsubscribe = bindTheme(this);
    },
    detached() {
      if ((this as any).unsubscribe) {
        (this as any).unsubscribe();
      }
    }
  },
  methods: {
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    

    toggleDarkMode() {
      themeManager.toggleDarkMode();
      
      wx.showToast({
        title: themeManager.isDarkMode() ? '已切换深色模式' : '已切换浅色模式',
        icon: 'success',
        duration: 1500
      })
    },

    // 使用新的简化API切换主题
    switchTheme(e: any) {
      const themeKey = e.currentTarget.dataset.key;
      const themeName = e.currentTarget.dataset.name;
      
      themeManager.setTheme(themeKey);
      
      wx.showToast({
        title: `已切换${themeName}主题`,
        icon: 'success',
        duration: 1500
      });
    },

    // 兼容旧版本的切换方法
    switchHolidayTheme(e: any) {
      const themeClass = e.currentTarget.dataset.theme;
      const themeName = e.currentTarget.dataset.name;
      
      themeManager.setHolidayTheme(themeClass, themeName);
      
      wx.showToast({
        title: `已切换${themeName}主题`,
        icon: 'success',
        duration: 1500
      });
    },

    resetHolidayTheme() {
      themeManager.clearTheme();
      
      wx.showToast({
        title: '已重置为默认主题',
        icon: 'success',
        duration: 1500
      });
    },

    testThemeChange() {
      themeManager.setTheme('new-year');
    },

    testThemeChange2() {
      themeManager.setTheme('spring');
    },
  }
})