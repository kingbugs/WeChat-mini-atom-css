import { isEmpty } from '../utils/index';
import { validatePhone, validateEmail, validateIdCard } from '../constants/index';

/**
 * 表单验证规则接口
 */
export interface FormRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: (value: string) => boolean | string;
  message?: string;
}

/**
 * 表单字段接口
 * @template T - 字段值类型
 */
export interface FormField<T = any> {
  value: T;
  error: string;
  rules?: FormRule[];
}

/**
 * 表单状态类型
 * @template T - 表单数据类型
 */
export type FormState<T extends Record<string, any>> = {
  [key in keyof T]: FormField<T[key]>;
};

/**
 * 表单 Hook
 * @template T - 表单数据类型
 * @param fields - 初始表单字段值
 * @param rules - 字段验证规则
 * @returns 表单操作方法集合
 */
export function useForm<T extends Record<string, any>>(
  fields: T,
  rules?: Record<string, FormRule[]>
): {
  formData: FormState<T>;
  setFieldValue: <K extends keyof T>(key: K, value: T[K]) => void;
  validateField: <K extends keyof T>(key: K) => boolean;
  validateForm: () => boolean;
  resetForm: () => void;
  getFormData: () => T;
} {
  const formData = {} as FormState<T>;
  
  (Object.keys(fields) as Array<keyof T>).forEach(key => {
    formData[key] = {
      value: fields[key],
      error: '',
      rules: rules?.[key as string],
    };
  });

  /**
   * 设置字段值
   * @template K - 字段键名类型
   * @param key - 字段键名
   * @param value - 字段值
   */
  const setFieldValue = <K extends keyof T>(key: K, value: T[K]) => {
    const field = formData[key];
    if (field) {
      field.value = value;
      field.error = '';
    }
  };

  /**
   * 验证单个字段
   * @template K - 字段键名类型
   * @param key - 字段键名
   * @returns 是否验证通过
   */
  const validateField = <K extends keyof T>(key: K): boolean => {
    const field = formData[key];
    if (!field) return true;

    const { value, rules } = field;
    const stringValue = String(value ?? '');

    if (!rules) return true;

    for (const rule of rules) {
      if (rule.required && isEmpty(stringValue)) {
        field.error = rule.message || `${String(key)}不能为空`;
        return false;
      }

      if (rule.minLength !== undefined && stringValue.length < rule.minLength) {
        field.error = rule.message || `${String(key)}长度不能少于${rule.minLength}个字符`;
        return false;
      }

      if (rule.maxLength !== undefined && stringValue.length > rule.maxLength) {
        field.error = rule.message || `${String(key)}长度不能超过${rule.maxLength}个字符`;
        return false;
      }

      if (rule.pattern && !rule.pattern.test(stringValue)) {
        field.error = rule.message || `${String(key)}格式不正确`;
        return false;
      }

      if (rule.validator) {
        const result = rule.validator(stringValue);
        if (result === false || typeof result === 'string') {
          field.error = typeof result === 'string' ? result : rule.message || `${String(key)}验证失败`;
          return false;
        }
      }
    }

    field.error = '';
    return true;
  };

  /**
   * 验证整个表单
   * @returns 是否所有字段验证通过
   */
  const validateForm = (): boolean => {
    let isValid = true;
    (Object.keys(formData) as Array<keyof T>).forEach(key => {
      if (!validateField(key)) {
        isValid = false;
      }
    });
    return isValid;
  };

  /**
   * 重置表单到初始状态
   */
  const resetForm = () => {
    (Object.keys(fields) as Array<keyof T>).forEach(key => {
      const field = formData[key];
      if (field) {
        field.value = fields[key];
        field.error = '';
      }
    });
  };

  /**
   * 获取表单数据
   * @returns 表单数据对象
   */
  const getFormData = (): T => {
    const data = {} as T;
    (Object.keys(formData) as Array<keyof T>).forEach(key => {
      data[key] = formData[key].value;
    });
    return data;
  };

  return { formData, setFieldValue, validateField, validateForm, resetForm, getFormData };
}

/**
 * 常用表单验证规则
 */
export const COMMON_RULES = {
  phone: {
    required: true,
    validator: (value: string) => validatePhone(value) || '请输入正确的手机号',
  },
  email: {
    required: true,
    validator: (value: string) => validateEmail(value) || '请输入正确的邮箱',
  },
  idCard: {
    required: true,
    validator: (value: string) => validateIdCard(value) || '请输入正确的身份证号',
  },
  required: {
    required: true,
    message: '此项必填',
  },
};