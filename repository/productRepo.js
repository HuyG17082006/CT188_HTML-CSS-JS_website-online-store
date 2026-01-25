const mongoDb = window.mongoDb

window.productRepo = {
    getAll : () => {
        return mongoDb.getCollection('products');
    },

    findById : (id) => {
        return mongoDb.findOne('products', 'id', id);
    }
}