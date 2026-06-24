import { debounce } from '../utils/index';

/**
 * 加载状态接口
 */
export interface LoadingState {
  loading: boolean;
  loadingText: string;
}

/**
 * 支持 setData 方法的上下文接口
 */
interface SetDataContext {
  setData: (data: Record<string, any>) => void;
}

/**
 * 加载状态 Hook
 * 管理页面或组件的加载状态
 * @template T - 上下文类型
 * @param context - 页面或组件实例
 * @returns 加载状态操作方法集合
 */
export function useLoading<T extends SetDataContext>(
  context: T
): {
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  setLoading: (loading: boolean, text?: string) => void;
} {
  /**
   * 显示加载状态
   * @param text - 加载提示文本，默认为 '加载中'
   */
  const showLoading = (text: string = '加载中') => {
    context.setData({ loading: true, loadingText: text });
    wx.showLoading({ title: text, mask: true });
  };

  /**
   * 隐藏加载状态
   */
  const hideLoading = () => {
    context.setData({ loading: false });
    wx.hideLoading();
  };

  /**
   * 设置加载状态
   * @param loading - 是否显示加载
   * @param text - 加载提示文本，默认为 '加载中'
   */
  const setLoading = (loading: boolean, text: string = '加载中') => {
    if (loading) {
      showLoading(text);
    } else {
      hideLoading();
    }
  };

  return { showLoading, hideLoading, setLoading };
}

/**
 * 防抖加载状态 Hook
 * 避免频繁切换加载状态
 * @template T - 上下文类型
 * @param context - 页面或组件实例
 * @param delay - 防抖延迟时间（毫秒），默认 300ms
 * @returns 防抖后的加载状态操作方法集合
 */
export function useDebounceLoading<T extends SetDataContext>(
  context: T,
  delay: number = 300
): {
  showLoading: (text?: string) => void;
  hideLoading: () => void;
} {
  const { showLoading: originalShowLoading, hideLoading: originalHideLoading } = useLoading(context);
  
  const showLoading = debounce(originalShowLoading, delay);
  const hideLoading = debounce(originalHideLoading, delay);

  return { showLoading, hideLoading };
}