// カウントダウンアニメーションの表示制御
// 以下の設定を変更することで、アニメーションの表示を制御できます：
// - SHOW_ANIMATION_EVERY_TIME: true  -> 毎回表示
// - SHOW_ANIMATION_EVERY_TIME: false -> 1回だけ表示（localStorageに保存）
const SHOW_ANIMATION_EVERY_TIME = true;

const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')

// アニメーションの表示判定
function shouldShowAnimation() {
    if (SHOW_ANIMATION_EVERY_TIME) {
        return true;
    }
    
    // localStorageから表示履歴を取得
    const hasShownAnimation = localStorage.getItem('hasShownAnimation');
    
    if (!hasShownAnimation) {
        // 初回表示時はlocalStorageに保存
        localStorage.setItem('hasShownAnimation', 'true');
        return true;
    }
    
    return false;
}

// アニメーションの実行
if (shouldShowAnimation()) {
    runAnimation();
} else {
    // アニメーションをスキップして直接future.htmlへ遷移
    window.location.href = 'future.html';
}

function resetDOM() {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        // 少し遅延を入れてから「Let's get started!」を表示
        setTimeout(() => {
          finalMessage.classList.add('show')
        }, 300)
      }
    })
  })
}

replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
