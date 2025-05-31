const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

// Giphyの画像URLリストと対応する背景色
const giphyImages = [
  {
    url: 'https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif',
    color: '#FFD700', // 金色
    buttonColor: '#8B4513' // ダークブラウン
  },
  {
    url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
    color: '#FFB6C1', // ピンク
    buttonColor: '#C71585' // ディープピンク
  },
  {
    url: 'https://media.giphy.com/media/HLzvuV6rmpdeM/giphy.gif?cid=ecf05e47p4uwo2mo1rm10uegcxo6rm7k5ai9g2yuwibvs3re&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: '#87CEEB', // スカイブルー
    buttonColor: '#000080' // ネイビー
  },
  {
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTN4Ymd6aG1hZTc2aHBpNGp5cXY1bGd4MnhweWc2MjRkNWkyZnJoZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pt0EKLDJmVvlS/giphy.gif',
    color: '#98FB98', // パステルグリーン
    buttonColor: '#006400' // ダークグリーン
  },
  {
    url: 'https://media.giphy.com/media/jG186kNLKs6TS/giphy.gif?cid=ecf05e47uevgxms7qzils9qdzs9gzr9brga1k6tfsucw7xe9&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: '#DDA0DD', // プラム
    buttonColor: '#4B0082' // インディゴ
  },
  {
    url: 'https://media.giphy.com/media/zvwj8xlBXLxcY/giphy.gif?cid=ecf05e47jxxx4yr0sndsvm75w773toswvi39ke8lhadm4hui&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: '#F0E68C', // カーキ
    buttonColor: '#8B4513' // ダークブラウン
  },
  {
    url: 'https://media.giphy.com/media/OvxfjiuwwKfubBaLjr/giphy.gif?cid=ecf05e477oaht07ftt3fj7h5plp8rj198ll1z15xpo2bb16o&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: '#E6E6FA', // ラベンダー
    buttonColor: '#4B0082' // インディゴ
  },
  {
    url: 'https://media.giphy.com/media/fwqAg6ZS6ebL2/giphy.gif?cid=ecf05e47j8ob1kx3y23mugmbuq2998k43ob7e7e6v8mno6zb&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: '#FFA07A', // ライトサーモン
    buttonColor: '#8B0000' // ダークレッド
  },
  {
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFmZHBnMjJ2a3hwM3R4aWp4dmttZ2g1bGEwMjUzczFoOGZ2cGVhYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OCOHkV0ZOZ2g/giphy.gif',
    color: '#B0E0E6', // パウダーブルー
    buttonColor: '#000080' // ネイビー
  }
]

let currentImageIndex = 0
let clickCount = 0

// 画像と背景色を更新する関数
function updateImage() {
  const boxes = document.querySelectorAll('.box')
  const currentImage = giphyImages[currentImageIndex]
  
  // 画像を更新
  boxes.forEach(box => {
    box.style.backgroundImage = `url('${currentImage.url}')`
  })
  
  // 背景色を更新
  document.body.style.backgroundColor = currentImage.color
  
  // ボタンの色を更新
  btn.style.backgroundColor = currentImage.buttonColor
  btn.style.boxShadow = `0 3px ${currentImage.buttonColor}80`
}

btn.addEventListener('click', () => {
  boxesContainer.classList.toggle('big')
  
  // クリック回数をカウント
  clickCount++
  
  // 2回クリックされたら画像を切り替え
  if (clickCount === 2) {
    currentImageIndex = (currentImageIndex + 1) % giphyImages.length
    updateImage()
    clickCount = 0 // カウントをリセット
  }
})

function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
      boxesContainer.appendChild(box)
    }
  }
  // 初期画像と背景色の設定
  updateImage()
}

createBoxes()
