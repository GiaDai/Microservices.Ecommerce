import { getItem, removeItem, setItem } from '@core/storage';

const TOKEN = 'token';
const USER = 'user';
const EMAIL = 'email';
const PASSWORD = 'password';

export type TokenType = {
  access: string;
  refresh: string;
};

export type UserType = string;
export type EmailType = string;
export type PasswordType = string;

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getUser = () => getItem<UserType>(USER);
export const removeUser = () => removeItem(USER);
export const setUser = (value: UserType) => setItem<UserType>(USER, value);

export const getEmail = () => getItem<EmailType>(EMAIL);
export const removeEmail = () => removeItem(EMAIL);
export const setEmail = (value: EmailType) => setItem<EmailType>(EMAIL, value);

export const getPassword = () => getItem<PasswordType>(PASSWORD);
export const removePassword = () => removeItem(PASSWORD);
export const setPassword = (value: PasswordType) => setItem<PasswordType>(PASSWORD, value);