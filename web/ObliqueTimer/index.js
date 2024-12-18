var sentenceInterval;
var currentSentence = ''; 

function updateTime() {
    var now = new Date();
    var currentTime = now.toLocaleTimeString();
    document.getElementById("sentenceOutput1").innerHTML = currentTime;
}

setInterval(updateTime, 1000);

// Initialize the time update when the page loads
window.onload = function() {
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


var one = "It's time to ";
var twoOptions = ["deny", "dis", "allow", "forget", "hold", "ignore", "keep", "neglect", "refuse", "reject", "halt", "stop", "exclude", "kill", "lack", "need", "want"];
var threeOptions = ["your own", "people's", "my", "your friend's"];
var fourOptions = ["belief", "concept", "conclusion", "design", "feeling", "form", "intention", "interpretation", "meaning", "notion", "objective", "opinion", "perception", "plan", "scheme", "sense", "solution", "suggestion", "theory", "thought", "understanding", "view", "aim", "approximation", "genius", "cleverness", "conception", "conviction", "doctrine", "end", "estimate", "essence", "guess", "hint", "hypothesis", "importance", "impression", "idea", "indication", "judgment", "object", "pattern", "purpose", "reason", "significance", "suspicion", "teaching", "point", "life"];

var imageUrls = [
    'common/image_1.png',
    'common/image_3.png',
    'common/image_4.png',
    'common/image_5.png',
    'common/image_6.png',
    'common/image_7.png',
    'common/image_8.png',
    'common/image_9.png',
    'common/image_10.png'
];

var imageMapping = {
    'deny_my': [
        'common/image_14.png',
        'common/image_15.png',
        'common/image_16.png'
    ],
    
    'allow_your own': [
        'common/image_11.png',
        'common/image_12.png',
        'common/image_13.png'
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
    currentSentence = one + " " + two + " " + three + " " + four + ".";
    document.getElementById("sentenceOutput2").innerHTML = currentSentence;

    var imageUrls = getImageUrlsForCombination(two, three);
    console.log(imageUrls);
}

function startSentenceGeneration() {
    if (!sentenceInterval) {
        generateSentence();
        sentenceInterval = setInterval(generateSentence, 500);
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

function printDocument() {
    document.getElementById("urlSpan").textContent = window.location.href;
    updateTime();

    // Print the current sentence
    document.getElementById("sentenceOutput2").innerHTML = currentSentence;

    //visible for printing
    var printImage = document.getElementById("printImage");
    printImage.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    printImage.style.display = 'block';

    window.print();

    // Hide the image again after printing
    printImage.style.display = 'none';

}



// Initialize the sentence generation when the page loads
startSentenceGeneration();
