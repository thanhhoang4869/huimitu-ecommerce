import config from "#src/config/config"
import { encryptBase64 } from "#src/utils/crypto"
import axios from "axios"

class PaypalCheckoutProvider {

    getAuthorizeHeader = () => {
        const clientId = config.PAYPAL_CLIENT_ID;
        const secret = config.PAYPAL_SECRET
        const signature = encryptBase64([clientId, secret].join(":"))

        const headers = {
            "Authorization": `Basic ${signature}`,
            "Content-Type": "application/json"
        }
        return headers
    }

    /**
     * Create Paypal order link
     * 
     * @example
     * const amount = 50000;
     * const userInfo = {
     *  name: "Do Vuong Phuc",
     *  phoneNumber: "0707953475",
     *  email: "phuc16102001@gmail.com"
     * }
     * const [id, url] = await createPaypalLink(amount, userInfo);
     * 
     * @type {UserInfo} {
     *  @type {String} name
     *  @type {String} phoneNumber
     *  @type {String} email
     * }
     * 
     * @param {Long} amount The total amount user need to pay
     * @param {UserInfo} userInfo The information of user
     * @returns {[String, String]} An array of 2 elements
     * Including the generated orderId of Paypal and the link to approve payment
     */
    createLink = async (amount, userInfo, redirectUrl) => {
        const currencyCode = "USD";
        const intent = "CAPTURE";
        const description = "Pay with paypal";

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
                value: amount
            },
        }]
        const applicationContext = {
            redirect_url: redirectUrl
        }

        const requestBody = {
            intent: intent,
            purchase_units: purchaseUnits,
            payer: payer,
            application_context: applicationContext
        }
        const headerConfig = {
            headers: this.getAuthorizeHeader()
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

    getDetail = async (orderId) => {
        const headerConfig = {
            headers: this.getAuthorizeHeader()
        }

        const response = await axios.get(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
            headerConfig
        )
        const { data } = response;
        return data;
    }

    capturePayment = async (orderId) => {
        const requestBody = {}
        const headerConfig = {
            headers: this.getAuthorizeHeader()
        }

        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            requestBody,
            headerConfig
        )
        const { data } = response;
        return data;
    }

    getCurrency = () => {
        return config.currency.USD;
    }
}

export default PaypalCheckoutProvider