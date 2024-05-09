export interface IUser {
  RoleId: string;
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

export interface ICreateUser {
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  PhoneNumber: any;
  Password: string;
  ConfirmPassword: string;
}
