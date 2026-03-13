// Dependencies
const productController = window.productController;
const cartController = window.cartController;
const { convertStringToInt, debounce } = window.helper;

//DOM
const listProducts = document.querySelector('.list__products');
const emptyProduct = document.querySelector('.empty__product');
const filterBoxBrandList = document.querySelectorAll('.filter__box--brand');
const searchInput = document.querySelector('.search__input');
const sortButton = document.querySelector('.sort__group');
const refreshButton = document.querySelector('.refresh__group');
const usingFilterList = document.querySelectorAll('.using__filter')

//FUNCTION
function productData() {
    window.loadProducts();
}

function renderUIProduct(item, index) {
    const divOuter = document.createElement("div");

    divOuter.className = "product__item";
    divOuter.id = item.id;

    divOuter.innerHTML = `
        <div class="product__item--active">
            <img src="../assets/icon/shopping-cart-white.svg">
        </div>

        <div class="image__border">
            <img class="product__image" src="${item.image_src}">
        </div>

        <div class="product__info">
            <span class="product__item--name">${item.name}</span>
            <span class="product__item--spec">${item.spec}</span>
            <span class="product__item--price">${item.price}</span>
        </div>
    `;

    divOuter.style.setProperty("--i", index);

    divOuter
        .querySelector(".product__item--active")
        .addEventListener("click", () => addToCart(item.id));

    return divOuter;
}

let locked = false;

function lockAction () {
    locked = true;
    setTimeout(() => {
        locked = false;
    }, 500)
}

function addToCart(id) {
    if (locked)
        return;

    lockAction();

    const productId = id;
    if (cartController.addToCart(productId))
        addNotification('success', 'Đã thêm vào giỏ hàng', 2000);
    else
        addNotification('error', 'Vui lòng đăng nhập để thêm', 2000);
    renderNoti()
}

let brandFilter = new URLSearchParams(window.location.search).get('brand') || '';
let usingFilter = '';
let textFilter = '';
let count = 0;
const priceMode = ['no_sort', 'asc', 'desc'];

function filter(list, { brand, text, sortMode, type }) {
    let result = [...list];

    if (brand) {
        result = result.filter(product => product.brand === brand);
    }

    if (text) {
        const keyword = text.toLowerCase();
        result = result.filter(product => product.name.toLowerCase().includes(keyword));
    }

    if (type) {
        result = result.filter(product => product.type.includes(type));
    }

    if (sortMode === 'asc') {
        return result.sort((a, b) => convertStringToInt(a.price) - convertStringToInt(b.price));
    } else if (sortMode === 'desc') {
        return result.sort((a, b) => convertStringToInt(b.price) - convertStringToInt(a.price));
    }
    return result;
}

const MAX_PAGE_SIZE = 15;
let startIndex = 0;
let endIndex = 15;

function visibleListProduct (list, { startIndex, endIndex }) {
    if (list.length > endIndex)
        return list.slice(startIndex, endIndex);
    return list.slice(startIndex, list.length);
}

function getFilterList () {
    const list = productController.getList();

    return filter(list, {
        brand : brandFilter,
        text : textFilter,
        sortMode : priceMode[count],
        type : usingFilter
    });
}

function renderEmptyList(list) {
    if (!list.length) {
        emptyProduct.classList.remove('is-hidden');
        return true;
    }
    emptyProduct.classList.add('is-hidden');
    return false;
}

function renderProductsList(list) {
    let visibleList = visibleListProduct(list, {
        startIndex,
        endIndex
    });

    const fragment = document.createDocumentFragment();

    visibleList.forEach(
        (item, index) => fragment.append(renderUIProduct(item, index))
    )

    listProducts.append(fragment);

    let moreBtn = document.querySelector('.more__button');

    if (!moreBtn) {
        moreBtn = document.createElement('button');
        moreBtn.classList.add('more__button');
        moreBtn.classList.add('product__item')
        moreBtn.textContent = '+ Xem thêm';
        moreBtn.addEventListener('click', () => renderProductsList(list));
    }
    if (list.length > endIndex) {
        listProducts.append(moreBtn)
        startIndex = endIndex;
        endIndex += MAX_PAGE_SIZE;
    }
    else {
        moreBtn.remove();
    }
}

function render () {
    listProducts.innerHTML = '';
    const filterList = getFilterList();
    resetPageSize();
    
    if (renderEmptyList(filterList))
        return;

    renderProductsList(filterList);
}

productData();
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

function setSelectedUsingFilter(item) {

    usingFilterList.forEach(i => 
        i.classList.remove('selected')
    )

    item.classList.add('selected');
    usingFilter = item.dataset.type;
    render();
}

function resetFilter() {
    textFilter = '';
    brandFilter = '';
    count = 0;
    searchInput.value = '';
    resetUsingFilter();
    render();
}

function resetPageSize() {
    startIndex = 0;
    endIndex = 15;
}

function resetUsingFilter () {
    usingFilter = '';
    usingFilterList.forEach(item => {
        item.classList.remove('selected');
    })
}

searchInput.addEventListener('input', handleSearchInput);
sortButton.addEventListener('click', setChangePriceMode);
refreshButton.addEventListener('click', resetFilter);
usingFilterList.forEach(item => {
    item.addEventListener('click', () => setSelectedUsingFilter(item))
})
filterBoxBrandList.forEach(item =>
    item.addEventListener('click', () => setSelectedBrandFilter(item))
)

