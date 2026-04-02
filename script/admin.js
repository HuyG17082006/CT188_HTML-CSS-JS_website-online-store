const isAdmin = window.me.get()?.isAdmin || false;
const cartController = window.cartController;
const productController = window.productController;
const orderController = window.orderController;
const helper = window.helper;

//check
if (!isAdmin) {
    window.location.replace('../view/home.html');
}

const logoutBtn = document.querySelector('.log-out-btn');
logoutBtn.addEventListener('click', () => {
    window.me.remove();
    window.location.reload()
})

// Form
const form = document.querySelector('form');

const addProductBtn = document.querySelector('.product__container .add');
const updateProductBtn = document.querySelector('.product__container .update');

const formTitle = form.querySelector('h2');
const reviewImgBox = form.querySelector('.review__image__box img');
const uploadBox = form.querySelector('.upload__box');
const imgInput = form.querySelector('.product--image');

const addSyntaxBtn = form.querySelector('.add__syntax');

const cancelFormBtn = form.querySelector('.cancel__btn');

const statusBox = form.querySelector('status--box');

function showReviewImage(e) {
    const file = e.target.files[0];

    if (!file)
        return;

    const url = URL.createObjectURL(file);
    reviewImgBox.src = url;

    reviewImgBox.onload = () => {
        URL.revokeObjectURL(reviewImgBox.src);
    }
}

function closeForm() {
    form.classList.add('is-hidden');
    productSelected = ''
}

function productValidate({ name, spec, brand, type, price, image_src }) {
    const error = {
        nameErr: '',
        specErr: '',
        brandErr: '',
        typeErr: '',
        priceErr: '',
        imgErr: ''
    }

    if (!name) {
        error.nameErr = 'Không được bỏ trống!';
    }

    if (!spec) {
        error.specErr = 'Không được bỏ trống!';
    }
    else if (!/^.+\s•\s.+\s•\s\d+GB\s•\s\d+GB$/.test(spec)) {
        error.specErr = 'Sai định dạng (VD: i5 • Iris Xe • 8GB • 512GB)'
    }

    if (!brand) {
        error.brandErr = 'Không được bỏ trống!';
    }

    if (!type) {
        error.typeErr = 'Không được bỏ trống!';
    }

    if (!price) {
        error.priceErr = 'Không được bỏ trống';
    }
    else if (isNaN(price) || Number(price) < 0) {
        error.priceErr = 'Giá phải là số hợp lệ';
    }

    if (!image_src) {
        error.imgErr = 'Vui lòng chọn ảnh';
    }

    const { nameErr, specErr, brandErr, typeErr, priceErr, imgErr } = error;

    if (nameErr || specErr || brandErr || typeErr || priceErr || imgErr)
        return {
            message: {
                ...error
            },
            isOk: false
        }

    return {
        isOk: true,
        message: "Đã thêm sản phẩm mới!"
    }

}


function resetValidate() {
    form.reset();
    form.querySelector('.error--name').innerText = '';
    form.querySelector('.error--spec').innerText = '';
    form.querySelector('.error--brand').innerText = '';
    form.querySelector('.error--category').innerText = '';
    form.querySelector('.error--price').innerText = '';
    form.querySelector('.error--file').innerText = '';
    form.querySelector('.normal__mess').classList.remove('is-hidden')
    form.querySelector('.normal__mess').innerText = 'Tải ảnh lên'
}

function showError(res) {
    const { nameErr, specErr, brandErr, typeErr, priceErr, imgErr } = res;

    form.querySelector('.error--name').innerText = nameErr;
    form.querySelector('.error--spec').innerText = specErr;
    form.querySelector('.error--brand').innerText = brandErr;
    form.querySelector('.error--category').innerText = typeErr;
    form.querySelector('.error--price').innerText = priceErr;
    form.querySelector('.error--file').innerText = imgErr;
    form.querySelector('.normal__mess').classList.add('is-hidden');
}

//Form thêm
function addSyntax() {
    if (form.querySelector('.product--spec'))
        console.log(1);
    form.querySelector('.product--spec').value += ' • ';
}

function showAddForm() {
    resetValidate();

    form.classList.remove('is-hidden');
    formTitle.innerText = 'Thêm hàng hóa';

    if (cancelFormBtn) {
        cancelFormBtn.onclick = (e) => {
            e.preventDefault()
            closeForm()
        };
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        addProduct();
    }
}

