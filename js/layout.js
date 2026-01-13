// Page order for directional navigation
const PAGE_ORDER = ['index.html', 'explore.html', 'community.html', 'my.html', 'view.html', 'create.html'];

// URL normalization - handle both /page and /page.html
function normalizePageName(url) {
    let page = url.split('/').pop() || 'index.html';
    // Remove query string and hash
    page = page.split('?')[0].split('#')[0];
    // Add .html if missing
    if (!page.includes('.html') && page !== '') {
        page = page + '.html';
    }
    // Default to index.html
    if (page === '' || page === '.html') {
        page = 'index.html';
    }
    return page;
}

function getPageIndex(url) {
    const page = normalizePageName(url);
    const idx = PAGE_ORDER.indexOf(page);
    return idx === -1 ? 0 : idx;
}

let currentPageIndex = getPageIndex(window.location.pathname);

const Utilsly = {
    initCurrentTool: () => {
        // Page-specific initialization
    },
    cleanupCurrentTool: () => {
        // Cleanup before page change
    }
};

function isMobile() {
    return window.innerWidth <= 768;
}

// Icon SVGs - Active and Inactive states
const ICONS = {
    home: {
        inactive: `<svg viewBox="0 0 576 512" fill="currentColor"><path d="M541.1 241.4c10.6 8.8 12.1 24.3 3.3 34.9s-24.3 12.1-34.9 3.3L480 254.1V432c0 44.2-35.8 80-80 80H176c-44.2 0-80-35.8-80-80V254.1L66.5 279.6c-10.6 8.8-26.1 7.3-34.9-3.3s-7.3-26.1 3.3-34.9l224-186.6c9.5-7.9 23.1-7.9 32.6 0l224 186.6zM144 432c0 17.7 14.3 32 32 32H208V384c0-44.2 35.8-80 80-80s80 35.8 80 80v80h32c17.7 0 32-14.3 32-32V206.7L288 91.6 144 206.7V432zm176 32V384c0-17.7-14.3-32-32-32s-32 14.3-32 32v80h64z"/></svg>`,
        active: `<svg viewBox="0 0 576 512" fill="currentColor"><path d="M298.6 41.4c-9.5-7.9-23.1-7.9-32.6 0l-224 186.6c-10.6 8.8-12.1 24.3-3.3 34.9s24.3 12.1 34.9 3.3L96 246.5V432c0 44.2 35.8 80 80 80h224c44.2 0 80-35.8 80-80V246.5l22.5 19.7c10.6 8.8 26.1 7.3 34.9-3.3s7.3-26.1-3.3-34.9l-224-186.6zM368 432H208V384c0-44.2 35.8-80 80-80s80 35.8 80 80v48z"/></svg>`
    },
    explore: {
        inactive: `<svg viewBox="0 0 640 640" fill="currentColor"><path d="M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM370.7 389.1L226.4 444.6C207 452.1 187.9 433 195.4 413.6L250.9 269.3C254.2 260.8 260.8 254.2 269.3 250.9L413.6 195.4C433 187.9 452.1 207 444.6 226.4L389.1 370.7C385.8 379.2 379.2 385.8 370.7 389.1zM352 320C352 302.3 337.7 288 320 288C302.3 288 288 302.3 288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320z"/></svg>`,
        active: `<svg viewBox="0 0 640 640" fill="currentColor"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM370.7 389.1L226.4 444.6C207 452.1 187.9 433 195.4 413.6L250.9 269.3C254.2 260.8 260.8 254.2 269.3 250.9L413.6 195.4C433 187.9 452.1 207 444.6 226.4L389.1 370.7C385.9 379.2 379.2 385.8 370.7 389.1zM352 320C352 302.3 337.7 288 320 288C302.3 288 288 302.3 288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320z"/></svg>`
    },
    community: {
        inactive: `<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>`,
        active: `<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/></svg>`
    },
    my: {
        inactive: `<svg viewBox="0 0 448 512" fill="currentColor"><path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"/></svg>`,
        active: `<svg viewBox="0 0 448 512" fill="currentColor"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>`
    }
};

