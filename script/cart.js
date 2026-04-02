//Dependencies
const productController = window.productController;
const cartController = window.cartController;
const orderController = window.orderController;
const { convertIntToVietNamDong, convertStringToInt } = window.helper;

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

const backToOrderBtn = document.querySelector('.back__to__order');

let totalItem = 0;
let totalPrice = 0;

let isAvailable = true;

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

    console.log(cartController.getUserCart())
    
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

function renderTotalProductValue () {
    totalProductAmount.innerText = totalItem;
    totalProductPrice.innerText = convertIntToVietNamDong(totalPrice);
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
    addNotification('success', 'Xóa thành công!', 2000);
    RenderState();
}

function renderUserInfor () {
    const user = me.get();

    const username = user.receiver_name ? user.receiver_name : user.username;

    if (!cartAcceptForm)
        return;

    const form = cartAcceptForm;

    form.elements['username'].value = username || null;
    form.elements['number_phone'].value = user.number_phone || null;
    form.elements['email'].value = user.email || null;
    form.elements['address'].value = user.address || null; 
}

function acceptOrder () {
    const formData = new FormData(cartAcceptForm);
    const userId = me.get().id;
    const username = formData.get('username');
    const email = formData.get('email');
    const number_phone = formData.get('number_phone');
    const address = formData.get('address');
    const list = cartController.getUserCart().items;
    const orderId = crypto.randomUUID();
    orderController.acceptOrder(list, orderId, userId, username, number_phone, address, email, convertIntToVietNamDong(totalPrice));
    cartController.removeAllFromCart(userId);
    addNotification('success', 'Đặt hàng thành công!', 2000);
    goBackToOrderStep();
    RenderState();
}

function goAcceptStep (e) {
    e.preventDefault();
    cartOrderStep.classList.add('is-hidden');
    cartAcceptStep.classList.remove('is-hidden');
    renderUserInfor();
}

function goBackToOrderStep () {
    cartOrderStep.classList.remove('is-hidden');
    cartAcceptStep.classList.add('is-hidden');
}

function isDeletedProductInCart () {
    RenderState();
    addNotification('warning', 'Có sản phẩm không hợp lệ!', 2000);
}

function renderOrderProduct(product, amount) {

    if (product.isDeleted) {
        isAvailable = false;
    }

    const orderProduct = document.createElement('div');
    orderProduct.className = `order__product ${product.isDeleted ? 'deleted__product' : ''}`;
    const totalPrice = helper.convertStringToInt(product.price) * amount;
    orderProduct.innerHTML = `
        <div class="image__border">
            <img src="${product.image_src}">
        </div>

        <div class="product__info">
            <span class="product__info--name">${product.name}</span>

            <span class="product__info--spec"><span>Cấu hình : </span>${product.spec}</span>

            <span class="product__info--price"><span>Giá : </span>${product.price}</span>

            <div class="product__quantity">
                <span class="mobile__quantity">Số lượng : </span>
                <div class="product__quantity--active">
                    <button class="plus__one">-</button>
                    <span class="product__amount">${amount}</span>
                    <button class="minus__one">+</button>
                </div>
            </div>

            <span class="product__cost">
                <span>Tổng tiền : </span>
                ${helper.convertIntToVietNamDong(totalPrice)}
            </span>
        </div>

        <div class="order__product--remove">
            <img src="../assets/icon/trash.svg">
            <span>Xóa</span>
        </div>

        ${
            product.isDeleted
            ? `<div class="product__overlay">
                    Sản phẩm đã ngừng kinh doanh
               </div>`
            : ''
        }
    `

    const removeOrderProductImage = orderProduct.querySelector('.order__product--remove img');
    const removeOrderProductSpan = orderProduct.querySelector('.order__product--remove span');
    const plusOneOrderProduct = orderProduct.querySelector('.plus__one');
    const minusOneOrderProduct = orderProduct.querySelector('.minus__one');
        

    removeOrderProductImage.addEventListener('click', () => removeProduct(product.id));
    removeOrderProductSpan.addEventListener('click', () => removeProduct(product.id));
    plusOneOrderProduct.addEventListener('click', () => removeOneProduct(product.id));
    minusOneOrderProduct.addEventListener('click', () => addOneProduct(product.id));

    return orderProduct;
}

function render () {
    if (!isLogin())
        return;
    RenderState();
}

function RenderState () {
    renderNoti();
    renderUserCart();
    renderTotalProductValue();

    if (!isAvailable)
        orderButton.onclick = () => isDeletedProductInCart();
    else {
        orderButton.onclick = (e) => goAcceptStep(e);
    }
}

render();

cartAcceptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showConfirmBox(acceptOrder, "Xác nhận đơn hàng", "Bạn có chắc chắn muốn đặt hàng không?");
});

backToOrderBtn.addEventListener('click', goBackToOrderStep);

console.log(orderController.getAllOrder())
console.log(orderController.getAllBill())