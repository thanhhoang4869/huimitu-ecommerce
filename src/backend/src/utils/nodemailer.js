import config from '#src/config/config'
import nodemailer from 'nodemailer'
import oauthClient from '#src/utils/oauth2'

const accessToken = oauthClient.getAccessToken()

const createTransport = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.GMAIL_USERNAME,
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            refreshToken: config.GOOGLE_REFRESH_TOKEN,
            accessToken: accessToken.token
        },
    })
}

const getVerifyEmail = (toEmail, url, verifyToken) => {
    return ({
        from: config.GMAIL_USERNAME,
        to: toEmail,
        subject: "[Huimitu] Email verification",
        html: `
        <div style="
            text-align: center; 
            height: 256px;
            width: 512px;
            background-color: hsl(125, 29%, 75%); 
            padding: 2em; 
            justify-content: center;"
        >
            <h1>Huimitu Shop</h1>
            <h3>Thank you for registering</h3>
            <div>
                <a href="${url}/verify/${verifyToken}">
                    <button style="
                        font-weight: bold; 
                        padding: 2em; 
                        background-color: #18aeac; 
                        color: #fff; 
                        width: 512px; 
                        border: none;"
                    >
                        Click here to activate your account
                    </button>
                </a>
            </div>
            <div>Sent at ${(new Date()).toUTCString()}</div>
        </div>`
    })
}


const getOrderEmail = (toEmail, orderId, variants, basicInfo) => {
    return ({
        from: config.GMAIL_USERNAME,
        to: toEmail,
        subject: "[Huimitu] Placing order",
        html: `
        <div style="
            text-align: center; 
            width: 512px;
            background-color: hsl(125, 29%, 75%); 
            padding: 2em; 
            justify-content: center;"
        >
            <h1>Huimitu Shop</h1>
            <h3>Thank you for placing order</h3>
            <div style="text-align: left; margin-bottom: 5px; width: full;">
                <div>Your order has been placed with the following information:</div>
                <div><b>Order ID:</b> ${orderId}</div>
                <div><b>Receiver name:</b> ${basicInfo.receiverName}</div>
                <div><b>Receiver phone:</b> ${basicInfo.receiverPhone}</div>
                <div><b>Invoice:</b></div>
                <table style="border: 1px solid black">
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    ${variants.map(item => `
                    <tr>
                        <td>${item.variantName}</td>
                        <td>${item.quantity}</td>
                        <td>${item.quantity * (item.discountPrice || item.price)}</td>
                    </tr>
                    `).join('')}
                </table>
                <div><b>Discount: </b>${basicInfo.discountPrice}</div>
                <div><b>Total: </b>${basicInfo.totalPrice}</div>
            </div>
            <div>Sent at ${(new Date()).toUTCString()}</div>
        </div>`
    })
}

export {
    createTransport,
    getVerifyEmail,
    getOrderEmail
}