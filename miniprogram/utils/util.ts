/**
 * 格式化时间为 YYYY/MM/DD HH:mm:ss 格式
 * @param date - 日期对象
 * @returns 格式化后的时间字符串
 */
export const formatTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**
 * 数字补零，小于10的数字前面补0
 * @param n - 需要补零的数字
 * @returns 补零后的字符串
 */
const formatNumber = (n: number): string => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

/**
 * 格式化日期为指定格式
 * @param date - 日期对象或日期字符串
 * @param format - 格式字符串，支持 YYYY、MM、DD、HH、mm、ss
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = formatNumber(d.getMonth() + 1)
  const day = formatNumber(d.getDate())
  const hour = formatNumber(d.getHours())
  const minute = formatNumber(d.getMinutes())
  const second = formatNumber(d.getSeconds())

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

/**
 * 格式化价格，保留指定小数位数
 * @param price - 价格数值
 * @param decimals - 小数位数，默认2位
 * @returns 格式化后的价格字符串
 */
export function formatPrice(price: number, decimals: number = 2): string {
  return price.toFixed(decimals)
}

/**
 * 数字千分位格式化
 * @param num - 需要格式化的数字
 * @returns 千分位格式的字符串
 */
export function formatNumberThousands(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 判断值是否为空
 * @param value - 需要判断的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 判断值是否不为空
 * @param value - 需要判断的值
 * @returns 是否不为空
 */
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value)
}

/**
 * 去除字符串两端空白
 * @param str - 需要处理的字符串
 * @returns 去除空白后的字符串
 */
export function trim(str: string): string {
  return str ? str.trim() : ''
}

/**
 * 去除字符串所有空白
 * @param str - 需要处理的字符串
 * @returns 去除所有空白后的字符串
 */
export function trimAll(str: string): string {
  return str ? str.replace(/\s+/g, '') : ''
}

/**
 * 首字母大写
 * @param str - 需要处理的字符串
 * @returns 首字母大写后的字符串
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 连字符转驼峰
 * @param str - 需要处理的字符串
 * @returns 驼峰格式的字符串
 */
export function camelize(str: string): string {
  if (!str) return ''
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * 驼峰转连字符
 * @param str - 需要处理的字符串
 * @returns 连字符格式的字符串
 */
export function hyphenate(str: string): string {
  if (!str) return ''
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 防抖函数
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return ((...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as T
}

/**
 * 节流函数
 * @param fn - 需要节流的函数
 * @param delay - 节流时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let lastTime = 0
  return ((...args: any[]) => {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn(...args)
    }
  }) as T
}

/**
 * 深拷贝对象
 * @param obj - 需要拷贝的对象
 * @returns 拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as unknown as T
  const clone: Record<string, any> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key])
    }
  }
  return clone as T
}

/**
 * 根据路径获取对象属性值
 * @param obj - 目标对象
 * @param path - 属性路径，支持点号分隔
 * @param defaultValue - 默认值
 * @returns 属性值或默认值
 */
export function getValue<T>(obj: any, path: string, defaultValue?: T): T {
  const keys = path.split('.')
  let result: any = obj
  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue as T
    result = result[key]
  }
  return result !== undefined ? result : (defaultValue as T)
}

/**
 * 根据路径设置对象属性值
 * @param obj - 目标对象
 * @param path - 属性路径，支持点号分隔
 * @param value - 要设置的值
 */
export function setValue(obj: any, path: string, value: any): void {
  const keys = path.split('.')
  let result: any = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!result[keys[i]]) {
      result[keys[i]] = {}
    }
    result = result[keys[i]]
  }
  result[keys[keys.length - 1]] = value
}

/**
 * 数组去重
 * @param arr - 需要去重的数组
 * @returns 去重后的数组
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * 数组扁平化
 * @param arr - 二维数组
 * @returns 扁平化后的一维数组
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), [])
}

/**
 * 数组随机打乱
 * @param arr - 需要打乱的数组
 * @returns 打乱后的数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 数组元素移动
 * @param arr - 目标数组
 * @param fromIndex - 起始索引
 * @param toIndex - 目标索引
 * @returns 移动后的数组
 */
export function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...arr]
  const [removed] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, removed)
  return result
}

