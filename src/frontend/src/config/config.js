const config = {
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    SERVER_PATH: process.env.REACT_APP_SERVER_PATH,
    storageKeys: {
        ACCESS_KEY: 'token',
        ACCOUNT_KEY: 'account'
    },
    payment: {
        PAYPAL: 'paypal',
        MOMO: 'momo',
        COD: 'cod',
    },
    orderState: {
      INIT: 'init',
      PENDING: 'pending',
      SHIPPING: 'shipping',
      CANCEL: 'cancel',
      SUCCESS: 'success',
    },
}
export default config