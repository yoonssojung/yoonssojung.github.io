// Define all image arrays with example image paths. Replace these with your actual image paths.
document.addEventListener('DOMContentLoaded', function() {
var imagesArray = ['data/large/billy_narrow.png', 'data/large/billy.png', 'data/large/coffeetable.png', 'data/large/ikealatanchairtable.png', 'data/large/ikeasofa.png', 'data/large/millerchair.png', 'data/large/sidetable.png', 'data/large/swivelgreenchair.png', 'data/large/walnutsofa.png', 'data/large/redcart.png'];
var imagesArray1 = ['data/medium/checkchair.png', 'data/medium/aproan.png', 'data/medium/ledlampsmall.png', 'data/medium/cushion.png', 'data/medium/stringlightyellow.png', 'data/medium/watercan.png', 'data/medium/basket.png', 'data/medium/shogun.png'];
var imagesArray2 = ['data/small/vegetablebrush.png', 'data/small/bag.png', 'data/small/mesh.png', 'data/small/stainhook.png', 'data/small/dishbrush.png', 'data/small/plantvase.png', 'data/small/mitt.png', 'data/small/gardentool.png', 'data/small/container.png', 'data/small/funnel.png', 'data/small/battery.png', 'data/small/toiletbrush.png'];
var imagesArray3 = ['data/Subject 6.png', 'data/Subject 7.png', 'data/Subject 5.png']; // For inactivity timeout


let lastScrollTop = 0;
let lastTimestamp = 0;
let scrollSpeed = 0;

    var inactivityTime = 10000; // Time in milliseconds
    var inactivityTimeout;

    function displayImagesRandomly() {
        clearImages(); // Clear existing images before displaying new ones
        var selectedImagesArray = selectImageArray(); // Select the appropriate image array based on current screen width
        selectedImagesArray.forEach(function(imageSource) {
            var imgElement = document.createElement('img');
            imgElement.src = imageSource;
            imgElement.style.position = 'fixed';

            var position = getRandomPosition();
            imgElement.style.left = `${position.x}px`;
            imgElement.style.top = `${position.y}px`;
            imgElement.style.width = '20vw';
            imgElement.style.height = 'auto';
            imgElement.title = "Click and drag to move"; // Set title for tooltip

            imgElement.addEventListener('mousedown', mouseDownHandler);
            document.body.appendChild(imgElement);
        });
        calculateOriginalPosition(); // Calculate positions for new images
    }

   /* function moveImagesBasedOnScroll() {
       //const bottomCenter = { x: window.innerWidth / 2, y: document.body.scrollHeight - window.innerHeight };
        const images = document.querySelectorAll('body > img:not(.image-inactivity)'); // Exclude inactivity images

        images.forEach(img => {
            const centerX = window.innerWidth / 2;
            const targetY = window.scrollY + (window.innerHeight * 0.75); // Adjust the multiplier to target lower towards the bottom
    
            const currentPos = parseInt(img.style.top, 10) || window.scrollY;
            
            // Calculate new position more smoothly, using a smaller adjustment factor
            const newPos = currentPos + ((targetY - currentPos) * 0.1); // Adjust the multiplier to control the smoothness
    
            img.style.left = `${centerX - (img.offsetWidth / 2)}px`; // Center align horizontally
            img.style.top = `${newPos}px`; // Move gradually towards the target position
            img.style.position = 'absolute'; // Use absolute to move within the document flow
            const imageBottom = img.offsetTop + img.offsetHeight + targetY;
        
        });
    }*/

   /* function moveImagesBasedOnScroll() {
        const images = document.querySelectorAll('body > img:not(.image-inactivity)');
    
        images.forEach(img => {
            // Center position on the screen regardless of scroll
            const centerX = window.innerWidth / 2 - img.offsetWidth / 2;
            const windowHeight = window.innerHeight;
    
            // Determine the target Y position as a fixed point on the screen
            // This is the center bottom of the screen
            const targetY = window.scrollY + windowHeight * 0.75; // Keeping towards the lower part of the screen
    
            // Calculate the difference between the current image position and the target
            const currentTop = parseFloat(img.style.top, 10) || windowHeight * 0.75;
            let diff = targetY - currentTop;
    
            // Make the movement subtler to keep the image visible longer
            // Reducing the multiplier will slow down the movement
            let adjustment = diff * 0.02; // Subtle movement adjustment
    
            // Calculate new position
            let newTop = currentTop + adjustment;
    
            // Update the image position
            img.style.left = `${centerX}px`;
            img.style.top = `${newTop}px`;
    
            // Hide the image if it moves beyond the bottom edge of the document
            // Consider the document height and the current scroll position
            if (newTop > document.body.scrollHeight - windowHeight + window.scrollY) {
                img.style.visibility = 'hidden'; // Hide but do not remove for reappear on scroll up
            } else {
                img.style.visibility = 'visible';
            }
        });
    }*/
    function moveImagesBasedOnScroll() {
        const images = document.querySelectorAll('body > img:not(.image-inactivity)');
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
    
        images.forEach(img => {
            // Calculate the current top position or initialize it if not set
            let currentTop = parseFloat(img.style.top, 10) || windowHeight * 0.75;
            let currentLeft = parseFloat(img.style.left, 10) || windowWidth / 2;
    
            // Determine target positions with intermediate steps
            let targetY = window.scrollY + windowHeight * 0.75; // Target towards the bottom
            let targetX = windowWidth / 2; // Target towards the center
    
            // Calculate differences for gradual movement
            let diffY = (targetY - currentTop) * 0.05; // Slow vertical movement
            let diffX = (targetX - currentLeft) * 0.05; // Slow horizontal movement
    
            // Calculate new positions
            let newTop = currentTop + diffY;
            let newLeft = currentLeft + diffX;
    
            // Apply the new positions
            img.style.top = `${newTop}px`;
            img.style.left = `${newLeft}px`;
    
            // Toggle visibility based on the current scroll position and total document height
            if (newTop > document.body.scrollHeight - 100 || newTop < window.scrollY) {
                img.style.visibility = 'hidden'; // Hide when out of viewport
            } else {
                img.style.visibility = 'visible'; // Ensure visibility when in viewport
            }
        });
    }
    


function selectImageArray() {
    var width = window.innerWidth;
    if (width >= 1025) {
        return imagesArray;
    } else if (width >= 768 && width < 1025) {
        return imagesArray1;
    } else {
        return imagesArray2;
    }
}

function clearImages() {
    document.querySelectorAll('body > img').forEach(function(img) {
        img.remove();
    });
}

function getRandomPosition() {
    var imgWidthInVw = 20;
    var aspectRatio = 4 / 3;
    var imgWidth = (window.innerWidth * imgWidthInVw) / 100;
    var imgHeight = imgWidth / aspectRatio;
    var maxX = window.innerWidth - imgWidth;
    var maxY = window.innerHeight - imgHeight;
    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
}

function mouseDownHandler(e) {
    var img = e.target;

    var offsetX = e.clientX - img.getBoundingClientRect().left;
    var offsetY = e.clientY - img.getBoundingClientRect().top;

    function mouseMoveHandler(e) {
        img.style.left = `${e.clientX - offsetX}px`;
        img.style.top = `${e.clientY - offsetY}px`;
    }

    function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}

function clearImages() {
    // Select all dynamically added images and remove them
    document.querySelectorAll('body > img').forEach(function(img) {
        img.remove();
    });
}


var occupiedSegments = [];

function displayImageFromImagesArray3(index = 0) {
    if (index >= imagesArray3.length) {
        return; // Exit if no more images to display
    }


    var imageSource = imagesArray3[index];
    var imgElement = document.createElement('img');

    imgElement.onload = function() {
        var imgHeight = this.height * (window.innerWidth * 0.20 / this.width);
        var endPositionY = findUnoccupiedPosition(imgHeight);

        this.style.position = 'absolute';
        this.style.left = `-200px`;
        this.style.top = `${endPositionY}px`;
        this.style.width = '20vw';
        this.style.height = 'auto';
        this.style.transition = 'left 2s ease-out';

        // Append to document
        document.body.appendChild(this);

        // Animate into view
        setTimeout(() => {
            this.style.left = `0px`; // Move to final position
        }, 100);

        updateOccupiedSegments(endPositionY, endPositionY + imgHeight);
    };
    imgElement.src = imageSource; // Set src last to ensure onload works correctly

    var randomGap = getRandomGap();
    setTimeout(() => {
        displayImageFromImagesArray3(index + 1);
    }, randomGap + 50000); // Wait for animation to finish plus random gap
}

function findUnoccupiedPosition(imgHeight) {
    var viewportHeight = window.innerHeight;
    var startY = 0;

    while (startY + imgHeight <= viewportHeight) {
        let overlapping = occupiedSegments.some(segment => !(startY + imgHeight <= segment.start || startY >= segment.end));
        if (!overlapping) return startY;
        startY += 10;
    }

    return 0;
}

function updateOccupiedSegments(start, end) {
    occupiedSegments.push({ start, end });
}

function getRandomGap() {
    return Math.random() * (1500 - 500) + 500;
}

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout); // Clear any existing timeout

    inactivityTimeout = setTimeout(function() {
        if (!document.querySelector('.image-inactivity')) { // Prevent multiple triggers
            displayImageFromImagesArray3();
        }
    }, 5000);
}

