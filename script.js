// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 10 Images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
    } catch (error) {
        // Catch Errror Here
    }
}

// On Load
getNasaPictures();
