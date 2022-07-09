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
    createLink = async (amount, userInfo, extraData = "") => {
        const partnerCode = config.MOMO_PARTNER_CODE
        const accessKey = config.MOMO_ACCESS_KEY
        const secretKey = config.MOMO_SECRET_KEY

        const orderId = generateOrderId();
        const orderInfo = `Pay for order ID ${orderId} with Momo`
        const requestId = partnerCode + new Date().getTime();

        const redirectUrl = "https://www.facebook.com/phuc16102001"
        const ipnUrl = "https://9ceb-2402-800-631c-2e16-e1fa-a09b-38bf-7af9.ap.ngrok.io/checkout/successMomo"
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
}

export default MomoCheckoutProvider;