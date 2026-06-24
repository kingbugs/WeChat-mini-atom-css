/**
 * 主题管理器 - 优化版
 * 提供简洁的主题切换 API，支持深色模式和节日主题
 */

import { generateThemeColors, getThemeConfigByKey, getAllThemeConfigs, ThemeConfig } from '../config/theme.config';

/**
 * 主题颜色配置接口
 */
export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  danger: string;
  dangerLight: string;
  dangerDark: string;
  purple: string;
  purpleLight: string;
  purpleDark: string;
  bg: string;
  text: string;
  cardBg: string;
}

/**
 * 主题状态接口
 */
export interface ThemeState {
  theme: string;
  holidayTheme: string;
  holidayName: string;
  colors: ThemeColors;
}

/**
 * 主题变化监听器类型
 */
type ThemeChangeListener = (state: ThemeState) => void;

/**
 * 主题管理器类
 * 提供主题切换、状态管理和订阅机制
 */
class ThemeManager {
  private theme: string = '';
  private holidayTheme: string = '';
  private holidayName: string = '';
  private listeners: Set<ThemeChangeListener> = new Set();

  /**
   * 获取当前主题状态
   * @returns 当前主题状态对象
   */
  getState(): ThemeState {
    return {
      theme: this.theme,
      holidayTheme: this.holidayTheme,
      holidayName: this.holidayName,
      colors: this.getCurrentColors(),
    };
  }

  /**
   * 获取当前颜色配置
   * @returns 当前主题颜色对象
   */
  getCurrentColors(): ThemeColors {
    if (this.holidayTheme) {
      const config = getThemeConfigByKey(this.holidayTheme);
      if (config) {
        return generateThemeColors(config, this.isDarkMode());
      }
    }
    return generateThemeColors(
      {
        name: '默认',
        key: 'default',
        primary: 221,
        saturation: 80,
        lightness: 55,
        bgLightness: 100,
        textLightness: 10,
      },
      this.isDarkMode()
    );
  }

  /**
   * 切换深色/浅色模式
   */
  toggleDarkMode(): void {
    this.theme = this.theme === 'dark' ? '' : 'dark';
    this.notifyListeners();
  }

  /**
   * 设置深色模式
   * @param isDark - 是否为深色模式
   */
  setDarkMode(isDark: boolean): void {
    this.theme = isDark ? 'dark' : '';
    this.notifyListeners();
  }

  /**
   * 判断是否为深色模式
   * @returns 是否为深色模式
   */
  isDarkMode(): boolean {
    return this.theme === 'dark';
  }

  /**
   * 设置节日主题（简化版）
   * @param themeKey - 主题 key，如 'spring'、'new-year'
   */
  setTheme(themeKey: string): void {
    const config = getThemeConfigByKey(themeKey);
    if (config) {
      this.holidayTheme = themeKey;
      this.holidayName = config.name;
      this.notifyListeners();
    } else {
      console.warn(`主题 "${themeKey}" 不存在`);
    }
  }

  /**
   * 设置节日主题（完整版）
   * @param themeClass - 主题类名，如 'page-holiday-spring'
   * @param themeName - 主题名称
   */
  setHolidayTheme(themeClass: string, themeName: string = ''): void {
    const match = themeClass.match(/page-holiday-(.+)/);
    if (match) {
      const key = match[1];
      const config = getThemeConfigByKey(key);
      if (config) {
        this.holidayTheme = key;
        this.holidayName = config.name;
        this.notifyListeners();
        return;
      }
    }
    this.holidayTheme = themeClass;
    this.holidayName = themeName;
    this.notifyListeners();
  }

  /**
   * 清除节日主题，恢复默认主题
   */
  clearTheme(): void {
    this.holidayTheme = '';
    this.holidayName = '';
    this.notifyListeners();
  }

  /**
   * 获取指定主题的颜色配置
   * @param themeKey - 主题 key
   * @returns 主题颜色配置或 null
   */
  getThemeColors(themeKey: string): ThemeColors | null {
    const config = getThemeConfigByKey(themeKey);
    if (config) {
      return generateThemeColors(config, this.isDarkMode());
    }
    return null;
  }

