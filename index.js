/**
 * ============================================
 * 2027年蘇杭旅遊行程網頁互動邏輯腳本 (index.js)
 * ============================================
 * 
 * 模組功能概覽：
 * 1. 滾動淡入動畫 (Scroll Animation) - 運用 Intersection Observer API，當卡片進入可視區時觸發淡入。
 * 2. 時間軸動態導航 (Timeline Navigation) - 監聽頁面滾動位置，即時高亮當前瀏覽日期，支援桌面側邊欄與手機底部橫向導航條。
 * 3. 互動式展開/收合卡片 (Expandable Cards) - 支援點擊卡片標頭展開詳細資訊（如交通方案、景點小細節）。
 * 4. 錨點平滑滾動 (Smooth Scroll) - 點擊導航與行程連結時以平滑動畫移動至目標區塊。
 * 5. 智慧日期折疊 (Collapsible Days) - 依據使用者當前時間（UTC+8）自動收合已過去的行程，保留今天與未來行程展開。
 */

// ============================================
// 頁面 DOM 載入完成事件監聽
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化滾動進場淡入效果
    initScrollAnimations();
    // 初始化時間軸與側邊/手機底部導航連動
    initTimelineNav();
    // 初始化可展開卡片的點擊展開/收合功能
    initExpandableCards();
    // 初始化內部錨點連結平滑滾動
    initSmoothScroll();
    // 初始化根據行程日期自動折疊功能
    initCollapsibleDays();
});

/**
 * 初始化元素滾動進入視窗的淡入動畫
 * 
 * 功能說明：
 * - 選取頁面中所有帶有 `.fade-in` 類別的元素。
 * - 使用現代瀏覽器原生 `IntersectionObserver` 進行非同步可視性監控。
 * - 當目標元素進入視窗範圍時，賦予 `.visible` 樣式類別以觸發 CSS 漸層淡入與位移動畫。
 * - 成功觸發動畫後立即解除監聽（unobserve），優化瀏覽器記憶體與渲染效能。
 * 
 * @function initScrollAnimations
 * @returns {void} 無回傳值
 */
function initScrollAnimations() {
    // 取得所有需要進場動畫的元素節點集合
    const fadeElements = document.querySelectorAll('.fade-in');

    // 建立 Intersection Observer 觀察器實例
    // threshold: 0 表示只要元素的任何邊緣切入可視邊界即觸發
    // rootMargin: '50px' 表示視窗邊界外擴 50px，提早觸發使動畫更加流暢自然
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 當被觀察元素進入可視範圍
            if (entry.isIntersecting) {
                // 為元素添加 visible class 觸發 CSS 動畫
                entry.target.classList.add('visible');
                // 動畫已就緒，解除對該元素的監控以釋放效能
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: '50px'
    });

    // 逐一註冊觀察每個淡入元素
    fadeElements.forEach(el => observer.observe(el));
}

/**
 * 初始化時間軸導航連動功能
 * 
 * 功能說明：
 * - 追蹤視窗滾動高度，判斷當前處於哪一日程區塊（.day-section）。
 * - 同步更新桌面版側邊導航（#timelineNav）與手機版底部導航（#mobileNav）的選取狀態（.active）。
 * - 在手機瀏覽情境下，若目前選取的標籤超出螢幕範圍，會自動平滑滾動使其置中顯示。
 * - 使用節流函式（throttle）優化 window scroll 事件監聽頻率，防止滾動掉幀。
 * 
 * @function initTimelineNav
 * @returns {void} 無回傳值
 */
