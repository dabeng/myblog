import axios from 'axios';
import { createContext, useContext, useMemo, useReducer } from 'react';

// Define the possible actions for the authReducer
const ACTIONS = {
  setAuth: "setAuth",
  clearAuth: "clearAuth",
};

//【1】Reducer function to handle authentication state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.setAuth:
      // Set the authentication token in axios headers and local storage
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
      // localStorage.setItem("token", action.payload);

      // Update the state with the new token
      return action.payload;

    case ACTIONS.clearAuth:
      // Clear the authentication token from axios headers and local storage
      delete axios.defaults.headers.common.Authorization;
      // localStorage.removeItem("token");

      // Update the state by removing the token
      return {
        accessToken: "",
        refreshToken: "",
        id: "",
        name: "",
        username: "",
        email: "",
        roles: []
      };

    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      );
  }
};

// Initial state for the authentication context
const initialState = {
  "accessToken": "",
  "refreshToken": "",
  "id": "",
  "name": "",
  "username": "",
  "email": "",
  "roles": []
};

// Create the authentication context
const AuthContext = createContext(null);

//【2】AuthProvider component to provide the authentication context to children
const AuthProvider = ({ children }) => {
  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Function to set the authentication token
  const setAuth = (newAuth) => {
    // Dispatch the setToken action to update the state
    dispatch({ type: ACTIONS.setAuth, payload: newAuth });
  };

  // Function to clear the authentication token
  const clearAuth = () => {
    // Dispatch the clearToken action to update the state
    dispatch({ type: ACTIONS.clearAuth });
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      ...state,
      setAuth,
      clearAuth,
    }),
    [state]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//【3】Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;