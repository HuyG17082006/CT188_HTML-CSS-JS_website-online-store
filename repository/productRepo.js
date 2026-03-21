const productDatabase = window.database

window.productRepo = {
    getAll : () => {
        return productDatabase.getCollection('products');
    },

    findById : (id) => {
        return productDatabase.findOne('products', 'id', id);
    },

    updateById : (id, newProductData) => {
        productDatabase.replaceOne('products', 'id', id, newProductData);
    },

    deleteById : (id) => {
        productDatabase.deleteOne('products', 'id', id);
    },

    insert : (newProduct) => {
        productDatabase.insertOne('products', newProduct);
    }
}