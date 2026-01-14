// Page routing configuration
const PAGES = {
    '': 'index.html',
    'index': 'index.html',
    'explore': 'explore.html',
    'community': 'community.html',
    'my': 'my.html',
    'view': 'view.html',
    'create': 'create.html'
};

const PAGE_ORDER = ['index', 'explore', 'community', 'my', 'view', 'create'];

// Get clean page name from URL
function getCleanPageName(url) {
    let path = url.split('?')[0].split('#')[0];
    let page = path.split('/').pop() || '';
    // Remove .html extension if present
    page = page.replace('.html', '');
    // Default to index
    if (page === '' || !PAGES[page]) {
        page = 'index';
    }
    return page;
}

// Get file path from clean page name
function getFilePath(pageName) {
    return PAGES[pageName] || 'index.html';
}

// Get clean URL for navigation
function getCleanUrl(pageName) {
    if (pageName === 'index') return './';
    return './' + pageName;
}

function getPageIndex(url) {
    const page = getCleanPageName(url);
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
        inactive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.4984 2.86535C11.8288 2.56851 12.2572 2.4043 12.7014 2.4043C13.1455 2.4043 13.574 2.56851 13.9044 2.86535L20.5044 8.79575C20.692 8.9645 20.8421 9.17082 20.9448 9.40133C21.0476 9.63184 21.1007 9.88138 21.1008 10.1337V18.5997C21.1008 19.0771 20.9111 19.535 20.5736 19.8725C20.236 20.2101 19.7782 20.3997 19.3008 20.3997H16.3008C15.8234 20.3997 15.3656 20.2101 15.028 19.8725C14.6904 19.535 14.5008 19.0771 14.5008 18.5997V14.3997C14.5008 14.2406 14.4376 14.088 14.325 13.9755C14.2125 13.863 14.0599 13.7997 13.9008 13.7997H11.5008C11.3417 13.7997 11.189 13.863 11.0765 13.9755C10.964 14.088 10.9008 14.2406 10.9008 14.3997V18.5997C10.9008 19.0771 10.7111 19.535 10.3736 19.8725C10.036 20.2101 9.57817 20.3997 9.10078 20.3997H6.10078C5.62339 20.3997 5.16555 20.2101 4.82799 19.8725C4.49042 19.535 4.30078 19.0771 4.30078 18.5997V10.1337C4.30078 9.62375 4.51678 9.13775 4.89838 8.79575L11.4984 2.86535ZM13.1016 3.75815C12.9915 3.65931 12.8487 3.60464 12.7008 3.60464C12.5528 3.60464 12.4101 3.65931 12.3 3.75815L5.69998 9.68855C5.63746 9.74467 5.58742 9.8133 5.5531 9.88999C5.51879 9.96668 5.50096 10.0497 5.50078 10.1337V18.5997C5.50078 18.7589 5.564 18.9115 5.67652 19.024C5.78904 19.1365 5.94165 19.1997 6.10078 19.1997H9.10078C9.25991 19.1997 9.41252 19.1365 9.52504 19.024C9.63757 18.9115 9.70078 18.7589 9.70078 18.5997V14.3997C9.70078 13.9224 9.89042 13.4645 10.228 13.127C10.5656 12.7894 11.0234 12.5997 11.5008 12.5997H13.9008C14.3782 12.5997 14.836 12.7894 15.1736 13.127C15.5111 13.4645 15.7008 13.9224 15.7008 14.3997V18.5997C15.7008 18.7589 15.764 18.9115 15.8765 19.024C15.989 19.1365 16.1417 19.1997 16.3008 19.1997H19.3008C19.4599 19.1997 19.6125 19.1365 19.725 19.024C19.8376 18.9115 19.9008 18.7589 19.9008 18.5997V10.1337C19.9006 10.0497 19.8828 9.96668 19.8485 9.88999C19.8141 9.8133 19.7641 9.74467 19.7016 9.68855L13.1016 3.75815Z" fill="currentColor" fill-opacity="0.3" stroke="none"/></svg>`,
        active: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.4984 2.86535C11.8288 2.56851 12.2572 2.4043 12.7014 2.4043C13.1455 2.4043 13.574 2.56851 13.9044 2.86535L20.5044 8.79575C20.692 8.9645 20.8421 9.17082 20.9448 9.40133C21.0476 9.63184 21.1007 9.88138 21.1008 10.1337V18.5997C21.1008 19.0771 20.9111 19.535 20.5736 19.8725C20.236 20.2101 19.7782 20.3997 19.3008 20.3997H16.3008C15.8234 20.3997 15.3656 20.2101 15.028 19.8725C14.6904 19.535 14.5008 19.0771 14.5008 18.5997V14.3997C14.5008 14.2406 14.4376 14.088 14.325 13.9755C14.2125 13.863 14.0599 13.7997 13.9008 13.7997H11.5008C11.3417 13.7997 11.189 13.863 11.0765 13.9755C10.964 14.088 10.9008 14.2406 10.9008 14.3997V18.5997C10.9008 19.0771 10.7111 19.535 10.3736 19.8725C10.036 20.2101 9.57817 20.3997 9.10078 20.3997H6.10078C5.62339 20.3997 5.16555 20.2101 4.82799 19.8725C4.49042 19.535 4.30078 19.0771 4.30078 18.5997V10.1337C4.30078 9.62375 4.51678 9.13775 4.89838 8.79575L11.4984 2.86535ZM13.1016 3.75815C12.9915 3.65931 12.8487 3.60464 12.7008 3.60464C12.5528 3.60464 12.4101 3.65931 12.3 3.75815L5.69998 9.68855C5.63746 9.74467 5.58742 9.8133 5.5531 9.88999C5.51879 9.96668 5.50096 10.0497 5.50078 10.1337V18.5997C5.50078 18.7589 5.564 18.9115 5.67652 19.024C5.78904 19.1365 5.94165 19.1997 6.10078 19.1997H9.10078C9.25991 19.1997 9.41252 19.1365 9.52504 19.024C9.63757 18.9115 9.70078 18.7589 9.70078 18.5997V14.3997C9.70078 13.9224 9.89042 13.4645 10.228 13.127C10.5656 12.7894 11.0234 12.5997 11.5008 12.5997H13.9008C14.3782 12.5997 14.836 12.7894 15.1736 13.127C15.5111 13.4645 15.7008 13.9224 15.7008 14.3997V18.5997C15.7008 18.7589 15.764 18.9115 15.8765 19.024C15.989 19.1365 16.1417 19.1997 16.3008 19.1997H19.3008C19.4599 19.1997 19.6125 19.1365 19.725 19.024C19.8376 18.9115 19.9008 18.7589 19.9008 18.5997V10.1337C19.9006 10.0497 19.8828 9.96668 19.8485 9.88999C19.8141 9.8133 19.7641 9.74467 19.7016 9.68855L13.1016 3.75815Z"/></svg>`
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

async function loadPage(pageName, direction = 0) {
    try {
        const filePath = getFilePath(pageName);
        const currentMain = document.querySelector('main');

        if (currentMain && isMobile() && direction !== 0) {
            const exitClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
            currentMain.classList.add(exitClass);
            await new Promise(resolve => setTimeout(resolve, 150));
        }

        const response = await fetch(filePath);
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

            // Inject page-specific styles
            const newStyles = doc.querySelectorAll('head style');
            const existingPageStyle = document.getElementById('page-specific-style');
            if (existingPageStyle) existingPageStyle.remove();

            if (newStyles.length > 0) {
                const styleEl = document.createElement('style');
                styleEl.id = 'page-specific-style';
                newStyles.forEach(s => styleEl.textContent += s.textContent);
                document.head.appendChild(styleEl);
            }

            // Update navigation active states
            updateNavActiveStates(pageName);

            // Update right sidebar content from new page
            const newRightSidebar = doc.querySelector('.right-sidebar');
            const currentRightSidebar = document.querySelector('.right-sidebar');
            if (newRightSidebar && currentRightSidebar) {
                currentRightSidebar.innerHTML = newRightSidebar.innerHTML;
            }

            // Execute inline scripts from new page
            const newScripts = doc.querySelectorAll('body script:not([src])');
            newScripts.forEach(script => {
                if (!script.src) {
                    try {
                        eval(script.textContent);
                    } catch (e) {
                        console.warn('Script execution error:', e);
                    }
                }
            });

            Utilsly.initCurrentTool();

            if (isMobile() && direction !== 0) {
                currentMain.classList.remove('slide-out-left', 'slide-out-right');
                const enterClass = direction > 0 ? 'slide-in-left' : 'slide-in-right';
                currentMain.classList.add(enterClass);
                setTimeout(() => currentMain.classList.remove(enterClass), 200);
            }

            window.scrollTo(0, 0);
        } else {
            window.location.href = filePath;
        }
    } catch (error) {
        console.error('Failed to load page:', error);
        window.location.href = getFilePath(pageName);
    }
}

