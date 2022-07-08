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
                'shipping_address.receiver_phone',
                'shipping_address.receiver_name'
            )
        return result || null;
    },

    async getShippingAddressById(shippingAddressId) {
        const result = await db('shipping_address')
            .join('province', 'shipping_address.province_id', 'province.id')
            .join('district', 'shipping_address.district_id', 'district.id')
            .join('ward', 'shipping_address.ward_id', 'ward.id')
            .where({
                id: shippingAddressId
            }).select(
                'province.province_name',
                'district.district_name',
                'ward.ward_name',
                'shipping_address.id',
                'shipping_address.address',
                'shipping_address.receiver_phone',
                'shipping_address.receiver_name'
            )
        return result[0] || null;
    },

    async createShippingAddress(email, entity) {
        const {
            provinceName,
            districtName,
            wardName,
            address,
            receiverPhone,
            receiverName
        } = entity

        const province = await db('province').select('id').where({
            province_name: provinceName
        })
        const provinceId = province[0].id;

        const district = await db('district').select('id').where({
            province_id: provinceId,
            district_name: districtName
        })
        const districtId = district[0].id;

        const ward = await db('ward').select('id').where({
            district_id: districtId,
            ward_name: wardName
        })
        const wardId = ward[0].id

        const shippingAddressId = await db('shipping_address').insert({
            email: email,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
            address: address,
            receiver_phone: receiverPhone,
            receiver_name: receiverName
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