function addProduct() {

    const formData = new FormData(form);

    const name = formData.get('product--name');
    const spec = formData.get('product--spec');
    const price = formData.get('product--price');
    const brand = formData.get('product--brand');
    const type = formData.get('product--category');
    const file = formData.get('product--image');


    if (!file || file.size === 0) {
        const product = {
            name,
            spec,
            price,
            brand,
            type,
            image_src: ''
        };

        const res = productValidate(product)

        if (!res.isOk) {
            showError(res.message);
            return;
        }
    }


    const reader = new FileReader();

    reader.onload = () => {

        const product = {
            name,
            spec,
            price,
            brand,
            type,
            image_src: reader.result
        };

        console.log(reader.result)

        const res = productValidate(product);

        if (!res.isOk) {
            showError(res.message)
            return;
        }

        productController.insertProduct({
            ...product,
            price: helper.convertIntToVietNamDong(price),
            isDeleted: false
        })
        addNotification('success', res.message, 2000);
        renderNoti();
    }
    reader.readAsDataURL(file);
}

//Form cập nhật
function handleEditProduct(productSelected) {
    if (productSelected)
        showUpdateForm(productSelected);
    else {
        addNotification('error', 'Chưa chọn sản phẩm!', 2000);
        renderNoti();
    }
}

function showUpdateForm(productSelected) {
    resetValidate();

    form.classList.remove('is-hidden');
    formTitle.innerText = 'Sửa thông tin';

    const product = productController.getProduct(productSelected);

    form.querySelector('[name="product--name"]').value = product.name;
    form.querySelector('[name="product--spec"]').value = product.spec;
    form.querySelector('[name="product--price"]').value = product.price;
    form.querySelector('[name="product--brand"]').value = product.brand;
    form.querySelector('[name="product--category"]').value = product.type;
    form.querySelector('.product--showing--image').src = product.image_src;


    if (cancelFormBtn) {
        cancelFormBtn.onclick = (e) => {
            e.preventDefault()
            closeForm()
        };
    }
}

function saveUpdate () {
    
}

// render 

const sideBarSelectList = document.querySelector('.side__bar ul');

const containerTitle = document.querySelector('.content__container--inner .title')
const billContainer = document.querySelector('.bill__container');
const billListContainer = billContainer.querySelector('.list');
const billTypeSelectList = billContainer.querySelector('.bill__type__list');
const confirmBillBtn = billContainer.querySelector('.confirm');

const productContainer = document.querySelector('.product__container');
const productListContainer = productContainer.querySelector('.list');
const productBrandSelectList = productContainer.querySelector('.product--brand');
const productStateSelectList = productContainer.querySelector('.product--state');
const productSearchInput = productContainer.querySelector('.tool__box--search input');
let mainState = 'bills';

function render() {
    if (mainState === 'bills') {
        productContainer.classList.add('is-hidden');
        billContainer.classList.remove('is-hidden');
        containerTitle.innerText = 'Đơn mua';
        renderBillList();
    }
    else {
        productContainer.classList.remove('is-hidden');
        billContainer.classList.add('is-hidden');
        containerTitle.innerText = 'Hàng hóa';
        renderProductList();
    }
    closeForm();
}


function handleMainState(e) {
    sideBarSelectList.querySelectorAll('li').forEach(li => li.classList.remove('selected'))
    if (e.target.tagName === 'LI' && !e.target.classList.contains('log-out-btn')) {
        mainState = e.target.dataset.mainState;
        e.target.classList.add('selected');
    }
    render();
}

// render Product

let filterProductBrand = '';
let filterProductStatus = '';
let filterProductText = '';
let productSelected = '';

function filterProductList (brand, status, text) {
    let products = productController.getList();

    if (brand)
        products = products.filter(product => product.brand === brand);

    if (status) {  
        let productState = status === 'disable' ? true : false;
        products = products.filter(product => product.isDeleted === productState);
    }

    if (text) {
        let textSearch = text.toLowerCase().trim();
        products = products.filter(product => product.name.toLowerCase().trim().includes(textSearch))
    }

    return products;
}

function renderProductList() {
    productListContainer.innerHTML = ''

    const list = filterProductList(filterProductBrand, filterProductStatus, filterProductText);

    list.forEach(p => productListContainer.appendChild(renderProduct(p)));
}

function renderProduct(product) {
    const productHTML = document.createElement("div");
    productHTML.className = "product";
    productHTML.id = product.id;

    productHTML.innerHTML = `
        <div class="img__box">
            <img src="${product.image_src}">
        </div>
        <div class="info">
            <span class="name">${product.name}</span>
            <span class="spec">${product.spec}</span>
            <span class="price">${product.price}</span>
        </div>
        ${
            product.isDeleted ?
            '<button class="btn__status sell__again">Kinh doanh lại</button>'
            :
            '<button class="btn__status stop__sell">Ngừng kinh doanh</button>'
        }
    `;

    const sellAgainBtn = productHTML.querySelector('.sell__again');
    const stopSellingBtn = productHTML.querySelector('.stop__sell');

    if (sellAgainBtn)
        sellAgainBtn.addEventListener('click', () => {  
            productController.sellAgain(product.id, product);
            renderProductList();
        })
    
    if (stopSellingBtn)
        stopSellingBtn.addEventListener('click', () => {
            productController.stopSelling(product.id, product)
            renderProductList();
        })


    return productHTML;
}

