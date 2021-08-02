const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const quoteText = document.getElementById('quote-text');
const backgroundImage = document.getElementById('container').style.backgroundImage;

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Qupte to VoiceRSS API
function randomSeinfeldQuote(quote) {
    VoiceRSS.speech({
        key: '55d88a4a174d4bd8834bb4861cf5d2de',
        src: quote,
        hl: 'en-ie',
        v: 'Oran',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Quotes from Seinfeld API 
async function getQuotes() {
    let quote = '';
    const apiUrl = 'https://seinfeld-quotes.herokuapp.com/random'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const quote = data.quote;
        const author = data.author;
        // Display Quote On Screen
        quoteText.innerText = quote;
        quoteText.style.display="flex";
        // Display Author On Screen
        document.getElementById('author-text').innerText = author;
        // Text-to-Speech
        randomSeinfeldQuote(quote);
        // Disable Button
        toggleButton();
        // Change Background Image To Quoted Character
        if (author === 'George') {
            backgroundImage = "url('../img/george.gif')";
        } else if (author === 'Jerry') {
            backgroundImage = "url('../img/jerry.gif')";
        } else if (author === 'Elaine') {
            backgroundImage = "url('../img/elaine.gif')";
        } else if (author === 'Kramer') {
            backgroundImage = "url('../img/kramer.gif')";
        } else if (author === 'Frank Costanza') {
            backgroundImage = "url('../img/frank.gif')";
        } else {
            backgroundImage = "url('../img/seinfeld.gif')";
        }
    } catch (error) {
        // Catch Errors Here
        console.log('get OUT! (shoves)', error);
    }
}

// Event Listeners
button.addEventListener('click', getQuotes);
audioElement.addEventListener('ended', toggleButton);