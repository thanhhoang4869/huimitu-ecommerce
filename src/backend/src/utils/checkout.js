import config from "#src/config/config"
import { createHmacString, encryptBase64 } from "#src/utils/crypto"
import axios from "axios"

/**
 * Create payment link for Momo
 * 
 * @example
 * const orderInfo = "Pay with momo";
 * const amount = 50000;
 * const userInfo = { 
 *  name: "Do Vuong Phuc", 
 *  phoneNumber: "0707953475", 
 *  email: "phuc16102001@gmail.com"
 * }
 * const orderId = "MOMO-3025-896452-5748"
 * const payUrl = createMomoLink(orderId, orderInfo, amount, items, userInfo)
 * 
 * @type {UserInfo} {
 *  @type {String} name
 *  @type {String} phoneNumber
 *  @type {String} email
 * }
 * 
 * @param {String} orderId Id of the order (must be unique)
 * @param {String} orderInfo Information note of order
 * @param {Long} amount The total amount user need to pay
 * @param {UserInfo} userInfo The user"s information
 * @param {String} extraData Extra data encoded using Base64 (default is "")
 *
 * @return {string} The URL to pay for the request
 */
const createMomoLink = async (orderId, orderInfo, amount, userInfo, extraData = "") => {
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
    ].join("&")
    console.log(`Raw signature: ${rawSignature}`)

    const signature = createHmacString(rawSignature, secretKey)

    const requestBody = {
        accessKey: accessKey,
        amount: amount,
        extraData: extraData,
        ipnUrl: ipnUrl,
        orderId: orderId,
        orderInfo: orderInfo,
        partnerCode: partnerCode,
        redirectUrl: redirectUrl,
        requestId: requestId,
        requestType: requestType,
        userInfo: userInfo,
        signature: signature,
    }
    const response = await axios.post(
        "https://test-payment.momo.vn:443/v2/gateway/api/create",
        requestBody
    )
    return response.data.payUrl
}

/**
 * Create Paypal order link
 * 
 * @example
 * const orderInfo = "Pay with momo";
 * const amount = 50000;
 * const userInfo = {
 *  name: "Do Vuong Phuc",
 *  phoneNumber: "0707953475",
 *  email: "phuc16102001@gmail.com"
 * }
 * const [id, url] = await createPaypalLink(orderInfo, amount, userInfo);
 * 
 * @type {UserInfo} {
 *  @type {String} name
 *  @type {String} phoneNumber
 *  @type {String} email
 * }
 * 
 * @param {String} orderInfo The note of order
 * @param {Long} amount The total amount user need to pay
 * @param {UserInfo} userInfo The information of user
 * @returns {[String, String]} An array of 2 elements
 * Including the generated orderId of Paypal and the link to approve payment
 */
const createPaypalLink = async (orderInfo, amount, userInfo) => {
    const currencyCode = "USD";
    const intent = "CAPTURE";
    const description = orderInfo;

    const clientId = config.PAYPAL_CLIENT_ID;
    const secret = config.PAYPAL_SECRET
    const signature = encryptBase64([clientId, secret].join(":"))

    const payer = {
        email_address: userInfo.email,
        name: {
            name: userInfo.fullname
        },
        phone: {
            phone_number: {
                national_number: userInfo.phoneNumber
            }
        },
        description: description
    };
    const purchaseUnits = [{
        amount: {
            currency_code: currencyCode,
            value: amount,
        },
    }]

    const requestBody = {
        intent: intent,
        purchase_units: purchaseUnits,
        payer: payer,
    }
    const headerConfig = {
        headers: {
            "Authorization": `Basic ${signature}`,
            "Content-Type": "application/json"
        }
    }

    const response = await axios.post(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        requestBody,
        headerConfig
    )

    const { id, links } = response.data
    const [{ href }] = links.filter(item => (item.rel === "approve"))
    return [id, href]
}

export {
    createMomoLink,
    createPaypalLink
}