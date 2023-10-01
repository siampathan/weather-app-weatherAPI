const button = document.getElementById("button");
const input = document.querySelector(".search-bar");
const APIKey = "e70528456668973f6dcf59191436f5f2";
//let input = "Dhaka";
function fetchWeather(input) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${input}`)
    .then((respone) => respone.json())
    .then((data) => this.displayWeather(data));
}

fetchWeather();

function displayWeather(data) {
  const { name, country, localtime } = data.location;
  const { temp_c, wind_kph, humidity, feelslike_c } = data.current;
  const { text, icon } = data.current.condition;

  if (text == "Sunny" || "Clear") {
    document.querySelector(
      ".back"
    ).style.backgroundImage = `url(./images/clear.jpg)`;

    document.querySelector(
      ".icon"
    ).style.backgroundImage = `url(./images/icon/113.png)`;
  } else if (text == "Partly cloudy" || "Overcast" || "Mist") {
    document.querySelector(
      ".back"
    ).style.backgroundImage = `url(./images/cloudy.jpg)`;

    if (text == "Partly cloudy") {
      document.querySelector(
        ".icon"
      ).style.backgroundImage = `url(./images/icon/116.png)`;
    } else {
      document.querySelector(
        ".icon"
      ).style.backgroundImage = `url(./images/icon/119.png)`;
    }
  } else if (text == "Rain" || "Light rain" || "Patchy rain possible") {
    document.querySelector(
      ".back"
    ).style.backgroundImage = `url(./images/rainy.jpg)`;

    document.querySelector(
      ".icon"
    ).style.backgroundImage = `url(./images/icon/281.png)`;
  } else {
    document.querySelector(
      ".back"
    ).style.backgroundImage = `url(./images/snowy.jpg)`;

    document.querySelector(
      ".icon"
    ).style.backgroundImage = `url(./images/icon/248.png)`;
  }

  document.querySelector(".city").textContent = "Weather in " + name;
  document.querySelector(".temp").textContent = temp_c + " °C";
  document.querySelector(".description").textContent = text;
  document.querySelector(".humidity").textContent =
    "Humidity : " + humidity + "%";
  document.querySelector(".time").textContent = "Localtime : " + localtime;
  document.querySelector(".wind").textContent =
    "Wind Speed : " + wind_kph + " km/h";
  document.querySelector(".feel").textContent =
    "Feels Like : " + feelslike_c + " °C";
  document.querySelector(".country").textContent = country;

  console.log(name, country, localtime);
  console.log(
    temp_c + "C",
    wind_kph + "kph",
    humidity + "%",
    feelslike_c + "C"
  );
  console.log(text, icon);
}

function search() {
  this.fetchWeather(document.querySelector(".search-bar").value);
}

document.querySelector(".search button").addEventListener("click", function () {
  search();
  document.querySelector(".search-bar").value = "";
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    search();
    document.querySelector(".search-bar").value = "";
  }
});

fetchWeather(input);
