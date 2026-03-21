const orderDatabase = window.database;

window.orderRepo = {
    getAll () {
        return orderDatabase.getCollection('orders');
    },

    getOne (userId) {
        return orderDatabase.findOne('orders', 'userId', userId);
    },

    insert (userOrder) {
        orderDatabase.insertOne('orders', userOrder);
    },

    remove (userId) {
        orderDatabase.deleteOne('orders', 'userId', userId);
    },

    update (userId, newUserBill) {
        orderDatabase.replaceOne('orders', 'userId', userId, newUserBill)
    }
}