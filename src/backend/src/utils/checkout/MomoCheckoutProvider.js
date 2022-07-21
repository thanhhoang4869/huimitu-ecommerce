import config from "#src/config/config"
import { createHmacString } from "#src/utils/crypto"
import axios from "axios"
import { generateOrderId } from '#src/utils/checkout/orderIdGenerator'

class MomoCheckoutProvider {
    /**
     * Create payment link for Momo
     * 
     * @example
     * const amount = 50000;
     * const userInfo = { 
     *  name: "Do Vuong Phuc", 
     *  phoneNumber: "0707953475", 
     *  email: "phuc16102001@gmail.com"
     * }
     * const [orderId, payUrl] = createLink(amount, userInfo)
     * 
     * @type {UserInfo} {
     *  @type {String} name
     *  @type {String} phoneNumber
     *  @type {String} email
     * }
     * 
     * @param {Long} amount The total amount user need to pay
     * @param {UserInfo} userInfo The user"s information
     * @param {String} extraData Extra data encoded using Base64 (optional)
     *
     * @return {[String, String]} The orderId and the URL to pay for the request
     */
    createLink = async (amount, userInfo, redirectUrl, extraData = "") => {
        const partnerCode = config.MOMO_PARTNER_CODE
        const accessKey = config.MOMO_ACCESS_KEY
        const secretKey = config.MOMO_SECRET_KEY

        const orderId = generateOrderId();
        const orderInfo = `Pay for order ID ${orderId} with Momo`
        const requestId = partnerCode + new Date().getTime();

        const ipnUrl = "https://6b6c-116-102-164-226.ap.ngrok.io/checkout/notifyMomo"
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
        const { payUrl } = response.data
        return [orderId, payUrl]
    }

    queryPayment = async (requestId, orderId) => {
        const partnerCode = config.MOMO_PARTNER_CODE;
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;
        const lang = 'en';

        const rawSignature = [
            `accessKey=${accessKey}`,
            `orderId=${orderId}`,
            `partnerCode=${partnerCode}`,
            `requestId=${requestId}`,
        ].join('&')
        const signature = createHmacString(rawSignature, secretKey)

        const requestBody = {
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            lang: lang,
            signature: signature
        }

        try {
            const response = await axios.post(
                "https://test-payment.momo.vn:443/v2/gateway/api/query",
                requestBody
            )

            const { data } = response;
            console.log(data)
        } catch (err) {
            console.error(err.response.data)
        }
    }

    verifyIpnSignature = (body) => {
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;
        const {
            partnerCode,
            orderId,
            requestId,
            amount,
            orderInfo,
            orderType,
            transId,
            resultCode,
            message,
            payType,
            responseTime,
            extraData,
            signature
        } = body;
        const rawSignature = [
            `accessKey=${accessKey}`,
            `amount=${amount}`,
            `extraData=${extraData}`,
            `message=${message}`,
            `orderId=${orderId}`,
            `orderInfo=${orderInfo}`,
            `orderType=${orderType}`,
            `partnerCode=${partnerCode}`,
            `payType=${payType}`,
            `requestId=${requestId}`,
            `responseTime=${responseTime}`,
            `resultCode=${resultCode}`,
            `transId=${transId}`
        ].join('&')
        const correctSignature = createHmacString(rawSignature, secretKey);
        console.log(rawSignature, correctSignature)
        return (correctSignature === signature);
    }

    capturePayment = async (requestId, orderId, amount) => {
        const partnerCode = config.MOMO_PARTNER_CODE;
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;
        const requestType = "capture";
        const description = "";
        const lang = 'en';

        const rawSignature = [
            `accessKey=${accessKey}`,
            `amount=${amount}`,
            `description=${description}`,
            `orderId=${orderId}`,
            `partnerCode=${partnerCode}`,
            `requestId=${requestId}`,
            `requestType=${requestType}`
        ].join('&')
        const signature = createHmacString(rawSignature, secretKey)

        const requestBody = {
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            requestType: requestType,
            amount: amount,
            lang: lang,
            description: description,
            signature: signature
        }

        try {
            const response = await axios.post(
                "https://test-payment.momo.vn:443/v2/gateway/api/confirm",
                requestBody
            )

            const { data } = response;
            console.log(data)
        } catch (err) {
            console.error(err.response.data)
        }
    }

    getCurrency = () => {
        return config.currency.VND;
    }
}

export default MomoCheckoutProvider;