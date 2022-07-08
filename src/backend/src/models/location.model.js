import db from '#src/utils/db'

export default {
    async getProvinces() {
        const result = await db('province').select(
            'id',
            'province_name'
        );
        return result || null;
    },

    async getDistricts(provinceId) {
        const result = await db('district')
            .join('province', 'province.id', 'district.province_id')
            .where({
                province_id: provinceId
            }).select(
                'district.id',
                'district.district_name'
            );
        return result || null;
    },

    async getWards(provinceId, districtId) {
        const result = await db('ward')
            .join('district', 'district.id', 'ward.district_id')
            .join('province', 'province.id', 'district.province_id')
            .where({
                province_id: provinceId,
                district_id: districtId
            })
            .select(
                'ward.id',
                'ward.ward_name'
            );
        return result || null;
    },
}