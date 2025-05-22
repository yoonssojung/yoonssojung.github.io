var sentenceInterval;
var currentSentence = '';

// function updateTime() {
//     var now = new Date();
//     var currentTime = now.toLocaleTimeString();
//     // document.getElementById("sentenceOutput1").innerHTML = currentTime;
//     document.getElementById("printTime").innerHTML = ""; // or use current time if needed

// }

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    const formattedTime = `It’s ${hours}:${minutes}${isPM ? 'pm' : 'am'},`;
    return formattedTime;
}


// setInterval(updateTime, 1000);
setInterval(updateTime);

// Initialize the time update when the page loads
window.onload = function () {
    startTime(); // Start updating time on page load
};

// Function to start the time update
function startTime() {
    if (!timeInterval) {
        updateTime(); // Update time immediately before setting the interval
        timeInterval = setInterval(updateTime, 1000); // Update time every second
    }
}

// Function to stop the time update
function stopTime() {
    clearInterval(timeInterval);
    timeInterval = null;
}


// var one = "It's time to ";
var one = "Are you ready to ";
var twoOptions = ["deny", "dis", "allow", "forget", "hold", "ignore", "keep", "leave out", "refuse", "say no to", "stop", "push away", "let go of", "turn down", "drop"];
var threeOptions = ["your", "people's", "other's"];
var fourOptions = [
    "thought", "plan", "feeling", "idea", "view", "guess", "point", "belief", 
    "reason", "opinion", "meaning", "aim", "choice", "dream", "hope", 
    "message", "sense", "understanding"
  ];
  


var imageUrls = [
    './common/ObliqueAct-03.png',
    './common/ObliqueAct-04.png',
    './common/ObliqueAct-05.png',
    './common/ObliqueAct-06.png',
    './common/ObliqueAct-07.png',
    './common/ObliqueAct-08.png',
    './common/ObliqueAct-09.png',
    './common/ObliqueAct-10.png',
    './common/ObliqueAct-11.png',
    './common/ObliqueAct-12.png',
];

var imageMapping = {
    'deny_my': [
    './common/ObliqueAct-04.png',
    './common/ObliqueAct-03.png'
    ],

    'allow_your own': [
    './common/ObliqueAct-11.png',
    './common/ObliqueAct-12.png',
    './common/ObliqueAct-08.png'
    ]
};

function getImageUrlsForCombination(two, three) {
    var key = two + "_" + three;
    return imageMapping[key] || [];
}

function generateSentence() {
    var two = twoOptions[Math.floor(Math.random() * twoOptions.length)];
    var three = threeOptions[Math.floor(Math.random() * threeOptions.length)];
    var four = fourOptions[Math.floor(Math.random() * fourOptions.length)];
    currentSentence = one + " " + two + " " + three + " " + four + "?";
    document.getElementById("sentenceOutput2").innerHTML = currentSentence;

    var imageUrls = getImageUrlsForCombination(two, three);
    console.log(imageUrls);
}

function startSentenceGeneration() {
    if (!sentenceInterval) {
        generateSentence();
        sentenceInterval = setInterval(generateSentence, 200);
    }
}

function stopGenerating() {
    clearInterval(sentenceInterval);
    sentenceInterval = null;
}

function restartGenerating() {
    stopGenerating();
    startSentenceGeneration();
}

// function printDocument() {
//     document.getElementById("urlSpan").textContent = window.location.href;
//     updateTime();

//     // Print the current sentence
//     document.getElementById("sentenceOutput2").innerHTML = currentSentence;

//     //visible for printing
//     var printImage = document.getElementById("printImage");
//     printImage.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
//     printImage.style.display = 'block';

//     window.print();

//     // Hide the image again after printing
//     printImage.style.display = 'none';

// }

// function printDocument() {
//     const formattedTime = updateTime();
//     document.getElementById("urlSpan").textContent = window.location.href;

//     // Show the image for printing
//     const printImage = document.getElementById("printImage");
//     printImage.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
//     printImage.style.display = 'block';

//     // Prepare and show the sentence at the bottom
//     const bottomSentence = document.getElementById("printSentenceBottom");
//     bottomSentence.innerHTML = `${formattedTime} ${currentSentence}`;
//     bottomSentence.style.display = 'block';

//     window.print();

//     // Hide again after print
//     printImage.style.display = 'none';
//     bottomSentence.style.display = 'none';
// }

function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    return `It’s ${hours}:${minutes}${isPM ? 'pm' : 'am'},`;
}

function printDocument() {
    const formattedTime = getFormattedTime();

    // Set time
    const printTime = document.getElementById("printTime");
    printTime.innerHTML = formattedTime;
    printTime.style.display = 'block';

    // Set image
    const printImage = document.getElementById("printImage");
    printImage.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    printImage.style.display = 'block';

    // Set sentence
    const printSentence = document.getElementById("printSentence");
    printSentence.innerHTML = currentSentence;
    printSentence.style.display = 'block';

    // Trigger print
    window.print();

    // Reset
    printTime.style.display = 'none';
    printImage.style.display = 'none';
    printSentence.style.display = 'none';
}



// Initialize the sentence generation when the page loads
startSentenceGeneration();
