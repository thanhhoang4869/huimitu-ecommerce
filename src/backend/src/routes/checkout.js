import checkout from '#src/controller/checkout'

export default {
    assignRoutes(app) {
        app.post("/create-payment", checkout.create_payment);
        app.post("/execute-payment", checkout.execute_payment);
    }
} 