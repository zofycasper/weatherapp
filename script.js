const body = document.querySelector("body");
const mainDataArea = document.createElement("div");
const weatherLocation = document.createElement("div");
const currentTemp = document.createElement("div");
const searchBox = document.createElement("input");
const searchBtn = document.createElement("button");
const loadingDiv = document.createElement("div");
const iconLoading = document.getElementById("icon-loading-indicator");

loadingDiv.setAttribute("id", "loading-indicator");
loadingDiv.setAttribute("style", "display: none;");
loadingDiv.textContent = "Loading...";

const showLoadingIndicator = () => {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block";
};

const hideLoadingIndicator = () => {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "none";
};

const showIconLoadingIndicator = () => {
    const loadingIndicator = document.getElementById("icon-loading-indicator");
    loadingIndicator.style.display = "block";
};

const hideIconLoadingIndicator = () => {
    const loadingIndicator = document.getElementById("icon-loading-indicator");
    loadingIndicator.style.display = "none";
};

searchBtn.textContent = "Search";

body.appendChild(searchBox);
body.appendChild(searchBtn);
body.appendChild(mainDataArea);
mainDataArea.appendChild(loadingDiv);

let city = "london";

searchBtn.addEventListener("click", () => {
    mainDataArea.textContent = "";
    mainDataArea.appendChild(loadingDiv);
    city = document.querySelector("input").value;
    console.log(city);

    getWeather(city);
});

async function getWeather(city) {
    mainDataArea.appendChild(iconLoading);
    showLoadingIndicator();
    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=85f5f50a2ad160418ee237573605d068&units=metric`
        );

        let weatherData = await response.json();

        console.log(weatherData);
        console.log(weatherData.name);
        console.log(weatherData.main.temp);
        console.log(weatherData.weather["0"].icon);
        weatherLocation.textContent = `Location: ${weatherData.name}`;
        currentTemp.textContent = `Current: ${weatherData.main.temp}`;

        // Add icon

        const iconImg = document.createElement("img");

        let iconCode = weatherData.weather["0"].icon;

        iconImg.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        showIconLoadingIndicator();
        await new Promise((resolve, reject) => {
            iconImg.onload = resolve;
            iconImg.onerror = reject;
        });
        hideIconLoadingIndicator();

        mainDataArea.appendChild(weatherLocation);
        mainDataArea.appendChild(currentTemp);
        mainDataArea.appendChild(iconImg);
        hideLoadingIndicator();
    } catch (error) {
        hideLoadingIndicator();
        console.error(`Error: ${error}`);

        weatherLocation.textContent = "";
        currentTemp.textContent = "";
        const errorMsg = document.createElement("div");
        errorMsg.textContent = "Please enter the correct city name";
        mainDataArea.appendChild(errorMsg);
    }
}

getWeather(city);
