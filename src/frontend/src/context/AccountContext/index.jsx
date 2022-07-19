import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import accountService from "services/account";
import cartService from "services/cart";
import storageService from "services/storage";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(storageService.getAccessToken());
  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState({});
  const [cart, setCart] = useState({});

  useEffect(() => {
    setIsLogin(storageService.getAccessToken());
  }, []);

  useEffect(() => {
    fetchCart();
    fetchAccount();
  }, [isLogin]); //eslint-disable-line

  const fetchAccount = async () => {
    if (!isLogin) return;

    try {
      const response = await accountService.getInformation();
      const { exitcode, account } = response.data;
      console.log(account);
      if (exitcode === 0) {
        setAccount(account);
        setIsAdmin(account.role === "admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCart = async () => {
    if (!isLogin) return;

    const response = await cartService.getCart();
    const { cart } = response.data;
    setCart(cart);
  };

  const login = (token) => {
    storageService.setAccessToken(token);
    setIsLogin(true);
  };

  const logout = () => {
    storageService.removeAccessToken();
    setIsLogin(false);
  };

  return (
    <AccountContext.Provider
      value={{
        isLogin,
        isAdmin,
        cart,
        account,
        fetchAccount,
        fetchCart,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
