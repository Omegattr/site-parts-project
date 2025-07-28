
// カーソル要素の取得
const innerCursor = document.querySelector('.inner-cursor');
const outerCursor = document.querySelector('.outer-cursor');

// パフォーマンス最適化のための変数
let mouseX = 0;
let mouseY = 0;
let isMoving = false;

// requestAnimationFrameを使用したスムーズなカーソル移動
function updateCursorPosition() {
    if (isMoving) {
        innerCursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        outerCursor.style.transform = `translate3d(${mouseX - 15}px, ${mouseY - 15}px, 0)`;
        
        requestAnimationFrame(updateCursorPosition);
    }
}

// マウス移動イベント（軽量化）
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(updateCursorPosition);
    }
});

// マウス停止検知
let stopTimeout;
document.addEventListener('mousemove', () => {
    clearTimeout(stopTimeout);
    stopTimeout = setTimeout(() => {
        isMoving = false;
    }, 100);
});

// ホバー可能な要素の取得
const hoverElements = document.querySelectorAll('a, .demo-item, .hover-text, .interactive-btn');

// ホバーイベントの追加（最適化）
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    }, { passive: true });

    element.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    }, { passive: true });
});

// タッチデバイスでのカーソル非表示
if ('ontouchstart' in window) {
    innerCursor.style.display = 'none';
    outerCursor.style.display = 'none';
    document.body.style.cursor = 'auto';
}

