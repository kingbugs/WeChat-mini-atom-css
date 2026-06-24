/**
 * 主题持久化工具
 * 保存用户的主题选择到本地存储
 */

import { themeManager, ThemeState } from './theme';
import { STORAGE_KEYS } from '../constants/index';

const STORAGE_KEY = STORAGE_KEYS.THEME_STATE;

/**
 * 保存主题状态到本地存储
 */
export function saveThemeState(): void {
  const state = themeManager.getState();
  try {
    wx.setStorageSync(STORAGE_KEY, {
      theme: state.theme,
      holidayTheme: state.holidayTheme,
      holidayName: state.holidayName,
    });
  } catch (error) {
    console.error('保存主题状态失败:', error);
  }
}

/**
 * 从本地存储加载主题状态
 */
export function loadThemeState(): void {
  try {
    const savedState = wx.getStorageSync(STORAGE_KEY);
    if (savedState) {
      // 恢复深色模式
      if (savedState.theme) {
        themeManager.setDarkMode(savedState.theme === 'dark');
      }
      
      // 恢复节日主题
      if (savedState.holidayTheme) {
        themeManager.setTheme(savedState.holidayTheme);
      }
    }
  } catch (error) {
    console.error('加载主题状态失败:', error);
  }
}

/**
 * 清除本地存储的主题状态
 */
export function clearThemeState(): void {
  try {
    wx.removeStorageSync(STORAGE_KEY);
  } catch (error) {
    console.error('清除主题状态失败:', error);
  }
}

/**
 * 获取保存的主题状态
 */
export function getSavedThemeState(): Partial<ThemeState> | null {
  try {
    return wx.getStorageSync(STORAGE_KEY) || null;
  } catch (error) {
    console.error('获取保存的主题状态失败:', error);
    return null;
  }
}

/**
 * 自动保存主题变化
 */
export function enableAutoSave(): () => void {
  return themeManager.subscribe(() => {
    saveThemeState();
  });
}

/**
 * 初始化主题系统
 * 加载保存的主题状态并启用自动保存
 */
export function initThemeSystem(): () => void {
  // 加载保存的主题状态
  loadThemeState();
  
  // 启用自动保存
  const unsubscribe = enableAutoSave();
  
  return unsubscribe;
}