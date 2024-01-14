// Search Box Logic
(function () {
    // 获取搜索框和其父元素
    const searchBox = document.getElementsByClassName('search-box')[0];
    const searchParent = searchBox.parentNode;
    // 设置默认搜索引擎URL
    let chooseUrl = "https://www.baidu.com/s?wd=";

    // 定义搜索引擎列表
    const searchEngines = [
        { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=' },
        { id: 'google', name: '谷歌', url: 'https://www.google.com/search?&q=' },
        { id: 'GoogleScholar', name: '谷歌学术', url: 'https://scholar.google.com/scholar?hl=zh-CN&as_sdt=0%2C5&q=' },
        { id: 'arxiv', name: 'arxiv', url: 'https://arxiv.org/search/?query=%s&searchtype=all&abstracts=show&order=-announced_date_first&size=50' },
        { id: 'zhihu', name: '知乎', url: 'https://www.zhihu.com/search?type=content&q=' },
        { id: 'github', name: 'github', url: 'https://github.com/search?q=' },
        { id: 'bilibili', name: 'B站', url: 'https://search.bilibili.com/all?keyword=' }
    ];

    // 初始化搜索框
    function initializeSearchBox() {
        const chooseList = document.querySelector('.choose-list');
        chooseList.innerHTML = searchEngines.map(engine => {
            return `<div class="choose-box" data-url="${engine.url}" data-name="${engine.name}" style="height: 30px; text-align: center; line-height: 30px;">${engine.name}</div>`;
        }).join('');

        chooseList.children[0].classList.add('choose-box-checked');
        addEventListeners();
    }

    // 添加事件监听器
    function addEventListeners() {
        // 监听搜索引擎选择列表的点击事件
        document.querySelector('.choose-list').addEventListener('click', function (event) {
            const target = event.target;
            chooseUrl = target.dataset.url;
            Array.from(this.children).forEach(child => {
                child.className = (child === target) ? 'choose-box choose-box-checked' : 'choose-box';
            });
            searchBox.focus();
        });

        // 监听搜索框的键盘按键事件
        searchBox.addEventListener('keypress', function (event) {
            // 当按下回车键时执行搜索
            if (event.key === 'Enter') {
                const query = encodeURIComponent(searchBox.value);
                const url = chooseUrl.includes('%s') ? chooseUrl.replace('%s', query) : chooseUrl + query;
                window.open(url);
                event.preventDefault();
            }
        });

        // 当搜索框失去焦点时移除活动类
        searchBox.addEventListener('blur', function () {
            searchParent.classList.remove('search-active');
        });

        // 当搜索框获得焦点时添加活动类
        searchBox.addEventListener("focus", function () {
            searchParent.classList.add('search-active');
        });

        // Check if searchBox is initially focused
        if (searchBox === document.activeElement) {
            searchParent.classList.add('search-active');
        }

        // Clear search box on 'x' click
        const searchClear = document.getElementsByClassName('search-clear')[0];
        searchClear.addEventListener('click', function () {
            searchBox.value = "";
            searchBox.focus();
        });
    }

    // Initialize the search box on page load
    initializeSearchBox();
})();

