export type IUser = {
  _id?: String;
  name: string;
  role: 'SUPER_ADMIN'| 'ADMIN' | 'USER' | 'COLLECTOR' | 'ARTIST' | 'CURATOR' |  'MESEUM' | 'EDUCATIONAL_INSTITUTE'
  phone?: string;
  email: string;
  password: string;
  profileImage?: string;
  address?: string;

  otherInfo?: string;
  about?: string;
  keyAchivements?: string;
  shippingAddress?: {
    name: String;
    phone: String;
    adddress: String;
    _id: false;
  };
  transaction?: string[];
  stripeAccountId?: string;
  verified: boolean;
  status: 'ACTIVE' |'INACTIVE',
  photo?: string;
  cover?: string;
  followers?: number;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
  // isOnline?: boolean;
  hasAccess?: boolean;
  isDelete?: boolean;
};


