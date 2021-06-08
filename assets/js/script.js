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
var fiveDay  =  document.querySelector(".fiveDay");
var town = "";
var searchCity = [];


function citySearch(event) {
    event.preventDefault();
    if (cityEnter.val().trim() !== "") {
        town = cityenter.val().trim();
        weather(city);
        oneDay.classList.remove("d-none");
        fiveDay.classList.remove("d-none");
    }
}




searchBtn.click(currentWeather);

clearBtn.click(clearHistory)