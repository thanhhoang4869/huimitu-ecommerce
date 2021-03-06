import db from '#src/utils/db'

export default {
    async getShippingAddressByEmail(email) {
        const result = await db('shipping_address')
            .join('province', 'shipping_address.province_id', 'province.id')
            .join('district', 'shipping_address.district_id', 'district.id')
            .join('ward', 'shipping_address.ward_id', 'ward.id')
            .where({
                email: email
            }).select(
                'province.province_name',
                'district.district_name',
                'ward.ward_name',
                'shipping_address.id',
                'shipping_address.address',
                "lat",
                "long"
            )
        return result || null;
    },

    async getShippingAddressById(shippingAddressId) {
        const result = await db('shipping_address')
            .join('province', 'shipping_address.province_id', 'province.id')
            .join('district', 'shipping_address.district_id', 'district.id')
            .join('ward', 'shipping_address.ward_id', 'ward.id')
            .where({
                'shipping_address.id': shippingAddressId
            }).select(
                'province.province_name',
                'district.district_name',
                'ward.ward_name',
                'shipping_address.id',
                'shipping_address.email',
                'shipping_address.address', 
                "lat",
                "long"

            )
        return result[0] || null;
    },

    async createShippingAddress(email, entity) {
        const {
            provinceId,
            districtId,
            wardId,
            address,
            lat,
            long
        } = entity
        const shippingAddressId = await db('shipping_address').insert({
            email: email,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
            address: address,
            lat: lat,
            long: long
        }).returning('shipping_address.id')

        return shippingAddressId[0].id || null;
    },

    async deleteShippingAddress(email, shippingAddressId) {
        const result = await db('shipping_address').where({
            email: email,
            id: shippingAddressId
        }).delete();
        return result;
    }
}