import search from '#src/controller/search.controller'
import express from 'express'

const router = express.Router();
router.post("/get", search.getProduct)
router.post("/count", search.countProduct)

export default router;