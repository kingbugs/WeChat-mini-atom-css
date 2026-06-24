export const ROUTES = {
  HOME: '/pages/home/index',
  INDEX: '/pages/index/index',
  SHOP: '/pages/shop/index',
  SERVICE: '/pages/service/index',
  MINE: '/pages/mine/index',
};

export const TAB_BAR_ROUTES = [
  ROUTES.HOME,
  ROUTES.SHOP,
  ROUTES.SERVICE,
  ROUTES.MINE,
];

export function isTabBarRoute(url: string): boolean {
  return TAB_BAR_ROUTES.includes(url);
}

function buildQueryString(params?: Record<string, any>): string {
  if (!params) return '';
  const pairs: string[] = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value !== null && value !== undefined) {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }
  }
  return pairs.length > 0 ? '?' + pairs.join('&') : '';
}

export function navigateTo(url: string, params?: Record<string, any>): void {
  const queryString = buildQueryString(params);
  const fullUrl = url + queryString;
  
  if (isTabBarRoute(url)) {
    wx.switchTab({ url: fullUrl });
  } else {
    wx.navigateTo({ url: fullUrl });
  }
}

export function redirectTo(url: string, params?: Record<string, any>): void {
  const queryString = buildQueryString(params);
  wx.redirectTo({ url: url + queryString });
}

export function reLaunch(url: string, params?: Record<string, any>): void {
  const queryString = buildQueryString(params);
  wx.reLaunch({ url: url + queryString });
}