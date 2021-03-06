import locationModel from '#src/models/location.model'
import config from '#src/config/config'
import openrouteservice from 'openrouteservice-js'
import * as map from '#src/utils/map'

export default {
    async getProvinces(req, res, next) {
        try {
            const result = await locationModel.getProvinces();
            const provinces = result.map(item => ({
                id: item.id,
                provinceName: item.province_name
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get provinces successfully",
                provinces: provinces
            })
        } catch (err) {
            next(err)
        }
    },

    async getDistricts(req, res, next) {
        try {
            const { provinceId } = req.body
            const result = await locationModel.getDistricts(provinceId);
            const districts = result.map(item => ({
                id: item.id,
                districtName: item.district_name
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get districts successfully",
                districts: districts
            })
        } catch (err) {
            next(err)
        }
    },

    async getWards(req, res, next) {
        try {
            const { provinceId, districtId } = req.body;
            const result = await locationModel.getWards(provinceId, districtId);
            const wards = result.map(item => ({
                id: item.id,
                wardName: item.ward_name
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get wards successfully",
                wards: wards
            })
        } catch (err) {
            next(err)
        }
    },

    async getCoordinate(req, res, next) {
        try {
            const {
                address,
                wardId,
                districtId,
                provinceId
            } = req.body;

            const province = await locationModel.getProvinceById(provinceId)
            const district = await locationModel.getDistrictById(districtId)
            const ward = await locationModel.getWardById(wardId)

            const coordinates = await map.getCoordinate(
                address,
                ward.ward_name,
                district.district_name,
                province.province_name
            );
            res.status(200).send({
                exitcode: 0,
                message: "Get long lat successfully",
                coordinates: coordinates
            });
        } catch (err) {
            next(err);
        }
    },
};