/**
 * 生成数字范围数组
 * @param start - 起始值
 * @param end - 结束值（不包含）
 * @param step - 步长，默认1
 * @returns 数字范围数组
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

/**
 * 限制数值在指定范围内
 * @param value - 需要限制的数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的数值
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * 生成指定范围内的随机整数
 * @param min - 最小值
 * @param max - 最大值
 * @returns 随机整数
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 判断值是否为数字
 * @param value - 需要判断的值
 * @returns 是否为数字
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 判断值是否为字符串
 * @param value - 需要判断的值
 * @returns 是否为字符串
 */
export function isString(value: any): boolean {
  return typeof value === 'string'
}

/**
 * 判断值是否为布尔值
 * @param value - 需要判断的值
 * @returns 是否为布尔值
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

/**
 * 判断值是否为对象
 * @param value - 需要判断的值
 * @returns 是否为对象
 */
export function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null
}

/**
 * 判断值是否为数组
 * @param value - 需要判断的值
 * @returns 是否为数组
 */
export function isArray(value: any): boolean {
  return Array.isArray(value)
}

/**
 * 判断值是否为函数
 * @param value - 需要判断的值
 * @returns 是否为函数
 */
export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

/**
 * 判断字符串是否为手机号
 * @param value - 需要判断的字符串
 * @returns 是否为手机号
 */
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 判断字符串是否为邮箱
 * @param value - 需要判断的字符串
 * @returns 是否为邮箱
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * 判断字符串是否为URL
 * @param value - 需要判断的字符串
 * @returns 是否为URL
 */
export function isUrl(value: string): boolean {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)
}

/**
 * 判断字符串是否为身份证号
 * @param value - 需要判断的字符串
 * @returns 是否为身份证号
 */
export function isIdCard(value: string): boolean {
  return /^\d{17}[\dXx]$/.test(value)
}

/**
 * 获取本地存储值
 * @param key - 存储键名
 * @param defaultValue - 默认值
 * @returns 存储值或默认值
 */
export function getStorage<T>(key: string, defaultValue?: T): T {
  try {
    const value = wx.getStorageSync(key)
    return value !== '' && value !== undefined ? value : defaultValue as T
  } catch {
    return defaultValue as T
  }
}

/**
 * 设置本地存储值
 * @param key - 存储键名
 * @param value - 存储值
 */
export function setStorage(key: string, value: any): void {
  try {
    wx.setStorageSync(key, value)
  } catch (error) {
    console.error('setStorage failed:', error)
  }
}

/**
 * 移除本地存储
 * @param key - 存储键名
 */
export function removeStorage(key: string): void {
  try {
    wx.removeStorageSync(key)
  } catch (error) {
    console.error('removeStorage failed:', error)
  }
}

/**
 * 清空本地存储
 */
export function clearStorage(): void {
  try {
    wx.clearStorageSync()
  } catch (error) {
    console.error('clearStorage failed:', error)
  }
}

/**
 * 获取URL参数
 * @param name - 参数名
 * @param url - URL地址，默认为空
 * @returns 参数值或null
 */
export function getQueryString(name: string, url?: string): string | null {
  const targetUrl = url || ''
  const match = targetUrl.match(new RegExp(`[?&]${name}=([^&]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

/**
 * 延时等待
 * @param ms - 等待时间（毫秒）
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 异常捕获并返回默认值
 * @param fn - 需要执行的函数
 * @param defaultValue - 默认值
 * @returns 函数返回值或默认值
 */
export function tryCatch<T>(fn: () => T, defaultValue: T): T {
  try {
    return fn()
  } catch {
    return defaultValue
  }
}

/**
 * 异常捕获并处理
 * @param fn - 需要执行的函数
 * @param errorHandler - 错误处理函数
 * @returns 函数返回值或undefined
 */
export function catchError<T>(fn: () => T, errorHandler?: (error: any) => void): T | undefined {
  try {
    return fn()
  } catch (error) {
    errorHandler?.(error)
    return undefined
  }
}

/**
 * 删除对象指定属性
 * @param obj - 目标对象
 * @param keys - 需要删除的属性名数组
 * @returns 删除后的对象
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

/**
 * 提取对象指定属性
 * @param obj - 目标对象
 * @param keys - 需要提取的属性名数组
 * @returns 提取后的对象
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * 合并多个对象
 * @param objects - 需要合并的对象列表
 * @returns 合并后的对象
 */
export function merge<T extends object>(...objects: T[]): T {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T)
}