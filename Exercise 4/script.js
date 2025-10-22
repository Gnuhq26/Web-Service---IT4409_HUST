const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const productList = document.getElementById('product-list');
const errorMsg = document.getElementById('errorMsg');

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
    
    alert('Thêm sản phẩm thành công!');
});

console.log('Script loaded successfully.');