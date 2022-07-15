import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import tokenService from "services/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    setIsLogin(tokenService.getAccessToken())
  }, []);

  const login = (token) => {
    tokenService.setAccessToken(token);
    setIsLogin(true);
  };

  const logout = () => {
    tokenService.removeAccessToken();
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
