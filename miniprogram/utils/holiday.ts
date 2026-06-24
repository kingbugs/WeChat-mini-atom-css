/**
 * 节日主题配置接口
 */
export interface HolidayConfig {
  name: string;
  className: string;
  startDate: string;
  endDate: string;
}

/**
 * 公历节日列表
 */
const holidays: HolidayConfig[] = [
  {
    name: '元旦',
    className: 'page-holiday-new-year',
    startDate: '01-01',
    endDate: '01-03',
  },
  {
    name: '清明节',
    className: 'page-holiday-tomb-sweeping',
    startDate: '04-04',
    endDate: '04-06',
  },
  {
    name: '劳动节',
    className: 'page-holiday-labor',
    startDate: '05-01',
    endDate: '05-05',
  },
  {
    name: '七一建党节',
    className: 'page-holiday-party',
    startDate: '06-30',
    endDate: '07-02',
  },
  {
    name: '八一建军节',
    className: 'page-holiday-army',
    startDate: '07-31',
    endDate: '08-02',
  },
  {
    name: '9月3日抗日战争胜利纪念日',
    className: 'page-holiday-victory',
    startDate: '09-03',
    endDate: '09-03',
  },
  {
    name: '9月18日纪念日',
    className: 'page-holiday-918',
    startDate: '09-18',
    endDate: '09-18',
  },
  {
    name: '9月30日烈士纪念日',
    className: 'page-holiday-martyrs',
    startDate: '09-30',
    endDate: '09-30',
  },
  {
    name: '国庆节',
    className: 'page-holiday-national',
    startDate: '10-01',
    endDate: '10-07',
  },
  {
    name: '12月13日国家公祭日',
    className: 'page-holiday-mourning',
    startDate: '12-13',
    endDate: '12-13',
  },
];

/**
 * 农历节日映射表（简化版，使用公历近似日期）
 */
const lunarHolidays: HolidayConfig[] = [
  {
    name: '春节',
    className: 'page-holiday-spring',
    startDate: '01-21',
    endDate: '02-20',
  },
  {
    name: '元宵节',
    className: 'page-holiday-lantern',
    startDate: '02-10',
    endDate: '02-20',
  },
  {
    name: '端午节',
    className: 'page-holiday-dragon-boat',
    startDate: '05-28',
    endDate: '06-05',
  },
  {
    name: '中秋节',
    className: 'page-holiday-mid-autumn',
    startDate: '09-07',
    endDate: '09-17',
  },
];

/**
 * 获取当前日期的 MM-DD 格式
 * @returns MM-DD 格式的日期字符串
 */
function getCurrentDateStr(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

/**
 * 判断日期是否在指定范围内
 * @param date - 需要判断的日期（MM-DD 格式）
 * @param start - 开始日期（MM-DD 格式）
 * @param end - 结束日期（MM-DD 格式）
 * @returns 是否在范围内
 */
function isInRange(date: string, start: string, end: string): boolean {
  return date >= start && date <= end;
}

/**
 * 获取当前节日配置
 * @returns 当前节日配置或 null
 */
export function getCurrentHoliday(): HolidayConfig | null {
  const currentDate = getCurrentDateStr();
  
  for (const holiday of holidays) {
    if (isInRange(currentDate, holiday.startDate, holiday.endDate)) {
      return holiday;
    }
  }
  
  for (const holiday of lunarHolidays) {
    if (isInRange(currentDate, holiday.startDate, holiday.endDate)) {
      return holiday;
    }
  }
  
  return null;
}

/**
 * 获取所有节日列表
 * @returns 所有节日配置数组
 */
export function getAllHolidays(): HolidayConfig[] {
  return [...holidays, ...lunarHolidays];
}

/**
 * 根据节日名称获取主题类名
 * @param name - 节日名称
 * @returns 主题类名或 null
 */
export function getHolidayClassName(name: string): string | null {
  const allHolidays = getAllHolidays();
  const holiday = allHolidays.find(h => h.name === name);
  return holiday ? holiday.className : null;
}

/**
 * 获取当前主题类名
 * @returns 当前主题类名，无节日时返回空字符串
 */
export function getCurrentThemeClass(): string {
  const holiday = getCurrentHoliday();
  return holiday ? holiday.className : '';
}

/**
 * 获取当前节日名称
 * @returns 当前节日名称，无节日时返回空字符串
 */
export function getCurrentHolidayName(): string {
  const holiday = getCurrentHoliday();
  return holiday ? holiday.name : '';
}