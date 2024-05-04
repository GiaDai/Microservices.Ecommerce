import { AuthProvider } from "@refinedev/core";

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
      return null;
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

    const data = await response.json();
    if (data.data.jwToken) {
      localStorage.setItem("access_token", data.data.jwToken);
      return {
        success: true,
        redirectTo: "/dashboard",
      };
    }

    return {
      success: false,
    };
  },
  logout: async () => {
    localStorage.removeItem("access_token");
    // We're returning success: true to indicate that the logout operation was successful.
    return { success: true };
  },
  onError: async () => {
    throw new Error("Not implemented");
  },
  // ...
};
