export const LogoComponent: React.FC = () => {
  const logo = "../assets/react.svg";
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
  );
};
