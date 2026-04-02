const orderRepo = window.orderRepo;

window.orderController = {
    getAllOrder : () => {
        return orderRepo.getAll()
    },
    
    getAllBill : () => {
        const AllOrder = orderRepo.getAll();

        const BillList = [];

        AllOrder.forEach(b => {

            if (b.userId === 'admin')
                return;

            for (var bill of b.bills) {
                BillList.push({
                    userId : b.userId,
                    bill : bill
                })
            }
        })

        return BillList;
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
            status : 'ordered',
            date : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        }

        const newUserBill = {
            ...oldUserBill,
            bills : [...oldUserBill.bills, newOrder]
        }

        orderRepo.update(userId, newUserBill);
    },
    
    confirmDelivery : ({userId, orderId}) => {
        const userBills = orderRepo.getOne(userId) || {
            userId,
            bills : []
        };

        if (userBills.bills.length === 0)
            return {
                isOk : false,
                message : 'Lỗi khi xác nhận đơn hàng!'
            }

        const newBills = userBills.bills.map(bill => {
            if (bill.orderId === orderId)
                return {
                ...bill,
                status : 'isPending'
                }
            return bill;
        })

        const newUserBills = {
            ...userBills,
            bills : newBills
        };

        orderRepo.update(userId, newUserBills);

        return {
            isOk : true,
            message : `Đã xác nhận đơn hàng ${orderId}`
        }
    },
    
    cancelOrderedBill : (userId, orderId) => {
        const userBills = orderRepo.getOne(userId) || {
            userId,
            bills : []
        };

        if (userBills.bills.length === 0)
            return {
                isOk : false,
                message : 'Lỗi khi hủy đơn hàng!'
            }

        const newBills = userBills.bills.map(bill => {
            if (bill.orderId === orderId)
                return {
                ...bill,
                status : 'cancel'
                }
            return bill;
        })

        const newUserBills = {
            ...userBills,
            bills : newBills
        };

        orderRepo.update(userId, newUserBills);

        return {
            isOk : true,
            message : `Đã xác hủy đơn hàng ${orderId}`
        }
    },
    getUserOrderList : (userId) => {
        return orderRepo.getOne(userId);
    }
}