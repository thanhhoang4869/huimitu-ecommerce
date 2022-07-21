import { generateOrderId } from '#src/utils/checkout/orderIdGenerator'
import config from '#src/config/config'

class ShipCodCheckoutProvider {
    /**
     * Create payment link for Ship COD
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
     *
     * @return {[String, String]} The orderId and the URL to pay for the request
     */
    createLink = async (amount, userInfo, redirectUrl) => {
        const orderId = generateOrderId();
        const url = null;
        return [orderId, url]
    }

    getCurrency = () => {
        return config.currency.VND
    }
}

export default ShipCodCheckoutProvider;