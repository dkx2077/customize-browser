// SEARCH BOX - contains code (logic) for search box on the front page
var ENGINE_LIST = ["baidu","google"]
var ENGINE = "baidu"; // google or ddg
var search_box = document.getElementsByClassName('search-box')[0];
var search_parent = search_box.parentNode;


var my_choose = [
    {
        id: 'baidu',
        name: "百度",
        url: "https://www.baidu.com/s?wd="
    },
    {
        id: 'google',
        name: "谷歌",
        url: "https://www.google.com/search?&q="
    },
    {
        id: 'zhihu',
        name: "知乎",
        url: "https://www.zhihu.com/search?type=content&q="
    },
    {
        id: 'github',
        name: "github",
        url: "https://github.com/search?q="
    },
    {
        id: 'bilibili',
        name: "B站",
        url: "https://search.bilibili.com/all?keyword="
    }
]

let choose_list = document.querySelector('.choose-list')

choose_list.innerHTML = my_choose.map(item => {
    return `<div class="choose-box" data-url="${item['url']}" data-name="${item['name']}" style="height: 30px;">${item['name']}</div>`
}).join('')

choose_url = "https://www.baidu.com/s?wd=" //默认百度
document.querySelector('.choose-list').children[0].classList.add('choose-box-checked')
choose_list.addEventListener('click', function(e){
    // console.log(e.target.dataset['url']);
    choose_url = e.target.dataset['url']
    
    for (let index = 0; index < document.querySelector('.choose-list').children.length; index++) {
        if (e.target.dataset['name'] == document.querySelector('.choose-list').children[index].textContent) {
            document.querySelector('.choose-list').children[index].classList.add('choose-box-checked')
        }else {
            document.querySelector('.choose-list').children[index].className = 'choose-box'
        }       
    }

    // search_box.value = "";
    search_box.focus();
    
})

// search box logic
search_box.onkeypress = function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;

    // if enter key is pressedopen
    if (keyCode == '13') {
        // open www.google.com#q=   search_value
        var query = search_box.value;
        window.open(choose_url + query); 
        return false;
    }
};


// ** BANGS **
// shortcuts to common websites

// encoding url (so searching for c++ will actually search for c++ and not for c)
function createQuery(query) {
    return encodeURIComponent(query);
}

// when search box lose focus, remove active class
search_box.onblur = function(e) {
    search_parent.classList.remove('search-active');
};

// when search box gets focus add active class
search_box.addEventListener("focus", function(e) {
    search_parent.classList.add('search-active');
});

// add active class to x pseudo element every time search_box is focused
if (search_box == document.activeElement) {
    search_parent.classList.add('search-active');
}

// clear search box when x pseudo element is clicked
var searchClear = document.getElementsByClassName('search-clear')[0];
searchClear.addEventListener('click', function() {
    search_box.value = "";
    search_box.focus();
});


// window.onload = ()=> {
//     if (navigator.onLine) {
//         console.log("有网");
//     } else {
//         console.log("没网");
//     }
// }

// console.log(document.querySelector('.search-box'));
