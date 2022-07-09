import orderIdGenerator from 'order-id'

/**
 * Generate mostly unique ID for order
 * @returns {String} The generate orderId
 */
const generateOrderId = () => {
    const generator = orderIdGenerator();
    return generator.generate();
}

export { 
    generateOrderId 
}