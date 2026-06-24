/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    holidayTheme?: string,
    holidayName?: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  initApp(): void,
  updateHolidayTheme(): void,
  getHolidayTheme(): string,
  getHolidayName(): string,
  getHolidayList(): any[],
  getThemeManager(): any,
}