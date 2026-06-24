import { themeManager, ThemeState } from '../utils/index';

/**
 * 支持 setData 方法的上下文接口
 */
interface SetDataContext {
  setData: (data: Record<string, any>) => void;
}

/**
 * 主题 Hook
 * 将主题状态绑定到页面或组件
 * @template T - 上下文类型
 * @param context - 页面或组件实例
 * @returns 主题状态和取消订阅函数
 */
export function useTheme<T extends SetDataContext>(
  context: T
): {
  state: ThemeState;
  unsubscribe: () => void;
} {
  const state = themeManager.getState();

  context.setData({
    theme: state.theme,
    holidayTheme: state.holidayTheme,
    holidayName: state.holidayName,
    themeColors: state.colors,
  });

  const unsubscribe = themeManager.subscribe((newState) => {
    context.setData({
      theme: newState.theme,
      holidayTheme: newState.holidayTheme,
      holidayName: newState.holidayName,
      themeColors: newState.colors,
    });
  });

  return { state, unsubscribe };
}

/**
 * 获取当前主题颜色配置
 * @returns 当前主题颜色对象
 */
export function useThemeColors(): ThemeState['colors'] {
  return themeManager.getCurrentColors();
}