const productRepo = window.productRepo;

window.productController = {
    getList : () => {
        return productRepo.getAll() || [];
    },

    getProduct : (id) => {
        return productRepo.findById(id);
    }
}