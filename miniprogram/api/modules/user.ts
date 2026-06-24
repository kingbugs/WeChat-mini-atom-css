import { get, post, put, ResponseData } from '../request';

export interface UserInfo {
  id: number;
  nickname: string;
  avatar: string;
  phone: string;
  email: string;
  createTime: string;
}

export interface LoginParams {
  phone: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: UserInfo;
}

export async function login(params: LoginParams): Promise<ResponseData<LoginResult>> {
  return post('/api/user/login', params);
}

export async function logout(): Promise<ResponseData<void>> {
  return post('/api/user/logout');
}

export async function getUserInfo(): Promise<ResponseData<UserInfo>> {
  return get('/api/user/info');
}

export async function updateUserInfo(data: Partial<UserInfo>): Promise<ResponseData<UserInfo>> {
  return put('/api/user/info', data);
}

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}): Promise<ResponseData<void>> {
  return post('/api/user/change-password', data);
}

export async function sendSmsCode(phone: string): Promise<ResponseData<void>> {
  return post('/api/user/sms-code', { phone });
}