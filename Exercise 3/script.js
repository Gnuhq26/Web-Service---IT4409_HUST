// Lấy các phần tử DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const productList = document.getElementById('product-list');

// Hàm tìm kiếm sản phẩm
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

// Hàm toggle form thêm sản phẩm
function toggleAddProductForm() {
    addProductForm.classList.toggle('hidden');
}

// Hàm thêm sản phẩm mới
function addNewProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const desc = document.getElementById('productDesc').value;
    const price = document.getElementById('productPrice').value;
    const imageUrl = document.getElementById('productImage').value;

    const newProduct = document.createElement('article');
    newProduct.className = 'product-item';
    newProduct.innerHTML = `
        <img src="${imageUrl}" alt="${name}" class="product-image">
        <h3>${name}</h3>
        <p>${desc}</p>
        <p>Giá: <span>${price} VNĐ</span></p>
    `;

    productList.appendChild(newProduct);
    addProductForm.reset();
    toggleAddProductForm();
}

// Thêm các event listeners
searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', searchProducts);
addProductBtn.addEventListener('click', toggleAddProductForm);
addProductForm.addEventListener('submit', addNewProduct);