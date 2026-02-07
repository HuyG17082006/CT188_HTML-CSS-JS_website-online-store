// Dependencies
const productController = window.productController;
const cartController = window.cartController;
const helper = window.helper;

//DOM
const listProducts = document.querySelector('.list__products');
const emptyProduct = document.querySelector('.empty__product');
const filterBoxBrandList = document.querySelectorAll('.filter__box--brand');
const searchInput = document.querySelector('.search__input');
const sortButton = document.querySelector('.sort__group');
const refreshButton = document.querySelector('.refresh__group');

//FUNCTION
function productData() {
    window.loadProducts();
}

function renderProduct(item, index) {
    const divOuter = document.createElement('div');
    const divInnerActive = document.createElement('div');
    const divInnerInfo = document.createElement('div');
    const divImage = document.createElement('div');

    const activeImage = document.createElement('img');
    const productImage = document.createElement('img');

    const spanName = document.createElement('span');
    const spanPrice = document.createElement('span');

    divOuter.className = 'product__item';
    divOuter.id = item.id;
    divInnerActive.className = 'product__item--active';
    divInnerActive.addEventListener('click', () => addToCart(item.id));
    divInnerInfo.className = 'product__info';

    activeImage.src = "../assets/icon/cart-plus.svg";
    productImage.className = 'product__image';
    productImage.src = item.image_src;

    spanName.className = 'product__item--name';
    spanName.innerText = item.name;
    spanPrice.className = 'product__item--price';
    spanPrice.innerText = item.price;

    divImage.className = 'image__border';

    divImage.append(productImage);

    divInnerInfo.append(
        spanName, 
        spanPrice);

    divInnerActive.append(activeImage);

    divOuter.append(
        divInnerActive, 
        divImage, 
        divInnerInfo
    );

    divOuter.style.setProperty('--i', index)

    return divOuter;
}

function convertStringToInt(price) {
    return Number(price.replace(/[^\d]/g, ''));
}

let brandFilter = new URLSearchParams(window.location.search).get('brand') || '';
let textFilter = '';
let count = 0;
const priceMode = ['no_sort', 'asc', 'desc'];

function filter(list, { brand, text, sortMode }) {
    let result = [...list];

    if (brand) {
        result = result.filter(product => product.brand === brand);
    }

    if (text) {
        const keyword = text.toLowerCase();
        result = result.filter(product => product.name.toLowerCase().includes(keyword));
    }

    if (sortMode === 'asc') {
        return result.sort((a, b) => convertStringToInt(a.price) - convertStringToInt(b.price));
    } else if (sortMode === 'desc') {
        return result.sort((a, b) => convertStringToInt(b.price) - convertStringToInt(a.price));
    }
    return result;
}

function addToCart(id) {
    const productId = id;
    if (cartController.addToCart(productId))
        alert('Thêm thành công!');
    else
        alert('Vui lòng đăng nhập để thêm sản phẩm!');
}


function render() {
    productData();

    listProducts.innerHTML = '';
    const list = productController.getList();

    let filterList = filter(list, {
        brand : brandFilter,
        text : textFilter,
        sortMode : priceMode[count]
    });

    if (!filterList.length) {
        emptyProduct.classList.remove('is-hidden');
        emptyProduct.querySelector('.empty__find__text').innerText = `\"${textFilter}\"`
        return;
    }

    emptyProduct.classList.add('is-hidden');

    filterList.forEach(
        (item, index) => listProducts.append(renderProduct(item, index))
    )
}

render();

function setSelectedBrandFilter(item) {
    brandFilter = item.dataset.brandName;
    render();
}

function setChangePriceMode() {
    count = (count + 1) % 3;
    render();
}

function handleSearchInput(e) {
    textFilter = e.target.value;
    render();
}

function resetFilter() {
    textFilter = '';
    brandFilter = '';
    count = 0;
    searchInput.value = '';
    render();
}

const debouncedSearch = helper.debounce(handleSearchInput, 300);

searchInput.addEventListener('input', debouncedSearch);

sortButton.addEventListener('click', setChangePriceMode);

refreshButton.addEventListener('click', resetFilter);

filterBoxBrandList.forEach(item =>
    item.addEventListener('click', () => setSelectedBrandFilter(item))
)

