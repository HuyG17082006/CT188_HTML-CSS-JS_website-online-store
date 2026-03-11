window.loadProducts = () => {
    const products = [
        {
            id: 'laptop-1',
            name: 'Lenovo LOQ 15ARP9',
            brand: 'lenovo',
            spec: 'Ryzen 7 • RTX 4060 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/lenovo-loq-2025.jpg',
            price: '25.000.000đ'
        },
        {
            id: 'laptop-2',
            name: 'ASUS expertBook P1',
            brand: 'asus',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/asus-expert-book.jpg',
            price: '15.490.000đ'
        },
        {
            id: 'laptop-3',
            name: 'Lenovo Lecoo Pro 14 2025',
            brand: 'lenovo',
            spec: 'Ryzen 5 • Radeon • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/lenovo-leco.jpg',
            price: '19.490.000đ'
        },
        {
            id: 'laptop-4',
            name: 'Acer Gaming Nitro V 15',
            brand: 'acer',
            spec: 'i7 • RTX 4050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/acer-nitro-v.jpg',
            price: '24.490.000đ'
        },
        {
            id: 'laptop-5',
            name: 'Lenovo Legion 5',
            brand: 'lenovo',
            spec: 'i7 • RTX 4060 • 16GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/lenovo-legion-5.jpg',
            price: '36.990.000đ'
        },
        {
            id: 'laptop-6',
            name: 'HP Victus 16',
            brand: 'hp',
            spec: 'i5 • RTX 3050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/hp-victus-16.jpg',
            price: '23.000.000đ'
        },
        {
            id: 'laptop-7',
            name: 'Lenovo V15',
            brand: 'lenovo',
            spec: 'i5 • Iris Xe • 8GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/l7.jpg',
            price: '15.990.000đ'
        },
        {
            id: 'laptop-8',
            name: 'Lenovo IdeaPad Slim 3',
            brand: 'lenovo',
            spec: 'Ryzen 5 • Radeon • 8GB • 512GB',
            type: 'study',
            image_src: '../assets/image/product/l8.jpg',
            price: '15.990.000đ'
        },
        {
            id: 'laptop-9',
            name: 'Lenovo Legion 5 15IRX10',
            brand: 'lenovo',
            spec: 'i7 • RTX 4060 • 16GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/l9.jpg',
            price: '34.790.000đ'
        },
        {
            id: 'laptop-10',
            name: 'Lenovo Yoga Slim 7',
            brand: 'lenovo',
            spec: 'i7 • Iris Xe • 16GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/l10.jpg',
            price: '24.990.000đ'
        },
        {
            id: 'laptop-11',
            name: 'ASUS TUF Gaming F16',
            brand: 'asus',
            spec: 'i7 • RTX 4050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/l11.jpg',
            price: '21.390.000đ'
        },
        {
            id: 'laptop-12',
            name: 'ASUS Vivobook S 14 FLIP',
            brand: 'asus',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/l12.jpg',
            price: '19.990.000đ'
        },
        {
            id: 'laptop-13',
            name: 'ASUS Gaming V16',
            brand: 'asus',
            spec: 'i7 • RTX 4050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/l13.jpg',
            price: '22.890.000đ'
        },
        {
            id: 'laptop-14',
            name: 'ASUS Gaming Vivobook 16X',
            brand: 'asus',
            spec: 'i5 • RTX 3050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/l14.jpg',
            price: '18.390.000đ'
        },
        {
            id: 'laptop-15',
            name: 'ASUS ROG Strix G16',
            brand: 'asus',
            spec: 'i9 • RTX 4070 • 32GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/l15.jpg',
            price: '44.490.000đ'
        },
        {
            id: 'laptop-16',
            name: 'Gaming Acer Nitro V 15 ProPanel',
            brand: 'acer',
            spec: 'i7 • RTX 4060 • 16GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/l16.jpg',
            price: '25.990.000đ'
        },
        {
            id: 'laptop-17',
            name: 'Acer Aspire Lite Gen 2',
            brand: 'acer',
            spec: 'i3 • UHD • 8GB • 256GB',
            type: 'study',
            image_src: '../assets/image/product/l17.jpg',
            price: '11.490.000đ'
        },
        {
            id: 'laptop-18',
            name: 'Acer Gaming Predator Helios Neo 16',
            brand: 'acer',
            spec: 'i9 • RTX 4080 • 32GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/l18.jpg',
            price: '56.990.000đ'
        },
        {
            id: 'laptop-19',
            name: 'Acer Swift 3',
            brand: 'acer',
            spec: 'Ryzen 5 • Radeon • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/l19.jpg',
            price: '13.500.000đ'
        },
        {
            id: 'laptop-20',
            name: 'HP Envy X360',
            brand: 'hp',
            spec: 'Ryzen 7 • Radeon • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/l20.jpg',
            price: '15.490.000đ'
        },
        {
            id: 'laptop-21',
            name: 'HP Omnibook X Flip 14',
            brand: 'hp',
            spec: 'Snapdragon X • Adreno • 16GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/l21.jpg',
            price: '25.990.000đ'
        },
        {
            id: 'laptop-22',
            name: 'HP Pavilion 15',
            brand: 'hp',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'study',
            image_src: '../assets/image/product/l22.jpg',
            price: '17.490.000đ'
        }, {
            id: 'a1',
            name: 'MSI Cyborg 15',
            brand: 'msi',
            spec: 'i7 • RTX 4050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/a1.jpg',
            price: '23.990.000đ'
        },
        {
            id: 'a2',
            name: 'MSI Katana 15',
            brand: 'msi',
            spec: 'i7 • RTX 4060 • 16GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/a2.jpg',
            price: '20.990.000đ'
        },
        {
            id: 'a3',
            name: 'MSI Sword 16',
            brand: 'msi',
            spec: 'i7 • RTX 4060 • 16GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/a3.jpg',
            price: '30.990.000đ'
        },
        {
            id: 'a4',
            name: 'MSI Gaming Thin 15',
            brand: 'msi',
            spec: 'i5 • RTX 4050 • 16GB • 512GB',
            type: 'gaming',
            image_src: '../assets/image/product/a4.jpg',
            price: '20.790.000đ'
        },
        {
            id: 'a5',
            name: 'MSI Modern 14',
            brand: 'msi',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a5.jpg',
            price: '14.290.000đ'
        },
        {
            id: 'a6',
            name: 'MSI Prestige 13',
            brand: 'msi',
            spec: 'Intel Ultra 7 • Intel Arc • 32GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/a6.jpg',
            price: '44.990.000đ'
        },
        {
            id: 'a7',
            name: 'MSI Venture 14',
            brand: 'msi',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a7.jpg',
            price: '19.990.000đ'
        },
        {
            id: 'a8',
            name: 'MSI Stealth A16',
            brand: 'msi',
            spec: 'Ryzen 9 • RTX 4070 • 32GB • 1TB',
            type: 'gaming',
            image_src: '../assets/image/product/a8.jpg',
            price: '63.690.000đ'
        },
        {
            id: 'a9',
            name: 'Samsung Galaxy Chromebook Go',
            brand: 'samsung',
            spec: 'Celeron • UHD • 4GB • 64GB',
            type: 'study',
            image_src: '../assets/image/product/a9.jpg',
            price: '7.290.000đ'
        },
        {
            id: 'a10',
            name: 'Samsung Galaxy Book 5',
            brand: 'samsung',
            spec: 'Intel Ultra 7 • Intel Arc • 16GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/a10.jpg',
            price: '32.990.000đ'
        },
        {
            id: 'a11',
            name: 'Samsung Galaxy Book 3',
            brand: 'samsung',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a11.jpg',
            price: '19.690.000đ'
        },
        {
            id: 'a12',
            name: 'Samsung Galaxy Book 4',
            brand: 'samsung',
            spec: 'i5 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a12.jpg',
            price: '19.880.000đ'
        },
        {
            id: 'a13',
            name: 'Samsung Galaxy Book 3 Pro',
            brand: 'samsung',
            spec: 'i7 • Iris Xe • 16GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/a13.jpg',
            price: '34.490.000đ'
        },
        {
            id: 'a14',
            name: 'Samsung Galaxy Book',
            brand: 'samsung',
            spec: 'i5 • Iris Xe • 8GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a14.jpg',
            price: '25.990.000đ'
        },
        {
            id: 'a15',
            name: 'Samsung Galaxy Chromebook Go',
            brand: 'samsung',
            spec: 'Celeron • UHD • 8GB • 128GB',
            type: 'study',
            image_src: '../assets/image/product/a15.jpg',
            price: '19.990.000đ'
        },
        {
            id: 'a16',
            name: 'Surface 7',
            brand: 'surface',
            spec: 'Intel Ultra 5 • Intel Arc • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a16.jpg',
            price: '25.490.000đ'
        },
        {
            id: 'a17',
            name: 'Surface Go i5',
            brand: 'surface',
            spec: 'i5 • UHD • 8GB • 256GB',
            type: 'study',
            image_src: '../assets/image/product/a17.jpg',
            price: '11.990.000đ'
        },
        {
            id: 'a18',
            name: 'Surface Pro 5',
            brand: 'surface',
            spec: 'i5 • HD 620 • 8GB • 256GB',
            type: 'study',
            image_src: '../assets/image/product/a18.jpg',
            price: '6.990.000đ'
        },
        {
            id: 'a19',
            name: 'Surface Pro 8',
            brand: 'surface',
            spec: 'i7 • Iris Xe • 16GB • 512GB',
            type: 'office',
            image_src: '../assets/image/product/a19.jpg',
            price: '16.990.000đ'
        },
        {
            id: 'a20',
            name: 'Surface Studio 2',
            brand: 'surface',
            spec: 'i7 • GTX 1060 • 32GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/a20.jpg',
            price: '58.000.000đ'
        },
        {
            id: 'a21',
            name: 'Surface Studio',
            brand: 'surface',
            spec: 'i7 • GTX 965M • 16GB • 1TB',
            type: 'office',
            image_src: '../assets/image/product/a21.jpg',
            price: '21.990.000đ'
        }
    ]

    localStorage.setItem('products', JSON.stringify(products));
}