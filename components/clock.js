// clock.js 用于在前端页面展示和管理时钟

// 选择时钟元素。使用querySelector替代getElementsByClassName以提高选择器的灵活性和性能。
var clock = document.querySelector('.user_message');

// // 点击时钟时
// clock.addEventListener('click', function (e) {
// });

// 每2秒更新并展示时钟
function showClock() {
    var today = new Date();
    var hours = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    
    // 在DOM中展示时间
    var time = clock.querySelector('.time');
    time.innerHTML = `${hours}:${minutes}`;

    // 每两秒刷新一次
    setTimeout(showClock, 2000);

    // 在时钟下方展示今天的日期和月份
    showToday();
}

// 在时钟下方展示今天的日期和月份
function showToday() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var week = today.getDay();
    var weeklist = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var date = clock.querySelector('.date');

    date.innerHTML = `${year}年 <span style="font-weight:300"> | </span>${month}月${day}日  ${weeklist[week]}`;
}


let clickCount = 0;
let timer;

function resetClickCount() {
    clearTimeout(timer);
    clickCount = 0;
}

document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 1) {
        timer = setTimeout(resetClickCount, 5000);
    }

    if (clickCount >= 3) {
        console.log("Author:dkx\nQQ:1224999366\nhttps://github.com/dkx2077/customize-browser.git");
        resetClickCount(); // 重置点击次数和计时器
    }
});