function initTimelineNav() {
    // 取得桌面端側邊固定導航容器
    const nav = document.getElementById('timelineNav');
    // 取得手機端底部橫向滑動導航容器
    const mobileNav = document.getElementById('mobileNav');
    // 取得桌面版各日程導航按鈕項目
    const navItems = document.querySelectorAll('.nav-item');
    // 取得手機版各日程導航按鈕項目
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    // 取得頁面所有日程區塊元素
    const daySections = document.querySelectorAll('.day-section');
    // 取得頂部 Hero 主視覺區塊
    const hero = document.getElementById('hero');

    // 若頁面中不存在任何日程區塊則終止執行
    if (!daySections.length) return;

    /**
     * 節流函式（Throttle）
     * 限制目標函式在指定毫秒間隔內至多僅被執行一次，有效減輕頻繁滾動造成的計算負載。
     * 
     * @function throttle
     * @param {Function} func - 需要進行執行頻率限制的目標回呼函式
     * @param {number} limit - 兩次執行之間的最小冷卻時間（毫秒）
     * @returns {Function} 經節流包裝後的全新函式
     */
    function throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * 更新導航條可見度與高亮狀態的核心函式
     * 計算螢幕當前滾動位置與各日程區塊的相對座標，賦予目前所在日期 active 狀態。
     * 
     * @function updateNav
     * @returns {void} 無回傳值
     */
    function updateNav() {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroHeight = hero ? hero.offsetHeight : 0;

        // 當滾動距離超過 Hero 主視覺區塊高達 80% 時，浮現桌面側邊導航
        if (nav) {
            if (scrollPos > heroHeight * 0.8) {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
        }

        // 搜尋目前進入螢幕中央視窗的日期區塊 ID
        let currentSection = null;

        daySections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // 當區塊的頂部在螢幕中線以上，且底部在中線以下，判定為當前閱讀焦點
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                currentSection = section.id;
            }
        });

        // 當成功匹配到當前瀏覽區塊時，連動更新選單
        if (currentSection) {
            // 更新桌面版導航按鈕高亮
            navItems.forEach(item => {
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // 更新手機版底部滑動導航按鈕高亮並自動置中
            mobileNavItems.forEach(item => {
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');

                    // 計算手機導航容器滾動偏移量以達成居中聚焦
                    const container = document.querySelector('.mobile-nav-container');
                    if (container) {
                        const itemRect = item.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        const scrollLeft = container.scrollLeft;

                        const itemCenter = itemRect.left + itemRect.width / 2;
                        const containerCenter = containerRect.left + containerRect.width / 2;
                        const offset = itemCenter - containerCenter;

                        container.scrollTo({
                            left: scrollLeft + offset,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    // 綁定視窗滾動監聽（每 100ms 節流執行一次）
    window.addEventListener('scroll', throttle(updateNav, 100));

    // 頁面剛載入時立即執行一次狀態計算
    updateNav();
}

/**
 * 初始化可折疊/展開卡片功能
 * 
 * 功能說明：
 * - 搜尋具有 `.expandable` 類別的卡片。
 * - 點擊卡片標頭 `.card-header-expandable` 時切換 `data-expanded`（true/false）。
 * - 透過 `requestAnimationFrame` 與動態高度計算，提供流暢的展開與收合動畫。
 * 
 * @function initExpandableCards
 * @returns {void} 無回傳值
 */
function initExpandableCards() {
    const expandableCards = document.querySelectorAll('.expandable');

    expandableCards.forEach(card => {
        // 取得卡片標頭（可點擊觸發區域）
        const header = card.querySelector('.card-header-expandable');

        if (header) {
            header.addEventListener('click', (e) => {
                // 阻止可能引發的預設跳轉事件
                e.preventDefault();

                // 切換 data-expanded 旗標狀態
                const isExpanded = card.getAttribute('data-expanded') === 'true';
                card.setAttribute('data-expanded', !isExpanded);

                // 操作展開內容容器
                const content = card.querySelector('.card-expand-content');
                if (content) {
                    if (!isExpanded) {
                        // 執行展開動畫：重設初始狀態後進入平滑過渡
                        content.style.display = 'block';
                        content.style.opacity = '0';
                        content.style.maxHeight = '0';

                        requestAnimationFrame(() => {
                            content.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
                            content.style.opacity = '1';
                            content.style.maxHeight = content.scrollHeight + 'px';
                        });
                    } else {
                        // 執行收合動畫：將高度降為 0，淡出後隱藏
                        content.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
                        content.style.opacity = '0';
                        content.style.maxHeight = '0';

                        setTimeout(() => {
                            content.style.display = 'none';
                        }, 300);
                    }
                }
            });
        }
    });
}

/**
 * 初始化頁面錨點平滑滾動功能
 * 
 * 功能說明：
 * - 攔截所有指向內部錨點（`href^="#"`）的超連結點擊行為。
 * - 計算目標元素離頂部距離，並預留固定間距防止貼齊視窗頂端。
 * - 使用 `window.scrollTo` 配合 `behavior: 'smooth'` 提供原生平滑滾動體驗。
 * - 同步利用 `history.pushState` 更新網址 hash，不干擾平滑滾動進程。
 * 
 * @function initSmoothScroll
 * @returns {void} 無回傳值
 */
function initSmoothScroll() {
    // 取得所有頁內錨點連結
    const hashLinks = document.querySelectorAll('a[href^="#"]');

    hashLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // 驗證錨點目標是否合法非空
            if (href && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // 計算目標元素相對於頁面頂部的高度（預留 20px 緩衝區避免緊貼邊緣）
                    const offsetTop = targetElement.offsetTop - 20;

                    // 執行平滑平移滾動
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // 更新瀏覽器網址列 hash，方便使用者分享或保留紀錄
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * 初始化行程卡片依日期折疊功能
 * 
 * 核心業務邏輯：
 * - 獲取當前台灣/江南時區（UTC+8）的今日日期字串（格式為 YYYY-MM-DD）。
 * - 遍歷每一個行程區塊（`.day-section`），讀取其 `data-date` 屬性。
 * - 若 今日日期 > 行程日期（表示該天行程已經過期），則自動添加 `.collapsed` 類別予以折疊收合。
 * - 若 今日日期 <= 行程日期（代表當天或未來的行程），保持完全展開以利查閱。
 * - 同時為每個日程標頭（`.collapsible-trigger`）綁定點擊事件，允許使用者隨時手動展開或收合。
 * 
 * @function initCollapsibleDays
 * @returns {void} 無回傳值
 */
function initCollapsibleDays() {
    // 取得目前時間物件
    const now = new Date();
    // 計算 UTC+8 時區的時間字串
    const utc8Offset = 8 * 60; // 台灣/大陸標準時區偏移量（480分鐘）
    const localOffset = now.getTimezoneOffset(); // 本地環境偏移量
    const utc8Time = new Date(now.getTime() + (utc8Offset + localOffset) * 60000);
    // 轉為標準 ISO 日期格式字串（例如 "2027-04-01"）
    const todayStr = utc8Time.toISOString().split('T')[0];

    // 取得頁面所有標記有日期的行程段落
    const daySections = document.querySelectorAll('.day-section');

    daySections.forEach(section => {
        // 讀取該段落的日期標籤
        const sectionDate = section.getAttribute('data-date');
        const dayContent = section.querySelector('.day-content');
        const trigger = section.querySelector('.collapsible-trigger');

        // 必要結構不存在時自動略過
        if (!dayContent || !trigger || !sectionDate) return;

        // 若當前系統日期已大於該行程日期，判定為歷史行程，預設收合
        const shouldCollapse = todayStr > sectionDate;

        if (shouldCollapse) {
            section.classList.add('collapsed');
        }

        // 綁定手動切換開關
        trigger.addEventListener('click', () => {
            section.classList.toggle('collapsed');
        });
    });
}

// ============================================
// 視窗資源全數載入完成事件監聽
// ============================================
window.addEventListener('load', () => {
    // 標記 body 已完成載入，移除初始預載遮罩
    document.body.classList.add('loaded');

    // 預先啟動 Hero 首頁主視覺文字的浮現動畫
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('visible');
    }
});
