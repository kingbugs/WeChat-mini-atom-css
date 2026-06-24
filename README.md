# 微信小程序原子化 CSS 项目

基于 TypeScript + SCSS 的微信小程序开发框架，提供原子化 CSS 样式系统、主题管理、工具函数库和自定义 Hooks。

## 功能特性

### 🎨 原子化 CSS 系统
- 基于 SCSS 的原子化样式类
- 完整的响应式设计支持
- 节日主题自动切换（春节、国庆等）
- 深色模式支持

### 🛠️ 工具函数库
- 日期格式化与处理
- 字符串操作（去空格、大小写转换等）
- 对象操作（深拷贝、属性获取/设置）
- 数组操作（去重、打乱、洗牌）
- 类型判断（isEmpty、isPhone、isEmail 等）
- 防抖与节流函数

### 🎯 主题管理系统
- HSL 颜色模式
- 主题持久化存储
- 订阅机制（状态变化自动通知）
- 页面/组件主题混入

### 📝 表单处理
- 强大的表单验证
- 支持自定义验证规则
- 常用验证规则预设（手机号、邮箱、身份证）

### 🔗 API 请求封装
- 统一的请求拦截和错误处理
- 支持 GET/POST/PUT/DELETE 方法
- 自动 loading 状态管理
- 可配置的请求参数

### ⚓ 自定义 Hooks
- `useTheme` - 主题状态管理
- `useLoading` - 加载状态控制
- `useForm` - 表单验证和处理
- `useStorage` - 本地存储封装

## 目录结构

```
miniprogram/
├── api/                      # API 请求模块
│   ├── request.ts           # 请求封装
│   └── modules/             # API 接口模块
│       ├── user.ts
│       └── common.ts
├── components/              # 自定义组件
│   └── navigation-bar/      # 导航栏组件
├── config/                  # 配置文件
│   └── theme.config.ts     # 主题配置
├── constants/               # 常量配置
│   ├── app.ts              # 应用常量
│   ├── routes.ts           # 路由常量
│   ├── storage.ts          # 存储键常量
│   └── regex.ts            # 正则表达式
├── hooks/                   # 自定义 Hooks
│   ├── useTheme.ts         # 主题 Hook
│   ├── useLoading.ts       # 加载状态 Hook
│   ├── useForm.ts          # 表单 Hook
│   └── useStorage.ts       # 存储 Hook
├── pages/                   # 页面
│   ├── home/
│   ├── index/
│   ├── mine/
│   ├── service/
│   └── shop/
├── styles/                  # 样式文件
│   ├── animations.scss     # 动画样式
│   ├── borders.scss        # 边框样式
│   ├── components.scss     # 组件样式
│   ├── effects.scss        # 效果样式
│   ├── holidays.scss       # 节日主题样式
│   ├── index.scss          # 样式入口
│   ├── interactions.scss   # 交互样式
│   ├── layout.scss         # 布局样式
│   ├── responsive.scss     # 响应式样式
│   ├── spacing.scss        # 间距样式
│   ├── typography.scss     # 字体样式
│   └── variables.scss      # 变量定义
├── utils/                   # 工具函数
│   ├── util.ts             # 通用工具函数
│   ├── theme.ts           # 主题管理
│   ├── holiday.ts         # 节日判断
│   ├── color-utils.ts     # 颜色工具
│   ├── css-variables.ts   # CSS 变量
│   └── theme-storage.ts   # 主题存储
├── app.ts                  # 应用入口
├── app.json               # 应用配置
└── app.scss               # 应用样式
```

## 快速开始

### 环境要求
- Node.js >= 14.0.0
- 微信开发者工具最新版

### 安装依赖

```bash
npm install
```

### 编译项目

```bash
# 编译 TypeScript
npx tsc -p tsconfig.json

# 或在微信开发者工具中点击"编译"按钮
```

### 运行项目

1. 打开微信开发者工具
2. 导入项目目录 `/Volumes/数据/mini/demo01`
3. 点击"编译"按钮

## 使用指南

### 1. 工具函数使用

