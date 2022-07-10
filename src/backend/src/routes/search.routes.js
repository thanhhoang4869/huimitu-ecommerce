import search from '#src/controller/search.controller'
import express from 'express'

const router = express.Router();
router.post("/", search.getResult)

export default router;