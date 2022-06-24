import category from '#src/controller/category'

export default {
    assignRoutes(app) {
        app.get("/category", category.get);
    }
} 