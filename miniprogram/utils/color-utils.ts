/**
 * 颜色工具函数
 * 提供颜色转换、计算等功能
 */

/**
 * HEX 转 RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * RGB 转 HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.min(255, Math.max(0, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * HEX 转 HSL
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * HSL 转 HEX
 */
export function hslToHex(h: number, s: number, l: number): string {
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
 * 调整颜色亮度
 * @param hex HEX颜色值
 * @param percent 亮度调整百分比，正数增加亮度，负数减少亮度
 */
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (value: number) => {
    const adjusted = value + (255 * percent / 100);
    return Math.round(Math.min(255, Math.max(0, adjusted)));
  };

  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}

/**
 * 混合两个颜色
 * @param color1 第一个颜色
 * @param color2 第二个颜色
 * @param ratio 混合比例 (0-1)，0表示完全使用color1，1表示完全使用color2
 */
export function mixColors(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
  const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
  const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

  return rgbToHex(r, g, b);
}

/**
 * 判断颜色是否为深色
 * @param hex HEX颜色值
 */
export function isDarkColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;

  // 使用相对亮度公式
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128;
}

/**
 * 获取对比色（适合文字的颜色）
 * @param hex HEX颜色值
 */
export function getContrastColor(hex: string): string {
  return isDarkColor(hex) ? '#ffffff' : '#000000';
}

/**
 * 生成颜色渐变数组
 * @param startColor 开始颜色
 * @param endColor 结束颜色
 * @param steps 步数
 */
export function generateGradient(startColor: string, endColor: string, steps: number): string[] {
  const gradient: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    gradient.push(mixColors(startColor, endColor, ratio));
  }
  
  return gradient;
}

/**
 * 验证HEX颜色格式
 * @param hex HEX颜色值
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{6}|[a-f\d]{3})$/i.test(hex);
}

/**
 * 格式化HEX颜色（确保有#前缀）
 * @param hex HEX颜色值
 */
export function formatHex(hex: string): string {
  if (!hex.startsWith('#')) {
    return '#' + hex;
  }
  return hex;
}

/**
 * 生成随机颜色
 */
export function randomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return rgbToHex(r, g, b);
}

/**
 * 生成随机柔和颜色
 */
export function randomSoftColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 20); // 60-80
  const l = 50 + Math.floor(Math.random() * 20); // 50-70
  return hslToHex(h, s, l);
}