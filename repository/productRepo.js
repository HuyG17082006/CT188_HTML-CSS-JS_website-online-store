const productMongoDb = window.mongoDb

window.productRepo = {
    getAll : () => {
        return productMongoDb.getCollection('products');
    },

    findById : (id) => {
        return productMongoDb.findOne('products', 'id', id);
    }
}