```typescript
import { 
  formatDate, 
  isPhone, 
  isEmail, 
  debounce, 
  deepClone,
  getStorage,
  setStorage 
} from './utils/index';

// 日期格式化
const dateStr = formatDate(new Date(), 'YYYY-MM-DD'); // "2024-01-15"

// 手机号验证
const isValid = isPhone('13800138000'); // true

// 邮箱验证
const isEmailValid = isEmail('test@example.com'); // true

// 防抖函数
const debouncedFn = debounce(() => {
  console.log('执行操作');
}, 300);

// 深拷贝
const copied = deepClone({ name: '张三', age: 25 });

// 存储操作
setStorage('userInfo', { name: '张三' });
const userInfo = getStorage('userInfo');
```

### 2. 主题管理使用

```typescript
import { themeManager, getCurrentThemeClass } from './utils/index';

// 获取当前主题状态
const state = themeManager.getState();

// 切换深色模式
themeManager.toggleDarkMode();

// 设置节日主题
themeManager.setTheme('spring'); // 春节主题

// 订阅主题变化
const unsubscribe = themeManager.subscribe((newState) => {
  console.log('主题变化:', newState);
});

// 取消订阅
unsubscribe();
```

### 3. 表单验证使用

```typescript
import { useForm, COMMON_RULES } from './hooks/useForm';

// 定义表单数据
interface LoginForm {
  username: string;
  password: string;
  phone?: string;
}

// 初始化表单
const { 
  formData, 
  setFieldValue, 
  validateField, 
  validateForm, 
  resetForm, 
  getFormData 
} = useForm<LoginForm>(
  {
    username: '',
    password: '',
    phone: '',
  },
  {
    username: [COMMON_RULES.required],
    password: [
      COMMON_RULES.required,
      { minLength: 6, message: '密码至少6位' }
    ],
    phone: [COMMON_RULES.phone],
  }
);

// 设置字段值
setFieldValue('username', 'admin');

// 验证单个字段
const isFieldValid = validateField('username');

// 验证整个表单
const isFormValid = validateForm();

// 获取表单数据
const data = getFormData();

// 重置表单
resetForm();
```

### 4. 加载状态使用

```typescript
import { useLoading } from './hooks/useLoading';

Page({
  data: {
    loading: false,
    loadingText: '',
  },
  
  onLoad() {
    const { showLoading, hideLoading, setLoading } = useLoading(this);
    
    // 显示加载
    showLoading('加载中...');
    
    // 隐藏加载
    hideLoading();
    
    // 设置加载状态
    setLoading(true, '提交中...');
    setLoading(false);
  }
});
```

### 5. API 请求使用

```typescript
import { get, post, put, del } from './api/request';

// GET 请求
const userList = await get<User[]>('/api/users');

// POST 请求
const result = await post<User>('/api/users', {
  name: '张三',
  age: 25,
});

// PUT 请求
await put('/api/users/1', { name: '李四' });

// DELETE 请求
await del('/api/users/1');
```

### 6. 页面主题混入

```typescript
import { withTheme } from './utils/theme';

Page({
  data: {
    theme: '',
    holidayTheme: '',
    themeColors: {},
  },
  
  onLoad() {
    // 主题混入
    withTheme(this);
  },
  
  onUnload() {
    // 取消订阅（防止内存泄漏）
    this.unsubscribe?.();
  }
});
```

### 7. 样式使用

在 WXML 中直接使用原子化类名：

```xml
<view class="flex items-center justify-center p-4 m-2 bg-white">
  <text class="text-lg font-bold text-gray-800">Hello World</text>
</view>
```

支持的样式类：
- **布局**：flex, grid, block, inline, hidden
- **间距**：p-{1-10}, m-{1-10}, pt-{1-10}, pb-{1-10}, pl-{1-10}, pr-{1-10}
- **字体**：text-{xs|sm|base|lg|xl|2xl|3xl|4xl}, font-{normal|bold}
- **颜色**：text-{gray|red|blue|green|yellow|primary|white}, bg-{gray|red|blue|green|yellow|primary|white}
- **圆角**：rounded-{none|sm|base|lg|full}
- **阴影**：shadow-{none|sm|base|lg|xl}

## 节日主题

项目支持以下节日主题自动切换：

### 公历节日
- 元旦 (01-01 ~ 01-03)
- 清明节 (04-04 ~ 04-06)
- 劳动节 (05-01 ~ 05-05)
- 七一建党节 (06-30 ~ 07-02)
- 八一建军节 (07-31 ~ 08-02)
- 抗日战争胜利纪念日 (09-03)
- 9·18纪念日 (09-18)
- 烈士纪念日 (09-30)
- 国庆节 (10-01 ~ 10-07)
- 国家公祭日 (12-13)

