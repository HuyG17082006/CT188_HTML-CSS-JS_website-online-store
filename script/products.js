const productController = window.productController;

const listProducts = document.querySelector('.list__products');

const filterBoxBrandList = document.querySelectorAll('.filter__box--brand');

function productData () {
    const products = [
        {
            id : 'laptop-1',
            type : 'laptop',
            name : 'Lenovo LOQ 15ARP9',
            brand : 'lenovo',
            image_src : '../assets/image/lenovo-loq-2025.jpg',
            price : '25.000.000đ'
        },
        {
            id : 'laptop-2',
            type : 'laptop',
            name : 'ASUS expertBook P1',
            brand : 'asus',
            image_src : '../assets/image/asus-expert-book.jpg',
            price : '15.490.000đ'
        },
        {
            id : 'laptop-3',
            type : 'laptop',
            name : 'Lenovo Lecoo Pro 14 2025',
            brand : 'lenovo',
            image_src : '../assets/image/lenovo-leco.jpg',
            price : '19.490.000đ'
        },
        {
            id : 'laptop-4',
            type : 'laptop',
            name : 'Acer Gaming Nitro V 15',
            brand : 'acer',
            image_src : '../assets/image/acer-nitro-v.jpg',
            price : '24.490.000đ'
        },
        {
            id : 'laptop-5',
            type : 'laptop',
            name : 'Lenovo Legion 5',
            brand : 'lenovo',
            image_src : '../assets/image/lenovo-legion-5.jpg',
            price : '36.990.000đ'
        },
        {
            id : 'laptop-6',
            type : 'laptop',
            name : 'HP Victus 16',
            brand : 'hp',
            image_src : '../assets/image/hp-victus-16.jpg',
            price : '23.000.000đ'
        }
    ]

    localStorage.setItem('products', JSON.stringify(products));
}

function convertStringToInt (price) {
    return Number(price.replace(/[^\d]/g, ''));
}


let brandFilter = '';
let priceFilter = 'asc';
let typeFilter = 'laptop';


function filter (list) {
    let filterList = [];

    list.forEach(item => {
        if (item.brand !== brandFilter && brandFilter)
            return;

        if (item.type !== typeFilter)
            return;

        filterList.push(item);
    })

    if (priceFilter === 'asc') {
        return filterList.sort((a, b) => convertStringToInt(a.price) - convertStringToInt(b.price));
    } else {
        return filterList.sort((a, b) => convertStringToInt(b.price) - convertStringToInt(a.price));
    }
}


function renderProducts () {
    listProducts.innerHTML = '';

    productData();
    const list = productController.getList();

    let filterList = filter(list);

    filterList.forEach(
        item => {
        
            const divOuter = document.createElement('div');
            const divInnerActive = document.createElement('div');
            const divInnerInfo = document.createElement('div');
            
            const activeImage = document.createElement('img');
            const productImage = document.createElement('img');

            const spanName = document.createElement('span');
            const spanPrice = document.createElement('span');
            
            divOuter.className = 'product__item';
            divOuter.id=item.id;
            divInnerActive.className = 'product__item--active';
            divInnerInfo.className = 'product__info';

            activeImage.src="../assets/icon/cart-plus.svg";
            productImage.className = 'product__image';
            productImage.src = item.image_src;

            spanName.className = 'product__item--name';
            spanName.innerText = item.name;
            spanPrice.className = 'product__item--price';
            spanPrice.innerText = item.price;

            divInnerInfo.append(spanName);
            divInnerInfo.append(spanPrice);

            divInnerActive.append(activeImage);

            divOuter.append(divInnerActive);
            divOuter.append(productImage);
            divOuter.append(divInnerInfo);

            listProducts.append(divOuter)
        }
    )

}

function setSelectedBrandFilter (item) {
    
    const isSelected = item.classList.contains('is-selected');
    
    filterBoxBrandList.forEach(anotherItem => 
        anotherItem.classList.remove('is-selected')
    )

    if (!isSelected) {
        item.classList.add('is-selected');
        brandFilter = item.textContent.toString().toLowerCase().trim();
    }
    else {
        brandFilter = '';
    }
    renderProducts();
}

filterBoxBrandList.forEach(item => 
    item.addEventListener('click', () => setSelectedBrandFilter(item))
)

renderProducts();