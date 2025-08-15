// DairyHub eCommerce Application

// Application Data
let appData = {
    products: [
        {"id": 1, "name": "Fresh Whole Milk", "category": "milk", "price": 3.99, "image": "milk1.jpg", "description": "Farm fresh whole milk, rich in calcium and vitamins", "stock": 50, "rating": 4.5, "brand": "Dairy Farm"},
        {"id": 2, "name": "Organic Skim Milk", "category": "milk", "price": 4.49, "image": "milk2.jpg", "description": "Organic skim milk, perfect for health-conscious consumers", "stock": 30, "rating": 4.2, "brand": "Green Valley"},
        {"id": 3, "name": "Aged Cheddar Cheese", "category": "cheese", "price": 8.99, "image": "cheese1.jpg", "description": "Premium aged cheddar cheese with sharp, rich flavor", "stock": 25, "rating": 4.8, "brand": "Artisan Cheese"},
        {"id": 4, "name": "Fresh Mozzarella", "category": "cheese", "price": 5.99, "image": "cheese2.jpg", "description": "Fresh mozzarella cheese, perfect for pizza and salads", "stock": 40, "rating": 4.6, "brand": "Italian Style"},
        {"id": 5, "name": "Organic Butter", "category": "butter", "price": 6.99, "image": "butter1.jpg", "description": "Creamy organic butter made from grass-fed cows", "stock": 35, "rating": 4.7, "brand": "Organic Fields"},
        {"id": 6, "name": "Salted Butter", "category": "butter", "price": 4.99, "image": "butter2.jpg", "description": "Classic salted butter for cooking and baking", "stock": 45, "rating": 4.3, "brand": "Farm Fresh"},
        {"id": 7, "name": "Greek Yogurt", "category": "yogurt", "price": 5.49, "image": "yogurt1.jpg", "description": "Thick and creamy Greek yogurt, high in protein", "stock": 60, "rating": 4.4, "brand": "Mediterranean"},
        {"id": 8, "name": "Vanilla Ice Cream", "category": "ice-cream", "price": 7.99, "image": "icecream1.jpg", "description": "Premium vanilla ice cream made with real vanilla beans", "stock": 20, "rating": 4.9, "brand": "Creamy Dreams"},
        {"id": 9, "name": "Heavy Cream", "category": "cream", "price": 4.99, "image": "cream1.jpg", "description": "Rich heavy cream for cooking and baking", "stock": 30, "rating": 4.2, "brand": "Dairy Farm"},
        {"id": 10, "name": "Swiss Cheese", "category": "cheese", "price": 9.99, "image": "cheese3.jpg", "description": "Authentic Swiss cheese with characteristic holes", "stock": 15, "rating": 4.5, "brand": "Alpine Dairy"},
        {"id": 11, "name": "Low-Fat Milk", "category": "milk", "price": 3.79, "image": "milk3.jpg", "description": "Low-fat milk for health-conscious families", "stock": 40, "rating": 4.1, "brand": "Healthy Choice"},
        {"id": 12, "name": "Goat Cheese", "category": "cheese", "price": 7.99, "image": "cheese4.jpg", "description": "Creamy goat cheese with tangy flavor", "stock": 20, "rating": 4.3, "brand": "Artisan Cheese"},
        {"id": 13, "name": "Unsalted Butter", "category": "butter", "price": 5.49, "image": "butter3.jpg", "description": "Premium unsalted butter for baking", "stock": 30, "rating": 4.6, "brand": "Baker's Choice"},
        {"id": 14, "name": "Strawberry Yogurt", "category": "yogurt", "price": 4.99, "image": "yogurt2.jpg", "description": "Creamy yogurt with real strawberry pieces", "stock": 50, "rating": 4.2, "brand": "Fruit Fresh"},
        {"id": 15, "name": "Chocolate Ice Cream", "category": "ice-cream", "price": 8.49, "image": "icecream2.jpg", "description": "Rich chocolate ice cream made with cocoa", "stock": 25, "rating": 4.7, "brand": "Creamy Dreams"},
        {"id": 16, "name": "Sour Cream", "category": "cream", "price": 3.99, "image": "cream2.jpg", "description": "Fresh sour cream for cooking and dips", "stock": 35, "rating": 4.0, "brand": "Fresh Valley"},
        {"id": 17, "name": "Almond Milk", "category": "milk", "price": 4.99, "image": "milk4.jpg", "description": "Dairy-free almond milk alternative", "stock": 45, "rating": 4.3, "brand": "Plant Pure"},
        {"id": 18, "name": "Blue Cheese", "category": "cheese", "price": 10.99, "image": "cheese5.jpg", "description": "Premium blue cheese with strong flavor", "stock": 10, "rating": 4.4, "brand": "Gourmet Select"},
        {"id": 19, "name": "Whipped Cream", "category": "cream", "price": 5.99, "image": "cream3.jpg", "description": "Light and fluffy whipped cream", "stock": 25, "rating": 4.1, "brand": "Dairy Delight"},
        {"id": 20, "name": "Mint Ice Cream", "category": "ice-cream", "price": 7.79, "image": "icecream3.jpg", "description": "Refreshing mint ice cream with chocolate chips", "stock": 30, "rating": 4.5, "brand": "Cool Treats"}
    ],
    categories: [
        {"id": "milk", "name": "Milk", "description": "Fresh and organic milk varieties", "icon": "🥛"},
        {"id": "cheese", "name": "Cheese", "description": "Artisanal and aged cheese selection", "icon": "🧀"},
        {"id": "butter", "name": "Butter", "description": "Creamy butter for all your needs", "icon": "🧈"},
        {"id": "yogurt", "name": "Yogurt", "description": "Healthy and delicious yogurt", "icon": "🥛"},
        {"id": "ice-cream", "name": "Ice Cream", "description": "Premium ice cream flavors", "icon": "🍦"},
        {"id": "cream", "name": "Cream", "description": "Rich cream for cooking and baking", "icon": "🥛"}
    ],
    users: [
        {"id": 1, "username": "admin", "email": "admin@dairyhub.com", "role": "admin", "password": "admin123"},
        {"id": 2, "username": "john_doe", "email": "john@email.com", "role": "customer", "password": "password123"},
        {"id": 3, "username": "jane_smith", "email": "jane@email.com", "role": "customer", "password": "password123"}
    ],
    orders: [
        {"id": "ORD001", "userId": 2, "status": "delivered", "total": 15.48, "date": "2025-08-05", "items": [{"productId": 1, "quantity": 2, "price": 3.99}, {"productId": 5, "quantity": 1, "price": 6.99}]},
        {"id": "ORD002", "userId": 3, "status": "shipped", "total": 24.97, "date": "2025-08-08", "items": [{"productId": 3, "quantity": 1, "price": 8.99}, {"productId": 8, "quantity": 2, "price": 7.99}]},
        {"id": "ORD003", "userId": 2, "status": "processing", "total": 10.98, "date": "2025-08-10", "items": [{"productId": 7, "quantity": 2, "price": 5.49}]}
    ],
    reviews: [
        {"id": 1, "productId": 1, "userId": 2, "rating": 5, "comment": "Excellent quality milk, very fresh!", "date": "2025-08-06"},
        {"id": 2, "productId": 3, "userId": 3, "rating": 4, "comment": "Great cheese, perfect for my recipes", "date": "2025-08-07"},
        {"id": 3, "productId": 8, "userId": 2, "rating": 5, "comment": "Best vanilla ice cream ever!", "date": "2025-08-09"}
    ]
};

