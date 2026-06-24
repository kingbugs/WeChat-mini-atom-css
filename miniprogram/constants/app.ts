/**
 * 应用名称
 */
export const APP_NAME = 'demo01';

/**
 * 应用版本号
 */
export const APP_VERSION = '1.0.0';

/**
 * API 基础地址
 */
export const API_BASE_URL = '';

/**
 * 分页大小
 */
export const PAGE_SIZE = 20;

/**
 * 请求超时时间（毫秒）
 */
export const TIMEOUT = 10000;

/**
 * 当前环境
 */
export const ENV: string = 'development';

/**
 * 是否为开发环境
 */
export const IS_DEVELOPMENT = ENV === 'development';

/**
 * 是否为生产环境
 */
export const IS_PRODUCTION = ENV === 'production';

/**
 * 本地存储键名前缀
 */
export const STORAGE_KEY_PREFIX = `${APP_NAME}_`;