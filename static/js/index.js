// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    function showCopied() {
        button.classList.add('copied');
        copyText.textContent = 'Copied';
        setTimeout(function() {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    }

    navigator.clipboard.writeText(bibtexElement.textContent).then(showCopied).catch(function() {
        // Fallback for older browsers / non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopied();
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    document.querySelector('.scroll-to-top').classList.toggle('visible', window.pageYOffset > 300);
});

// Site tabs in the results explorer
function setupSiteTabs() {
    const tabs = document.querySelectorAll('.site-tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) {
                const active = t === tab;
                t.classList.toggle('is-active', active);
                t.setAttribute('aria-selected', active);
                document.getElementById('site-' + t.dataset.site).hidden = !active;
            });
        });
    });
}

// Click-to-enlarge for figures
function setupLightbox() {
    const box = document.getElementById('lightbox');
    const img = box.querySelector('img');
    const caption = box.querySelector('.lightbox-caption');

    function close() {
        box.classList.remove('is-open');
        box.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll('img.zoomable').forEach(function(el) {
        el.addEventListener('click', function() {
            img.src = el.currentSrc || el.src;
            img.alt = el.alt;
            caption.textContent = el.alt;
            box.classList.add('is-open');
            box.setAttribute('aria-hidden', 'false');
        });
    });

    box.addEventListener('click', close);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') close();
    });
}

// Only play the looping figure video while it is on screen
function setupInlineVideos() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.play().catch(function() {});
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('video.inline-video').forEach(function(v) { observer.observe(v); });
}

document.addEventListener('DOMContentLoaded', function() {
    setupSiteTabs();
    setupLightbox();
    setupInlineVideos();

    if (window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [{ left: '$$', right: '$$', display: true }]
        });
    }
});
