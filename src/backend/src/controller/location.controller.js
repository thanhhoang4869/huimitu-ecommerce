import locationModel from '#src/models/location.model'

export default {
    async getProvinces(req, res) {
        try {
            const result = await locationModel.getProvinces();
            const provinces = result.map(item => item.province_name)
            res.status(200).send({
                exitcode: 0,
                message: "Get provinces successfully",
                provinces: provinces
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Request failed"
            })
        }
    },

    async getDistricts(req, res) {
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
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Request failed"
            })
        }
    },

    async getWards(req, res) {
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
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Request failed"
            })
        }
    }
} 