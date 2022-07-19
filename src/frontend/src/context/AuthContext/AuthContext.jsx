import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import cartService from "services/cart";
import tokenService from "services/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(tokenService.getAccessToken());
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState({});
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    setIsLogin(tokenService.getAccessToken());
  }, []);

  useEffect(() => {
    fetchCart();
  }, [isLogin]);

  const fetchCart = async () => {
    if (!isLogin) return;

    const response = await cartService.getCart();
    const { cart, variants } = response.data;
    setCart(cart);
    setVariants(variants);
  };

  const login = (token) => {
    tokenService.setAccessToken(token);
    setIsLogin(true);
  };

  const logout = () => {
    tokenService.removeAccessToken();
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isAdmin,
        cart,
        variants,
        fetchCart,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
