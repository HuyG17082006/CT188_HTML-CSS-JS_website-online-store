const cartMongoDb = window.mongoDb;

window.cartRepo = {
    get (userId) {
        return cartMongoDb.findOne('cart', 'userId', userId) 
        || 
        {
            userId : userId,
            items : []
        };
    },

    insert (userId, productId, quantity = 1) {     
        const cart = this.get(userId);

        const item = cart.items.find(item => item.productId === productId);

        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity })
        }

        cartMongoDb.replaceOne('cart', 'userId', userId, cart);
        return true;
    },

    removeOne (userId, productId) {     
        const cart = this.get(userId);

        const item = cart.items.find(item => item.productId === productId);

        if (!item) 
            return false;

        item.quantity--;

        if (item.quantity === 0) {
            this.remove(userId, productId);
            return true;
        }

        cartMongoDb.replaceOne('cart', 'userId', userId, cart);
        return true;
    },

    remove (userId, productId) {
        const cart = this.get(userId);

        const newCart = {
            ...cart,
            items : cart.items.filter(item => item.productId !== productId)
        }

        cartMongoDb.replaceOne('cart', 'userId', userId, newCart);
    }
}