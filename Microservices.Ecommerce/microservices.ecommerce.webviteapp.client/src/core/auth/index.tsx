import { create } from 'zustand';

import { createSelectors } from '@core/utils';
import type { TokenType } from '@core/auth/utils';
import { getToken, removeToken, setToken, getUser, removeUser, setUser, getEmail, removeEmail, setEmail, getPassword, removePassword, setPassword } from '@core/auth/utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType, user: string, email: string, password: string) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token,user, email, password) => {
    setToken(token);
    setUser(user);
    setEmail(email);
    setPassword(password);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    removeUser();
    removeEmail();
    removePassword();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const user = getUser();
      const email = getEmail();
      const password = getPassword();
      if (userToken !== null) {
        get().signIn(userToken, user, email, password);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType, user: string, email: string, password: string) => _useAuth.getState().signIn(token, user, email, password);
export const hydrateAuth = () => _useAuth.getState().hydrate();