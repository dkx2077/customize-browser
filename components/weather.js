/**
 * 使用XMLHttpRequest进行Ajax请求，获取天气信息
 * @param {number} storedLatitude - 存储的纬度
 * @param {number} storedLongitude - 存储的经度
 * @returns {Promise} 返回一个包含请求结果的Promise对象
 */
function ajax(storedLatitude, storedLongitude) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        });

        xhr.open("GET", "https://api.msn.cn/weather/overview?apikey=j5i4gDqHL6nGYwx5wi5kRhXjtf2c5qgFX9fzfk0TOo&activityId=08DB26C6-4621-4E31-9484-A72338F41A58&ocid=msftweather&cm=zh-cn&it=web&user=m-2F18258CC118698533C7352CC5186BF5&units=C&appId=9e21380c-ff19-4c78-b4ea-19558e93a5d3&wrapodata=false&includemapsmetadata=true&nowcastingv2=true&usemscloudcover=true&cuthour=true&getCmaAlert=true&regioncategories=alert%2Ccontent&feature=lifeday&includenowcasting=true&nowcastingapi=2&lifeDays=2&lifeModes=50&distanceinkm=0&regionDataCount=20&orderby=distance&days=2&pageOcid=prime-weather%3A%3Aweathertoday-peregrine&source=weather_csr&fdhead=prg-1sw-wxlfrc%2Cprg-1sw-wxwdicon&region=cn&market=zh-cn&locale=zh-cn&lat=" + storedLatitude + "&lon=" + storedLongitude);
        xhr.send();
    });
}

/**
 * 获取用户地理位置信息并存储到LocalStorage
 */
function getLocalMessage() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);

            updateWeatherInfo(latitude, longitude);
        }, function (error) {
            console.error("Error Code = " + error.code + " - " + error.message);
        });
    } else {
        document.querySelector('.place').innerHTML = '您的浏览器不支持地理位置信息。';
        console.log("Geolocation is not supported by this browser.");
    }
}

/**
 * 使用经纬度信息更新天气数据
 * @param {number} latitude - 纬度
 * @param {number} longitude - 经度
 */
function updateWeatherInfo(latitude, longitude) {
    ajax(latitude, longitude).then(res => {
        let responses = res['responses'];
        let city = responses[0]['source']['location']['Name'];
        let State = responses[0]['source']['location']['StateCode'];
        let current_cap = responses[0]['weather'][0]['current']['cap'];
        let current_temp = responses[0]['weather'][0]['current']['temp'];
        let summary = responses[0]['weather'][0]['nowcasting']['summary'];

        document.querySelector('.place').innerHTML = `${city} | ${State} | ${current_cap} ${current_temp}°C ${summary}(点击刷新)`;
    }).catch(err => {
        console.log("weather.js:error:", err);
    });
}


window.onload = () => {
    var storedLatitude = localStorage.getItem('latitude');
    var storedLongitude = localStorage.getItem('longitude');

    if (storedLatitude === null || storedLongitude === null || storedLatitude === "" || storedLongitude === "") {
        console.log("No stored latitude and longitude found.");
        getLocalMessage();
    } else {
        updateWeatherInfo(storedLatitude, storedLongitude);
    }
}

document.getElementById('weatherButton').addEventListener('click', getLocalMessage);
// 可以自己在local storage固定经纬度信息