### 农历节日
- 春节 (01-21 ~ 02-20)
- 元宵节 (02-10 ~ 02-20)
- 端午节 (05-28 ~ 06-05)
- 中秋节 (09-07 ~ 09-17)

## API 文档

### 工具函数 (utils/util.ts)

| 函数 | 说明 | 示例 |
|------|------|------|
| `formatDate` | 格式化日期 | `formatDate(date, 'YYYY-MM-DD')` |
| `formatTime` | 格式化时间 | `formatTime(date)` |
| `formatPrice` | 格式化价格 | `formatPrice(123.456)` |
| `isEmpty` | 判断是否为空 | `isEmpty(value)` |
| `debounce` | 防抖函数 | `debounce(fn, 300)` |
| `throttle` | 节流函数 | `throttle(fn, 300)` |
| `deepClone` | 深拷贝 | `deepClone(obj)` |
| `getValue` | 获取嵌套属性 | `getValue(obj, 'a.b.c')` |
| `setValue` | 设置嵌套属性 | `setValue(obj, 'a.b.c', value)` |
| `unique` | 数组去重 | `unique(arr)` |
| `isPhone` | 验证手机号 | `isPhone('13800138000')` |
| `isEmail` | 验证邮箱 | `isEmail('test@example.com')` |
| `isIdCard` | 验证身份证 | `isIdCard('110101199001011234')` |

### Hooks (hooks/)

#### useTheme
```typescript
const { state, unsubscribe } = useTheme(pageInstance);
```

#### useLoading
```typescript
const { showLoading, hideLoading, setLoading } = useLoading(pageInstance);
```

#### useForm
```typescript
const { formData, setFieldValue, validateField, validateForm, resetForm, getFormData } = useForm<T>(fields, rules);
```

#### useStorage
```typescript
const { get, set, remove, clear } = useStorage();
```

### API 请求 (api/request.ts)

| 方法 | 说明 |
|------|------|
| `get<T>(url, data?, options?)` | GET 请求 |
| `post<T>(url, data?, options?)` | POST 请求 |
| `put<T>(url, data?, options?)` | PUT 请求 |
| `del<T>(url, data?, options?)` | DELETE 请求 |

## 注意事项

### TypeScript 编译
- 删除 `.js` 文件后，微信开发者工具会自动重新编译
- 确保 `tsconfig.json` 配置正确
- 建议使用 `npx tsc -p tsconfig.json` 手动编译检查

### 模块导入
- 使用 `./utils/index` 而非 `./utils`
- 使用 `./constants/index` 而非 `./constants`
- 确保 TypeScript 编译输出到正确目录

### 主题持久化
- 主题状态默认存储在本地存储
- 首次加载时会根据当前日期自动应用节日主题
- 手动切换主题后会自动保存

### 性能优化
- 使用防抖处理高频事件（搜索、输入）
- 及时取消主题订阅防止内存泄漏
- 合理使用 `setData` 避免频繁更新

## 开发指南

### 添加新的工具函数

在 `utils/util.ts` 中添加新函数：

```typescript
/**
 * 函数说明
 * @param paramName - 参数说明
 * @returns 返回值说明
 */
export function newFunction(paramName: string): string {
  // 实现代码
}
```

### 添加新的 API 接口

在 `api/modules/` 目录添加新的模块文件：

```typescript
import { get, post } from '../request';

export const newApi = {
  list: (params: any) => get('/api/new', params),
  create: (data: any) => post('/api/new', data),
};
```

### 添加新的节日主题

在 `utils/holiday.ts` 中添加：

```typescript
{
  name: '节日名称',
  className: 'page-holiday-key',
  startDate: 'MM-DD',
  endDate: 'MM-DD',
}
```

### 添加新的样式类

在 `styles/` 目录的相应文件中添加，使用 SCSS 变量保持一致性。

## 技术栈

- **语言**：TypeScript 4.x+
- **样式**：SCSS
- **框架**：微信小程序
- **包管理**：npm

## License

MIT License

## 作者

[kingbugs](https://github.com/kingbugs)

## 贡献

欢迎提交 Issue 和 Pull Request！
