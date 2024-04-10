import { Navigate } from 'react-router-dom';
// import { useAuth } from '@core/auth';

// This is a simple check for authentication. You might have a more complex logic.
const isAuthenticated = () => {
  // const token = useAuth.use.token();
  const token = localStorage.getItem('token');
  return token != null;
};

const PrivateRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRouteWrapper;