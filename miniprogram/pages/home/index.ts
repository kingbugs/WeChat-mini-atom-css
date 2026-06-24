// pages/home/index.ts
import { themeManager, bindTheme } from '../../utils/theme';
import { getAllHolidays } from '../../utils/holiday';
Component({
  /**
   * 页面的初始数据
   */
  data: {
    theme: '',
    holidayTheme: '',
    holidayName: '',
    themeColors: themeManager.getCurrentColors(),
    holidayList: getAllHolidays(),
  },
  lifetimes: {
    attached() {
      const state = themeManager.getState();
      this.setData({
        theme: state.theme,
        holidayTheme: state.holidayTheme,
        holidayName: state.holidayName,
        themeColors: state.colors,
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
    
  }
})