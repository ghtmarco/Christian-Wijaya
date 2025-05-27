document.addEventListener('DOMContentLoaded', function() {
    
    if (document.querySelector('.product-detail-page')) {
        if (typeof productData !== 'undefined') {
            populateProductDetails();
        } else {
            console.error('Product data is not loaded.');
            
            const productPageElement = document.querySelector('.product-detail-page');
            if (productPageElement) {
                productPageElement.innerHTML = '<p style="text-align:center; margin-top: 2rem;">Error: Product data could not be loaded.</p>';
            }
        }
    } else if (document.querySelector('.product-item-grid')) { 
        setupProductsPage();
    }
    
    if (typeof updateCartNumber === "function") { 
        updateCartNumber();
    }
});

function populateProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productPageElement = document.querySelector('.product-detail-page');

    if (!productId || !window.productData) {
        if (productPageElement) {
            productPageElement.innerHTML = '<p style="text-align:center; margin-top: 2rem;">Product ID not provided or data not loaded.</p>';
        }
        return;
    }

    const product = window.productData.find(p => p.id === productId);

    if (!product) {
        if (productPageElement) {
            productPageElement.innerHTML = '<p style="text-align:center; margin-top: 2rem;">Product not found.</p>';
        }
        return;
    }

    document.title = product.name + " - Christian Wijaya";

    const breadcrumbCurrent = document.querySelector('.page-path .current-page');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;

    const mainImageElement = document.querySelector('.gallery-main-img');
    if (mainImageElement) mainImageElement.style.backgroundImage = 'url(' + product.imageSrc + ')';
    
    const titleElement = document.querySelector('.product-details-title');
    if (titleElement) titleElement.textContent = product.name;

    const descElement = document.querySelector('.product-details-desc');
    if (descElement) descElement.textContent = product.descriptionLong;

    const priceElement = document.querySelector('.price-now.base-cost');
    if (priceElement) {
        priceElement.textContent = 'Rp ' + product.price.toLocaleString('id-ID');
        priceElement.dataset.price = product.price;
    }
    
    const totalCostDisplaySpan = document.querySelector('.total-cost-display span');
    if (totalCostDisplaySpan && priceElement) { 
         totalCostDisplaySpan.textContent = 'Rp ' + product.price.toLocaleString('id-ID'); 
    }


    const sizeButtonsContainer = document.querySelector('.size-option-buttons');
    if (sizeButtonsContainer) {
        sizeButtonsContainer.innerHTML = '';
        product.availableSizes.forEach((size, index) => {
            const button = document.createElement('button');
            button.className = 'btn size-option-btn';
            if (index === 0) { 
                 button.classList.add('active');
            }
            button.dataset.size = size;
            button.textContent = size;
            sizeButtonsContainer.appendChild(button);
        });
    }
    const selectedSizeInput = document.querySelector('input[name="selectedSize"]');
    if (selectedSizeInput && product.availableSizes.length > 0) {
        selectedSizeInput.value = product.availableSizes[0];
    }


    const detailsGrid = document.querySelector('.detail-info-grid');
    if (detailsGrid) {
        detailsGrid.innerHTML = `
            <div class="detail-info-row">
                <span class="detail-info-label">Material</span>
                <span class="detail-info-value">${product.details.material || 'N/A'}</span>
            </div>
            <div class="detail-info-row">
                <span class="detail-info-label">Care</span>
                <span class="detail-info-value">${product.details.care || 'N/A'}</span>
            </div>
            <div class="detail-info-row">
                <span class="detail-info-label">Fit</span>
                <span class="detail-info-value">${product.details.fit || 'N/A'}</span>
            </div>
            <div class="detail-info-row">
                <span class="detail-info-label">Origin</span>
                <span class="detail-info-value">${product.details.origin || 'N/A'}</span>
            </div>
            <div class="detail-info-row">
                <span class="detail-info-label">SKU</span>
                <span class="detail-info-value">${product.details.sku || 'N/A'}</span>
            </div>
        `;
    }
    
    if (productPageElement) {
        productPageElement.dataset.productId = product.id;
    }

    
    if (typeof setupSizes === "function") setupSizes();
    if (typeof setupCartButtons === "function") setupCartButtons();
    
    
    
}

function setupProductsPage() {
    doProductSearch();
    setupFilters();
    setupGallery();
    setupSizes();
    setupCartButtons();
    setupHoverEffects();
}

function doProductSearch() {
    var searchInput = document.querySelector('.search-input');
    var productGrid = document.querySelector('.product-item-grid');
    
    if (searchInput && productGrid) {
        searchInput.addEventListener('input', function() {
            var searchTerm = this.value.toLowerCase().trim();
            filterItems(searchTerm);
        });
    }
}

function filterItems(searchTerm) {
    var products = document.querySelectorAll('.product-box');
    var visibleCount = 0;
    
    products.forEach(function(product) {
        var productName = product.querySelector('.product-box-name');
        var productDescription = product.querySelector('.product-box-desc');
        
        if (productName) {
            var name = productName.textContent.toLowerCase();
            var description = productDescription ? productDescription.textContent.toLowerCase() : '';
            
            if (name.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        }
    });
    
    showNoResults(visibleCount, searchTerm);
}

function showNoResults(visibleCount, searchTerm) {
    var noResultsMsg = document.querySelector('.no-results-alert');
    
    if (visibleCount === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-alert';
            var productGrid = document.querySelector('.product-item-grid');
            if (productGrid) {
                productGrid.appendChild(noResultsMsg);
            }
        }
        noResultsMsg.innerHTML = `
            <p>No items for "${searchTerm}"</p>
            <p>Try other words.</p>
        `;
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function setupFilters() {
    var filterButtons = document.querySelectorAll('.filter-buttons .btn');
    
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var filterType = this.dataset.filter;
            var filterValue = this.dataset.value;
            
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            applyFilter(filterType, filterValue);
        });
    });
}

