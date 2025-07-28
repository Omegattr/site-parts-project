// DOM要素の取得
const carousel = document.getElementById('carousel');
const playPauseBtn = document.getElementById('playPauseBtn');
const speedBtn = document.getElementById('speedBtn');
const resetBtn = document.getElementById('resetBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// 状態管理
let isPaused = false;
let speedMode = 'normal'; // normal, fast, slow

// ローディング完了処理
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// 再生/一時停止機能
playPauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    
    if (isPaused) {
        carousel.style.animationPlayState = 'paused';
        carousel.classList.add('paused');
    } else {
        carousel.style.animationPlayState = 'running';
        carousel.classList.remove('paused');
    }
    
    playPauseBtn.innerHTML = isPaused ? '▶️ 再生' : '⏸️ 一時停止';
    playPauseBtn.classList.toggle('active', isPaused);
});

// 速度変更機能
speedBtn.addEventListener('click', () => {
    const modes = ['normal', 'fast', 'slow'];
    const currentIndex = modes.indexOf(speedMode);
    speedMode = modes[(currentIndex + 1) % modes.length];
    
    carousel.classList.remove('fast', 'slow');
    if (speedMode !== 'normal') {
        carousel.classList.add(speedMode);
    }
    
    const speedText = {
        normal: '⚡ 通常速度',
        fast: '🚀 高速',
        slow: '🐌 低速'
    };
    
    speedBtn.innerHTML = speedText[speedMode];
    speedBtn.classList.toggle('active', speedMode !== 'normal');
});

// リセット機能
resetBtn.addEventListener('click', () => {
    // アニメーションを一時的に停止してリセット
    carousel.style.animation = 'none';
    carousel.classList.remove('paused', 'fast', 'slow');
    
    setTimeout(() => {
        carousel.style.animation = '';
        isPaused = false;
        speedMode = 'normal';
        playPauseBtn.innerHTML = '⏸️ 一時停止';
        speedBtn.innerHTML = '⚡ 速度変更';
        playPauseBtn.classList.remove('active');
        speedBtn.classList.remove('active');
        resetBtn.classList.add('active');
        
        setTimeout(() => {
            resetBtn.classList.remove('active');
        }, 300);
    }, 50);
});

// カードホバー効果強化
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!isPaused) {
            carousel.style.animationPlayState = 'paused';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!isPaused) {
            carousel.style.animationPlayState = 'running';
        }
    });
    
    card.addEventListener('click', () => {
        const title = card.querySelector('p').textContent;
        const desc = card.querySelector('span').textContent;
        alert(`選択されました:\n${title}\n\n${desc}`);
    });
});

// パフォーマンス監視
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // FPSが低い場合は最適化モードに切り替え
        if (fps < 30) {
            carousel.style.willChange = 'transform';
        }
    }
    
    requestAnimationFrame(monitorPerformance);
}

monitorPerformance();

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            playPauseBtn.click();
            break;
        case 's':
            speedBtn.click();
            break;
        case 'r':
            resetBtn.click();
            break;
    }
});