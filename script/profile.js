//Dependencies
const authController = window.authController;
const orderController = window.orderController;
const productController = window.productController;

//DOM 
const infoContainer = document.querySelector('.info__container');
const usernameInput = infoContainer.querySelector('.username');
const receiverNameInput = infoContainer.querySelector('.receiver_name');
const emailInput = infoContainer.querySelector('.email');
const numberPhoneInput = infoContainer.querySelector('.number_phone');
const addressInput = infoContainer.querySelector('.address');
const updateInforBtn = infoContainer.querySelector('.update__button');

const billContainer = document.querySelector('.bill__container');
const billList = billContainer.querySelector('.bill__list');
const emptyList = billContainer.querySelector('.empty__list');

const listSideBarBtn = document.querySelectorAll('.side__bar__item');

const logoutBtn = document.querySelector('.side__bar__logout');

let choice = 'info';

function renderUI(choice) {
    infoContainer.classList.toggle('is-hidden', choice !== 'info');
    billContainer.classList.toggle('is-hidden', choice !== 'bill');
}

function renderData(choice) {
    if (choice === 'info')
        renderUserInfor();
    else
        renderUserBillList();
}

function renderContainer () {
    if (!me.get()) {
        window.location.replace('../view/auth.html');
        return;
    }
    renderUI(choice);
    renderData(choice);
}

function renderUserInfor () {
    const user = me.get();
    
    usernameInput.value = user.username;
    receiverNameInput.value = user.receiver_name || null;
    emailInput.value = user.email;
    numberPhoneInput.value = user.number_phone || null;
    addressInput.value = user.address || null;
}

function renderUserBillList() {
    billList.innerHTML = '';
    const userId = me.get().id;

    const userBills = orderController.getUserOrderList(userId);

    if (!userBills || userBills.bills.length === 0) {
        billList.classList.remove('is-hidden');
        emptyList.classList.add('is-hidden');
        return;
    }

    const bills = userBills.bills;

    let billCode = 1;

    bills.forEach(bill => {
        billList.append(renderBillItem(bill, `#${billCode}`, 3));
        billCode++;
    })
}

function renderBillItem(bill, shortId, maxItemPerTime = 3) {
    const billItem = document.createElement('div');
    billItem.className = 'bill__item';
    billItem.id = bill.orderId;

    const header = document.createElement('div');
    header.className = 'bill__header';

    const billId = document.createElement('span');
    billId.className = 'bill__id';
    billId.innerText = `Đơn : ${shortId}`;

    const billDate = document.createElement('span');
    billDate.className = 'bill__date';
    billDate.innerText = `Ngày đặt : ${bill.date}`;

    header.append(billId, billDate);

    const receiver = document.createElement('div');
    receiver.className = 'bill__receiver';

    receiver.innerHTML = `
        <p>Người nhận : ${bill.username}</p>
        <p>SĐT : ${bill.number_phone}</p>
        <p>Địa chỉ : ${bill.address}</p>
    `;

    const productContainer = document.createElement('div');
    productContainer.className = 'bill__products__container';

    const title = document.createElement('h3');
    title.innerText = 'Danh sách :';

    const productsBox = document.createElement('div');
    productsBox.className = 'bill__products';

    const previewProducts = bill.userCart.slice(0, maxItemPerTime);

    previewProducts.forEach(({ productId, quantity }) => {
        productsBox.append(renderBillProduct(productId, quantity));
    });

    if (bill.userCart.length > maxItemPerTime) {
        const moreBtn = document.createElement('button');
        moreBtn.classList.add('more__button')
        moreBtn.innerText = `+ ${bill.userCart.length - maxItemPerTime} sản phẩm khác`;

        moreBtn.addEventListener('click', () => {
            productsBox.innerHTML = '';
            bill.userCart.forEach(({ productId, quantity }) => {
                productsBox.append(renderBillProduct(productId, quantity));
            });
            moreBtn.remove();
        });

        productsBox.append(moreBtn);
    }

    productContainer.append(title, productsBox);

    const footer = document.createElement('div');
    footer.className = 'bill__footer';

    const totalText = document.createElement('span');
    totalText.classList.add('bill__total--text')
    totalText.innerText = `Tổng tiền : `;

    const totalPrice = document.createElement('span');
    totalPrice.classList.add('bill__total--price');
    totalPrice.innerText = `${bill.totalPrice}`;
    
    totalText.append(totalPrice)

    footer.append(totalText);

    billItem.append(
        header,
        receiver,
        productContainer,
        footer
    );

    return billItem;
}

function getProductDetail (productId) {
    return productController.getProduct(productId);
}

function renderBillProduct(productId, quantity) {
    const product = getProductDetail(productId);

    const item = document.createElement('div');
    item.className = 'bill__product';

    const img = document.createElement('img');
    img.src = product.image_src;
    img.alt = product.name;

    const inner = document.createElement('div');
    inner.className = 'bill__product__inner';

    const name = document.createElement('span');
    name.className = 'product__name';
    name.innerText = product.name;

    const amount = document.createElement('div');
    amount.className = 'product__amount';

    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'product__quantity';
    quantitySpan.innerText = `x${quantity}`;

    const price = document.createElement('span');
    price.className = 'product__price';
    price.innerText = product.price;

    amount.append(quantitySpan, price);
    inner.append(name, amount);

    item.append(img, inner);

    return item;
}


function render () {
    renderContainer();
}

render();

function updateUserInfor () {
    const user = me.get();

    const receiver_name = receiverNameInput.value;
    const number_phone = numberPhoneInput.value;
    const address = addressInput.value;

    if (number_phone === user.number_phone && receiver_name === user.receiver_name && address === user.address)
        return;

    authController.update(receiver_name, number_phone, address);

    addNotification('success', 'Cập nhật thành công!', 2000);
    renderNoti();
}

function choiceContent (e) {

    if (e.target.classList.contains('side__bar__logout'))
        return;

    choice = e.target.dataset.choice;

    listSideBarBtn.forEach(
        item => item.classList.remove('is-active')
    )

    e.target.classList.add('is-active');
    render()
}

function acceptToLogout () {
    logoutBtn.innerText = 'Chắc chưa ní?'
    logoutBtn.addEventListener('click', logout)
    logoutBtn.removeEventListener('click', acceptToLogout);

    setTimeout(() => {
        logoutBtn.innerText = 'Đăng xuất'
        logoutBtn.addEventListener('click', acceptToLogout);
        logoutBtn.removeEventListener('click', logout);
    }, 3000)
}

function logout () {
    me.remove();
    render();
    addNotification('success', 'Đăng xuất thành công', 2000);
}

logoutBtn.addEventListener('click', acceptToLogout);

updateInforBtn.addEventListener('click', updateUserInfor);

listSideBarBtn.forEach(btn =>
    btn.addEventListener('click', choiceContent)
)

