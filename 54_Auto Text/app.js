const kanaTextSpan = document.querySelector(".kana-text");
const cursor = document.querySelector(".cursor");

// ひらがな→漢字変換辞書
const hiraganaToKanji = {
  "プログラミング": "プログラミング",
  "アルゴリズム": "アルゴリズム",
  "データベース": "データベース",
  "フロントエンド": "フロントエンド",
  "バックエンド": "バックエンド",
  "Git": "Git",
  "JavaScript": "JavaScript",
  "Python": "Python"
};

let conversionStep = 0; // 0: ひらがな, 1: カタカナ, 2: 漢字
let conversionTimer = null;

const words = [
  "puroguramingu",
  "arugorizumu",
  "de-tabe-su",
  "furontoendo",
  "bakkuendo",
  "gitto",
  "jaba sukuriputo",
  "paison"
];
const typingDelay = 200;
const erasingDelay = 200;
const newLetterDelay = 2000;
let index = 0;
let charIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  if (words.length) {
    setTimeout(type, newLetterDelay);
  }
});

let currentRomaji = "";
function type() {
  if (charIndex < words[index].length) {
    currentRomaji += words[index].charAt(charIndex);
    const hiragana = wanakana.toHiragana(currentRomaji);
    kanaTextSpan.textContent = hiragana;

    // 文字が完成したら変換タイマーを開始
    if (charIndex === words[index].length - 1) {
      startConversion(hiragana);
    }

    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newLetterDelay);
  }
}

function startConversion(hiragana) {
  conversionStep = 0;
  clearTimeout(conversionTimer);

  // 1秒後にカタカナに変換
  conversionTimer = setTimeout(() => {
    const katakana = wanakana.toKatakana(hiragana);
    kanaTextSpan.textContent = katakana;
    conversionStep = 1;

    // さらに1秒後に漢字に変換（可能な場合）
    conversionTimer = setTimeout(() => {
      const kanji = hiraganaToKanji[hiragana] || katakana;
      kanaTextSpan.textContent = kanji;
      conversionStep = 2;
    }, 1000);
  }, 1000);
}

function erase() {
  if (charIndex > 0) {
    currentRomaji = words[index].substring(0, charIndex - 1);
    const hiragana = wanakana.toHiragana(currentRomaji);
    kanaTextSpan.textContent = hiragana;

    // 変換タイマーをクリア
    clearTimeout(conversionTimer);
    conversionStep = 0;

    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    index++;
    if (index >= words.length) {
      index = 0;
    }
    currentRomaji = "";
    clearTimeout(conversionTimer);
    conversionStep = 0;
    setTimeout(type, typingDelay + 1100);
  }
}