// Application State
let appState = {
    currentUser: null,
    currentPageName: 'home',
    cart: [],
    filteredProducts: [],
    currentProduct: null,
    currentFilters: {},
    currentSort: 'name',
    currentPageNumber: 1,
    productsPerPage: 12,
    checkoutStep: 1
};

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '☆';
    }
    
    return stars;
}

function showNotification(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close float-end" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Page Navigation
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPageName = page;
        
        // Load page content
        switch(page) {
            case 'home':
                loadHomePage();
                break;
            case 'products':
                loadProductsPage();
                break;
            case 'cart':
                loadCartPage();
                break;
            case 'orders':
                loadOrdersPage();
                break;
            case 'profile':
                loadProfilePage();
                break;
            case 'admin':
                loadAdminPage();
                break;
            case 'checkout':
                loadCheckoutPage();
                break;
        }
    }
}

// Authentication
function showLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

function showRegisterModal() {
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

function login(email, password) {
    const user = appData.users.find(u => u.email === email && u.password === password);
    if (user) {
        appState.currentUser = user;
        updateAuthUI();
        showNotification(`Welcome back, ${user.username}!`);
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        return true;
    }
    return false;
}

function register(username, email, password) {
    const existingUser = appData.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
        return false;
    }
    
    const newUser = {
        id: appData.users.length + 1,
        username,
        email,
        password,
        role: 'customer'
    };
    
    appData.users.push(newUser);
    appState.currentUser = newUser;
    updateAuthUI();
    showNotification(`Welcome to DairyHub, ${username}!`);
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
    return true;
}

