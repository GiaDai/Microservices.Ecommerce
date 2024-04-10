import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useAuth } from '@core/auth';

// This is a simple check for authentication. You might have a more complex logic.
const isAuthenticated = () => {
  // const token = useAuth.use.token();
  const tokenCookie = Cookies.get('jwtToken');
  const tokenStorage = localStorage.getItem('token');
  const token = tokenCookie || tokenStorage;
  return token != null;
};

const PrivateRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRouteWrapper;