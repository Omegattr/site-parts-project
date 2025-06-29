// 料金プラン選択ボタンの要素を取得
const pricing_btn = document.querySelectorAll(".pricing_btn ");
const active_bg = document.querySelector(".active_bg");
const pricing = document.querySelectorAll(".pricing");
const payment = document.querySelectorAll(".payment ");
const monthly = document.querySelectorAll(".monthly");
const yearly = document.querySelectorAll(".yearly");
const monthly_icon = document.querySelectorAll(".monthly_icon");
const yearly_icon = document.querySelectorAll(".yearly_icon");

// 月額・年額切り替えボタンのイベントリスナー
pricing_btn.forEach(function(btn){
    btn.addEventListener("click",function(){
        pricing_btn.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        // アクティブな背景の位置を計算
        var active_left = this.offsetLeft;
        active_bg.style.cssText = "left:" +active_left+ "px;";
        var class_name = this.getAttribute("data-class");
        pricing.forEach(function(c){
            c.classList.remove("active");
        });
        document.querySelector("." + class_name).classList.add("active");
    });
});

// 料金プラン選択のイベントリスナー
payment.forEach(function(payment_btn){
    payment_btn.addEventListener("click",function(){
     
        // 月額プランの選択処理
        if(this.classList.contains("monthly")){
            monthly.forEach(payment_btn => payment_btn.classList.remove("active"));
            this.classList.add("active");
            monthly_icon.forEach(select_icon=> select_icon.classList.remove("active"));
            this.querySelector(".select_icon").classList.add("active");
        }
        // 年額プランの選択処理
        if(this.classList.contains("yearly")){
            yearly.forEach(payment_btn => payment_btn.classList.remove("active"));
            this.classList.add("active");
            yearly_icon.forEach(select_icon=> select_icon.classList.remove("active"));
            this.querySelector(".select_icon").classList.add("active");
        }
    });
});