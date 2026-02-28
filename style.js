(function() {
    var cursor = document.getElementById('cursor');
    if (!cursor) return;
    var mouseX = -100, mouseY = -100;
    var cursorX = -100, cursorY = -100;
    var visible = false;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!visible) {
            cursorX = mouseX;
            cursorY = mouseY;
            visible = true;
        }
    });
    function animate() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    // Smooth scroll with fixed header offset for internal links
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var hash = link.getAttribute('href');
        if (!hash || hash.length <= 1) return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        var header = document.querySelector('.header');
        var headerHeight = header ? header.offsetHeight : 0;
        var rect = target.getBoundingClientRect();
        var offsetTop = window.pageYOffset + rect.top - headerHeight;
        window.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });
    });

    // Mobile menu toggle
    var menuIcon = document.querySelector('.menu__icon');
    var menuBody = document.querySelector('.menu__body');
    if (menuIcon && menuBody) {
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('_active');
            menuBody.classList.toggle('_active');
            document.body.classList.toggle('_lock');
        });

        // Close menu when clicking nav links
        var navLinks = menuBody.querySelectorAll('.nav__link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuIcon.classList.remove('_active');
                menuBody.classList.remove('_active');
                document.body.classList.remove('_lock');
            });
        });
    }

    // Hide language modal after selection
    var languageModal = document.getElementById('languageModal');
    if (languageModal) {
        var langButtons = languageModal.querySelectorAll('.lang-btn');
        langButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                languageModal.classList.add('hidden');
                setTimeout(function() {
                    languageModal.style.display = 'none';
                }, 300);
            });
        });
    }
})();
