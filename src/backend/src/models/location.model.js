import db from '#src/utils/db'

export default {
    async getProvinces() {
        const result = await db('province').select('province_name');
        return result || null;
    },

    async getDistricts(provinceName) {
        const result = await db('district')
            .join('province', 'province.id', 'district.province_id')
            .where({
                province_name: provinceName
            }).select('district_name');
        return result || null;
    },

    async getWards(provinceName, districtName) {
        const result = await db('ward')
            .join('district', 'district.id', 'ward.district_id')
            .join('province', 'province.id', 'district.province_id')
            .where({
                province_name: provinceName,
                district_name: districtName
            })
            .select('ward_name');
        return result || null;
    },
}