// Navigate to page with clean URL
function MapsTo(input) {
    // Extract clean page name from various inputs
    let pageName = input.replace('.html', '').replace('./', '').replace('/', '');
    if (pageName === '' || pageName === 'index') pageName = 'index';

    const cleanUrl = getCleanUrl(pageName);
    const currentPage = getCleanPageName(window.location.pathname);

    if (currentPage === pageName) return;

    const targetIndex = PAGE_ORDER.indexOf(pageName);
    const direction = targetIndex - currentPageIndex;
    currentPageIndex = targetIndex >= 0 ? targetIndex : 0;

    history.pushState({ page: pageName }, '', cleanUrl);
    loadPage(pageName, direction);
}

function updateNavActiveStates(pageName) {
    const navPages = ['index', 'explore', 'community', 'my'];

    // Update desktop nav
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href') || '';
        const itemPage = getCleanPageName(href);
        const isActive = itemPage === pageName;
        const iconKey = itemPage === 'index' ? 'home' : itemPage;

        item.classList.toggle('active', isActive);
        const svgContainer = item.querySelector('.nav-icon');
        if (svgContainer && ICONS[iconKey]) {
            svgContainer.innerHTML = isActive ? ICONS[iconKey].active : ICONS[iconKey].inactive;
        }
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href') || '';
        const itemPage = getCleanPageName(href);
        const isActive = itemPage === pageName;
        const iconKey = itemPage === 'index' ? 'home' : itemPage;

        item.classList.toggle('active', isActive);
        const svgContainer = item.querySelector('.mobile-nav-icon');
        if (svgContainer && ICONS[iconKey]) {
            svgContainer.innerHTML = isActive ? ICONS[iconKey].active : ICONS[iconKey].inactive;
        }
    });
}

