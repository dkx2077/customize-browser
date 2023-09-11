// clock.js is used for displaying and managing clock on the front page


// var clock = document.getElementsByClassName('clock')[0];
var clock = document.querySelector('.user_message')
// show calendar on clock click
clock.addEventListener('click', function (e) {
    var target = e.target;
    calendar.classList.add('visible');
    overlay.classList.add('visible');

    // generate calendar if cal-week does not exist => first time opening calendar
    if (document.getElementsByClassName('cal-week')[0] === undefined) {
        generateCalendar(0);
    }
});

// show and update clock every 2 seconds
function showClock() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    // display hour in DOM
    var time = clock.getElementsByClassName('time')[0];
    time.innerHTML = hours + ":" + minutes;
    // timeout on each second
    var t = setTimeout(showClock, 2000);

    // show today's day and month under clock
    showToday();
}


// show today's day and month under clock
function showToday() {
    var today = new Date();
    var day_name = today.getDay();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear()
    var date = clock.getElementsByClassName('date')[0];
    var week = new Date().getDay();  

    weeklist = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    date.innerHTML = year + '年 <span style="font-weight:300"> | </span>' + month + '月' + day + '日  ' + weeklist[week]
}