import locationModel from '#src/models/location.model'

export default {
    async getProvinces(req, res, next) {
        try {
            const result = await locationModel.getProvinces();
            const provinces = result.map(item => item.province_name)
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
            const { provinceName } = req.body
            const result = await locationModel.getDistricts(provinceName);
            const districts = result.map(item => item.district_name)
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
            const { provinceName, districtName } = req.body;
            const result = await locationModel.getWards(provinceName, districtName);
            const wards = result.map(item => item.ward_name)
            res.status(200).send({
                exitcode: 0,
                message: "Get districts successfully",
                wards: wards
            })
        } catch (err) {
            next(err)
        }
    }
} 