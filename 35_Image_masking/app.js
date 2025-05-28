// DOM要素の取得
const toggleBtn = document.querySelector('.toggle-btn');
const image1 = document.querySelector('.image1');
const image2 = document.querySelector('.image2');
const questionMark = document.querySelector('.question-mark');

// 状態管理
const state = {
  isOverlayed: false,
  isFirstClick: true,
  currentAnimation: '',
  currentAnimationIndex: 0
};

// アニメーション設定
const animations = ['slide', 'bounce', 'rotate'];

// アニメーション関連の関数
const animationUtils = {
  getNextAnimation() {
    const anim = animations[state.currentAnimationIndex];
    state.currentAnimationIndex = (state.currentAnimationIndex + 1) % animations.length;
    return anim;
  },

  getAllAnimationClasses() {
    return animations.map(anim => `${anim}-in`);
  },

  resetElement(element) {
    const allAnimations = this.getAllAnimationClasses();
    element.classList.remove(...allAnimations);
    element.style.animation = 'none';
    void element.offsetWidth; // リフローを強制
  }
};

// 画像のリセット関数
function resetImages() {
  const allAnimations = animationUtils.getAllAnimationClasses();
  
  // 両方の画像のアニメーションをリセット
  [image1, image2].forEach(image => {
    image.classList.remove(...allAnimations);
    image.style.animation = 'none';
  });
  
  // 初期位置に戻す
  image1.style.transform = 'translateX(100%)';
  image2.style.transform = 'translateX(-100%)';
  image1.style.opacity = '0';
  image2.style.opacity = '0';
  
  // リフローを強制
  void image1.offsetWidth;
  void image2.offsetWidth;
}

function resetSplashImage() {
  animationUtils.resetElement(image2);
}

// アニメーション適用関数
function applyAnimation(element, animation) {
  animationUtils.resetElement(element);
  
  if (animation === 'slide') {
    // スライド方向を設定
    element.style.setProperty('--slide-direction', element === image1 ? '100%' : '-100%');
  }
  
  element.classList.add(`${animation}-in`);
  state.currentAnimation = animation;
}

// 画像の重ね合わせ処理
function handleImageOverlay() {
  if (state.isFirstClick) {
    resetImages();
    
    // 「？」を非表示にする
    questionMark.classList.add('hidden');

    // 最初のクリック時は必ずスライドイン
    requestAnimationFrame(() => {
      applyAnimation(image1, 'slide');
      applyAnimation(image2, 'slide');
    });
    state.isFirstClick = false;
  } else {
    resetSplashImage();
    const anim = animationUtils.getNextAnimation();
    
    requestAnimationFrame(() => {
      applyAnimation(image2, anim);
    });
  }
}

// イベントリスナー
toggleBtn.addEventListener('click', () => {
  state.isOverlayed = !state.isOverlayed;
  
  if (state.isOverlayed) {
    handleImageOverlay();
    toggleBtn.textContent = '画像を分ける';
  } else {
    resetSplashImage();
    toggleBtn.textContent = '画像を重ねる';
  }
});