async function loadPage(url, direction = 0) {
    try {
        const currentMain = document.querySelector('main');
        if (currentMain && isMobile() && direction !== 0) {
            const exitClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
            currentMain.classList.add(exitClass);
            await new Promise(resolve => setTimeout(resolve, 150));
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.querySelector('main');

        if (newMain && currentMain) {
            Utilsly.cleanupCurrentTool();

            currentMain.innerHTML = newMain.innerHTML;
            currentMain.className = newMain.className;

            document.title = doc.title;

            // Update navigation active states with proper icons
            updateNavActiveStates(url);

            // Update right sidebar content from new page
            const newRightSidebar = doc.querySelector('.right-sidebar');
            const currentRightSidebar = document.querySelector('.right-sidebar');
            if (newRightSidebar && currentRightSidebar) {
                currentRightSidebar.innerHTML = newRightSidebar.innerHTML;
            }

            Utilsly.initCurrentTool();

            if (isMobile() && direction !== 0) {
                currentMain.classList.remove('slide-out-left', 'slide-out-right');
                const enterClass = direction > 0 ? 'slide-in-left' : 'slide-in-right';
                currentMain.classList.add(enterClass);
                setTimeout(() => currentMain.classList.remove(enterClass), 200);
            }

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

    const targetIndex = getPageIndex(url);
    const direction = targetIndex - currentPageIndex;
    currentPageIndex = targetIndex;

    history.pushState({ pageIndex: targetIndex }, '', url);
    loadPage(url, direction);
}

function updateNavActiveStates(url) {
    const page = normalizePageName(url);

    // Update desktop nav
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        const iconKey = getIconKey(href);
        const isActive = href === page;

        item.classList.toggle('active', isActive);
        const svgContainer = item.querySelector('.nav-icon');
        if (svgContainer && ICONS[iconKey]) {
            svgContainer.innerHTML = isActive ? ICONS[iconKey].active : ICONS[iconKey].inactive;
        }
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        const iconKey = getIconKey(href);
        const isActive = href === page;

        item.classList.toggle('active', isActive);
        const svgContainer = item.querySelector('.mobile-nav-icon');
        if (svgContainer && ICONS[iconKey]) {
            svgContainer.innerHTML = isActive ? ICONS[iconKey].active : ICONS[iconKey].inactive;
        }
    });
}

function getIconKey(href) {
    if (href.includes('index')) return 'home';
    if (href.includes('explore')) return 'explore';
    if (href.includes('community')) return 'community';
    if (href.includes('my')) return 'my';
    return 'home';
}

window.addEventListener('popstate', (e) => {
    const targetIndex = e.state?.pageIndex ?? getPageIndex(window.location.pathname);
    const direction = targetIndex - currentPageIndex;
    currentPageIndex = targetIndex;
    loadPage(window.location.pathname, direction);
});

document.addEventListener('DOMContentLoaded', () => {
    history.replaceState({ pageIndex: currentPageIndex }, '', window.location.href);

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

        const clickTarget = e.target.closest('[onclick*="location.href"]');
        if (clickTarget) {
            const onclickAttr = clickTarget.getAttribute('onclick');
            const match = onclickAttr.match(/location\.href=['"]([^'"]+)['"]/);
            if (match) {
                const url = match[1];
                if (!url.startsWith('http') && url.endsWith('.html')) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    MapsTo(url);
                }
            }
        }
    });

    const path = window.location.pathname;
    const page = normalizePageName(path);

    // Inject font
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
        headerTarget.innerHTML = `
            <header class="app-header">
                <div class="header-inner">
                    <div class="logo-area" onclick="MapsTo('index.html')" style="cursor: pointer;">Debable</div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <button onclick="MapsTo('create.html')" style="width: 36px; height: 36px; border-radius: 50%; background: var(--text-main); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #E5E7EB; overflow: hidden; cursor: pointer;" onclick="MapsTo('my.html')"></div>
                    </div>
                </div>
            </header>
        `;
    }

    // Inject Left Sidebar
    const sidebarTarget = document.getElementById('left-sidebar-target');
    if (sidebarTarget) {
        const isActive = (target) => page === target;

        sidebarTarget.innerHTML = `
            <div class="left-sidebar-placeholder"></div>
            <nav class="left-sidebar">
                <a href="index.html" class="nav-item ${isActive('index.html') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('index.html') ? ICONS.home.active : ICONS.home.inactive}</span>
                    홈
                </a>
                <a href="explore.html" class="nav-item ${isActive('explore.html') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('explore.html') ? ICONS.explore.active : ICONS.explore.inactive}</span>
                    탐색
                </a>
                <a href="community.html" class="nav-item ${isActive('community.html') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('community.html') ? ICONS.community.active : ICONS.community.inactive}</span>
                    커뮤니티
                </a>
                <a href="my.html" class="nav-item ${isActive('my.html') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('my.html') ? ICONS.my.active : ICONS.my.inactive}</span>
                    MY
                </a>
            </nav>
        `;
    }

    // Inject Mobile Nav
    const mobileNavTarget = document.getElementById('mobile-nav-target');
    if (mobileNavTarget) {
        const isActive = (target) => page === target;

        mobileNavTarget.innerHTML = `
            <nav class="mobile-nav">
                <a href="index.html" class="mobile-nav-item ${isActive('index.html') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('index.html') ? ICONS.home.active : ICONS.home.inactive}</span>
                    <span>홈</span>
                </a>
                <a href="explore.html" class="mobile-nav-item ${isActive('explore.html') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('explore.html') ? ICONS.explore.active : ICONS.explore.inactive}</span>
                    <span>탐색</span>
                </a>
                <a href="community.html" class="mobile-nav-item ${isActive('community.html') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('community.html') ? ICONS.community.active : ICONS.community.inactive}</span>
                    <span>커뮤니티</span>
                </a>
                <a href="my.html" class="mobile-nav-item ${isActive('my.html') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('my.html') ? ICONS.my.active : ICONS.my.inactive}</span>
                    <span>MY</span>
                </a>
            </nav>
        `;
    }

    Utilsly.initCurrentTool();
});
