const mongoDb = window.mongoDb;
const productRepo = window.productRepo

window.cartRepo = {
    get (userId) {
        return mongoDb.findOne('cart', 'userId', userId) 
        || 
        {
            userId : userId,
            items : []
        };
    },



    add (userId, productId, quantity = 1) {
        const existedProduct = productRepo.findById(productId);

        if (!existedProduct)
            return false;
        
        const cart = this.get(userId);

        //Tìm xem hàng có lưu vào giỏ chưa, nếu đã lưu thì + số lượng lên
        const item = cart.items.find(item => item.productId === productId);

        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity })
        }

        mongoDb.replaceOne('cart', 'userId', userId, cart);
        return true;
    },

    remove (userId, productId) {
        const cart = this.get(userId);

        const newCart = {
            ...cart,
            items : cart.items.filter(item => item.productId !== productId)
        }

        mongoDb.replaceOne('cart', 'userId', userId, newCart);
    }
}