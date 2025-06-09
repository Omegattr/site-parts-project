// No image, pure CSS.
// Tried to make it as realistic as possible without using any javascript.

document.addEventListener('DOMContentLoaded', () => {
  const flame = document.querySelector('.flame');
  const holder = document.querySelector('.holder');
  const blinkingGlow = document.querySelector('.blinking-glow');
  let isExtinguished = false;
  let extinguishTimeout = null;
  
  holder.addEventListener('mousemove', (e) => {
    const rect = holder.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // マウスの位置に基づいて炎の傾きを計算
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // マウスの位置と中心点との距離に基づいて傾きを計算
    const angleX = ((x - centerX) / centerX) * 10; // 最大10度の傾き
    const angleY = ((y - centerY) / centerY) * 5;  // 最大5度の傾き
    
    // 炎の高さも少し変化させる
    const height = 120 + Math.abs(angleX) * 2;
    
    // 炎のスタイルを更新
    flame.style.transform = `translateX(-50%) rotate(${angleX}deg)`;
    flame.style.height = `${height}px`;
  });
  
  // マウスが離れたときに炎を元の状態に戻す
  holder.addEventListener('mouseleave', () => {
    flame.style.transform = 'translateX(-50%) rotate(0deg)';
    flame.style.height = '120px';
  });

  // 初期状態を設定
  document.body.classList.add('lit');
  
  holder.addEventListener('click', () => {
    if (isExtinguished) {
      // 炎をつける
      if (extinguishTimeout) {
        clearTimeout(extinguishTimeout);
        extinguishTimeout = null;
      }
      
      flame.classList.remove('extinguished');
      flame.classList.add('relighting');
      blinkingGlow.classList.remove('extinguished');
      document.body.classList.remove('dark');
      document.body.classList.add('lit');
      
      // 再点火アニメーションが終わったらクラスを削除
      setTimeout(() => {
        flame.classList.remove('relighting');
      }, 500);
    } else {
      // 2秒後に炎を消す
      extinguishTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          flame.classList.add('extinguished');
          blinkingGlow.classList.add('extinguished');
          document.body.classList.remove('lit');
          document.body.classList.add('dark');
        });
      }, 2000);
    }
    
    isExtinguished = !isExtinguished;
  });
});