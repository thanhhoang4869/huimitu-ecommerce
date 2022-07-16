import locationModel from '#src/models/location.model'
import config from '#src/config/config'
import openrouteservice from 'openrouteservice-js'

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

    async query(req, res, next) {
        try {
            const { address, ward, district, province } = req.body;
            const Geocode = new openrouteservice.Geocode({
                api_key: config.OPENROUTESERVICE_API_KEY,
            });
            const result = await Geocode.geocode({
                text: `${address}, ${ward}, ${district}, ${province}`,
                boundary_country: "VN",
                size: 1,
            });
            const [long, lat] = result.features[0].geometry.coordinates;
            res.status(200).send({
                exitcode: 0,
                message: "Get long lat successfully",
                lon: long,
                lat: lat
            });
        } catch (err) {
            next(err);
        }
    },

    async getDistance(req, res, next) {
        try {
            const { srcLong, srcLat, destLong, destLat } = req.body;
            const Directions = new openrouteservice.Directions({
                api_key: config.OPENROUTESERVICE_API_KEY,
            });
            const result = await Directions.calculate({
                coordinates: [[srcLong, srcLat], [destLong, destLat]],
                profile: "driving-car"
            });
            const distance = result.routes[0].summary.distance;
            res.status(200).send({
                exitcode: 0,
                message: "Get distance successfully",
                distance: distance
            });
        } catch (err) {
            next(err);
        }
    },
};