function logout() {
    appState.currentUser = null;
    appState.cart = [];
    updateAuthUI();
    updateCartUI();
    showPage('home');
    showNotification('You have been logged out successfully.');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userDropdown = document.getElementById('userDropdown');
    const adminBtn = document.getElementById('adminBtn');
    const usernameSpan = document.getElementById('username');
    
    if (appState.currentUser) {
        loginBtn.classList.add('d-none');
        registerBtn.classList.add('d-none');
        userDropdown.classList.remove('d-none');
        usernameSpan.textContent = appState.currentUser.username;
        
        if (appState.currentUser.role === 'admin') {
            adminBtn.classList.remove('d-none');
        } else {
            adminBtn.classList.add('d-none');
        }
    } else {
        loginBtn.classList.remove('d-none');
        registerBtn.classList.remove('d-none');
        userDropdown.classList.add('d-none');
        adminBtn.classList.add('d-none');
    }
}

// Home Page
function loadHomePage() {
    loadCategories();
    loadFeaturedProducts();
}

function loadCategories() {
    const container = document.getElementById('categoriesGrid');
    container.innerHTML = appData.categories.map(category => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="category-card" onclick="filterByCategory('${category.id}')">
                <div class="category-icon">${category.icon}</div>
                <h5>${category.name}</h5>
                <p>${category.description}</p>
            </div>
        </div>
    `).join('');
}

function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    const featured = appData.products.slice(0, 6);
    container.innerHTML = featured.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            ${createProductCard(product)}
        </div>
    `).join('');
}

function filterByCategory(categoryId) {
    appState.currentFilters = { category: categoryId };
    showPage('products');
}

// Products Page
function loadProductsPage() {
    loadFilters();
    applyFilters();
}

function loadFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sortBy = document.getElementById('sortBy');
    
    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        appData.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    
    const brands = [...new Set(appData.products.map(p => p.brand))];
    brandFilter.innerHTML = '<option value="">All Brands</option>' +
        brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
    
    // Set current filters
    if (appState.currentFilters.category) {
        categoryFilter.value = appState.currentFilters.category;
    }
    
    sortBy.addEventListener('change', () => {
        appState.currentSort = sortBy.value;
        applyFilters();
    });
}

function applyFilters() {
    let filtered = [...appData.products];
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    const categoryValue = categoryFilter ? categoryFilter.value : (appState.currentFilters.category || '');
    if (categoryValue) {
        filtered = filtered.filter(p => p.category === categoryValue);
    }
    
    // Brand filter
    const brandFilter = document.getElementById('brandFilter');
    const brandValue = brandFilter ? brandFilter.value : '';
    if (brandValue) {
        filtered = filtered.filter(p => p.brand === brandValue);
    }
    
    // Price filter
    const minPriceEl = document.getElementById('minPrice');
    const maxPriceEl = document.getElementById('maxPrice');
    const minPrice = minPriceEl ? (parseFloat(minPriceEl.value) || 0) : 0;
    const maxPrice = maxPriceEl ? (parseFloat(maxPriceEl.value) || Infinity) : Infinity;
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
    
    // Search filter
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    const sortBy = document.getElementById('sortBy');
    const sortValue = sortBy ? sortBy.value : appState.currentSort;
    filtered.sort((a, b) => {
        switch(sortValue) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            default: return a.name.localeCompare(b.name);
        }
    });
    
    appState.filteredProducts = filtered;
    displayProducts();
}

function displayProducts() {
    const container = document.getElementById('productsGrid');
    const productCountEl = document.getElementById('productCount');
    
    if (productCountEl) {
        productCountEl.textContent = appState.filteredProducts.length;
    }
    
    if (appState.filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h5>No products found</h5>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            </div>
        `;
        return;
    }
    
    const startIndex = (appState.currentPageNumber - 1) * appState.productsPerPage;
    const endIndex = startIndex + appState.productsPerPage;
    const productsToShow = appState.filteredProducts.slice(startIndex, endIndex);
    
    container.innerHTML = productsToShow.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            ${createProductCard(product)}
        </div>
    `).join('');
    
    displayPagination();
}

