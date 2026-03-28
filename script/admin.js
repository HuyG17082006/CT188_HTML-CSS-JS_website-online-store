const isAdmin = window.me.get()?.isAdmin || false;
const cartController = window.cartController;
const productController = window.productController;



console.table(cartController)
console.table(productController)

if (!isAdmin)
    window.location.replace('../view/home.html');

// Form
const form = document.querySelector('form');

const productContainer = document.querySelector('.product__container');
const addProductBtn = productContainer.querySelector('.add');
const updateProductBtn = productContainer.querySelector('.update');

const formTitle = form.querySelector('h2');
const reviewImgBox = form.querySelector('.review__image__box img');
const uploadBox = form.querySelector('.upload__box');
const imgInput = form.querySelector('.product--image');

const addSyntaxBtn = form.querySelector('.add__syntax');

const cancelFormBtn = form.querySelector('.cancel__btn');

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
    
}

//Form thêm
function addSyntax() {
    if (form.querySelector('.product--spec'))
        console.log(1);
    form.querySelector('.product--spec').value += ' • ';
}

function showAddForm() {
    form.classList.remove('is-hidden');
    formTitle.innerText = 'Thêm hàng hóa';

    if (cancelFormBtn) {
        cancelFormBtn.onclick = () => closeForm();
    }
    resetValidate();
    
    form.onsubmit = (e) => {
        e.preventDefault();
        addProduct();
    }
}

function addProduct() {

    const formData = new FormData(form);

    const reader = new FileReader();

    reader.onload = () => {

    }

    const name = formData.get('product--name');
    const spec = formData.get('product--spec');
    const price = formData.get('product--price');
    const brand = formData.get('product--brand');
    const type = formData.get('product--category');
    let imgSrc = '';

    reader.onload = () => {
        imgSrc = reader.result;
    }

    const product = {
        name,
        spec,
        price,
        brand,
        type,
        image_src: imgSrc || ''
    }
    const res = validate(product);

    if (!res.isOk) {
        const { nameErr, specErr, brandErr, typeErr, priceErr, imgErr } = res;

        form.querySelector('.error--name').innerText = nameErr;
        form.querySelector('.error--spec').innerText = specErr;
        form.querySelector('.error--brand').innerText = brandErr;
        form.querySelector('.error--category').innerText = typeErr;
        form.querySelector('.error--price').innerText = priceErr;
        form.querySelector('.error--file').innerText = imgErr;
        form.querySelector('.normal__mess').classList.add('is-hidden')
        return;
    }
}

function resetValidate() {
    form.querySelector('.error--name').innerText = '';
    form.querySelector('.error--spec').innerText = '';
    form.querySelector('.error--brand').innerText = '';
    form.querySelector('.error--category').innerText = '';
    form.querySelector('.error--price').innerText = '';
    form.querySelector('.error--file').innerText = '';
    form.querySelector('.normal__mess').classList.remove('is-hidden')
}

function validate({ name, spec, brand, type, price, imgSrc }) {
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
    else if (isNaN(price || Number(price) < 0)) {
        error.priceErr = 'Giá phải là số hợp lệ';
    }

    if (!imgSrc) {
        error.imgErr = 'Vui lòng chọn ảnh';
    }

    const { nameErr, specErr, brandErr, typeErr, priceErr, imgErr } = error;

    if (nameErr || specErr || brandErr || typeErr || priceErr || imgErr)
        return {
            ...error,
            isOk: false
        }

    return {
        isOk: true
    }
}

//Form cập nhật

function showUpdateForm() {
    form.classList.remove('is-hidden');

    formTitle.innerText = 'Sửa thông tin';

    if (cancelFormBtn)
        cancelFormBtn.onclick = () => closeForm();

    resetValidate();
}




uploadBox.addEventListener('click', () => {
    imgInput.click();
})
addSyntaxBtn.addEventListener('click', addSyntax)
imgInput.addEventListener('change', showReviewImage)
addProductBtn.addEventListener('click', showAddForm)
updateProductBtn.addEventListener('click', showUpdateForm)

