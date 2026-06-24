/**
 * 主题配置文件
 * 集中管理所有主题配置，使用 HSL 颜色模式自动生成变体
 */

export interface ThemeConfig {
  name: string;
  key: string;
  primary: number; // HSL 色相值 (0-360)
  saturation: number; // HSL 饱和度 (0-100)
  lightness: number; // HSL 亮度 (0-100)
  bgLightness: number; // 背景亮度
  textLightness: number; // 文字亮度
  description?: string;
}

export const themeConfigs: ThemeConfig[] = [
  {
    name: '元旦',
    key: 'new-year',
    primary: 270,
    saturation: 70,
    lightness: 60,
    bgLightness: 97,
    textLightness: 30,
    description: '紫色系，象征新的开始'
  },
  {
    name: '春节',
    key: 'spring',
    primary: 0,
    saturation: 85,
    lightness: 55,
    bgLightness: 98,
    textLightness: 35,
    description: '红色系，喜庆热烈'
  },
  {
    name: '元宵节',
    key: 'lantern',
    primary: 24,
    saturation: 90,
    lightness: 55,
    bgLightness: 98,
    textLightness: 35,
    description: '橙色系，温暖明亮'
  },
  {
    name: '清明节',
    key: 'tomb-sweeping',
    primary: 142,
    saturation: 65,
    lightness: 45,
    bgLightness: 98,
    textLightness: 25,
    description: '绿色系，清新自然'
  },
  {
    name: '劳动节',
    key: 'labor',
    primary: 221,
    saturation: 80,
    lightness: 55,
    bgLightness: 98,
    textLightness: 30,
    description: '蓝色系，沉稳专业'
  },
  {
    name: '端午节',
    key: 'dragon-boat',
    primary: 158,
    saturation: 75,
    lightness: 45,
    bgLightness: 98,
    textLightness: 25,
    description: '青绿色系，生机勃勃'
  },
  {
    name: '建党节',
    key: 'party',
    primary: 0,
    saturation: 85,
    lightness: 55,
    bgLightness: 98,
    textLightness: 35,
    description: '红色系，庄重热烈'
  },
  {
    name: '建军节',
    key: 'army',
    primary: 221,
    saturation: 80,
    lightness: 55,
    bgLightness: 98,
    textLightness: 30,
    description: '蓝色系，威严庄重'
  },
  {
    name: '抗战胜利日',
    key: 'victory',
    primary: 0,
    saturation: 85,
    lightness: 55,
    bgLightness: 98,
    textLightness: 35,
    description: '红色系，胜利荣耀'
  },
  {
    name: '九一八纪念日',
    key: '918',
    primary: 220,
    saturation: 10,
    lightness: 50,
    bgLightness: 98,
    textLightness: 25,
    description: '灰色系，庄严肃穆'
  },
  {
    name: '烈士纪念日',
    key: 'martyrs',
    primary: 0,
    saturation: 85,
    lightness: 55,
    bgLightness: 98,
    textLightness: 35,
    description: '红色系，缅怀先烈'
  },
  {
    name: '国庆节',
    key: 'national',
    primary: 0,
    saturation: 85,
    lightness: 55,
    bgLightness: 98,
    textLightness: 35,
    description: '红色系，喜庆热烈'
  },
  {
    name: '中秋节',
    key: 'mid-autumn',
    primary: 38,
    saturation: 90,
    lightness: 55,
    bgLightness: 99,
    textLightness: 35,
    description: '金色系，团圆温暖'
  },
  {
    name: '国家公祭日',
    key: 'mourning',
    primary: 220,
    saturation: 10,
    lightness: 30,
    bgLightness: 98,
    textLightness: 25,
    description: '深灰色系，沉痛缅怀'
  },
];

/**
 * 默认主题配置
 */
export const defaultThemeConfig: ThemeConfig = {
  name: '默认',
  key: 'default',
  primary: 221,
  saturation: 80,
  lightness: 55,
  bgLightness: 100,
  textLightness: 10,
};

/**
 * 深色模式配置
 */
export const darkThemeConfig: ThemeConfig = {
  name: '深色模式',
  key: 'dark',
  primary: 238,
  saturation: 75,
  lightness: 70,
  bgLightness: 6,
  textLightness: 95,
};

/**
 * HSL 转 HEX
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 根据主题配置生成颜色对象
 */
export function generateThemeColors(config: ThemeConfig, isDark: boolean = false): {
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
} {
  const baseConfig = isDark ? darkThemeConfig : config;

  // 主色调变体
  const primary = hslToHex(baseConfig.primary, baseConfig.saturation, baseConfig.lightness);
  const primaryLight = hslToHex(baseConfig.primary, baseConfig.saturation, Math.min(baseConfig.lightness + 10, 95));
  const primaryDark = hslToHex(baseConfig.primary, baseConfig.saturation, Math.max(baseConfig.lightness - 10, 15));

  // 成功色（绿色系）
  const success = hslToHex(158, 75, isDark ? 55 : 45);
  const successLight = hslToHex(158, 75, isDark ? 65 : 55);
  const successDark = hslToHex(158, 75, isDark ? 45 : 35);

  // 警告色（橙色系）
  const warning = hslToHex(24, 90, isDark ? 65 : 55);
  const warningLight = hslToHex(24, 90, isDark ? 75 : 65);
  const warningDark = hslToHex(24, 90, isDark ? 55 : 45);

  // 危险色（红色系）
  const danger = hslToHex(0, 85, isDark ? 60 : 55);
  const dangerLight = hslToHex(0, 85, isDark ? 70 : 65);
  const dangerDark = hslToHex(0, 85, isDark ? 50 : 45);

  // 紫色系
  const purple = hslToHex(270, 70, isDark ? 70 : 60);
  const purpleLight = hslToHex(270, 70, isDark ? 80 : 70);
  const purpleDark = hslToHex(270, 70, isDark ? 60 : 50);

  // 背景色
  const bg = hslToHex(220, 20, baseConfig.bgLightness);
  const cardBg = hslToHex(220, 20, isDark ? 18 : baseConfig.bgLightness - 3);

  // 文字色
  const text = hslToHex(220, 15, baseConfig.textLightness);

  return {
    primary,
    primaryLight,
    primaryDark,
    success,
    successLight,
    successDark,
    warning,
    warningLight,
    warningDark,
    danger,
    dangerLight,
    dangerDark,
    purple,
    purpleLight,
    purpleDark,
    bg,
    text,
    cardBg,
  };
}

/**
 * 根据主题 key 获取主题配置
 */
export function getThemeConfigByKey(key: string): ThemeConfig | null {
  return themeConfigs.find(config => config.key === key) || null;
}

/**
 * 获取所有主题配置
 */
export function getAllThemeConfigs(): ThemeConfig[] {
  return [...themeConfigs];
}