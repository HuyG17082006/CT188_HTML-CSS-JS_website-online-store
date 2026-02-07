const orderMongoDb = window.mongoDb;

window.orderRepo = {
    getAll () {
        return orderMongoDb.getCollection('orders');
    },

    getOne (userId) {
        return orderMongoDb.findOne('orders', 'userId', userId);
    },

    insert (userOrder) {
        orderMongoDb.insertOne('orders', userOrder);
    },

    remove (userId) {
        orderMongoDb.deleteOne('orders', 'userId', userId);
    },

    update (userId, newUserBill) {
        orderMongoDb.replaceOne('orders', 'userId', userId, newUserBill)
    }
}