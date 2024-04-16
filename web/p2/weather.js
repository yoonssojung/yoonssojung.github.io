const apiKey = "5bc18b4671dde8813ed2689f50c30e93"
// API keys for OpenWeatherMap
const coords = {
    providence: { lat: "41.825226", lon: "-71.418884" }, // Providence coordinates
    seoul: { lat: "37.532600", lon: "127.024612" }       // Seoul coordinates
};

// Function to fetch weather data and update background
function fetchWeatherAndUpdateBackground() {
    // Fetching weather data for Providence
    fetchWeather(coords.providence, updateBackground, '.right');

    // Fetching weather data for Seoul
    fetchWeather(coords.seoul, updateBackground, '.left');
}

// Helper function to fetch weather and apply background change
function fetchWeather(coord, callback, selector) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            callback(sunrise, sunset, selector);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to update the background of a given split
function updateBackground(sunrise, sunset, selector) {
    let now = new Date().getTime() / 1000; // current time in seconds
    let container = document.querySelector(selector);
    if (now >= sunrise && now < sunset) {
        container.style.backgroundImage = selector === '.right' ?
            'linear-gradient(to bottom, #28B5D2, #F37C5A, #FEE140)' : // Daytime colors for Providence
            'linear-gradient(to bottom, #28B5D2,40%, #F37C5A, #FEE140)';  // Daytime colors for Seoul
    } else {
        container.style.backgroundImage = selector === '.right' ?
            'linear-gradient(to bottom, #4B79A1, #514C73, #283E51)' : // Nighttime colors for Providence
            'linear-gradient(to bottom,  #4B79A1, #514C73, #283E51)';  // Nighttime colors for Seoul
    }
}

// Function to toggle the visibility of content
function setupToggleButtons() {
    const toggleButtons = document.querySelectorAll('.toggleButton');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling; // Assuming the next element is the content to toggle
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
}

// Initial setup function to set up everything
function initialize() {
    fetchWeatherAndUpdateBackground();
    setupToggleButtons();
}

// Run the initialize function when the window loads
window.onload = initialize;
