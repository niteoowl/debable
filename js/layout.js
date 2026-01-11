// Page order for directional navigation
const PAGE_ORDER = ['index.html', 'explore.html', 'community.html', 'my.html'];

// Icons (consistent 24x24 viewBox)
const ICONS = {
    home: {
        inactive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        active: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`
    },
    explore: {
        inactive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M14.5 9.5l-5 2 2 5 5-2z"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`,
        active: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M14.5 9.5l-5 2 2 5 5-2z" fill="white"/><circle cx="12" cy="12" r="1.5" fill="white"/></svg>`
    },
    community: {
        inactive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        active: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    },
    my: {
        inactive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        active: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    }
};

// Right sidebar content per page
const RIGHT_SIDEBAR_CONTENT = {
    'index.html': `
        <section class="widget">
            <div class="widget-header">
                <h3 class="widget-title">관련 뉴스</h3>
                <span class="widget-link">더보기</span>
            </div>
            <div class="widget-item">
                <div style="flex: 1;">
                    <span class="widget-text" style="white-space: normal; line-height: 1.4; display: block;">법무부, 촉법소년 상한 연령 13세로 하향 추진</span>
                    <span class="widget-meta">연합뉴스 • 2시간 전</span>
                </div>
            </div>
            <div class="widget-item">
                <div style="flex: 1;">
                    <span class="widget-text" style="white-space: normal; line-height: 1.4; display: block;">EU, 세계 최초 AI 규제법 통과</span>
                    <span class="widget-meta">ZDNet • 5시간 전</span>
                </div>
            </div>
        </section>
        <section class="widget">
            <div class="widget-header">
                <h3 class="widget-title">주간 베스트 논객</h3>
            </div>
            <div class="widget-item">
                <div class="widget-rank">1</div>
                <div style="flex: 1;">
                    <span class="widget-text" style="font-weight: 600;">LogicKing</span>
                    <span class="widget-meta">승률 84%</span>
                </div>
            </div>
            <div class="widget-item">
                <div class="widget-rank">2</div>
                <div style="flex: 1;">
                    <span class="widget-text" style="font-weight: 600;">FactCheck_Kr</span>
                    <span class="widget-meta">승률 79%</span>
                </div>
            </div>
        </section>
    `,
    'explore.html': `
        <section class="widget">
            <div class="widget-header">
                <h3 class="widget-title">인기 카테고리</h3>
            </div>
            <div class="widget-item"><span class="widget-text">🔥 정치/시사</span></div>
            <div class="widget-item"><span class="widget-text">💬 일상/토론</span></div>
            <div class="widget-item"><span class="widget-text">💻 IT/기술</span></div>
        </section>
    `,
    'community.html': `
        <section class="widget">
            <div class="widget-header">
                <h3 class="widget-title">커뮤니티 인기글</h3>
            </div>
            <div class="widget-item">
                <div class="widget-rank">1</div>
                <span class="widget-text">토론 잘하는 팁 공유</span>
            </div>
            <div class="widget-item">
                <div class="widget-rank">2</div>
                <span class="widget-text">첫 승리 후기!</span>
            </div>
        </section>
    `,
    'my.html': `
        <section class="widget">
            <div class="widget-header">
                <h3 class="widget-title">나의 통계</h3>
            </div>
            <div class="widget-item" style="cursor: default;">
                <div class="widget-text" style="white-space: normal;">
                    <strong>총 토론:</strong> 24회<br>
                    <strong>승률:</strong> 67%<br>
                    <strong>레벨:</strong> 7
                </div>
            </div>
        </section>
    `,
    'create.html': `
        <section class="widget">
            <div class="widget-header">
                <h3 class="widget-title">개설 가이드</h3>
            </div>
            <div class="widget-item" style="cursor: default;">
                <div class="widget-rank">1</div>
                <div class="widget-text" style="white-space: normal;">주제는 구체적일수록 좋습니다</div>
            </div>
            <div class="widget-item" style="cursor: default;">
                <div class="widget-rank">2</div>
                <div class="widget-text" style="white-space: normal;">명확한 찬반 구도를 설정하세요</div>
            </div>
        </section>
    `
};

function getPageIndex(url) {
    const page = url.split('/').pop() || 'index.html';
    const idx = PAGE_ORDER.indexOf(page);
    return idx === -1 ? 0 : idx;
}

function getPageName(url) {
    return url.split('/').pop() || 'index.html';
}

let currentPageIndex = getPageIndex(window.location.pathname);

function isMobile() {
    return window.innerWidth <= 768;
}

function updateRightSidebar(pageName) {
    const rightSidebar = document.querySelector('.right-sidebar');
    if (rightSidebar && RIGHT_SIDEBAR_CONTENT[pageName]) {
        rightSidebar.innerHTML = RIGHT_SIDEBAR_CONTENT[pageName];
    }
}

