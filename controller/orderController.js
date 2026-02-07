const orderRepo = window.orderRepo;

window.orderController = {
    getOrderList : () => {
        return orderRepo.getAll();
    },
    
    acceptOrder : (userCart, orderId, userId, username, number_phone, address, email, totalPrice) => {
        const date = new Date();

        const oldUserBill = orderRepo.getOne(userId) || {
            userId,
            bills : []
        };
        
        const newOrder = {
            orderId : orderId,
            username : username,
            number_phone : number_phone,
            email : email,
            address : address,
            userCart : userCart,
            totalPrice : totalPrice,
            date : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        }

        const newUserBill = {
            ...oldUserBill,
            bills : [...oldUserBill.bills, newOrder]
        }

        orderRepo.update(userId, newUserBill);
    },

    getUserOrderList : (userId) => {
        return orderRepo.getOne(userId);
    }
}