//Dependencies
const productController = window.productController;
const cartController = window.cartController;
const orderController = window.orderController;

//DOM
const cartAuthorization = document.querySelector('.cart__authorization--box');
const cartOrderStep = document.querySelector('.cart__ordering__steps');
const cartAcceptStep = document.querySelector('.cart__accept__steps');
const cartEmptyBox = document.querySelector('.cart__empty--box');
const orderList = document.querySelector('.order__list');

const orderButton = document.querySelector('.order__button');

const totalProductAmount = document.querySelector('.total__product--amount');
const totalProductPrice = document.querySelector('.total__product--price');

const cartAcceptForm = document.querySelector('.cart__accept--form');

let totalItem = 0;
let totalPrice = 0;

function convertStringToInt(price) {
    return Number(price.replace(/[^\d]/g, ''));
}

function convertIntToString(price) {
    const newPrice = price.toString();
    let newString = 'đ';
    let count = 0;
    if (newPrice.length % 3 >= 0) {
        let i;
        for (i = newPrice.length - 1; i >= 0; i--) {
            
            if (count % 3 == 0 && count != 0)
                newString = '.' + newString;

            newString = newPrice[i] + newString;
            
            count++;
        }
    }

    return newString;
}

function isLogin () {
    if (!me.get()) {
        cartAuthorization.classList.remove('is-hidden');
        return false;
    }
    cartOrderStep.classList.remove('is-hidden');
    return true;
}

function getOrderProductDetail (productId) {
    return productController.getProduct(productId);
}

function calcTotalState (amount, pricePerAmount) {
    totalItem += amount;
    totalPrice += convertStringToInt(pricePerAmount) * amount;
}

function renderUserCart () {
    orderList.innerHTML = '';

    const userListCart = cartController.getUserCart().items;
    
    if (!userListCart.length) {
        cartEmptyBox.classList.remove('is-hidden');
        cartOrderStep.classList.add('is-hidden');
        return;
    }

    resetTotal();

    const fragment = document.createDocumentFragment();

    userListCart.forEach(item => {
        
        const product = getOrderProductDetail(item.productId);
        const orderProduct = renderOrderProduct(product, item.quantity);
        
        calcTotalState(item.quantity, product.price);
        
        fragment.append(orderProduct);
    })

    orderList.append(fragment)
}

function renderTotalProductValue ({totalPrice = 0, totalProducts = 0}) {
    totalProductAmount.innerText = totalProducts;
    totalProductPrice.innerText = convertIntToString(totalPrice);
}

function resetTotal () {
    totalItem = 0;
    totalPrice = 0;
}

function removeOneProduct (productId) {
    cartController.removeOneFromCart(productId);
    RenderState();
}

function addOneProduct (productId) {
    cartController.addToCart(productId);
    RenderState();
}

function removeProduct (productId) {
    cartController.removeFromCart(productId);
    RenderState();
}

function renderUserInfor (form) {
    const user = me.get();

    const username = user.receiver_name ? user.receiver_name : user.username;

    form.elements['username'].value = username || null;
    form.elements['number_phone'].value = user.number_phone || null;
    form.elements['email'].value = user.email || null;
    form.elements['address'].value = user.address || null; 
}

function acceptOrder (form) {
    const formData = new FormData(form);

    const userId = me.get().id;

    const username = formData.get('username');
    const email = formData.get('email');
    const number_phone = formData.get('number_phone');
    const address = formData.get('address');

    const list = cartController.getUserCart().items;

    const orderId = crypto.randomUUID();

    orderController.acceptOrder(list, orderId, userId, username, number_phone, address, email, convertIntToString(totalPrice));
    console.log(localStorage.getItem('orders'))
    RenderState();
    alert('Đặt hàng thành công!');
    goBackToOrderStep();
}

function goAcceptStep (e) {
    e.preventDefault();
    cartOrderStep.classList.add('is-hidden');
    cartAcceptStep.classList.remove('is-hidden');
    renderUserInfor(cartAcceptForm);
}

function goBackToOrderStep () {
    cartOrderStep.classList.remove('is-hidden');
    cartAcceptStep.classList.add('is-hidden');
}


function renderOrderProduct(product, amount) {
    const orderProduct = document.createElement('div');
    const removeBox = document.createElement('div');
    const removeImg = document.createElement('img');

    const imageBorder = document.createElement('div');
    const productImg = document.createElement('img');

    const productInfo = document.createElement('div');
    const nameSpan = document.createElement('span');

    const priceP = document.createElement('p');
    const priceSpan = document.createElement('span');

    const quantityBox = document.createElement('div');
    const quantityText = document.createElement('span');
    const quantityActive = document.createElement('div');
    const minusBtn = document.createElement('button');
    const amountSpan = document.createElement('span');
    const plusBtn = document.createElement('button');

    const totalP = document.createElement('p');
    const totalSpan = document.createElement('span');

    orderProduct.className = 'order__product';

    removeBox.className = 'order__product--remove';
    imageBorder.className = 'image__border';
    productInfo.className = 'product__info';

    nameSpan.className = 'product__info--name';
    priceSpan.className = 'product__info--price';

    quantityBox.className = 'product__quantity';
    quantityActive.className = 'product__quantity--active';
    minusBtn.className = 'plus__one';
    minusBtn.addEventListener('click', () => removeOneProduct(product.id));
    plusBtn.className = 'minus__one';
    plusBtn.addEventListener('click', () => addOneProduct(product.id));
    amountSpan.className = 'product__amount';

    totalSpan.className = 'product__cost';

    removeImg.src = '../assets/icon/trash.svg';
    removeImg.addEventListener('click', () => removeProduct(product.id))
    productImg.src = product.image_src;
    nameSpan.innerText = product.name;
    priceSpan.innerText = product.price;
    quantityText.innerText = 'Số lượng : ';
    minusBtn.innerText = '-';
    plusBtn.innerText = '+';
    amountSpan.innerText = amount;
    totalSpan.innerText = ' ' + product.price;

    priceP.innerText = 'Giá : ';
    totalP.innerText = 'Tổng tiền :';

    removeBox.append(removeImg);
    imageBorder.append(productImg);

    priceP.append(priceSpan);

    quantityActive.append(minusBtn, amountSpan, plusBtn);
    quantityBox.append(quantityText, quantityActive);

    totalP.append(totalSpan);

    productInfo.append(
        nameSpan,
        priceP,
        quantityBox,
        totalP
    );

    orderProduct.append(
        removeBox,
        imageBorder,
        productInfo
    );

    return orderProduct;
}

function render () {
    if (!isLogin())
        return;
    RenderState();
}

function RenderState () {
    renderUserCart();
    renderTotalProductValue({
        totalPrice : totalPrice, 
        totalProducts : totalItem
    })
}

render();

cartAcceptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    acceptOrder(cartAcceptForm)
});

orderButton.addEventListener('click', goAcceptStep);

