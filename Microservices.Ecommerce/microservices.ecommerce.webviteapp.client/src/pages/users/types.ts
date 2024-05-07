export interface User {
  FirstName: string;
  LastName: string;
  RefreshTokens: any;
  Id: string;
  UserName: string;
  NormalizedUserName: string;
  Email: string;
  NormalizedEmail: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  SecurityStamp: string;
  ConcurrencyStamp: string;
  PhoneNumber: any;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEnd: any;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
}

export interface IUserMe {
  uid: string;
  name?: string;
  fullname?: string;
  avatarUrl?: string;
}
