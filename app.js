// DairyHub eCommerce Application

// Application Data
let appData = {
    products: [],
    categories: [
        {"id": "milk", "name": "Milk", "description": "Fresh and organic milk varieties", "icon": "🥛"},
        {"id": "cheese", "name": "Cheese", "description": "Artisanal and aged cheese selection", "icon": "🧀"},
        {"id": "butter", "name": "Butter", "description": "Creamy butter for all your needs", "icon": "🧈"},
        {"id": "yogurt", "name": "Yogurt", "description": "Healthy and delicious yogurt", "icon": "🥛"},
        {"id": "ice-cream", "name": "Ice Cream", "description": "Premium ice cream flavors", "icon": "🍦"},
        {"id": "cream", "name": "Cream", "description": "Rich cream for cooking and baking", "icon": "🥛"}
    ],
    users: [],
    orders: [],
    reviews: []
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
    // Show prices in Nepalese Rupees (NPR) with grouping and two decimals
    try {
        const formatted = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
        return `रू ${formatted}`;
    } catch (e) {
        return `रू ${price.toFixed(2)}`;
    }
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

// Validate image URLs (only allow absolute http(s) URLs or data URIs)
function isValidImageUrl(url) {
    return typeof url === 'string' && /^(https?:\/\/|data:)/.test(url);
}

// Load product image for an element. Accepts absolute URLs, data: URIs, or storage paths
async function loadProductImage(product, elementId) {
    try {
        const el = document.getElementById(elementId);
        if (!el || !product || !product.image) return;

        const src = product.image;
        if (isValidImageUrl(src)) {
            el.src = src;
            el.style.display = 'block';
            return;
        }

        // Attempt to resolve as a Firebase Storage path
        if (typeof firebase === 'undefined' || typeof firebase.storage === 'undefined') {
            console.debug('Firebase Storage SDK not available; cannot resolve', src);
            return;
        }

        // Normalize common forms: allow 'foo.jpg' or 'product-images/foo.jpg'
        let refPath = src;
        if (!refPath.includes('/') && !refPath.startsWith('product-images/')) {
            refPath = `product-images/${refPath}`;
        }

        const storageRef = firebase.storage().ref().child(refPath);
        const url = await storageRef.getDownloadURL();
        el.src = url;
        el.style.display = 'block';

        // If this is the add product preview, persist the resolved URL so submit uses it
        const form = document.getElementById('addProductForm');
        if (form && elementId === 'addProductPreview') {
            form.dataset.selectedImage = url;
        }
    } catch (err) {
        console.debug('Failed to load product image for', product && product.id, err && err.code ? err.code : err);
    }
}

function showNotification(message, type = 'success', options = {}) {
    // Use Bootstrap toast for non-blocking notifications
    try {
        const container = document.getElementById('toastContainer') || document.body;
        const toastId = `toast_${Date.now()}`;
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-bg-' + (type === 'error' ? 'danger' : (type === 'info' ? 'info' : 'success')) + ' border-0';
        toast.id = toastId;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.style.minWidth = '200px';
        const actionHtml = options.actionLabel ? `<button type="button" class="btn btn-sm btn-light me-2" id="toast_action_${toastId}">${options.actionLabel}</button>` : '';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                ${actionHtml}
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        (container === document.body ? document.body : container).appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { delay: 4000 });
        bsToast.show();
        // bind optional action callback
        if (options.actionLabel && typeof options.actionCallback === 'function') {
            // wait a tick for element to exist
            setTimeout(() => {
                const actionBtn = document.getElementById(`toast_action_${toastId}`);
                if (actionBtn) actionBtn.addEventListener('click', () => {
                    try { options.actionCallback(); } catch (e) { console.error(e); }
                });
            }, 0);
        }

        // auto-remove after hidden
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    } catch (e) {
        console.warn('Toast failed, falling back to alert:', e);
        alert(message);
    }
}

function showLoader() {
    const el = document.getElementById('globalLoader');
    if (el) el.style.display = 'flex';
}

