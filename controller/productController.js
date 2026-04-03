const productRepo = window.productRepo;

window.productController = {
    getList: () => {
        return productRepo.getAll() || [];
    },

    getProduct: (id) => {
        return productRepo.findById(id);
    },

    updateProduct: (id, newProduct) => {
        productRepo.updateById(id, newProduct);
    },

    deleteProduct: (id) => {
        productRepo.deleteById(id);
    },

    insertProduct: (newProduct) => {
        productRepo.insert(newProduct)
    },

    stopSelling : (id, product) => {
        const newProduct = {
            ...product,
            isDeleted : true
        }

        productRepo.updateById(id, newProduct);
    },

    sellAgain : (id, product) => {
        const newProduct = {
            ...product,
            isDeleted : false
        }
        productRepo.updateById(id, newProduct);
    }
}