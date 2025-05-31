function getTab(el) {
  const active = document.querySelector(".active");
  const visible = document.querySelector(".content-visible");
  const tabContent = document.getElementById(el.href.split("#")[1]);
  const body = document.body;

  // 背景色のクラスを更新
  body.className = ''; // 既存のクラスをクリア
  const tabId = el.href.split("#")[1];
  body.classList.add(`${tabId}-bg`);

  // アニメーションのために少し遅延を入れる
  if (visible) {
    visible.style.opacity = "0";
    visible.style.transform = "translateY(10px)";
    
    setTimeout(() => {
      visible.classList.remove("content-visible");
      active.classList.remove("active");
      
      el.classList.add("active");
      tabContent.classList.add("content-visible");
      
      // 新しいコンテンツを表示
      setTimeout(() => {
        tabContent.style.opacity = "1";
        tabContent.style.transform = "translateY(0)";
      }, 50);
    }, 300);
  } else {
    active.classList.remove("active");
    el.classList.add("active");
    tabContent.classList.add("content-visible");
  }
}

// 初期表示時に最初のタブの背景色を設定
document.addEventListener("DOMContentLoaded", () => {
  const firstTab = document.querySelector(".tab-item a");
  if (firstTab) {
    const tabId = firstTab.href.split("#")[1];
    document.body.classList.add(`${tabId}-bg`);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".tab-item a")) {
    e.preventDefault();
    getTab(e.target);
  }
});
