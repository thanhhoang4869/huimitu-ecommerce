const config = {
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    storageKeys: {
        ACCESS_KEY: 'token',
        ACCOUNT_KEY: 'account'
    },
    payment: {
        PAYPAL: 'paypal',
        MOMO: 'momo',
        COD: 'cod',
    }
}
export default config