function createProductCard(product) {
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
    const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
    
    return `
        <div class="product-card">
            <div class="product-image-placeholder" onclick="showProductDetail(${product.id})"></div>
            <div class="card-body">
                <div class="product-brand">${product.brand}</div>
                <h5 class="product-title cursor-pointer" onclick="showProductDetail(${product.id})">${product.name}</h5>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="rating-stars">${generateStars(product.rating)}</span>
                    <span>(${product.rating})</span>
                </div>
                <div class="stock-info ${stockClass}">${stockText}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function displayPagination() {
    const container = document.getElementById('pagination');
    const totalPages = Math.ceil(appState.filteredProducts.length / appState.productsPerPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination">';
    
    if (appState.currentPageNumber > 1) {
        paginationHTML += `<button class="btn btn-outline-primary" onclick="changePage(${appState.currentPageNumber - 1})">Previous</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === appState.currentPageNumber ? 'active' : '';
        paginationHTML += `<button class="btn btn-outline-primary ${activeClass}" onclick="changePage(${i})">${i}</button>`;
    }
    
    if (appState.currentPageNumber < totalPages) {
        paginationHTML += `<button class="btn btn-outline-primary" onclick="changePage(${appState.currentPageNumber + 1})">Next</button>`;
    }
    
    paginationHTML += '</div>';
    container.innerHTML = paginationHTML;
}

function changePage(page) {
    appState.currentPageNumber = page;
    displayProducts();
}

// Product Detail
function showProductDetail(productId) {
    const product = appData.products.find(p => p.id === productId);
    if (!product) return;
    
    appState.currentProduct = product;
    showPage('productDetail');
    loadProductDetail(product);
}

