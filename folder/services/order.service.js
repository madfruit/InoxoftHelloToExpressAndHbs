const { Order } = require('../database');

module.exports = {
    addOrder: async (book_id, user_id, amount) => {
        await Order.create({ book_id, user_id, amount });
    },

    getUserOrderHistory: async (user_id) => {
        const orders = await Order.find({ user_id });
        return orders;
    }
};
