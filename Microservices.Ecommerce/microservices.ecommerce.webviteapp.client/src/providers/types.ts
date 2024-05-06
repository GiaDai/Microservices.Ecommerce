export interface Roles {
  role: string;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  action: string[];
}
