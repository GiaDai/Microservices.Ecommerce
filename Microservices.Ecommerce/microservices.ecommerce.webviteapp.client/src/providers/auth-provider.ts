import { AuthProvider } from "@refinedev/core";
import { jwtDecode } from "jwt-decode";
import { JwtTokenDecoded } from "@authens/types";
interface ResponseRoot {
  Succeeded: boolean;
  Message: string;
  Errors: any;
  Data: any;
}
export const authProvider: AuthProvider = {
  check: async () => {
    // When logging in, we'll obtain an access token from our API and store it in the local storage.
    // Now let's check if the token exists in the local storage.
    // In the later steps, we'll be implementing the `login` and `logout` methods.
    const token = localStorage.getItem("access_token");

    return { authenticated: Boolean(token) };
  },
  getIdentity: async () => {
    const response = await fetch("/api/account/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
      },
    });

    if (response.status < 200 || response.status > 299) {
      localStorage.removeItem("access_token");
      // We're returning success: true to indicate that the logout operation was successful.
      return {
        success: true,
        successNotification: {
          message: "Login Successful",
          description: "You have been successfully logged in.",
        },
      };
    }

    const data = await response.json();

    return data;
  },
  login: async ({ email, password }) => {
    const response = await fetch("/api/account/authenticate", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as ResponseRoot;
    if (data.Succeeded) {
      if (data.Data.JWToken) {
        localStorage.setItem("access_token", data.Data.JWToken);
        return {
          success: true,
          successNotification: {
            message: "Login Successful",
            description: "You have been successfully logged in.",
          },
          redirectTo: "/dashboard",
        };
      }
    }

    return {
      success: false,
      error: {
        name: "Login Failed!",
        message: data.Message ?? "Invalid email or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("access_token");
    // We're returning success: true to indicate that the logout operation was successful.
    return { success: true };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return [];
    }

    const decoded: JwtTokenDecoded = jwtDecode(token);
    return decoded.roles ?? "";
  },
  // ...
};
