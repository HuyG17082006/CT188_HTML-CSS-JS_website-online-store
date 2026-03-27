const isAdmin = window.me.get().isAdmin;
const cartController = window.cartController;
const productController = window.productController;

const form = document.querySelector('form');

const productContainer = document.querySelector('.product__container');
const addProductBtn = productContainer.querySelector('.add');
const updateProductBtn = productContainer.querySelector('.update');

const formTitle = form.querySelector('h2');
const reviewImgBox = form.querySelector('.review__image__box img');
const imgInput = form.querySelector('.product--image');

const cancelFormBtn = form.querySelector('.cancel__btn');

console.table(cartController)
console.table(productController)

if (!isAdmin)
    window.location.replace('../view/home.html');

// Form

function showReviewImage (e) {
    const file = e.target.files[0];

    if (!file)
        return;

    const url = URL.createObjectURL(file);
    reviewImgBox.src = url;

    reviewImgBox.onload = () => {
        URL.revokeObjectURL(reviewImgBox.src);
    }
}

function closeForm () {
    form.classList.add('is-hidden');
}

//Form thêm

function showAddForm () {
    form.classList.remove('is-hidden');
    
    formTitle.innerText = 'Thêm hàng hóa';

    if (cancelFormBtn)
        cancelFormBtn.onclick = () => closeForm();
}

function addProduct () {

    const formData = new FormData(form);

    const reader = new FileReader();

    reader.onload = () => {

    }

    const name = formData.get('product--name');
    const spec = formData.get('product--spec');
    const price = formData.get('product--price');
    let imgSrc = '';

    reader.onload = () => {
        imgSrc = reader.result;
    }

    const product = {
        name,
        spec,
        price,
        image_src : imgSrc || ''
    }


}

function validate ({name, spec, price, imgSrc}) {
    const error = {
        nameErr : '',
        specErr : '',
        priceErr : '',
        imgErr : ''
    }

    if (!name) {
        error.nameErr = 'Không được bỏ trống!';
    }
     
    if (!spec) {
        error.specErr = 'Không được bỏ trống!';
    }
    else if (/^.+\s•\s.+\s•\s\d+GB\s•\s\d+GB$/.test(spec.trim())) {
        error.specErr = 'Sai định dạng (VD: i5 • Iris Xe • 8GB • 512GB)'
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

    const { nameErr, specErr, priceErr, imgErr } = error;

    if (nameErr || specErr || priceErr || imgErr)
        return {
            ...error,
            isOk : false
        }

    return {
        isOk : true
    }
}

//Form cập nhật

function showUpdateForm () {
    form.classList.remove('is-hidden');
    
    formTitle.innerText = 'Sửa thông tin';

    if (cancelFormBtn)
        cancelFormBtn.onclick = () => closeForm();
}





imgInput.addEventListener('change', showReviewImage)
addProductBtn.addEventListener('click',  showAddForm)
updateProductBtn.addEventListener('click',  showUpdateForm)