async function loadPage(url, direction = 0) {
    try {
        const currentMain = document.querySelector('main');
        if (currentMain && isMobile() && direction !== 0) {
            const exitClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
            currentMain.classList.add(exitClass);
            await new Promise(resolve => setTimeout(resolve, 120));
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.querySelector('main');

        if (newMain && currentMain) {
            currentMain.innerHTML = newMain.innerHTML;
            currentMain.className = newMain.className;

            document.title = doc.title;
            updateNavActiveStates(url);
            updateRightSidebar(getPageName(url));

            if (isMobile() && direction !== 0) {
                currentMain.classList.remove('slide-out-left', 'slide-out-right');
                const enterClass = direction > 0 ? 'slide-in-left' : 'slide-in-right';
                currentMain.classList.add(enterClass);
                setTimeout(() => currentMain.classList.remove(enterClass), 180);
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
    const page = url.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        const iconKey = href.replace('.html', '').replace('index', 'home');
        const isActive = href === page;

        item.classList.toggle('active', isActive);
        const iconContainer = item.querySelector('.nav-icon');
        if (iconContainer && ICONS[iconKey]) {
            iconContainer.innerHTML = isActive ? ICONS[iconKey].active : ICONS[iconKey].inactive;
        }
    });

    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        const iconKey = href.replace('.html', '').replace('index', 'home');
        const isActive = href === page;

        item.classList.toggle('active', isActive);
        const iconContainer = item.querySelector('.mobile-nav-icon');
        if (iconContainer && ICONS[iconKey]) {
            iconContainer.innerHTML = isActive ? ICONS[iconKey].active : ICONS[iconKey].inactive;
        }
    });
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
                const matchUrl = match[1];
                if (!matchUrl.startsWith('http') && matchUrl.endsWith('.html')) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    MapsTo(matchUrl);
                }
            }
        }
    });

    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    // Font
    if (!document.querySelector('link[href*="pretendard"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }

    // Header
    const headerTarget = document.getElementById('app-header-target');
    if (headerTarget) {
        headerTarget.innerHTML = `
            <header class="app-header">
                <div class="header-inner">
                    <div class="logo-area" onclick="MapsTo('index.html')" style="cursor: pointer;">Debable</div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <button onclick="MapsTo('create.html')" style="width: 36px; height: 36px; border-radius: 50%; background: var(--text-main); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #E5E7EB; cursor: pointer;" onclick="MapsTo('my.html')"></div>
                    </div>
                </div>
            </header>
        `;
    }

    // Left Sidebar
    const sidebarTarget = document.getElementById('left-sidebar-target');
    if (sidebarTarget) {
        const getActive = (t) => page === t ? 'active' : '';
        const getIcon = (key, t) => page === t ? ICONS[key].active : ICONS[key].inactive;

        sidebarTarget.innerHTML = `
            <nav class="left-sidebar">
                <a href="index.html" class="nav-item ${getActive('index.html')}">
                    <span class="nav-icon">${getIcon('home', 'index.html')}</span>
                    홈
                </a>
                <a href="explore.html" class="nav-item ${getActive('explore.html')}">
                    <span class="nav-icon">${getIcon('explore', 'explore.html')}</span>
                    탐색
                </a>
                <a href="community.html" class="nav-item ${getActive('community.html')}">
                    <span class="nav-icon">${getIcon('community', 'community.html')}</span>
                    커뮤니티
                </a>
                <a href="my.html" class="nav-item ${getActive('my.html')}">
                    <span class="nav-icon">${getIcon('my', 'my.html')}</span>
                    MY
                </a>
            </nav>
        `;
    }

    // Mobile Nav
    const mobileNavTarget = document.getElementById('mobile-nav-target');
    if (mobileNavTarget) {
        const getActive = (t) => page === t ? 'active' : '';
        const getIcon = (key, t) => page === t ? ICONS[key].active : ICONS[key].inactive;

        mobileNavTarget.innerHTML = `
            <nav class="mobile-nav">
                <a href="index.html" class="mobile-nav-item ${getActive('index.html')}">
                    <span class="mobile-nav-icon">${getIcon('home', 'index.html')}</span>
                    <span>홈</span>
                </a>
                <a href="explore.html" class="mobile-nav-item ${getActive('explore.html')}">
                    <span class="mobile-nav-icon">${getIcon('explore', 'explore.html')}</span>
                    <span>탐색</span>
                </a>
                <a href="community.html" class="mobile-nav-item ${getActive('community.html')}">
                    <span class="mobile-nav-icon">${getIcon('community', 'community.html')}</span>
                    <span>커뮤니티</span>
                </a>
                <a href="my.html" class="mobile-nav-item ${getActive('my.html')}">
                    <span class="mobile-nav-icon">${getIcon('my', 'my.html')}</span>
                    <span>MY</span>
                </a>
            </nav>
        `;
    }

    // Right sidebar
    updateRightSidebar(page);
});