function hideLoader() {
    const el = document.getElementById('globalLoader');
    if (el) el.style.display = 'none';
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

// Login a user with Firebase Auth
async function login(email, password) {
    if (typeof auth === 'undefined' || typeof db === 'undefined') {
        showNotification('Firebase is not initialized. Check your configuration.', 'error');
        return false;
    }

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        // Find user in Firestore users collection
        const userSnapshot = await db.collection('users').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            appState.currentUser = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() };
            updateAuthUI();
            showNotification(`Welcome back, ${appState.currentUser.username}!`);
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            return true;
        } else {
            showNotification('User found in Auth but not in Firestore. Please contact support.', 'error');
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        const message = error && error.message ? error.message : 'Login failed';
        showNotification(message, 'error');
        return false;
    }
}

// Register a new user with Firebase Auth and Firestore
async function register(username, email, password) {
    if (typeof auth === 'undefined' || typeof db === 'undefined') {
        showNotification('Firebase is not initialized. Check your configuration.', 'error');
        return false;
    }

    // Ensure we have the latest users list
    await fetchUsers().catch(() => {});

    const existingUser = appData.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
        showNotification('Username or email already exists', 'error');
        return false;
    }

    const newUser = {
        username,
        email,
        role: 'customer'
    };

    try {
        // Register with Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        // Add user to Firestore
    const userRef = await db.collection('users').add(newUser);
    newUser.id = userRef.id;
    // Refresh local users from Firestore
    await fetchUsers().catch(() => {});
        appState.currentUser = newUser;
        updateAuthUI();
        showNotification(`Welcome to DairyHub, ${username}!`);
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        // Refresh users/orders if needed
        await fetchUsers().catch(() => {});
        return true;
    } catch (error) {
        console.error('Registration error:', error);
        const message = error && error.message ? error.message : 'Registration failed';
        showNotification(message, 'error');
        return false;
    }
}

// Logout user
function logout() {
    auth.signOut().then(() => {
        appState.currentUser = null;
        appState.cart = [];
        updateAuthUI();
        updateCartUI();
        showPage('home');
        showNotification('You have been logged out successfully.');
    });
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

    // Resolve any storage-path images for visible products asynchronously
    productsToShow.forEach(p => {
        if (p.image && !isValidImageUrl(p.image)) {
            // target the img element inside the product card
            loadProductImage(p, `product-image-${p.id}`);
        }
    });

    displayPagination();
}

