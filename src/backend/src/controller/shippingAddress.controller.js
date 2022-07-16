import shippingAddressModel from '#src/models/shippingAddress.model'

export default {
    async getShippingAddress(req, res, next) {
        try {
            const { email } = req.payload;

            const result = await shippingAddressModel.getShippingAddressByEmail(email);
            const shippingAddresses = result.map(item => ({
                id: item.id,
                provinceName: item.province_name,
                districtName: item.district_name,
                wardName: item.ward_name,
                address: item.address,
            }));
            res.status(200).send({
                exitcode: 0,
                message: "Get shipping address successfully",
                shippingAddresses: shippingAddresses
            })
        } catch (err) {
            next(err)
        }
    },

    async createShippingAddress(req, res, next) {
        try {
            const { email } = req.payload;
            const {
                provinceId,
                districtId,
                wardId,
                address,
            } = req.body;
            const entity = {
                provinceId: provinceId,
                districtId: districtId,
                wardId: wardId,
                address: address,
            }

            const shippingAddressId = await shippingAddressModel.createShippingAddress(email, entity);
            res.status(200).send({
                exitcode: 0,
                message: "Create shipping address successfully",
                shippingAddressId: shippingAddressId
            })
        } catch (err) {
            next(err)
        }
    },

    async deleteShippingAddress(req, res, next) {
        try {
            const { email } = req.payload;
            const { shippingAddressId } = req.params;

            const result = await shippingAddressModel.deleteShippingAddress(email, shippingAddressId);
            if (result > 0) {
                res.status(200).send({
                    exitcode: 0,
                    message: "Delete shipping address successfully",
                })
            } else {
                res.status(200).send({
                    exitcode: 101,
                    message: "Shipping address not found"
                })
            }
        } catch (err) {
            next(err)
        }
    }
}