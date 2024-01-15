
// SLIDES:

// 声明变量
var rightArrow = document.querySelector('.right-arrow'); // 使用querySelector替代querySelectorAll
var slideContainer = document.querySelector('.slides-container');
var slides = document.querySelectorAll('.slide');
var firstSlide = slides[0];
var leftArrow = document.querySelector('.left-arrow');
var numOfSlides = slides.length;

var buttonsContainer = document.querySelector('.buttons-container');
var html = ''; // 变量名小写化，遵循JavaScript命名惯例

// 从幻灯片的name属性添加按钮到buttons-container
for (var i = 0; i < numOfSlides; i++) {
    var slideName = slides[i].getAttribute('name');
    // 第一个按钮添加active类（代表第一张幻灯片）
    html += i === 0
        ? '<div class="slide-button btn-active">' + slideName + '</div>'
        : '<div class="slide-button">' + slideName + '</div>';
}

// 将生成的按钮HTML添加到容器中
buttonsContainer.innerHTML = html;

// 按钮点击事件：切换active类，滑动到正确的幻灯片
buttonsContainer.addEventListener('click', function (e) {
    var target = e.target;
    // 如果点击的元素是按钮（带有.slide-button类），则滑动到相应的幻灯片
    if (target.classList.contains('slide-button')) {
        buttonsContainer.querySelector('.btn-active').classList.remove('btn-active');
        target.classList.add('btn-active');

        var index = Array.from(buttonsContainer.children).indexOf(target);
        firstSlide.style.marginLeft = -index * 100 + "%";
    }
});

// 箭头点击：判断哪个按钮应该拥有active类
function addActiveClassToButton() {
    var endMargin = firstSlide.style.marginLeft;
    var num = Math.abs(parseInt(endMargin, 10) / 100) || 0;
    buttonsContainer.querySelector('.btn-active').classList.remove('btn-active');
    buttonsContainer.children[num].classList.add('btn-active');
}

// 右箭头点击：向右滑动幻灯片
function slideMoveRight() {
    var currentMargin = parseInt(firstSlide.style.marginLeft, 10) || 0;
    var translate = currentMargin === -(numOfSlides - 1) * 100 ? '0%' : (currentMargin - 100) + '%';
    firstSlide.style.marginLeft = translate;
    addActiveClassToButton();
}

rightArrow.addEventListener('click', slideMoveRight);

// 左箭头点击：向左滑动幻灯片
function slideMoveLeft() {
    var currentMargin = parseInt(firstSlide.style.marginLeft, 10) || 0;
    var translate = currentMargin === 0 ? -(numOfSlides - 1) * 100 + '%' : (currentMargin + 100) + '%';
    firstSlide.style.marginLeft = translate;
    addActiveClassToButton();
}

leftArrow.addEventListener('click', slideMoveLeft);

// 当搜索框未聚焦时，通过按键左/右移动幻灯片
var search = document.querySelector('.search');

document.addEventListener('keydown', function (e) {
    // 如果搜索框未聚焦
    if (!search.classList.contains('search-active')) {
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "Right") { // 添加 'D' 和小键盘右箭头
            slideMoveRight();
        } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A" || e.key === "Left") { // 添加 'A' 和小键盘左箭头
            slideMoveLeft();
        }
    }
});
