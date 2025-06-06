document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    addClickyThings();
});

function setupMobileMenu() {
    var menuToggle = document.querySelector('.mobile-menu-btn');
    var navItems = document.querySelector('.nav-list');
    
    if (menuToggle && navItems) {
        menuToggle.addEventListener('click', function() {
            navItems.classList.toggle('active');
            var menuIsOpen = navItems.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', menuIsOpen);
            
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
    addClickyThings: addClickyThings
};