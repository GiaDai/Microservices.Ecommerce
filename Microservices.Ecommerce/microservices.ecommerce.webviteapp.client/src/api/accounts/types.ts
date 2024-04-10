export type AuthenResponse = {
    succeeded: boolean;
    message: string;
    errors?: any;
    data: AuthenData;
  }
  interface AuthenData {
    id: string;
    userName: string;
    email: string;
    roles: string[];
    isVerified: boolean;
    jwToken: string;
  }

  export type AuthenRequest = {
    email: string;
    password: string;
  }

  export type AuthenResponseError = {
    Succeeded: boolean;
    Message: string;
    Errors?: any;
    Data?: any;
  }