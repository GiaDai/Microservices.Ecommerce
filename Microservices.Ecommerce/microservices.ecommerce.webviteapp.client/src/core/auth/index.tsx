import { create } from 'zustand';
import Cookies from 'js-cookie';
import { createSelectors } from '@core/utils';
import type { TokenType } from '@core/auth/utils';
import { jwtDecode } from 'jwt-decode';
import { getToken, removeToken, setToken, getUser, removeUser, setUser, getEmail, removeEmail, setEmail } from '@core/auth/utils';
import { AuthenData } from '@api/accounts';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType, user: string, email: string) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token, user, email) => {
    setToken(token);
    setUser(user);
    setEmail(email);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    removeUser();
    removeEmail();
    Cookies.remove('jwtToken');
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {

    const token = Cookies.get('jwtToken');
    try {
      if (token !== undefined && token !== null) {
        const { userName, email } = (jwtDecode(token)) as AuthenData;
        console.log(userName, email);
        get().signIn({ access: token, refresh: token }, userName, email);
      } else {
        const userToken = getToken();
        const user = getUser();
        const email = getEmail();
        if (userToken !== null) {
          get().signIn(userToken, user, email);
        } else {
          get().signOut();
        }
      }
    } catch (e) {
      console.error(e);
      get().signOut();
    }

  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType, user: string, email: string) => _useAuth.getState().signIn(token, user, email);
export const hydrateAuth = () => _useAuth.getState().hydrate();
export const handleBeforeUnload = () => {
  window.addEventListener('unload', handleBeforeBrowserClose);
};

export const destroyBeforeUnload = () => {
  window.removeEventListener('unload', handleBeforeBrowserClose);
};

const handleBeforeBrowserClose = () => {
  // Kiểm tra nếu event.returnValue là null hoặc undefined, nghĩa là trình duyệt đang đóng
  removeToken();
  removeUser();
  removeEmail();
};