function handleFilterProductBrand(e) {
    filterProductBrand = e.target.value;
    renderProductList();
}

function handleFilterProductStatus(e) {
    filterProductStatus = e.target.value;
    renderProductList();
}

function handleProductSearchText(e) {
    filterProductText = e.target.value;
    console.log(filterProductText)
    renderProductList();
}

function handleProductSelected(e) {
    productListContainer.querySelectorAll('.product').forEach(product => {
        product.classList.remove('selected');
    })
    const product = e.target.closest('.product');
    if (product) {
        productSelected = product.id;
        product.classList.add('selected');
    }
    else {
        productSelected = null;
    }
}

// render bill
let filterBillType = 'ordered';
let billSelected = {
    userId: '',
    orderId: ''
}

function filterBillList() {
    const billList = orderController.getAllBill() || [];
    return result = billList.filter(bill => bill.bill.status === filterBillType);
}

function renderBillList() {
    billListContainer.innerHTML = '';

    const list = filterBillList();

    billListContainer.innerHTML = list
        .map(item => renderBill(item.bill, item.userId))
        .join("");
}

function renderBill(bill, userId) {
    return `
        <div class="bill" data-order-id="${bill.orderId}" data-user-id="${userId}">

            <div class="info-bill">
                <span class="bill-id">Mã đơn: ${bill.orderId}</span>
            </div>
            
            <div class="info-user">
                <span class="date">Ngày đặt: ${bill.date}</span>
                <span class="order-name">Tên người đặt: ${bill.username}</span>
                <span class="address">Địa chỉ: ${bill.address}</span>
            </div>

            <div class="bill__list">
                ${bill.userCart.map(product => {
                    let productDetail = productController.getProduct(product.productId)

                    return `<div class="order__product">
                                    <div class="img__box">
                                        <img src="${productDetail.image_src}" alt="">
                                    </div>
                                    <div class="info">
                                        <span class="name">${productDetail.name}</span>
                                        <span class="spec">${productDetail.spec}</span>
                                        <div class="amount__box">
                                            <span class="amount">x${product.quantity}</span>
                                            <span class="price">${productDetail.price}</span>
                                        </div>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>

            <span class="total">
                ${bill.totalPrice}
            </span>
        </div>
    `;
};

function handleBillSelect(e) {
    billListContainer.querySelectorAll('.bill').forEach(bill => bill.classList.remove('selected'));
    const bill = e.target.closest('.bill');
    if (bill) {
        bill.classList.add('selected');
        billSelected.orderId = bill.dataset.orderId;
        billSelected.userId = bill.dataset.userId;
    } else {
        billSelected.orderId = null;
        billSelected.userId = null;
    }
}

function handleBillType(e) {
    billTypeSelectList.querySelectorAll('li').forEach(li => li.classList.remove('selected'))
    if (e.target.tagName === 'LI') {
        filterBillType = e.target.dataset.billType;
        e.target.classList.add('selected');
    }
    render();
}

function acceptBill() {
    if (!billSelected.orderId || !billSelected.userId) {
        addNotification('error', 'Chưa chọn đơn hàng nào!', 2000);
        renderNoti();
        return;
    }

    const res = orderController.confirmDelivery(billSelected);

    if (!res.isOk) {
        addNotification('error', res.message, 2000);
        renderNoti();
        return;
    }

    addNotification('success', res.message, 2000);
    renderNoti();
    render();
}


render();

productBrandSelectList.addEventListener('click', handleFilterProductBrand)
productStateSelectList.addEventListener('click', handleFilterProductStatus)
productSearchInput.addEventListener('input', handleProductSearchText)

confirmBillBtn.addEventListener('click', acceptBill)
billListContainer.addEventListener('click', handleBillSelect)
billTypeSelectList.addEventListener('click', handleBillType)

sideBarSelectList.addEventListener('click', handleMainState)
uploadBox.addEventListener('click', () => {
    imgInput.click();
})

addSyntaxBtn.addEventListener('click', addSyntax)
imgInput.addEventListener('change', showReviewImage)
addProductBtn.addEventListener('click', showAddForm)
updateProductBtn.addEventListener('click', () => handleEditProduct(productSelected))
document.body.addEventListener('click', (e) => {
    if (mainState === 'bills') {
        handleBillSelect(e)
    }
    else {
        handleProductSelected(e)
    }
})