function getIconKey(href) {
    const page = getCleanPageName(href);
    if (page === 'index') return 'home';
    return page;
}

window.addEventListener('popstate', (e) => {
    const pageName = e.state?.page || getCleanPageName(window.location.pathname);
    const targetIndex = PAGE_ORDER.indexOf(pageName);
    const direction = targetIndex - currentPageIndex;
    currentPageIndex = targetIndex >= 0 ? targetIndex : 0;
    loadPage(pageName, direction);
});

document.addEventListener('DOMContentLoaded', () => {
    const pageName = getCleanPageName(window.location.pathname);
    history.replaceState({ page: pageName }, '', getCleanUrl(pageName));
    currentPageIndex = PAGE_ORDER.indexOf(pageName);

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
            const url = new URL(link.href, window.location.origin);
            const isInternal = url.origin === window.location.origin;
            const targetPage = getCleanPageName(url.pathname);

            if (isInternal && PAGES[targetPage]) {
                e.preventDefault();
                MapsTo(targetPage);
            }
        }
    });

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
                    <div class="logo-area" onclick="MapsTo('index')" style="cursor: pointer;">Debable</div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <button onclick="MapsTo('create')" style="width: 36px; height: 36px; border-radius: 50%; background: var(--text-main); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #E5E7EB; overflow: hidden; cursor: pointer;" onclick="MapsTo('my')"></div>
                    </div>
                </div>
            </header>
        `;
    }

    // Inject Left Sidebar
    const sidebarTarget = document.getElementById('left-sidebar-target');
    if (sidebarTarget) {
        const isActive = (target) => pageName === target;

        sidebarTarget.innerHTML = `
            <div class="left-sidebar-placeholder"></div>
            <nav class="left-sidebar">
                <a href="index" class="nav-item ${isActive('index') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('index') ? ICONS.home.active : ICONS.home.inactive}</span>
                    홈
                </a>
                <a href="explore" class="nav-item ${isActive('explore') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('explore') ? ICONS.explore.active : ICONS.explore.inactive}</span>
                    탐색
                </a>
                <a href="community" class="nav-item ${isActive('community') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('community') ? ICONS.community.active : ICONS.community.inactive}</span>
                    커뮤니티
                </a>
                <a href="my" class="nav-item ${isActive('my') ? 'active' : ''}">
                    <span class="nav-icon">${isActive('my') ? ICONS.my.active : ICONS.my.inactive}</span>
                    MY
                </a>
            </nav>
        `;
    }

    // Inject Mobile Nav
    const mobileNavTarget = document.getElementById('mobile-nav-target');
    if (mobileNavTarget) {
        const isActive = (target) => pageName === target;

        mobileNavTarget.innerHTML = `
            <nav class="mobile-nav">
                <a href="index" class="mobile-nav-item ${isActive('index') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('index') ? ICONS.home.active : ICONS.home.inactive}</span>
                    <span>홈</span>
                </a>
                <a href="explore" class="mobile-nav-item ${isActive('explore') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('explore') ? ICONS.explore.active : ICONS.explore.inactive}</span>
                    <span>탐색</span>
                </a>
                <a href="community" class="mobile-nav-item ${isActive('community') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('community') ? ICONS.community.active : ICONS.community.inactive}</span>
                    <span>커뮤니티</span>
                </a>
                <a href="my" class="mobile-nav-item ${isActive('my') ? 'active' : ''}">
                    <span class="mobile-nav-icon">${isActive('my') ? ICONS.my.active : ICONS.my.inactive}</span>
                    <span>MY</span>
                </a>
            </nav>
        `;
    }

    Utilsly.initCurrentTool();
});
