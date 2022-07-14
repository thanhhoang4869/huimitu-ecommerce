import location from '#src/controller/location.controller'
import express from 'express'

const router = express.Router();
router.get('/provinces', location.getProvinces)
router.post('/districts', location.getDistricts)
router.post('/wards', location.getWards)
router.post('/query', location.query)

export default router;