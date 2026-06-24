export const REGEX = {
  PHONE: /^1[3-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  ID_CARD: /^\d{17}[\dXx]$/,
  CHINESE: /^[\u4e00-\u9fa5]+$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d+\.?\d*$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,16}$/,
};

export function validatePhone(value: string): boolean {
  return REGEX.PHONE.test(value);
}

export function validateEmail(value: string): boolean {
  return REGEX.EMAIL.test(value);
}

export function validateUrl(value: string): boolean {
  return REGEX.URL.test(value);
}

export function validateIdCard(value: string): boolean {
  return REGEX.ID_CARD.test(value);
}

export function validateChinese(value: string): boolean {
  return REGEX.CHINESE.test(value);
}

export function validateNumber(value: string): boolean {
  return REGEX.NUMBER.test(value);
}

export function validateDecimal(value: string): boolean {
  return REGEX.DECIMAL.test(value);
}

export function validatePassword(value: string): boolean {
  return REGEX.PASSWORD.test(value);
}

export function validateUsername(value: string): boolean {
  return REGEX.USERNAME.test(value);
}