  /**
   * 获取所有主题配置
   * @returns 所有主题配置数组
   */
  getAllThemes(): ThemeConfig[] {
    return getAllThemeConfigs();
  }

  /**
   * 订阅主题变化
   * @param listener - 主题变化监听器
   * @returns 取消订阅函数
   */
  subscribe(listener: ThemeChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 通知所有监听器主题变化
   */
  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach(listener => listener(state));
  }
}

/**
 * 主题管理器实例
 */
export const themeManager = new ThemeManager();

/**
 * 页面主题混入
 * 简化页面的主题集成代码
 * @param page - 页面实例
 * @returns 带有 unsubscribe 方法的页面实例
 */
export function withTheme<T extends WechatMiniprogram.Page.Instance<{}, {}>>(
  page: T
): T & { unsubscribe: () => void } {
  const state = themeManager.getState();

  page.setData({
    theme: state.theme,
    holidayTheme: state.holidayTheme,
    holidayName: state.holidayName,
    themeColors: state.colors,
  });

  const unsubscribe = themeManager.subscribe((newState) => {
    page.setData({
      theme: newState.theme,
      holidayTheme: newState.holidayTheme,
      holidayName: newState.holidayName,
      themeColors: newState.colors,
    });
  });

  (page as any).unsubscribe = unsubscribe;

  return page as T & { unsubscribe: () => void };
}

/**
 * 组件主题混入
 * @param component - 组件实例
 * @returns 取消订阅函数
 */
export function withComponentTheme(component: any): () => void {
  const state = themeManager.getState();

  component.setData({
    theme: state.theme,
    holidayTheme: state.holidayTheme,
    holidayName: state.holidayName,
    themeColors: state.colors,
  });

  const unsubscribe = themeManager.subscribe((newState) => {
    component.setData({
      theme: newState.theme,
      holidayTheme: newState.holidayTheme,
      holidayName: newState.holidayName,
      themeColors: newState.colors,
    });
  });

  return unsubscribe;
}

/**
 * 兼容旧版本的主题使用函数
 * @param page - 页面实例
 * @returns 当前主题状态
 */
export function useTheme(page: WechatMiniprogram.Page.Instance<{}, {}>): ThemeState {
  const state = themeManager.getState();
  
  page.setData({
    theme: state.theme,
    holidayTheme: state.holidayTheme,
    holidayName: state.holidayName,
    themeColors: state.colors,
  });
  
  return state;
}

/**
 * 绑定主题变化到页面
 * @param page - 页面实例
 * @returns 取消订阅函数
 */
export function bindTheme(page: any): () => void {
  const unsubscribe = themeManager.subscribe((state) => {
    page.setData({
      theme: state.theme,
      holidayTheme: state.holidayTheme,
      holidayName: state.holidayName,
      themeColors: state.colors,
    });
  });
  
  return unsubscribe;
}

/**
 * 清除节日主题
 */
export function clearHolidayTheme(): void {
  themeManager.clearTheme();
}

/**
 * 根据主题类名获取节日主题颜色
 * @param themeClass - 主题类名，如 'page-holiday-spring'
 * @returns 主题颜色配置或 null
 */
export function getHolidayColors(themeClass: string): ThemeColors | null {
  const match = themeClass.match(/page-holiday-(.+)/);
  if (match) {
    return themeManager.getThemeColors(match[1]);
  }
  return null;
}

/**
 * 获取所有节日主题颜色配置
 * @returns 所有节日主题颜色配置对象
 */
export function getAllHolidayColors(): Record<string, ThemeColors> {
  const themes = themeManager.getAllThemes();
  const result: Record<string, ThemeColors> = {};
  themes.forEach(theme => {
    result[`page-holiday-${theme.key}`] = themeManager.getThemeColors(theme.key) || {} as ThemeColors;
  });
  return result;
}

/**
 * 获取默认主题颜色配置
 * @param isDark - 是否为深色模式
 * @returns 默认主题颜色配置
 */
export function getDefaultColors(isDark: boolean): ThemeColors {
  return themeManager.getThemeColors('default') || generateThemeColors(
    {
      name: '默认',
      key: 'default',
      primary: 221,
      saturation: 80,
      lightness: 55,
      bgLightness: 100,
      textLightness: 10,
    },
    isDark
  );
}