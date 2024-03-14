import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// The ProtectedRoute component will serve as a wrapper for our authenticated routes
const ProtectedRoute = ({children}) => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return children;
};


export default ProtectedRoute;