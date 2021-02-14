/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const units = "&units=metric";

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=fea815b4abd31dad1a44d308d34f0c03";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction() {
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  getData(baseURL, zipCode, apiKey, units)
    .then(function (data) {
      postData("/post", {
        temperature: data.main.temp,
        userResponse,
        date: newDate,
      });
    })
    .then(updateUI);
}

/* Function to GET Web API Data*/
async function getData(baseURL, zipCode, apiKey, units) {
  const result = await fetch(baseURL + zipCode + apiKey + units);
  try {
    return await result.json();
  } catch (e) {
    console.log("error", e);
  }
}

/* Function to POST data */
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (e) {
    console.log("error", e);
  }
}

/* Function to GET Project Data and update it in UI */
async function updateUI() {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.userResponse;
  } catch (error) {
    console.log("error", error);
  }
}
