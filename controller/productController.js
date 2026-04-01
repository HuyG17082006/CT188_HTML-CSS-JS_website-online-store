const productRepo = window.productRepo;

window.productController = {
    getList: () => {
        return productRepo.getAll() || [];
    },

    getProduct: (id) => {
        return productRepo.findById(id);
    },

    updateProduct: (id) => {
        productRepo.updateById(id);
    },

    deleteProduct: (id) => {
        productRepo.deleteById(id);
    },

    insertProduct: (newProduct) => {
        productRepo.insert(newProduct)
    }
}