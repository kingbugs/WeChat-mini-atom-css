/**
 * CSS变量映射工具
 * 将主题颜色转换为CSS变量，用于小程序动态样式
 */

import { themeManager, ThemeColors } from './theme';
import { adjustBrightness } from './color-utils';

interface CssVariables {
  ['--color-primary']: string;
  ['--color-primary-light']: string;
  ['--color-primary-dark']: string;
  ['--color-success']: string;
  ['--color-success-light']: string;
  ['--color-success-dark']: string;
  ['--color-warning']: string;
  ['--color-warning-light']: string;
  ['--color-warning-dark']: string;
  ['--color-danger']: string;
  ['--color-danger-light']: string;
  ['--color-danger-dark']: string;
  ['--color-purple']: string;
  ['--color-purple-light']: string;
  ['--color-purple-dark']: string;
  ['--color-bg']: string;
  ['--color-text']: string;
  ['--color-card-bg']: string;
  ['--color-bg-muted']: string;
  ['--color-text-muted']: string;
  ['--color-border']: string;
}

/**
 * 将主题颜色转换为CSS变量对象
 */
export function colorsToCssVariables(colors: ThemeColors): CssVariables {
  return {
    '--color-primary': colors.primary,
    '--color-primary-light': colors.primaryLight,
    '--color-primary-dark': colors.primaryDark,
    '--color-success': colors.success,
    '--color-success-light': colors.successLight,
    '--color-success-dark': colors.successDark,
    '--color-warning': colors.warning,
    '--color-warning-light': colors.warningLight,
    '--color-warning-dark': colors.warningDark,
    '--color-danger': colors.danger,
    '--color-danger-light': colors.dangerLight,
    '--color-danger-dark': colors.dangerDark,
    '--color-purple': colors.purple,
    '--color-purple-light': colors.purpleLight,
    '--color-purple-dark': colors.purpleDark,
    '--color-bg': colors.bg,
    '--color-text': colors.text,
    '--color-card-bg': colors.cardBg,
    '--color-bg-muted': adjustBrightness(colors.bg, -3),
    '--color-text-muted': adjustBrightness(colors.text, 20),
    '--color-border': adjustBrightness(colors.bg, -8),
  };
}

/**
 * 获取当前主题的CSS变量
 */
export function getCurrentCssVariables(): CssVariables {
  const colors = themeManager.getCurrentColors();
  return colorsToCssVariables(colors);
}

/**
 * 将CSS变量对象转换为内联样式字符串
 */
export function cssVariablesToString(variables: CssVariables): string {
  return Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}

/**
 * 将CSS变量对象转换为小程序setData可用的对象
 */
export function cssVariablesToData(variables: CssVariables): Record<string, string> {
  return variables as unknown as Record<string, string>;
}

/**
 * 监听主题变化并自动更新CSS变量
 * @param callback 主题变化时的回调函数，接收CSS变量对象
 */
export function subscribeToCssVariables(callback: (variables: CssVariables) => void): () => void {
  const handleChange = () => {
    const variables = getCurrentCssVariables();
    callback(variables);
  };

  handleChange();
  
  return themeManager.subscribe(() => {
    handleChange();
  });
}

/**
 * 创建主题样式对象，用于页面或组件的style属性绑定
 */
export function createThemeStyle(): CssVariables {
  return getCurrentCssVariables();
}

/**
 * 初始化CSS变量（在App启动时调用）
 */
export function initCssVariables(): void {
  const variables = getCurrentCssVariables();
  console.log('CSS变量初始化完成:', variables);
}

/**
 * 获取CSS变量名称列表
 */
export function getCssVariableNames(): string[] {
  return [
    '--color-primary',
    '--color-primary-light',
    '--color-primary-dark',
    '--color-success',
    '--color-success-light',
    '--color-success-dark',
    '--color-warning',
    '--color-warning-light',
    '--color-warning-dark',
    '--color-danger',
    '--color-danger-light',
    '--color-danger-dark',
    '--color-purple',
    '--color-purple-light',
    '--color-purple-dark',
    '--color-bg',
    '--color-text',
    '--color-card-bg',
    '--color-bg-muted',
    '--color-text-muted',
    '--color-border',
  ];
}

export type { CssVariables };