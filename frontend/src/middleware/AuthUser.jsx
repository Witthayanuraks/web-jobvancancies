import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProfider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [username, setUsername] = useState(localStorage.getItem("username") || false);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const saveUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const removeToken = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        saveToken,
        saveUsername,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const AutUser = ({ children }) => {
  const { token, username } = useAuth();

  if (!(token && username)) return <Navigate to="/login" />;

  return children;
};

export const AuthUserLogin = ({ children }) => {
  const { token, username } = useAuth();
  if ((token, username)) return <Navigate to="/dasboard" />;
  return children;
};
