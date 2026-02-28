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
})();
