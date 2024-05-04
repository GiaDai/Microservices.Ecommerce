import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();
  const handleClick = () => {
    mutate();
  };

  type Identity = {
    name?: string;
  };

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{(identity as Identity)?.name ?? ""}</span>
      </h2>
      <button type="button" disabled={isLoading} onClick={handleClick}>
        Logout
      </button>
    </>
  );
};
