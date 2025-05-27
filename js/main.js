document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    makeScrollSmooth();
    loadImagesSlowly();
    addClickyThings();
    
    console.log('Website is ready.');
});

function setupMobileMenu() {
    var menuToggle = document.querySelector('.mobile-menu-btn');
    var navItems = document.querySelector('.nav-list');
    
    if (menuToggle && navItems) {
        menuToggle.addEventListener('click', function() {
            navItems.classList.toggle('active');
            var menuIsOpen = navItems.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', menuIsOpen);
            // mobile-anim-slide class removed as per user request (animations removed)
        });
        
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navItems.classList.contains('active')) {
                navItems.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navItems.classList.contains('active')) {
                navItems.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }
}

function makeScrollSmooth() {
    var allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(function(link) {
        link.addEventListener('click', function(eventData) {
            var linkTargetId = this.getAttribute('href');
            var targetDiv = document.querySelector(linkTargetId);
            
            if (targetDiv) {
                eventData.preventDefault();
                targetDiv.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function loadImagesSlowly() {
    var pageImages = document.querySelectorAll('img[data-src]');
    
    pageImages.forEach(function(theImage) {
        theImage.src = theImage.dataset.src;
        theImage.classList.remove('lazy');
    });
}

// startPageAnimations function removed as per user request (animations removed)

function addClickyThings() {
    var clickyElements = document.querySelectorAll('.card, .btn, .nav-link-item');
    
    clickyElements.forEach(function(element) {
        if (element.classList.contains('card') && element.querySelector('a')) {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', function(eventData) {
                if (eventData.key === 'Enter' || eventData.key === ' ') {
                    eventData.preventDefault();
                    var theLink = this.querySelector('a');
                    if (theLink) theLink.click();
                }
            });
        }
    });
}

var MyHelpers = {
    makeMoneyLookNice: function(moneyAmount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(moneyAmount);
    },
    
    checkEmailSimple: function(emailAddress) {
        var atSignPos = emailAddress.indexOf('@');
        var dotPos = emailAddress.lastIndexOf('.');
        
        return (
            atSignPos > 0 &&
            dotPos > atSignPos
        );
    }
};

window.MyWebsiteStuff = {
    Helpers: MyHelpers,
    setupMobileMenu: setupMobileMenu,
    makeScrollSmooth: makeScrollSmooth,
    loadImagesSlowly: loadImagesSlowly,
    addClickyThings: addClickyThings
};