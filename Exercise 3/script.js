const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
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

console.log('Script loaded successfully');