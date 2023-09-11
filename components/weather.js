function ajax(){
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if(xhr.status>=200&& xhr.status<300){
                    //成功
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    //失败
                    reject(xhr.responseText);
                }
                // console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://api.msn.cn/weather/overview?apikey=j5i4gDqHL6nGYwx5wi5kRhXjtf2c5qgFX9fzfk0TOo&activityId=5E947D28-2718-4ABC-997B-A41629527D46&ocid=msftweather&cm=zh-cn&it=web&user=m-1FC64218F7BD65832036507EF6DB6469&units=C&appId=9e21380c-ff19-4c78-b4ea-19558e93a5d3&wrapodata=false&includemapsmetadata=true&nowcastingv2=true&usemscloudcover=true&cuthour=true&getCmaAlert=true&regioncategories=alert%2Ccontent&feature=lifeday&includenowcasting=true&nowcastingapi=2&lifeDays=2&lifeModes=50&distanceinkm=0&regionDataCount=20&orderby=distance&days=10&pageOcid=prime-weather%3A%3Aweathertoday-peregrine&source=weather_csr&fdhead=prg-1sw-wxlfrc%2Cprg-1sw-wxwdicon&region=cn&market=zh-cn&locale=zh-cn&lat=28.7663025&lon=104.6199328");

        xhr.send();


    })
}

result = null
city = State = null

window.onload = ()=>{
    // console.log('start');
    ajax().then(res=>{
        // console.log(res['responses']);
        responses = res['responses']
        city = responses[0]['source']['location']['Name']
        State = responses[0]['source']['location']['StateCode']
        current_cap = responses[0]['weather'][0]['current']['cap']
        current_temp = responses[0]['weather'][0]['current']['temp']
        summary = responses[0]['weather'][0]['nowcasting']['summary']
        // console.log(summary);
        document.querySelector('.place').innerHTML = `${city} | ${State} | ${current_cap} ${current_temp}°C ${summary}`

    }).catch(err=>{
        console.log("weather.js:error:",err);
    })
}
