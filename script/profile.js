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

const billTypeSelectList = document.querySelector('.bill__container ul')

const listSideBarBtn = document.querySelectorAll('.side__bar__item');

const logoutBtn = document.querySelector('.side__bar__logout');

let choice = 'info';

let billType = 'ordered';

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

function renderContainer() {
    if (!me.get()) {
        window.location.replace('../view/auth.html');
        return;
    }
    renderUI(choice);
    renderData(choice);
}

function renderUserInfor() {
    const user = me.get();

    usernameInput.value = user.username;
    receiverNameInput.value = user.receiver_name || null;
    emailInput.value = user.email;
    numberPhoneInput.value = user.number_phone || null;
    addressInput.value = user.address || null;
}

function fillterBill(list, type) {

    console.log(list)
    return list.filter(bill => bill.status === type);
}

function renderUserBillList() {
    billList.innerHTML = '';
    const userId = me.get().id;

    const userBills = orderController.getUserOrderList(userId);

    const bills = fillterBill(userBills.bills, billType);

    if (!userBills || bills.length === 0) {
        billList.classList.remove('is-hidden');
        billList.append(emptyItem());
        return;
    }

    let billCode = 1;

    bills.forEach(bill => {
        billList.append(renderbillHTML(bill, `#${billCode}`, 3));
        billCode++;
    })
}

function emptyItem () {
    const empty = document.createElement('div');
    empty.className = 'empty__item';
    empty.innerHTML = `
        <i class="fa-solid fa-box-open"></i>
        <p>Chưa có gì cả!</p>
    `
    return empty
}

function renderbillHTML(bill, shortId, maxItemPerTime = 3) {
    const billHTML = document.createElement('div');
    billHTML.className = 'bill__item';
    billHTML.id = bill.orderId;

    const previewProducts = bill.userCart.slice(0, maxItemPerTime);

    billHTML.innerHTML = `
        <div class="bill__header">
            <span class="bill__id">Đơn : ${shortId}</span>
            <span class="bill__date">Ngày đặt : ${bill.date}</span>
        </div>

        <div class="bill__receiver">
            <p>Người nhận : ${bill.username}</p>
            <p>SĐT : ${bill.number_phone}</p>
            <p>Địa chỉ : ${bill.address}</p>
        </div>

        <div class="bill__products__container">
            <h3>Danh sách :</h3>
            <div class="bill__products">
            </div>
        </div>

        <div class="bill__footer">
            <span class="bill__total--text">
                Tổng tiền :
                <span class="bill__total--price">${bill.totalPrice}</span>
            </span>
        </div>

        ${bill.status === 'ordered' ? '<button class="cancel__bill">Hủy đơn</button>' : ''}
    `;

    const productsBox = billHTML.querySelector('.bill__products');

    let moreBtn = null;

    if (bill.userCart.length > maxItemPerTime) {
        moreBtn = document.createElement('button');
        moreBtn.className = 'more__button';
        moreBtn.innerText = `+ ${bill.userCart.length - maxItemPerTime} sản phẩm khác`
    }

    previewProducts.forEach(p => {
        const product = getProductDetail(p.productId);
        productsBox.appendChild(renderBillProduct(product, p.quantity))
    })

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            productsBox.innerHTML = '';

            bill.userCart.forEach(p => {
                const product = getProductDetail(p.productId);
                productsBox.appendChild(renderBillProduct(product, p.quantity))
            })
            moreBtn.remove();
        });
        productsBox.appendChild(moreBtn);
    }

    const cancelBtn = billHTML.querySelector('.cancel__bill');
    if (cancelBtn)
        cancelBtn.onclick = () => {
            orderController.cancelOrderedBill(bill.userId, bill.orderId);
            addNotification('success', 'Đã hủy đơn thành công!', 2000);
            renderNoti();
            renderUserBillList();
        }

    return billHTML;
}

function getProductDetail(productId) {
    return productController.getProduct(productId);
}

function renderBillProduct(product, quantity) {

    const billProduct = document.createElement('div');
    billProduct.className = 'bill__product';
    billProduct.innerHTML = `<img src="${product.image_src}" alt="${product.name}">
                        <div class="bill__product__inner">
                            <span class="product__name">${product.name}</span>
                            <span class="product__spec">${product.spec}</span>
                            <div class="product__amount">
                                <span class="product__quantity">x${quantity}</span>
                                <span class="product__price">${product.price}</span>
                            </div>
                        </div>
    `

    return billProduct;
}


function render() {
    if (!me.get()) {
        window.location.replace('../view/auth.html')
    }
    renderContainer();
}

render();

function updateUserInfor() {
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

function choiceContent(e) {

    if (e.target.classList.contains('side__bar__logout'))
        return;

    choice = e.target.dataset.choice;

    listSideBarBtn.forEach(
        item => item.classList.remove('is-active')
    )

    e.target.classList.add('is-active');
    render()
}

function acceptToLogout() {
    logoutBtn.innerText = 'Chắc chưa ní?'
    logoutBtn.addEventListener('click', logout)
    logoutBtn.removeEventListener('click', acceptToLogout);

    setTimeout(() => {
        logoutBtn.innerText = 'Đăng xuất'
        logoutBtn.addEventListener('click', acceptToLogout);
        logoutBtn.removeEventListener('click', logout);
    }, 3000)
}

function logout() {
    me.remove();
    render();
    addNotification('success', 'Đăng xuất thành công', 2000);
}

function choiceType(e) {
    if (e.target.tagName !== "LI")
        return;

    const typeList = billTypeSelectList.querySelectorAll('li');
    typeList.forEach(l => l.classList.remove('selected'));

    billType = e.target.dataset.type;
    e.target.classList.add('selected');

    render();
}

logoutBtn.addEventListener('click', acceptToLogout);

updateInforBtn.addEventListener('click', updateUserInfor);

listSideBarBtn.forEach(btn =>
    btn.addEventListener('click', choiceContent)
)

billTypeSelectList.addEventListener('click', choiceType)
