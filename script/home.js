const products = window.productController ? window.productController.getList() : [];
const productContainer = document.querySelector(".list__products");

const officeBtn = document.querySelectorAll(".laptop-item")[0];
const codingBtn = document.querySelectorAll(".laptop-item")[1];
const gamingBtn = document.querySelectorAll(".laptop-item")[2];

function renderProducts(productList) {
    if (!productContainer) return;
    productContainer.innerHTML = "";

    productList.forEach(product => {
        const div = document.createElement("div");
        div.className = "product__item"; 

        div.innerHTML = `
            <div class="product__image-container">
                <img src="${product.image_src}" alt="${product.name}" class="product__image">
                <div class="cart-icon-badge" onclick="handleAddToCart('${product.id}')">
                    <img src="../assets/icon/shopping-cart-white.svg" alt="add to cart">
                </div>
            </div>
            <h3 class="product__item--name">${product.name}</h3>
            <a class="product__spec">${product.spec}</a>
            <p class="product__price">${product.price}</p>
        `;
        productContainer.appendChild(div);
    });
}

function handleAddToCart(productId) {
    if (window.cartController && window.cartController.addToCart(productId)) {
            window.addNotification('success', 'Đã thêm vào giỏ hàng', 2000);
    } else {
            window.addNotification('error', 'Vui lòng đăng nhập', 2000);
    }
    renderNoti();
}

function filterProducts(type) {
    const filtered = products.filter(p => p.type === type);
    renderProducts(filtered);
}

if(officeBtn) officeBtn.addEventListener("click", () => filterProducts("office"));
if(codingBtn) codingBtn.addEventListener("click", () => filterProducts("study"));
if(gamingBtn) gamingBtn.addEventListener("click", () => filterProducts("gaming"));
