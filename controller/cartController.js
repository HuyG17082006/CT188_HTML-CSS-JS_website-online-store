const cartRepo = window.cartRepo;
const productHelper = window.productRepo;
const me = window.me;

window.cartController = {
    getUserCart () {

        const user = me.get();
        if (!user)
            return false;

        const userId = user.id;

        return cartRepo.get(userId);
    },

    addToCart (productId) {

        const user = me.get();

        if (!user)
            return false;

        const userId = user.id;

        const existedProduct =  productHelper.findById(productId);

        if (!existedProduct)
            return false;

        cartRepo.insert(userId, productId);
        return true;
    },

    removeOneFromCart (productId) {
        const user = me.get();

        if (!user)
            return false;

        const userId = user.id;

        cartRepo.removeOne(userId, productId);
        return true;
    },

    removeFromCart (productId) {
        const user = me.get();

        if (!user)
            return false;

        const userId = user.id;

        cartRepo.remove(userId, productId);
        return true;
    }
}