document.addEventListener('mousemove', resetInactivityTimeout);
document.addEventListener('click', resetInactivityTimeout);
document.addEventListener('keypress', resetInactivityTimeout);
window.addEventListener('resize', function() {
    ['scroll', 'mousemove', 'click', 'keypress'].forEach(event => {
        window.addEventListener(event, resetInactivityTimeout);
    });
    displayImagesRandomly();
    resetInactivityTimeout();
});

// Display images upon window load and reset the inactivity timeout
window.onload = function() {
    displayImagesRandomly(); // Initially display images based on screen width
    resetInactivityTimeout(); // Start the inactivity timeout
};

function displayImages() {
        const displayImage = (src, className) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = className; // Use this class to identify images later
            document.body.appendChild(img);
        };

        imagesArray.forEach(src => displayImage(src, 'image-large'));
        imagesArray1.forEach(src => displayImage(src, 'image-medium'));
        imagesArray2.forEach(src => displayImage(src, 'image-small'));

        // After adding images to the document, calculate their original position
        calculateOriginalPosition();
    }

    // Listen for scroll events
    window.addEventListener('scroll', function() {
        const now = performance.now();
        const scrolled = window.scrollY;
        const delta = scrolled - lastScrollTop;
        const time = now - lastTimestamp;

        lastScrollTop = scrolled;
        lastTimestamp = now;
        scrollSpeed = time ? Math.abs(delta / time) : 0;

        moveImagesBasedOnScroll();
    });
    // Initial setup: Display images and set up their positions
    displayImagesRandomly(); // Display images initially
    });