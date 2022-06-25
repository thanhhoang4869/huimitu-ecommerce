import category from '#src/controller/category.controller'
import express from 'express'

const router = express.Router();
router.get('/', category.get);

export default router;