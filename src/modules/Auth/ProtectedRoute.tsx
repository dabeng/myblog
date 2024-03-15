import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// The ProtectedRoute component will serve as a wrapper for our authenticated routes
const ProtectedRoute = ({children}) => {
  const { token } = useAuth();
  const location = useLocation();
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    //return <Navigate to="/login" />;
        // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, render the child routes
  return children;
};


export default ProtectedRoute;