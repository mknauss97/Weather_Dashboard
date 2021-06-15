var searchBtn = $("#searchBtn");
var clearBtn = $("#clearbutton");
var cityEnter =  $("#searchedCity");
var city =  $("#cityName");
var cityPic =  $("#current-weather");
var currentTemp =  $("#temperature");
var currentHumid = $("#humidity");
var currentWind =  $("#wind");
var currentUV =  $("#UV");
var oneDay = document.querySelector(".oneDay");
var fiveDay  =  document.querySelector(".forecast");
var city = "";
var searchCity = [];
var APIKey = "f9c15286492755d4a33357c931d9c1c8"

function citySearch(event) {
    event.preventDefault();
    if (cityEnter.val().trim() !== "") {
        city = cityenter.val().trim();
        weather(city);
        oneDay.classList.remove("d-none");
        fiveDay.classList.remove("d-none");
    }
}

function duplicate(city) {
    for (var i = 0; i < searchCity.length; i++) {
        if(city.toUpperCase() === searchCity[i]){
            return -1;
        }
    }
    return 1;
}

function addHistory(history){
    var list = $('<li>' + history.toUpperCase() + "<li>");
    $(list).attr("class", "list-group-item");
    $(list).attr("data-value", history.toUpperCase());
    $(".history").append(list);
}

function historySearch(event) {
    event.preventDefault();
    var listEl = event.target
    if (event.target.matches("li")) {
        city = listEl.textContent.trim();
        weather(city);

    }
}
$(document).on("click", historySearch);

function lastSearched() {
    $("ul").empty();
    var searchedCity = JSON.parse(localStorage.getItem("cityname"));
    if (searchedCity !== null) {
        searchedCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < searchedCity.length; i++) {
            addHistory(searchedCity[i]);
        }
        city = searchedCity[i - 1];
        currentWeather(city);
    }
}
$(window).on("load", lastSearched);

function currentWeather(search) {
    var searchInput = document.querySelector('#searchedCity'); 
    var search = searchInput.value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=f9c15286492755d4a33357c931d9c1c8";
    
    fetch(apiUrl)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data)
                    var date = new Date(data.dt*1000).toLocaleDateString();
                    var weatherimg = data.weather[0].icon;
                    var iconHttps = "https://openweathermap.org/img/wn/" + weatherimg + "@2x.png";
                    cityPic.html(data.name + "(" + date + ")" + "<img src=" + iconHttps + ">");
                    currentTemp.html(data.main.temp + "F");
                    currentHumid.html(data.main.humidity + "%");
                    currentWind.html(data.wind.speed + "mph");
                    UVIndex(data.coord.lon, data.coord.lat);
                    fiveForecast(data.id)
                    if(data.cod ==200) {
                        citysearched =JSON.parse(localStorage.getItem("cityname"));
                        console.log(citysearched);

                        if(citysearched == null) {
                            citySearched = [];
                            citySearched.push(city.toUpperCase());
                            localStorage.setItem("cityname", JSON.stringify(citysearched));
                            addHistory(city);
                        }
                        else {
                            if(find(city) > 0) {
                                citySearched.push(city.toUpperCase());
                                localStorage.setItem("cityname", JSON.stringify(citysearched));
                                addHistory(city);
                            }
                        }
                    }
                })
        })
}

function UVIndex(latitude, longitude) {
    var UVUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=37fc43925c5a51f9ab5bea46e987dda6&lat=" + latitude + "&lon=" + longitude;
    
    fetch(UVUrl)
        .then(function (response) {
            response.json()
            .then(function (response) {
                console.log(response);
                currentUV.html(response.value);
                var badge = document.querySelector("#UV")

                if(response.value < 2) {
                    badge.classList.add("badge", "bg-success");
                    badge.classList.remove("badge", "bg-danger");
                    badge.classList.remove("badge", "bg-warning");
                }
                else if (response.value > 2 && response.value < 5) {
                    badge.classList.add("badge", "bg-warning");
                    badge.classList.remove("badge", "bg-success");
                    badge.classList.remove("badge", "bg-danger");
                }
                else {
                    badge.classList.add("badge", "bg-danger");
                    badge.classList.remove("badge", "bg-warning");
                    badge.classList.remove("badge", "bg-success")
                }
            })
        })
}

function fiveForecast (id) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=imperial&appid=37fc43925c5a51f9ab5bea46e987dda6&lang=en";

    fetch(fiveDayURL)
    .then(function (response) {
        response.json()
        .then(function (data) {
            console.log(data);
            for(i = 0; i < 6; i++) {
                var fiveD = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                var fivePic = data.list[((i + 1) * 8) - 1].weather[0].icon;
                var fivePicURL = "https://openweathermap.org/img/wn/" + fivePic + ".png";
                var fiveTemperature = data.list[((i + 1) * 8) -1].main.temp;
                var fiveHumid = data.list[((i + 1) * 8) - 1].main.humidity;

                $("#fiveDay" + i).html(fiveD);
                $("#fivePic" + i).html("<img src=" + fivePicURL + ">");
                $("#fiveTemp" + i).html(fiveTemperature + "F");
                $("#fiveHumid" + i).html(fiveHumid + "%");
            }
        })
    })
}

searchBtn.click(currentWeather);

"https://api.openweathermap.org/data/2.5/weather?q=" + "&appid=f9c15286492755d4a33357c931d9c1c8"