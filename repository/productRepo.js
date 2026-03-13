const productMongoDb = window.mongoDb

window.productRepo = {
    getAll : () => {
        return productMongoDb.getCollection('products');
    },

    findById : (id) => {
        return productMongoDb.findOne('products', 'id', id);
    },

    updateById : (id, newProductData) => {
        productMongoDb.replaceOne('products', 'id', id, newProductData);
    },

    deleteById : (id) => {
        productMongoDb.deleteOne('products', 'id', id);
    },

    insert : (newProduct) => {
        productMongoDb.insertOne('products', newProduct);
    }
}