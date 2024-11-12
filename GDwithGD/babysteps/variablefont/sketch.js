// Select the root element to update CSS variables
var root = document.querySelector('html');

// Function to update the weight variable
var currentWeight = document.querySelector('#current-weight');
function setWeight(newWeight) {
    console.log(newWeight);
    currentWeight.innerText = newWeight;
    root.style.setProperty('--weight', newWeight);
}

// Function to update the font-size variable
var currentFontSize = document.querySelector('#current-font-size');
function setFontSize(newFontSize) {
    console.log(newFontSize);
    currentFontSize.innerText = newFontSize;
    root.style.setProperty('--font-size', newFontSize + "px"); // add "px" for font-size
}

// Function to update the letter-spacing variable
var currentLetterSpacing = document.querySelector('#current-letter-spacing');
function setLetterSpacing(newLetterSpacing) {
    console.log(newLetterSpacing);
    currentLetterSpacing.innerText = newLetterSpacing; // Update letter-spacing label
    root.style.setProperty('--letter-spacing', newLetterSpacing + "px"); // add "px" for letter-spacing
}


// Target the element
var myElement = document.querySelector('#my-element');

// Function to randomize values
function randomizeValues() {
    var randomNumber1 = Math.random(); // generates a random number between 0 and 1
    var randomNumberAdjusted = randomNumber1 * 150; // converts number to range 0–100
    var randomNumberRounded = Math.round(randomNumberAdjusted); // round that number to an integer
    console.log(randomNumberRounded); // log the number so we can see it in the console (for bug testing)

    myElement.style.fontVariationSettings = `"wght" ${randomNumberRounded}`;
}

setInterval(randomizeValues, 500);


const hoverTargets = document.querySelectorAll('.hover-target');

hoverTargets.forEach(target => {
    // Get the associated image element using data attribute
    const imgId = target.getAttribute('data-img');
    const img = document.getElementById(imgId);

    target.addEventListener('mouseenter', () => {
        img.style.display = 'block';
    });

    target.addEventListener('mouseleave', () => {
        img.style.display = 'none';
    });

    target.addEventListener('mousemove', (event) => {
        // Update the position of the image based on the mouse position
        img.style.left = `${event.pageX + 10}px`;
        img.style.top = `${event.pageY + 10}px`;
    });
});