function applyFilter(filterType, filterValue) {
    var products = document.querySelectorAll('.product-box');
    
    products.forEach(function(product) {
        var shouldShow = checkItemMatch(product, filterType, filterValue);
        
        if (shouldShow) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function checkItemMatch(product, filterType, filterValue) {
    if (filterValue === 'all') return true;
    
    var productData = {
        category: product.dataset.category || ''
    };
    
    if (filterType === 'category') {
        return productData.category === filterValue;
    } else {
        return true;
    }
}

function setupGallery() {
    var galleryImages = document.querySelectorAll('.gallery-item');
    var mainImage = document.querySelector('.gallery-main-img');
    
    galleryImages.forEach(function(image) {
        image.addEventListener('click', function() {
            if (mainImage) {
                mainImage.style.backgroundImage = this.style.backgroundImage;
            }
            
            galleryImages.forEach(function(img) {
                img.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

function setupSizes() {
    var sizeOptions = document.querySelectorAll('.size-option-btn');
    
    sizeOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            sizeOptions.forEach(function(opt) {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            var sizeInput = document.querySelector('input[name="selectedSize"]');
            if (sizeInput) {
                sizeInput.value = this.dataset.size;
            }
            
            checkSizeStatus(this.dataset.size);
        });
    });
}

function checkSizeStatus(size) {
    var unavailableSizes = ['XS'];
    var addToCartBtn = document.querySelector('.add-to-cart-btn-primary');
    
    if (unavailableSizes.includes(size)) {
        if (addToCartBtn) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Size Unavailable';
        }
        showSizeWarning(size);
    } else {
        if (addToCartBtn) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
        }
        hideSizeWarning();
    }
}

function showSizeWarning(size) {
    var message = document.querySelector('.size-unavailable-message');
    
    if (!message) {
        message = document.createElement('div');
        message.className = 'size-unavailable-message';
        var sizeSelector = document.querySelector('.size-select-box');
        if (sizeSelector) {
            sizeSelector.appendChild(message);
        }
    }
    
    message.textContent = 'Size ' + size + ' is not available. Pick a different size.';
    message.style.display = 'block';
}

function hideSizeWarning() {
    var message = document.querySelector('.size-unavailable-message');
    if (message) {
        message.style.display = 'none';
    }
}

function setupCartButtons() {
    var addToCartBtns = document.querySelectorAll('.add-to-cart-btn-primary');
    var orderNowBtns = document.querySelectorAll('.order-now-btn-secondary');
    
    addToCartBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            doAddToCart(this);
        });
    });
    
    orderNowBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            doOrderNow(this);
        });
    });
}

function doAddToCart(button) {
    var productData = getProductInfo();
    
    if (checkProductInfo(productData)) {
        addItemToCart(productData);
        showCartAddOk(button);
        updateCartNumber();
    }
}

function doOrderNow(button) {
    var productData = getProductInfo();
    
    if (checkProductInfo(productData)) {
        goToOrderPage(productData);
    }
}

function getProductInfo() {
    return {
        id: document.querySelector('.product-detail-page')?.dataset.productId || '',
        name: document.querySelector('.product-details-title')?.textContent || '',
        price: parseFloat(document.querySelector('.base-cost')?.dataset.price) || 0,
        quantity: parseInt(document.querySelector('.qty-text-input')?.value) || 1,
        size: document.querySelector('.size-option-btn.active')?.dataset.size || ''
    };
}

function checkProductInfo(productData) {
    var problemList = [];
    
    if (!productData.size) {
        problemList.push('Pick a size.');
    }
    
    if (productData.quantity < 1) {
        problemList.push('Pick a good quantity.');
    }
    
    if (problemList.length > 0) {
        alert('Fix these problems: ' + problemList.join(', '));
        return false;
    }
    
    return true;
}

function addItemToCart(productData) {
    alert(productData.name + " (Quantity: " + productData.quantity + ", Size: " + productData.size + ") added to cart (simulation).");
}

function showCartAddOk(button) {
    var originalText = button.textContent;
    button.textContent = 'Added!';
    
    setTimeout(function() {
        button.textContent = originalText;
    }, 2000);
}

function updateCartNumber() {
    var cartCounters = document.querySelectorAll('.cart-counter');
    cartCounters.forEach(function(counter) {
        counter.textContent = '0';
        counter.style.display = 'none';
    });
}

function goToOrderPage(productData) {
    alert('Going to order page for: ' + productData.name);
}

function setupHoverEffects() {
    var productCards = document.querySelectorAll('.product-box');
    
    productCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        card.addEventListener('click', function() {
            var productId = this.dataset.productId;
            if (productId) {
                window.location.href = 'product-detail.html?id=' + productId;
            }
        });
    });
}
