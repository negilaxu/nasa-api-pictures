const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
  resultsArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.hdurl;
    image.alt = 'NASA PICTURE OF THE DAY';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = result.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.innerHTML = 'Add to Favourites';
    // Card Text
    const cardText = document.createElement('p');
    cardText.innerHTML = result.explanation;
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyrightResult =
      result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.innerHTML = `${copyrightResult}`;
    // Show only explanation
    const explanation = document.createElement('div');
    explanation.innerHTML = result.explanation;
    cardText.textContent = explanation.textContent;
    copyright.textContent = copyright.textContent;
    // Append
    cardBody.append(cardTitle, saveText, cardText, footer);
    footer.append(date, copyright);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    console.error('Unable to load NASA pictures:', error);
  }
}

// On Load
getNasaPictures();
