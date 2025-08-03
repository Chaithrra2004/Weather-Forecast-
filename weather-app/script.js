const apiKey = "b0d41913c384e341c14db731d0144bf1"; // 🔴 Replace this

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch current weather
    const currentRes = await fetch(currentUrl);
    if (!currentRes.ok) throw new Error("City not found");
    const currentData = await currentRes.json();

    document.getElementById("currentWeather").innerHTML = `
      <h3>${currentData.name}</h3>
      <p><strong>Temperature:</strong> ${currentData.main.temp}°C</p>
      <p><strong>Humidity:</strong> ${currentData.main.humidity}%</p>
      <p><strong>Weather:</strong> ${currentData.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" alt="weather icon">
    `;

    // Fetch 5-day forecast
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    // Filter one forecast per day at 12:00
    const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    daily.forEach(day => {
      forecastDiv.innerHTML += `
        <div class="forecast-day">
          <p><strong>${new Date(day.dt_txt).toDateString()}</strong></p>
          <p>${day.main.temp}°C</p>
          <p><strong>Humidity:</strong> ${currentData.main.humidity}%</p>
          <p>${day.weather[0].description}</p>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon">
        </div>
      `;
    });

  } catch (error) {
    document.getElementById("currentWeather").innerHTML = `<p style="color:red;">${error.message}</p>`;
    document.getElementById("forecast").innerHTML = "";
  }
}
