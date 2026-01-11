const Utilsly = {
    initCurrentTool: () => {
        console.log('Initializing tool for:', window.location.pathname);
        // Page-specific initialization logic can go here
        // For example, if we were on the home page, we might re-bind feed switching
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            if (typeof switchFeed === 'function') {
                // switchFeed is defined globally in index.html, usually we'd move it to a JS file
            }
        }
    },
    cleanupCurrentTool: () => {
        console.log('Cleaning up current tool...');
    }
};

// Navigation Order for Slide Logic
const NAV_ORDER = {
    'index.html': 0,
    '/': 0,
    'explore.html': 1,
    'community.html': 2,
    'my.html': 3
};

function getNavIndex(url) {
    const page = url.split('/').pop() || 'index.html';
    return NAV_ORDER[page] !== undefined ? NAV_ORDER[page] : -1; // -1 for non-nav pages like view/room
}

async function loadPage(url) {
    try {
        const currentMain = document.querySelector('main');
        const isMobile = window.innerWidth <= 768;

        // Determine Direction
        let slideClassOut = 'fade-out';
        let slideClassIn = 'fade-in';

        if (isMobile) {
            const currentUrl = window.location.pathname;
            const currentIndex = getNavIndex(currentUrl);
            const nextIndex = getNavIndex(url);

            // Only slide if moving between main nav items
            if (currentIndex !== -1 && nextIndex !== -1) {
                if (nextIndex > currentIndex) {
                    // Moving Right (Next) -> Slide Out Left, Slide In from Right
                    slideClassOut = 'slide-out-left';
                    slideClassIn = 'slide-in-right';
                } else if (nextIndex < currentIndex) {
                    // Moving Left (Prev) -> Slide Out Right, Slide In from Left
                    slideClassOut = 'slide-out-right';
                    slideClassIn = 'slide-in-left';
                }
            }
        }

        if (currentMain) {
            currentMain.classList.add(slideClassOut);
            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.querySelector('main');

        if (newMain && currentMain) {
            Utilsly.cleanupCurrentTool();

            // Cleanly swap content
            currentMain.innerHTML = newMain.innerHTML;
            currentMain.className = newMain.className; // Maintain original classes

            // Update Title
            document.title = doc.title;

            // Update Navigation active states
            updateNavActiveStates(url);

            Utilsly.initCurrentTool();

            // Clean classes and Trigger In-Animation
            currentMain.classList.remove('fade-out', 'slide-out-left', 'slide-out-right');

            // Force reflow
            void currentMain.offsetWidth;

            currentMain.classList.add(slideClassIn);

            // Remove animation class after completion
            setTimeout(() => {
                currentMain.classList.remove('fade-in', 'slide-in-right', 'slide-in-left');
            }, 300);

            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            window.location.href = url;
        }
    } catch (error) {
        console.error('Failed to load page:', error);
        window.location.href = url;
    }
}

function MapsTo(url) {
    if (window.location.href === url) return;
    history.pushState(null, '', url);
    loadPage(url);
}

function updateNavActiveStates(url) {
    const page = url.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
    // Intercept clicks on internal links
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
            const url = new URL(link.href);
            const isInternal = url.origin === window.location.origin;
            const isHtml = url.pathname.endsWith('.html') || url.pathname.endsWith('/');

            if (isInternal && isHtml) {
                e.preventDefault();
                MapsTo(link.href);
            }
        }

        // Handle elements with onclick="location.href='...'"
        const clickTarget = e.target.closest('[onclick*="location.href"]');
        if (clickTarget) {
            const onclickAttr = clickTarget.getAttribute('onclick');
            const match = onclickAttr.match(/location\.href=['"]([^'"]+)['"]/);
            if (match) {
                const url = match[1];
                if (!url.startsWith('http') && url.endsWith('.html')) {
                    e.preventDefault();
                    // We need to stop the original onclick from firing if possible, 
                    // but since it's an inline attribute, we might just call MapsTo and stop propagation
                    e.stopImmediatePropagation();
                    MapsTo(url);
                }
            }
        }
    });

    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    // Inject Pretendard font link if not already present
    if (!document.querySelector('link[href*="pretendard"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }

    // Inject Header
    const headerTarget = document.getElementById('app-header-target');
    if (headerTarget) {
        // Standard Right Content for all pages
        const rightContent = `
            <div style="display: flex; gap: 12px; align-items: center;">
                <button onclick="MapsTo('create.html')" style="width: 36px; height: 36px; border-radius: 50%; background: var(--text-main); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #E5E7EB; overflow: hidden; cursor: pointer;" onclick="MapsTo('my.html')">
                    <!-- Avatar -->
                </div>
            </div>
        `;

        headerTarget.innerHTML = `
            <header class="app-header">
                <div class="header-inner">
                    <div class="logo-area" onclick="MapsTo('index.html')" style="cursor: pointer;">Debable</div>
                    ${rightContent}
                </div>
            </header>
        `;
    }

    // Inject Left Sidebar
    const sidebarTarget = document.getElementById('left-sidebar-target');
    if (sidebarTarget) {
        const getActiveClass = (target) => (page === target ? 'active' : '');

        sidebarTarget.innerHTML = `
            <nav class="left-sidebar">
                <a href="index.html" class="nav-item ${getActiveClass('index.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    홈
                </a>
                <a href="explore.html" class="nav-item ${getActiveClass('explore.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    탐색
                </a>
                <a href="community.html" class="nav-item ${getActiveClass('community.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    커뮤니티
                </a>
                <a href="my.html" class="nav-item ${getActiveClass('my.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    MY
                </a>
            </nav>
        `;
    }

    // Inject Mobile Nav
    const mobileNavTarget = document.getElementById('mobile-nav-target');
    if (mobileNavTarget) {
        const getActiveClass = (target) => (page === target ? 'active' : '');

        mobileNavTarget.innerHTML = `
            <nav class="mobile-nav">
                <a href="index.html" class="mobile-nav-item ${getActiveClass('index.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>홈</span>
                </a>
                <a href="explore.html" class="mobile-nav-item ${getActiveClass('explore.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>탐색</span>
                </a>
                <a href="community.html" class="mobile-nav-item ${getActiveClass('community.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>커뮤니티</span>
                </a>
                <a href="my.html" class="mobile-nav-item ${getActiveClass('my.html')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>MY</span>
                </a>
            </nav>
        `;
    }

    Utilsly.initCurrentTool();
});

