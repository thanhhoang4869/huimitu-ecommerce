import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import accountService from "services/account";
import cartService from "services/cart";
import shippingAddressService from "services/shippingAddress";
import storageService from "services/storage";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(storageService.getAccessToken());
  const [account, setAccount] = useState({});
  const [isAdmin, setIsAdmin] = useState(account?.role === "admin");
  const [cart, setCart] = useState({});
  const [shippingAddress, setShippingAddress] = useState([]);

  useEffect(() => {
    fetchCart();
    fetchAccount();
    fetchShippingAddress();
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

  const fetchShippingAddress = async () => {
    if (!isLogin) return;

    try {
      const response = await shippingAddressService.getListShippingAddress();
      const { exitcode, shippingAddresses } = response.data;
      if (exitcode === 0) {
        setShippingAddress(
          shippingAddresses.map((item) => ({
            key: item.id,
            ...item,
          }))
        );
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
    setAccount({});
    setCart({});
    setIsAdmin(false);
    setIsLogin(false);
  };

  return (
    <AccountContext.Provider
      value={{
        isLogin,
        isAdmin,
        cart,
        account,
        shippingAddress,
        fetchShippingAddress,
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
