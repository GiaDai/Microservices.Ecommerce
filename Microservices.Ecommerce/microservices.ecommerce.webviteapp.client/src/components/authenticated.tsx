import { useIsAuthenticated, useGo } from "@refinedev/core";

export const AuthenticatedPage: React.FC<AuthenticatedProps> = ({
  children,
  fallback,
  loading,
}) => {
  const { isLoading, data } = useIsAuthenticated();

  const go = useGo();

  if (isLoading) {
    return <>{loading}</> || null;
  }

  if (data && data.error) {
    if (!fallback) {
      go({ to: "/login", type: "replace" });
      return null;
    }

    return <>{fallback}</>;
  }

  if (data && data.authenticated) {
    return <>{children}</>;
  }

  return null;
};

type AuthenticatedProps = {
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  children: React.ReactNode;
};
