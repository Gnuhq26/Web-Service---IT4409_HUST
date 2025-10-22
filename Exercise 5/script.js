const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const productList = document.getElementById('product-list');
const errorMsg = document.getElementById('errorMsg');

function getProductsFromStorage() {

    const productsJSON = localStorage.getItem('products');

    if (productsJSON) {
        return JSON.parse(productsJSON);
    } else {
        return [];
    }
}

function saveProductsToStorage(products) {
    const productsJSON = JSON.stringify(products);
    localStorage.setItem('products', productsJSON);
}

function displayProduct(product) {

    const newProduct = document.createElement('article');
    newProduct.className = 'product-item';
    
    newProduct.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.desc || 'Chưa có mô tả'}</p>
        <p>Giá: <span>${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</span></p>
    `;
    
    productList.appendChild(newProduct);
}

function loadProducts() {

    const products = getProductsFromStorage();
    
    if (products.length > 0) {
        productList.innerHTML = '';
        products.forEach(function(product) {
            displayProduct(product);
        });
    } else {
        initializeDefaultProducts();
    }
}

function initializeDefaultProducts() {
    const defaultProducts = [
        {
            name: 'Bóng Champions League',
            desc: 'Quả bóng này được sử dụng trong trận chung kết vô cùng kịch tính giữa CLB PSG và CLB Inter Milan.',
            price: 2000000
        },
        {
            name: 'Giày bóng đá Toni Kroos 11 Pro',
            desc: 'Đôi giày đã giúp cho cầu thủ người Đức Toni Kroos giành được 6 chiếc cup C1 cùng với 1 danh hiệu World Cup.',
            price: 2999999
        },
        {
            name: 'Thùng đựng nước',
            desc: 'Thùng đựng nước lịch sử dùng để đựng những chai nước của CLB Real Madrid đã cùng với CLB Real Marid vô địch 15 trận chung kết C1.',
            price: 999000
        }
    ];
    
    saveProductsToStorage(defaultProducts);
}


function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(function(product) {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        if (productName.includes(searchTerm)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', searchProducts);

searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

addProductBtn.addEventListener('click', function() {
    addProductForm.classList.toggle('hidden');
});

cancelBtn.addEventListener('click', function() {
    addProductForm.classList.add('hidden');
    addProductForm.reset();
    errorMsg.textContent = '';
});


addProductForm.addEventListener('submit', function(event) {

    event.preventDefault();
    const name = document.getElementById('newName').value.trim();
    const price = document.getElementById('newPrice').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    
    if (!name) {
        errorMsg.textContent = 'Vui lòng nhập tên sản phẩm!';
        return;
    }
    
    if (!price) {
        errorMsg.textContent = 'Vui lòng nhập giá sản phẩm!';
        return;
    }
    
    const priceNumber = Number(price);
    
    if (isNaN(priceNumber)) {
        errorMsg.textContent = 'Giá phải là một số!';
        return;
    }
    
    if (priceNumber <= 0) {
        errorMsg.textContent = 'Giá phải lớn hơn 0!';
        return;
    }
    
    errorMsg.textContent = '';

    const newProductData = {
        name: name,
        desc: desc,
        price: priceNumber
    };
    
    const products = getProductsFromStorage();
    products.unshift(newProductData);
    saveProductsToStorage(products);

    const newProduct = document.createElement('article');
    newProduct.className = 'product-item';
    
    newProduct.innerHTML = `
        <h3>${name}</h3>
        <p>${desc || 'Chưa có mô tả'}</p>
        <p>Giá: <span>${priceNumber.toLocaleString('vi-VN')} VNĐ</span></p>
    `;
    
    productList.insertBefore(newProduct, productList.firstChild);
    
    addProductForm.reset();
    addProductForm.classList.add('hidden');
    
    alert('Thêm sản phẩm thành công! Dữ liệu đã được lưu.');
});

window.addEventListener('load', function() {
    loadProducts();
    console.log('Products loaded from storage');
});

console.log('Script loaded successfully');