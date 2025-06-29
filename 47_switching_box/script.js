const testimonialsContainer = document.querySelector('.testimonials-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')
const progressBar = document.querySelector('.progress-bar')

const testimonials = [
  {
    name: '宮原 美耶',
    position: 'マーケティング',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    text:
      "私は文字通り何百人ものHTML/CSS開発者と仕事をしてきましたが、この方に最高の評価を与えざるを得ません。この方は素晴らしい開発者です。良い、クリーンなコードを重視し、細部まで注意を払います。私は、徹底的に考え抜かれたデザインのあらゆる側面を尊重し、それをコードに実装するために最善を尽くす開発者が大好きです。この方は期待を超えて、アートをピクセルに変換します - 毎回、完璧に。",
  },
  {
    name: '田中 千夏',
    position: 'ソフトウェアエンジニア',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    text:
      'この方は素晴らしいフロントエンド開発者で、私たちが必要としていた通りのタスクを正確に提供してくれました。自分に好意を持って、この方を雇ってください。提供される仕事に失望することはありません。この方は、あなたがプロジェクトに満足するように、余計な努力を惜しまないでしょう。きっとまた一緒に仕事をします！',
  },
  {
    name: '佐藤 仁美',
    position: 'データ入力',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    text:
      "この方は努力家です。コミュニケーションも非常に良く、常に反応が早く、多くのフリーランサーには見つけにくいものです。きっとまた繰り返しお願いします。",
  },
  {
    name: '鈴木 れい子',
    position: '受付',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    text:
      "この方は、仕事を完了し、正しく完了させるためにできる限りのことをします。これで2回目の依頼になりますが、今後もまた依頼する予定です。",
  },
  {
    name: '高橋 健太',
    position: 'グラフィックデザイナー',
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    text:
      "厳しい締切により、このプロジェクトが完了できないのではないかと心配していました。しかし、この方は私の予想を覆し、素晴らしい仕事を提供しただけでなく、締切の1日前に完了させることができました。そして、修正を依頼したとき、数分で対応してくれました。また一緒に仕事をすることを楽しみにしており、完全にお勧めします。ありがとうございました！",
  },
  {
    name: '伊藤 沙耶',
    position: '会計士',
    photo:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    text:
      'この方は一流のデザイナー兼フロントエンド開発者です。コミュニケーションが良く、作業が速く、質の高い仕事を提供します。この方と一緒に仕事ができて幸運でした！',
  },
  {
    name: '渡辺 誠',
    position: 'ディレクター',
    photo: 'https://randomuser.me/api/portraits/men/97.jpg',
    text:
      'この方は若く才能のあるIT専門家で、積極的で責任感が強く、強い職業倫理を持っています。PSD2HTML変換とHTML/CSS技術に非常に強く、新しい技術を学ぶのが早く、学ぶことに熱心です。集中力があり、締切を守り、優れた結果を達成するための良いダイナミクスを持っています。',
  },
]

let idx = 1
const intervalTime = 10000 // 10秒

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx]

  testimonial.innerHTML = text
  userImage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  // プログレスバーをリセットして再スタート
  progressBar.style.animation = 'none'
  progressBar.offsetHeight // リフローを強制
  progressBar.style.animation = `grow ${intervalTime}ms linear`

  idx++

  if (idx > testimonials.length - 1) {
    idx = 0
  }
}

// ページ読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', function() {
  // 初期化時に最初のプログレスバーを開始
  if (progressBar) {
    progressBar.style.animation = `grow ${intervalTime}ms linear`
  }
  
  // 10秒間隔で推薦文を切り替え
  setInterval(updateTestimonial, intervalTime)
})

// スムーズスクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// ヘッダーの背景をスクロール時に変更
window.addEventListener('scroll', function() {
  const header = document.querySelector('.site-header')
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)'
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)'
  }
})