function loadProductDetail(product) {
    const imageContainer = document.getElementById('productImage');
    const detailsContainer = document.getElementById('productDetails');
    const reviewsContainer = document.getElementById('reviewsSection');
    
    imageContainer.innerHTML = '<div class="product-image-placeholder" style="height: 400px;"></div>';
    
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
    const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
    
    detailsContainer.innerHTML = `
        <div class="product-brand">${product.brand}</div>
        <h1 class="product-title">${product.name}</h1>
        <div class="product-rating mb-3">
            <span class="rating-stars">${generateStars(product.rating)}</span>
            <span>(${product.rating})</span>
        </div>
        <div class="product-price mb-3">${formatPrice(product.price)}</div>
        <div class="stock-info ${stockClass} mb-3">${stockText}</div>
        <p class="product-description mb-4">${product.description}</p>
        <div class="row align-items-center">
            <div class="col-6">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" id="quantity" class="quantity-input" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
            </div>
            <div class="col-6">
                <button class="btn btn-primary w-100" onclick="addToCartWithQuantity(${product.id})" 
                        ${product.stock === 0 ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    loadProductReviews(product.id);
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + delta;
    const max = parseInt(quantityInput.max);
    
    if (newValue >= 1 && newValue <= max) {
        quantityInput.value = newValue;
    }
}

function addToCartWithQuantity(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    addToCart(productId, quantity);
}

function loadProductReviews(productId) {
    const container = document.getElementById('reviewsSection');
    const productReviews = appData.reviews.filter(r => r.productId === productId);
    
    if (productReviews.length === 0) {
        container.innerHTML = '<p class="text-muted">No reviews yet. Be the first to review this product!</p>';
        return;
    }
    
    container.innerHTML = productReviews.map(review => {
        const user = appData.users.find(u => u.id === review.userId);
        return `
            <div class="review-card">
                <div class="review-header">
                    <div>
                        <span class="review-author">${user ? user.username : 'Anonymous'}</span>
                        <div class="rating-stars">${generateStars(review.rating)}</div>
                    </div>
                    <span class="review-date">${formatDate(review.date)}</span>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `;
    }).join('');
}

// Shopping Cart
function addToCart(productId, quantity = 1) {
    const product = appData.products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    const existingItem = appState.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= product.stock) {
            existingItem.quantity = newQuantity;
        } else {
            showNotification('Cannot add more items. Stock limit reached.', 'warning');
            return;
        }
    } else {
        appState.cart.push({
            productId,
            quantity: Math.min(quantity, product.stock),
            price: product.price
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.productId !== productId);
    updateCartUI();
    if (appState.currentPageName === 'cart') {
        loadCartPage();
    }
}

function updateCartQuantity(productId, quantity) {
    const product = appData.products.find(p => p.id === productId);
    const cartItem = appState.cart.find(item => item.productId === productId);
    
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (quantity > product.stock) {
        showNotification('Cannot exceed stock limit.', 'warning');
        return;
    }
    
    if (cartItem) {
        cartItem.quantity = quantity;
        updateCartUI();
        loadCartPage();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'inline';
    } else {
        cartCount.style.display = 'none';
    }
}

function loadCartPage() {
    const container = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (appState.cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h5>Your cart is empty</h5>
                <p>Add some dairy products to get started!</p>
                <button class="btn btn-primary" onclick="showPage('products')">Continue Shopping</button>
            </div>
        `;
        subtotalEl.textContent = '$0.00';
        totalEl.textContent = '$5.99';
        checkoutBtn.disabled = true;
        return;
    }
    
    container.innerHTML = appState.cart.map(item => {
        const product = appData.products.find(p => p.id === item.productId);
        return `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-2">
                        <div class="cart-item-image"></div>
                    </div>
                    <div class="col-4">
                        <h6>${product.name}</h6>
                        <p class="text-muted">${product.brand}</p>
                    </div>
                    <div class="col-2">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   onchange="updateCartQuantity(${item.productId}, parseInt(this.value))" min="1" max="${product.stock}">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="col-2">
                        <strong>${formatPrice(item.price * item.quantity)}</strong>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.productId})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(shipping);
    totalEl.textContent = formatPrice(total);
    checkoutBtn.disabled = false;
}

// Checkout Process
function loadCheckoutPage() {
    if (!appState.currentUser) {
        showNotification('Please login to checkout.', 'warning');
        showLoginModal();
        return;
    }
    
    if (appState.cart.length === 0) {
        showNotification('Your cart is empty.', 'warning');
        showPage('cart');
        return;
    }
    
    appState.checkoutStep = 1;
    showCheckoutStep(1);
    loadCheckoutSummary();
}

function showCheckoutStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    appState.checkoutStep = step;
}

function nextStep() {
    if (appState.checkoutStep < 4) {
        if (validateCurrentStep()) {
            showCheckoutStep(appState.checkoutStep + 1);
            if (appState.checkoutStep === 4) {
                processOrder();
            }
        }
    }
}

function prevStep() {
    if (appState.checkoutStep > 1) {
        showCheckoutStep(appState.checkoutStep - 1);
    }
}

function validateCurrentStep() {
    const currentStep = document.getElementById(`step${appState.checkoutStep}`);
    const inputs = currentStep.querySelectorAll('input[required]');
    
    for (let input of inputs) {
        if (!input.value.trim()) {
            showNotification('Please fill in all required fields.', 'warning');
            input.focus();
            return false;
        }
    }
    
    return true;
}

function processOrder() {
    const orderId = 'ORD' + Date.now().toString().substr(-6);
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = parseFloat(document.querySelector('input[name="shipping"]:checked').value);
    const total = subtotal + shippingCost;
    
    const order = {
        id: orderId,
        userId: appState.currentUser.id,
        status: 'processing',
        total: total,
        date: new Date().toISOString().split('T')[0],
        items: appState.cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
    
    appData.orders.push(order);
    
    // Update product stock
    appState.cart.forEach(item => {
        const product = appData.products.find(p => p.id === item.productId);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    
    // Clear cart
    appState.cart = [];
    updateCartUI();
    
    // Show confirmation
    document.getElementById('orderNumber').textContent = orderId;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    document.getElementById('estimatedDelivery').textContent = formatDate(deliveryDate.toISOString().split('T')[0]);
    
    showNotification('Order placed successfully!');
}

function loadCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = `
        <div class="mb-3">
            ${appState.cart.map(item => {
                const product = appData.products.find(p => p.id === item.productId);
                return `
                    <div class="d-flex justify-content-between mb-2">
                        <span>${product.name} x${item.quantity}</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <hr>
        <div class="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Shipping:</span>
            <span id="checkoutShipping">$5.99</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span id="checkoutTotal">${formatPrice(subtotal + 5.99)}</span>
        </div>
    `;
    
    // Update shipping cost when method changes
    document.addEventListener('change', function(e) {
        if (e.target.name === 'shipping') {
            const shippingCost = parseFloat(e.target.value);
            document.getElementById('checkoutShipping').textContent = formatPrice(shippingCost);
            document.getElementById('checkoutTotal').textContent = formatPrice(subtotal + shippingCost);
        }
    });
}

// Orders Page
function loadOrdersPage() {
    if (!appState.currentUser) {
        showNotification('Please login to view orders.', 'warning');
        showLoginModal();
        return;
    }
    
    const container = document.getElementById('ordersList');
    const userOrders = appData.orders.filter(o => o.userId === appState.currentUser.id);
    
    if (userOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h5>No orders found</h5>
                <p>You haven't placed any orders yet.</p>
                <button class="btn btn-primary" onclick="showPage('products')">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">Placed on ${formatDate(order.date)}</div>
                </div>
                <span class="status-badge ${order.status}">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => {
                    const product = appData.products.find(p => p.id === item.productId);
                    return `
                        <div class="order-item">
                            <div class="order-item-image"></div>
                            <div class="flex-grow-1">
                                <div>${product ? product.name : 'Unknown Product'}</div>
                                <div class="text-muted">Quantity: ${item.quantity}</div>
                            </div>
                            <div>${formatPrice(item.price * item.quantity)}</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="order-total">
                <strong>Total: ${formatPrice(order.total)}</strong>
            </div>
        </div>
    `).join('');
}

// Profile Page
function loadProfilePage() {
    if (!appState.currentUser) {
        showNotification('Please login to view profile.', 'warning');
        showLoginModal();
        return;
    }
    
    document.getElementById('profileUsername').value = appState.currentUser.username;
    document.getElementById('profileEmail').value = appState.currentUser.email;
}

// Admin Functions
function loadAdminPage() {
    if (!appState.currentUser || appState.currentUser.role !== 'admin') {
        showNotification('Access denied. Admin privileges required.', 'error');
        showPage('home');
        return;
    }
    
    showAdminTab('products');
}

function showAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#adminTabs .nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.add('active');
    
    // Find the clicked tab and set it active
    const tabButtons = document.querySelectorAll('#adminTabs .nav-link');
    tabButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === tab) {
            btn.classList.add('active');
        }
    });
    
    switch(tab) {
        case 'products':
            loadAdminProducts();
            break;
        case 'orders':
            loadAdminOrders();
            break;
        case 'analytics':
            loadAdminAnalytics();
            break;
    }
}

function loadAdminProducts() {
    const container = document.getElementById('adminProductsTable');
    container.innerHTML = appData.products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadAdminOrders() {
    const container = document.getElementById('adminOrdersTable');
    container.innerHTML = appData.orders.map(order => {
        const user = appData.users.find(u => u.id === order.userId);
        return `
            <tr>
                <td>${order.id}</td>
                <td>${user ? user.username : 'Unknown'}</td>
                <td>${formatDate(order.date)}</td>
                <td><span class="status-badge ${order.status}">${order.status.toUpperCase()}</span></td>
                <td>${formatPrice(order.total)}</td>
                <td>
                    <select class="form-control form-control-sm" onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
            </tr>
        `;
    }).join('');
}

function loadAdminAnalytics() {
    const totalOrders = appData.orders.length;
    const totalRevenue = appData.orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = appData.products.length;
    const totalCustomers = appData.users.filter(u => u.role === 'customer').length;
    
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalCustomers').textContent = totalCustomers;
}

function updateOrderStatus(orderId, newStatus) {
    const order = appData.orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        showNotification(`Order ${orderId} status updated to ${newStatus}`);
    }
}

function showAddProductModal() {
    const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
}

function editProduct(productId) {
    showNotification('Edit functionality would be implemented here', 'info');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        appData.products = appData.products.filter(p => p.id !== productId);
        loadAdminProducts();
        showNotification('Product deleted successfully');
    }
}

// Search Functions
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim()) {
        showPage('products');
        setTimeout(() => {
            applyFilters();
        }, 100);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (login(email, password)) {
            document.getElementById('loginForm').reset();
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (register(username, email, password)) {
            document.getElementById('registerForm').reset();
        } else {
            showNotification('Username or email already exists', 'error');
        }
    });
    
    // Add product form
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = e.target.elements;
        const newProduct = {
            id: Math.max(...appData.products.map(p => p.id)) + 1,
            name: inputs[0].value,
            category: inputs[1].value,
            price: parseFloat(inputs[2].value),
            stock: parseInt(inputs[3].value),
            brand: inputs[4].value,
            description: inputs[5].value,
            rating: 0,
            image: 'placeholder.jpg'
        };
        
        appData.products.push(newProduct);
        bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        e.target.reset();
        showNotification('Product added successfully');
        loadAdminProducts();
    });
    
    // Search input
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Initialize app
    updateAuthUI();
    updateCartUI();
    loadHomePage();
});