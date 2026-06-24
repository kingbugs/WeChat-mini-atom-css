import { API_BASE_URL, TIMEOUT } from '../constants/index';

/**
 * 请求配置选项接口
 */
export interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  data?: Record<string, any>;
  header?: Record<string, string>;
  timeout?: number;
  loading?: boolean;
  showError?: boolean;
}

/**
 * 响应数据接口
 * @template T - 响应数据类型
 */
export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 默认请求头配置
 */
const defaultHeader: Record<string, string> = {
  'Content-Type': 'application/json',
};

/**
 * 显示加载提示
 */
function showLoading(): void {
  wx.showLoading({ title: '加载中', mask: true });
}

/**
 * 隐藏加载提示
 */
function hideLoading(): void {
  wx.hideLoading();
}

/**
 * 显示 Toast 提示
 * @param message - 提示信息
 * @param icon - 图标类型，默认 'none'
 */
function showToast(message: string, icon: 'none' | 'error' | 'success' = 'none'): void {
  wx.showToast({ title: message, icon, duration: 2000 });
}

/**
 * 发起网络请求
 * @template T - 响应数据类型
 * @param options - 请求配置选项
 * @returns 响应数据 Promise
 */
export async function request<T = any>(options: RequestOptions): Promise<ResponseData<T>> {
  const {
    url,
    method = 'GET',
    data = {},
    header = {},
    timeout = TIMEOUT,
    loading = true,
    showError = true,
  } = options;

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const requestHeader = { ...defaultHeader, ...header };

  if (loading) showLoading();

  try {
    const result = await new Promise<WechatMiniprogram.RequestSuccessCallbackResult>((resolve, reject) => {
      wx.request({
        url: fullUrl,
        method,
        data,
        header: requestHeader,
        timeout,
        success: resolve,
        fail: reject,
      });
    });

    const { statusCode, data: responseData } = result;

    if (statusCode >= 200 && statusCode < 300) {
      const res = responseData as ResponseData<T>;
      
      if (res.code === 0 || res.code === 200) {
        return res;
      } else {
        if (showError) {
          showToast(res.message || '请求失败', 'error');
        }
        throw new Error(res.message || '请求失败');
      }
    } else {
      if (showError) {
        showToast(`请求错误: ${statusCode}`, 'error');
      }
      throw new Error(`HTTP error ${statusCode}`);
    }
  } catch (error) {
    if (showError && !(error instanceof Error && error.message.includes('cancel'))) {
      showToast('网络请求失败', 'error');
    }
    throw error;
  } finally {
    if (loading) hideLoading();
  }
}

/**
 * GET 请求
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param data - 请求参数
 * @param options - 额外请求配置
 * @returns 响应数据 Promise
 */
export function get<T = any>(
  url: string,
  data?: Record<string, any>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'GET', data, ...options });
}

/**
 * POST 请求
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param data - 请求参数
 * @param options - 额外请求配置
 * @returns 响应数据 Promise
 */
export function post<T = any>(
  url: string,
  data?: Record<string, any>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'POST', data, ...options });
}

/**
 * PUT 请求
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param data - 请求参数
 * @param options - 额外请求配置
 * @returns 响应数据 Promise
 */
export function put<T = any>(
  url: string,
  data?: Record<string, any>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'PUT', data, ...options });
}

/**
 * DELETE 请求
 * @template T - 响应数据类型
 * @param url - 请求地址
 * @param data - 请求参数
 * @param options - 额外请求配置
 * @returns 响应数据 Promise
 */
export function del<T = any>(
  url: string,
  data?: Record<string, any>,
  options?: Omit<RequestOptions, 'url' | 'method' | 'data'>
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'DELETE', data, ...options });
}