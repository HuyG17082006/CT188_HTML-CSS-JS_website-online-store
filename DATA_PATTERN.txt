model
    user {
        id : char(8) 
        username : string - maxlength 20 - unique
        password : string - maxlength 20 - no hashing
        email : string - maxlength 40 - unique
        address : string - maxlength 100 
        number_phone : string - maxlength 11
        gender : male - female - another
    }

    product {
        id : char(8)
        type : laptop - monitor - card
        name : string - maxlength 20
        brand : string - maxlength 20
        image_src : ../assest/(src)
        price : int
    }

    cart {
        userId : char(8)
        items : [
            {
                productId : char(8)
                amount : int
            }
        ]
    }