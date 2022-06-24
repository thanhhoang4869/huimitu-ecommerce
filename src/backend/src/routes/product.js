import product from '#src/controller/product'

export default {
    assignRoutes(app) {
        app.get("/product/best-seller", product.getBestSeller);
    }
} 