import { get, ResponseData } from '../request';

export interface HolidayInfo {
  id: number;
  name: string;
  date: string;
  description: string;
}

export interface BannerInfo {
  id: number;
  image: string;
  link: string;
  title: string;
}

export interface ConfigInfo {
  key: string;
  value: string;
  description: string;
}

export async function getHolidayList(): Promise<ResponseData<HolidayInfo[]>> {
  return get('/api/common/holidays');
}

export async function getBannerList(): Promise<ResponseData<BannerInfo[]>> {
  return get('/api/common/banners');
}

export async function getConfigList(): Promise<ResponseData<ConfigInfo[]>> {
  return get('/api/common/configs');
}

export async function getConfigByKey(key: string): Promise<ResponseData<ConfigInfo>> {
  return get(`/api/common/config/${key}`);
}

export async function uploadFile(filePath: string): Promise<ResponseData<{ url: string }>> {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: '/api/common/upload',
      filePath,
      name: 'file',
      success: (res) => {
        try {
          resolve(JSON.parse(res.data));
        } catch {
          reject(new Error('上传失败'));
        }
      },
      fail: reject,
    });
  });
}