function createProductCard(product) {
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
    const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
    
    return `
        <div class="product-card">
            <div class="product-image-placeholder" onclick="showProductDetail('${product.id}')">
                <img id="product-image-${product.id}" ${isValidImageUrl(product.image) ? `src="${product.image}"` : ''} alt="${product.name}" class="product-image" style="display:${isValidImageUrl(product.image) ? 'block' : 'none'}">
            </div>
            <div class="card-body">
                <div class="product-brand">${product.brand}</div>
                <h5 class="product-title cursor-pointer" onclick="showProductDetail('${product.id}')">${product.name}</h5>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="rating-stars">${generateStars(product.rating)}</span>
                    <span>(${product.rating})</span>
                </div>
                <div class="stock-info ${stockClass}">${stockText}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}')" 
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
    
    imageContainer.innerHTML = isValidImageUrl(product.image) ? `<img id="product-detail-image" src="${product.image}" alt="${product.name}" style="max-width:100%; height:auto;">` : '<div class="product-image-placeholder" style="height: 400px;"></div>';

    // If image is a storage path, attempt to resolve it
    if (product.image && !isValidImageUrl(product.image)) {
        // create a hidden img element placeholder if not present
        if (!document.getElementById('product-detail-image')) {
            imageContainer.innerHTML = `<img id="product-detail-image" alt="${product.name}" style="max-width:100%; height:auto; display:none;">`;
        }
        loadProductImage(product, 'product-detail-image');
    }
    
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
                <button class="btn btn-primary w-100" onclick="addToCartWithQuantity('${product.id}')" 
                        ${product.stock === 0 ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    loadProductReviews(product.id);
    renderReviewForm(product.id); // <-- Add this line
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

// 1. Add this function to render the review form and handle submission
function renderReviewForm(productId) {
    const container = document.getElementById('reviewFormSection');
    if (!appState.currentUser) {
        container.innerHTML = `<p class="text-muted">Please <a href="#" onclick="showLoginModal()">login</a> to write a review.</p>`;
        return;
    }
    container.innerHTML = `
        <form id="reviewForm" class="mb-3">
            <div class="mb-2">
                <label for="reviewRating" class="form-label">Rating</label>
                <select id="reviewRating" class="form-select" required>
                    <option value="">Select rating</option>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="1">★☆☆☆☆</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="reviewComment" class="form-label">Comment</label>
                <textarea id="reviewComment" class="form-control" rows="2" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Review</button>
        </form>
    `;

    document.getElementById('reviewForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const rating = parseInt(document.getElementById('reviewRating').value);
        const comment = document.getElementById('reviewComment').value.trim();
        if (!rating || !comment) {
            showNotification('Please provide a rating and comment.', 'warning');
            return;
        }
        await addReview(productId, appState.currentUser.id, rating, comment);
        e.target.reset();
    });
}

// Shopping Cart
function addToCart(productId, quantity = 1) {
    const product = appData.products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    if (product.stock === 0) {
        showNotification('Product is out of stock', 'error');
        return;
    }
    
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
                        <div class="cart-item-image"> <img id="product-cart-image-${product.id}" ${isValidImageUrl(product.image) ? `src="${product.image}"` : ''} alt="${product.name}" class="cart-image" style="display:${isValidImageUrl(product.image) ? 'block' : 'none'}"> </div>
                    </div>
                    <div class="col-4">
                        <h6>${product.name}</h6>
                        <p class="text-muted">${product.brand}</p>
                    </div>
                    <div class="col-2">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   onchange="updateCartQuantity('${item.productId}', parseInt(this.value))" min="1" max="${product.stock}">
                            <button class="quantity-btn" onclick="updateCartQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="col-2">
                        <strong>${formatPrice(item.price * item.quantity)}</strong>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${item.productId}')">
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

    // Resolve storage-path images used in the cart
    appState.cart.forEach(item => {
        const product = appData.products.find(p => p.id === item.productId);
        if (product && product.image && !isValidImageUrl(product.image)) {
            loadProductImage(product, `product-cart-image-${product.id}`);
        }
    });
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

async function processOrder() {
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

    try {
    // Save order to Firestore
    await db.collection('orders').add(order);
    // Refresh local orders from Firestore
    await fetchOrders();

        // Update product stock in Firestore
        for (const item of appState.cart) {
            const productRef = db.collection('products').doc(item.productId);
            const product = appData.products.find(p => p.id === item.productId);
            if (product) {
                await productRef.update({ stock: product.stock - item.quantity });
            }
        }

        // Clear cart
        appState.cart = [];
        updateCartUI();

        // Show confirmation
        document.getElementById('orderNumber').textContent = orderId;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        document.getElementById('estimatedDelivery').textContent = formatDate(deliveryDate.toISOString().split('T')[0]);

        showNotification('Order placed successfully!');
        fetchOrders(); // Refresh orders from Firestore
        fetchProducts(); // Refresh products from Firestore
    } catch (error) {
        showNotification('Failed to place order', 'error');
    }
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
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${product.id}')">Delete</button>
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
    if (typeof db === 'undefined') {
        showNotification('Firestore is not available. Cannot update order status.', 'error');
        return;
    }

    (async () => {
        try {
            await db.collection('orders').doc(orderId).update({ status: newStatus });
            // Refresh local orders and UI
            await fetchOrders();
            loadAdminOrders();
            showNotification(`Order ${orderId} status updated to ${newStatus}`);
        } catch (err) {
            console.error('Failed to update order status:', err);
            showNotification('Failed to update order status', 'error');
        }
    })();
}

function showAddProductModal() {
    const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
}

function editProduct(productId) {
    // Open Add Product modal with prefilled values for editing
    const product = appData.products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }

    // Prefill form fields
    const modalEl = document.getElementById('addProductModal');
    const modal = new bootstrap.Modal(modalEl);
    const form = document.getElementById('addProductForm');
    form.dataset.editing = productId;
    // Use input IDs to prefill
    document.getElementById('addProductName').value = product.name || '';
    document.getElementById('addProductCategory').value = product.category || '';
    document.getElementById('addProductPrice').value = product.price || '';
    document.getElementById('addProductStock').value = product.stock || '';
    document.getElementById('addProductBrand').value = product.brand || '';
    document.getElementById('addProductDescription').value = product.description || '';
    // Show preview of existing image if available
    const previewImg = document.getElementById('addProductPreview');
    if (isValidImageUrl(product.image)) {
        previewImg.src = product.image;
        previewImg.style.display = 'block';
        form.dataset.selectedImage = product.image;
    } else {
        previewImg.style.display = 'none';
        delete form.dataset.selectedImage;
    }
    modal.show();
}

async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        // Find the Firestore document with this productId
        const product = appData.products.find(p => p.id === productId);
        if (!product) return;
        try {
            await db.collection('products').doc(product.id).delete();
            showNotification('Product deleted successfully');
            fetchProducts(); // Refresh product list from Firestore
            loadAdminProducts();
        } catch (error) {
            showNotification('Failed to delete product', 'error');
        }
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

// Fetch all products from Firestore 'products' collection
async function fetchProducts() {
    const snapshot = await db.collection('products').get();
    appData.products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // After fetching, update UI as needed
    if (appState.currentPageName === 'products') {
        applyFilters();
    }
    if (appState.currentPageName === 'home') {
        loadFeaturedProducts();
    }
}

// Fetch all users from Firestore 'users' collection
async function fetchUsers() {
    const snapshot = await db.collection('users').get();
    appData.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch all orders from Firestore 'orders' collection
async function fetchOrders() {
    const snapshot = await db.collection('orders').get();
    appData.orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch all reviews from Firestore 'reviews' collection
async function fetchReviews() {
    const snapshot = await db.collection('reviews').get();
    appData.reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a review to Firestore
async function addReview(productId, userId, rating, comment) {
    const review = {
        productId,
        userId,
        rating,
        comment,
        date: new Date().toISOString()
    };
    try {
        await db.collection('reviews').add(review);
        showNotification('Review added successfully!');
        fetchReviews();
        loadProductReviews(productId);
    } catch (error) {
        showNotification('Failed to add review', 'error');
    }
}

// Example usage:
// Removed eager console-fetch; initial data loads happen on DOMContentLoaded

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (await login(email, password)) {
            document.getElementById('loginForm').reset();
        }
    });
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (await register(username, email, password)) {
            document.getElementById('registerForm').reset();
        }
    });
    
    // Add product form
    document.getElementById('addProductForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        showLoader();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        // ARIA-friendly validation
        const nameEl = document.getElementById('addProductName');
        const categoryEl = document.getElementById('addProductCategory');
        const priceEl = document.getElementById('addProductPrice');
        const stockEl = document.getElementById('addProductStock');
        const brandEl = document.getElementById('addProductBrand');
        const descEl = document.getElementById('addProductDescription');

        // Clear previous validation states
        [nameEl, categoryEl, priceEl, stockEl, brandEl, descEl].forEach(el => {
            if (!el) return;
            el.removeAttribute('aria-invalid');
            const prev = el.parentNode && el.parentNode.querySelector('.invalid-feedback');
            if (prev) prev.remove();
        });

        const name = nameEl.value.trim();
        const category = document.getElementById('addProductCategory').value;
        const price = parseFloat(priceEl.value);
        const stock = parseInt(stockEl.value);
        const brand = brandEl.value.trim();
        const description = descEl.value.trim();
        const imageInput = document.getElementById('addProductImage');

    const newProduct = {
            name,
            category,
            price,
            stock,
            brand,
            description,
            rating: 0,
            image: ''
        };

        const editingId = e.target.dataset.editing;

            try {
            // Basic validation with ARIA messages
            const validationErrors = [];
            if (!name) validationErrors.push({ el: nameEl, msg: 'Name is required' });
            if (!category) validationErrors.push({ el: categoryEl, msg: 'Category is required' });
            if (isNaN(price) || price < 0) validationErrors.push({ el: priceEl, msg: 'Enter a valid price' });
            if (isNaN(stock) || stock < 0) validationErrors.push({ el: stockEl, msg: 'Enter valid stock' });
            if (!brand) validationErrors.push({ el: brandEl, msg: 'Brand is required' });
            if (!description) validationErrors.push({ el: descEl, msg: 'Description is required' });

            if (validationErrors.length) {
                validationErrors.forEach(v => {
                    if (!v.el) return;
                    v.el.setAttribute('aria-invalid', 'true');
                    const msg = document.createElement('div');
                    msg.className = 'invalid-feedback';
                    msg.textContent = v.msg;
                    v.el.parentNode.appendChild(msg);
                });
                showNotification('Fix validation errors before submitting', 'warning');
                return;
            }

            // If a library image was selected, use it
                if (formEl.dataset.selectedImage && (!imageInput || !imageInput.files || !imageInput.files[0])) {
                    newProduct.image = formEl.dataset.selectedImage;
                }

            // If an image file is selected, upload it to Firebase Storage
                if (imageInput && imageInput.files && imageInput.files[0]) {
                try {
                    const file = imageInput.files[0];
                    // Use timestamp to create a unique filename
                    const filename = `${Date.now()}_${file.name}`;
                    // Show progress UI
                    const progressWrap = document.getElementById('addProductProgressWrap');
                    const progressBar = document.getElementById('addProductProgress');
                    if (progressWrap) progressWrap.style.display = 'block';

                        // Before uploading: optimistic UI insert when creating new product (no editing)
                        let optimisticInserted = false;
                        let optimisticIndex = -1;
                        const editingId = e.target.dataset.editing;
                        if (!editingId) {
                            // create a lightweight optimistic product to show immediately
                            const optimistic = { ...newProduct, id: 'optimistic_' + generateId(), image: '', _optimistic: true };
                            appData.products.unshift(optimistic);
                            loadAdminProducts();
                            optimisticInserted = true;
                            optimisticIndex = 0;
                        }

                        if (typeof firebase !== 'undefined' && firebase.storage && firebase.storage().ref) {
                        const storageRef = firebase.storage().ref().child(`product-images/${filename}`);
                        const uploadTask = storageRef.put(file);

                        // Wrap upload with progress promise
                        await new Promise((resolve, reject) => {
                            uploadTask.on('state_changed', snapshot => {
                                const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                if (progressBar) { progressBar.style.width = pct + '%'; progressBar.textContent = pct + '%'; }
                            }, err => {
                                reject(err);
                            }, async () => {
                                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                                newProduct.image = downloadURL;
                                resolve();
                            });
                        });
                    } else {
                        // Server fallback (use XHR to track progress)
                        const xhr = new XMLHttpRequest();
                        const serverEndpoint = 'http://127.0.0.1:3001/create-product';
                        const fd = new FormData();
                        fd.append('file', file);
                        fd.append('name', newProduct.name);
                        fd.append('category', newProduct.category);
                        fd.append('price', newProduct.price);
                        fd.append('stock', newProduct.stock);
                        fd.append('brand', newProduct.brand);
                        fd.append('description', newProduct.description);

                        await new Promise((resolve, reject) => {
                            xhr.upload.addEventListener('progress', (e) => {
                                if (e.lengthComputable && progressBar) {
                                    const pct = Math.round((e.loaded / e.total) * 100);
                                    progressBar.style.width = pct + '%';
                                    progressBar.textContent = pct + '%';
                                }
                            });
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState === 4) {
                                    if (xhr.status >= 200 && xhr.status < 300) {
                                        try {
                                            const body = JSON.parse(xhr.responseText);
                                                            if (body && body.product) {
                                                                newProduct.image = body.product.image || '';
                                                                newProduct.id = body.id || (body.product && body.product.id);
                                                                resolve({ serverCreated: true });
                                                            } else {
                                                                resolve({ serverCreated: false });
                                                            }
                                        } catch (e) {
                                            resolve({ serverCreated: false });
                                        }
                                    } else {
                                        reject(new Error('Server upload failed'));
                                    }
                                }
                            };
                            xhr.open('POST', serverEndpoint, true);
                            xhr.send(fd);
                        });
                    }
                } catch (err) {
                    console.error('Storage upload error:', err);
                    // If CORS or network error, attempt fallback to server-side upload endpoint
                    try {
                        const fallbackUrl = '/server/upload';
                        // Attempt relative path first, then absolute if not available
                        const serverEndpoint = (await fetch(fallbackUrl, { method: 'OPTIONS' }).then(r => r.ok).catch(() => false)) ? '/create-product' : '/create-product';
                        const formData = new FormData();
                        formData.append('file', imageInput.files[0]);
                        formData.append('name', newProduct.name);
                        formData.append('category', newProduct.category);
                        formData.append('price', newProduct.price);
                        formData.append('stock', newProduct.stock);
                        formData.append('brand', newProduct.brand);
                        formData.append('description', newProduct.description);
                        const resp = await fetch(serverEndpoint, { method: 'POST', body: formData });
                        if (resp.ok) {
                            const body = await resp.json();
                            if (body && body.product) {
                                // Server created the Firestore doc and returned it
                                newProduct.id = body.id || (body.product && body.product.id);
                                newProduct.image = (body.product && body.product.image) || '';
                                showNotification('Product created via server fallback', 'success');
                                // Clear editing flag so we don't attempt a client-side Firestore write
                                if (!editingId) {
                                    // The server already created the product; skip client add
                                    bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
                                    delete formEl.dataset.selectedImage;
                                    e.target.reset();
                                    await fetchProducts();
                                    loadAdminProducts();
                                    return;
                                }
                            } else {
                                showNotification('Server returned unexpected response', 'error');
                            }
                        } else {
                            const text = await resp.text().catch(() => 'server error');
                            showNotification('Server upload failed: ' + text, 'error');
                        }
                    } catch (srvErr) {
                        console.error('Server upload fallback failed:', srvErr);
                        const msg = err && err.message ? err.message : 'Firebase Storage upload failed';
                        showNotification(msg, 'error');
                    }
                }
            }

            if (editingId) {
                // Update existing product (if no new image provided, do not overwrite image)
                const updateData = { ...newProduct };
                if (!newProduct.image) delete updateData.image;
                await db.collection('products').doc(editingId).update(updateData);
                showNotification('Product updated successfully');
                delete e.target.dataset.editing;
            } else {
                // Attempt to write to Firestore. If optimistic inserted earlier, replace it. If it fails, rollback and show retry.
                try {
                    const docRef = await db.collection('products').add(newProduct);
                    newProduct.id = docRef.id;
                    // Replace optimistic product if present
                    const optIdx = appData.products.findIndex(p => p && p._optimistic);
                    if (optIdx !== -1) {
                        appData.products[optIdx] = newProduct;
                    } else {
                        appData.products.unshift(newProduct);
                    }
                    loadAdminProducts();
                    showNotification('Product added successfully');
                } catch (fireErr) {
                    console.error('Firestore add failed after upload:', fireErr);
                    // Rollback optimistic UI
                    const rolled = appData.products.shift();
                    loadAdminProducts();
                    showNotification('Failed to save product. Retry?', 'error', {
                        actionLabel: 'Retry',
                        actionCallback: async () => {
                            showLoader();
                            try {
                                const docRef = await db.collection('products').add(newProduct);
                                newProduct.id = docRef.id;
                                appData.products.unshift(newProduct);
                                loadAdminProducts();
                                showNotification('Product saved after retry');
                            } catch (retryErr) {
                                console.error('Retry failed:', retryErr);
                                showNotification('Retry failed. Please try again later.', 'error');
                            } finally { hideLoader(); }
                        }
                    });
                    // rethrow to outer catch to surface UI state
                    throw fireErr;
                }
            }

            bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
            delete formEl.dataset.selectedImage;
            e.target.reset();
            await fetchProducts(); // Refresh product list from Firestore
            loadAdminProducts();
            } catch (error) {
                console.error('Product save failed:', error);
                showNotification('Failed to save product', 'error');
            } finally {
                hideLoader();
                if (submitBtn) submitBtn.disabled = false;
                const progressWrap = document.getElementById('addProductProgressWrap');
                const progressBar = document.getElementById('addProductProgress');
                if (progressWrap) progressWrap.style.display = 'none';
                if (progressBar) { progressBar.style.width = '0%'; progressBar.textContent = '0%'; }
            }
    });

    // Image preview and validation
    const imageInput = document.getElementById('addProductImage');
    const previewImg = document.getElementById('addProductPreview');
    const chooseFromLibraryBtn = document.getElementById('chooseFromLibraryBtn');
    const formEl = document.getElementById('addProductForm');

    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (!file) return;

        // Validate type
        if (!/^image\/(jpeg|jpg|png)$/.test(file.type)) {
            showNotification('Only JPG and PNG images are allowed.', 'warning');
            this.value = '';
            previewImg.style.display = 'none';
            return;
        }

        // Validate size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            showNotification('Image must be smaller than 2MB.', 'warning');
            this.value = '';
            previewImg.style.display = 'none';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            // clear any selected library image
            delete formEl.dataset.selectedImage;
        };
        reader.readAsDataURL(file);
    });

    chooseFromLibraryBtn.addEventListener('click', async function() {
        // Open image library modal and load images from Firebase Storage
        const modal = new bootstrap.Modal(document.getElementById('imageLibraryModal'));
        const grid = document.getElementById('imageLibraryGrid');
        grid.innerHTML = '<div class="text-muted">Loading images...</div>';

            try {
            if (typeof firebase === 'undefined' || typeof firebase.storage === 'undefined') {
                throw new Error('firebase.storage is not defined. Make sure Firebase Storage SDK is loaded and firebase.initializeApp was called.');
            }

            const listRef = firebase.storage().ref().child('product-images');
            const res = await listRef.listAll();
            if (!res.items.length) {
                grid.innerHTML = '<div class="text-muted">No images in library.</div>';
            } else {
                grid.innerHTML = '';
                // Load thumbnails
                await Promise.all(res.items.map(async (itemRef) => {
                    try {
                        const url = await itemRef.getDownloadURL();
                        const img = document.createElement('img');
                        img.src = url;
                        img.style.width = '120px';
                        img.style.height = '120px';
                        img.style.objectFit = 'cover';
                        img.style.cursor = 'pointer';
                        img.style.borderRadius = '8px';
                        img.addEventListener('click', function() {
                            // Select this image for product
                            previewImg.src = url;
                            previewImg.style.display = 'block';
                            // Clear file input
                            imageInput.value = '';
                            // store selected image url in form dataset so submit handler knows
                            formEl.dataset.selectedImage = url;
                            modal.hide();
                        });
                        const wrapper = document.createElement('div');
                        wrapper.className = 'm-1';
                        wrapper.appendChild(img);
                        grid.appendChild(wrapper);
                    } catch (err) {
                        console.error('Failed to load image URL', err);
                    }
                }));
            }
            modal.show();
            } catch (err) {
            console.error('Failed to list images:', err);
            const msg = err && err.message ? err.message : 'Failed to load images from Storage';
            grid.innerHTML = `<div class="text-danger">${msg}</div>`;
        }
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
    // Load data from Firestore first, then render UI
    (async function init() {
        try {
            // Guard: ensure firebase globals exist
            if (typeof db === 'undefined' || typeof auth === 'undefined') {
                console.warn('Firebase globals db/auth not found. App will run with local data until Firebase is available.');
                loadHomePage();
                return;
            }

            await Promise.all([
                fetchProducts(),
                fetchUsers(),
                fetchOrders(),
                fetchReviews()
            ]);

            // After data loaded, render UI
            loadHomePage();
        } catch (err) {
            console.error('Initialization failed:', err);
            loadHomePage();
        }
    })();
});