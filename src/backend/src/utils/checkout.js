import config from '#src/config/config'
import { createHmacString } from "#src/utils/crypto"
import axios from 'axios'

/**
 * Create payment link for Momo
 * 
 * @example
 * const orderInfo = "Pay with momo";
 * const amount = 50000;
 * const items = [
 *  { id: 1, name: "Product 01", price: 1000, quantity: 10, totalPrice: 10000 },
 *  { id: 2, name: "Product 02", price: 5000, quantity: 8, totalPrice: 40000 }
 * ]
 * const userInfo = { 
 *  name: "Do Vuong Phuc", 
 *  phoneNumber: "0707953475", 
 *  email: "phuc16102001@gmail.com"
 * }
 * const orderId = "MOMO-3025-896452-5748"
 * const payUrl = createMomoLink(orderId, orderInfo, amount, items, userInfo)
 * 
 * @param {String} orderId Id of the order (must be unique)
 * @param {String} orderInfo Information note of order
 * @param {Long} amount The total amount user need to pay
 * @param {Item[]} items List of breakdown items (optional)
 * @param {UserInfo} userInfo The user's information
 * @param {String} extraData Extra data encoded using Base64 (default is "")
 *
 * @return {string} The URL to pay for the request
 */
const createMomoLink = async (orderId, orderInfo, amount, items, userInfo, extraData = "") => {
    const partnerCode = config.MOMO_PARTNER_CODE
    const accessKey = config.MOMO_ACCESS_KEY
    const secretKey = config.MOMO_SECRET_KEY

    const requestId = partnerCode + new Date().getTime();

    const redirectUrl = "https://www.facebook.com/phuc16102001"
    const ipnUrl = "localhost:8080/checkout/momoSuccess"
    const requestType = "captureWallet"

    const rawSignature = [
        `accessKey=${accessKey}`,
        `amount=${amount}`,
        `extraData=${extraData}`,
        `ipnUrl=${ipnUrl}`,
        `orderId=${orderId}`,
        `orderInfo=${orderInfo}`,
        `partnerCode=${partnerCode}`,
        `redirectUrl=${redirectUrl}`,
        `requestId=${requestId}`,
        `requestType=${requestType}`,
    ].join('&')
    console.log(`Raw signature: ${rawSignature}`)

    const signature = createHmacString(rawSignature, secretKey)

    const requestBody = {
        accessKey: accessKey,
        amount: amount,
        extraData: extraData,
        ipnUrl: ipnUrl,
        items: items,
        orderId: orderId,
        orderInfo: orderInfo,
        partnerCode: partnerCode,
        redirectUrl: redirectUrl,
        requestId: requestId,
        requestType: requestType,
        userInfo: userInfo,
        signature: signature,
    }
    try {
        const response = await axios.post(
            'https://test-payment.momo.vn:443/v2/gateway/api/create',
            requestBody
        )
        return response.data.payUrl
    } catch (err) {
        console.error(err.response.data)
        return null;
    }
}