window.loadProducts = () => {
    const products = [
        {
            id: 'laptop-1',
            name: 'Lenovo LOQ 15ARP9',
            brand: 'lenovo',
            image_src: '../assets/image/product/lenovo-loq-2025.jpg',
            price: '25.000.000đ'
        },
        {
            id: 'laptop-2',
            name: 'ASUS expertBook P1',
            brand: 'asus',
            image_src: '../assets/image/product/asus-expert-book.jpg',
            price: '15.490.000đ'
        },
        {
            id: 'laptop-3',
            name: 'Lenovo Lecoo Pro 14 2025',
            brand: 'lenovo',
            image_src: '../assets/image/product/lenovo-leco.jpg',
            price: '19.490.000đ'
        },
        {
            id: 'laptop-4',
            name: 'Acer Gaming Nitro V 15',
            brand: 'acer',
            image_src: '../assets/image/product/acer-nitro-v.jpg',
            price: '24.490.000đ'
        },
        {
            id: 'laptop-5',
            name: 'Lenovo Legion 5',
            brand: 'lenovo',
            image_src: '../assets/image/product/lenovo-legion-5.jpg',
            price: '36.990.000đ'
        },
        {
            id: 'laptop-6',
            name: 'HP Victus 16',
            brand: 'hp',
            image_src: '../assets/image/product/hp-victus-16.jpg',
            price: '23.000.000đ'
        },
        {
            id: 'laptop-7',
            name: 'Laptop Lenovo V15',
            brand: 'lenovo',
            image_src: '../assets/image/product/l7.jpg',
            price: '15.990.000đ',

        },
        {
            id: 'laptop-8',
            name: 'Laptop Lenovo IdeaPad Slim 3',
            brand: 'lenovo',
            image_src: '../assets/image/product/l8.jpg',
            price: '15.990.000đ',

        },
        {
            id: 'laptop-9',
            name: 'Laptop Lenovo Legion 5 15IRX10',
            brand: 'lenovo',
            image_src: '../assets/image/product/l9.jpg',
            price: '34.790.000đ',

        },
        {
            id: 'laptop-10',
            name: 'Laptop Lenovo Yoga Slim 7',
            brand: 'lenovo',
            image_src: '../assets/image/product/l10.jpg',
            price: '24.990.000đ',

        },
        {
            id: 'laptop-11',
            name: 'Laptop ASUS TUF Gaming F16',
            brand: 'asus',
            image_src: '../assets/image/product/l11.jpg',
            price: '21.390.000đ',

        },
        {
            id: 'laptop-12',
            name: 'Laptop ASUS Vivobook S 14 FLIP',
            brand: 'asus',
            image_src: '../assets/image/product/l12.jpg',
            price: '19.990.000đ',

        },
        {
            id: 'laptop-13',
            name: 'Laptop ASUS Gaming V16',
            brand: 'asus',
            image_src: '../assets/image/product/l13.jpg',
            price: '22.890.000đ',

        },
        {
            id: 'laptop-14',
            name: 'Laptop ASUS Gaming Vivobook 16X',
            brand: 'asus',
            image_src: '../assets/image/product/l14.jpg',
            price: '18.390.000đ',

        },
        {
            id: 'laptop-15',
            name: 'Laptop ASUS ROG Strix G16',
            brand: 'asus',
            image_src: '../assets/image/product/l15.jpg',
            price: '44.490.000đ',

        },
        {
            id: 'laptop-16',
            name: 'Laptop Gaming Acer Nitro V 15 ProPanel',
            brand: 'acer',
            image_src: '../assets/image/product/l16.jpg',
            price: '25.990.000đ',

        },
        {
            id: 'laptop-17',
            name: 'Laptop Acer Aspire Lite Gen 2',
            brand: 'acer',
            image_src: '../assets/image/product/l17.jpg',
            price: '11.490.000đ',

        },
        {
            id: 'laptop-18',
            name: 'Laptop Acer Gaming Predator Helios Neo 16',
            brand: 'acer',
            image_src: '../assets/image/product/l18.jpg',
            price: '56.990.000đ',

        },
        {
            id: 'laptop-19',
            name: 'Laptop Acer Swift 3',
            brand: 'acer',
            image_src: '../assets/image/product/l19.jpg',
            price: '13.500.000đ',

        },
        {
            id: 'laptop-20',
            name: 'Laptop HP 14',
            brand: 'hp',
            image_src: '../assets/image/product/l20.jpg',
            price: '15.490.000đ',

        },
        {
            id: 'laptop-21',
            name: 'Laptop HP Omnibook X Flip 14',
            brand: 'hp',
            image_src: '../assets/image/product/l21.jpg',
            price: '25.990.000đ',

        },
        {
            id: 'laptop-22',
            name: 'Laptop HP Pavilion 15',
            brand: 'hp',
            image_src: '../assets/image/product/l22.jpg',
            price: '17.490.000đ',

        },

    ]

    localStorage.setItem('products', JSON.stringify(products));
}