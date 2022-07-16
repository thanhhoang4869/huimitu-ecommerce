import api from "utils/api";

const location = {
    async getListProvince() {
        const response = await api.get("/location/provinces");
        return response;
    },

    async getListDistrict(provinceId) {
        const requestBody = {
            provinceId: provinceId
        }
        const response = await api.post("/location/districts", requestBody);
        return response;
    },

    async getListWard(provinceId, districtId) {
        const requestBody = {
            provinceId: provinceId,
            districtId: districtId
        }
        const response = await api.post("/location/wards", requestBody);
        return response;
    },

    async getCoordinate(provinceId, districtId, wardId, address) {
        
    }
};

export default location;
