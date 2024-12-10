const textsWithLinks = [
  { text: "Garden is a form of containment.", link: "https://example.com/1" },
  { text: "Bounded space", link: "https://example.com/2" },
  { text: "Space of desire", link: "https://www.lerandom.art/editorial/maya-man-on-generative-meaning" },
  { text: "In between space", link: "https://example.com/4" },
  { text: "Gardens sometimes overgrow", link: "https://example.com/4" },
  { text: "Tensions between the gardener and the garden", link: "https://example.com/4" },
  { text: "A closet can be a garden", link: "https://example.com/5" },
  { text: "Corridor", link: "https://example.com/6" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
  { text: "Boiler room", link: "https://example.com/7" },
  { text: "Bathtub", link: "https://example.com/8" },
  { text: "Chinese supermarket", link: "https://example.com/9" },
  { text: "Airport", link: "https://example.com/10" },
  { text: "Corner", link: "https://example.com/1" },
  { text: "Library", link: "https://example.com/2" },
  { text: "tiktok", link: "https://example.com/3" },
  { text: "Is this a Flower or a Garden?", link: "https://example.com/4" },
  { text: "BY TRAVELING IN-BETWEEN SPACES, WE CAN COLLECTIVELY ASSEMBLE AND ARRANGE", link: "https://example.com/5" },
  { text: "What are some unconventional spaces that satisfy specific or unique needs to you?", link: "https://example.com/6" },
  { text: "fridge", link: "https://example.com/7" },
  { text: "Museum", link: "https://example.com/8" },
  { text: "Laptop", link: "https://example.com/9" },
  { text: "bag", link: "https://example.com/10" },
  { text: "🌳", link: "https://mayaontheinter.net/" },
  { text: "🌳", link: "https://mayaontheinter.net/" },
  { text: "pocket", link: "https://example.com/1" },
  { text: "room", link: "https://example.com/2" },
  { text: "clock", link: "https://example.com/3" },
  { text: "elevator", link: "https://example.com/4" },
  { text: "bridge", link: "https://example.com/5" },
  { text: "rock barriers near waterbodies", link: "https://example.com/6" },
  { text: "Church", link: "https://example.com/8" },
  { text: "Waiting room", link: "https://example.com/9" },
  { text: "tunnel", link: "https://example.com/10" },
  { text: "movie theater", link: "https://mayaontheinter.net/" },
  { text: "stairs", link: "https://mayaontheinter.net/" },
  { text: "🌳", link: "https://mayaontheinter.net/" },
  { text: "🌳", link: "https://mayaontheinter.net/" },
  { text: "aquariums", link: "https://mayaontheinter.net/" },
  { text: "target", link: "https://mayaontheinter.net/" },
  { text: "What do you do to express your desire or emotion?", link: "https://mayaontheinter.net/" },
  { text: "Ikea", link: "https://mayaontheinter.net/" },
  { text: "sea", link: "https://mayaontheinter.net/" },
  { text: "drawer", link: "https://mayaontheinter.net/" },
  { text: "amusement park", link: "https://mayaontheinter.net/" },
  { text: "basket", link: "https://mayaontheinter.net/" },
  { text: "box", link: "https://mayaontheinter.net/" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
  { text: "Can you describe a situation or place where you see a struggle/tension?", link: "https://mayaontheinter.net/" },
  { text: "zoo", link: "https://mayaontheinter.net/" },
  { text: "computer files", link: "https://mayaontheinter.net/" },
  { text: "bowl", link: "https://mayaontheinter.net/" },
  { text: "window", link: "https://mayaontheinter.net/" },
  { text: "youtube", link: "https://mayaontheinter.net/" },
  { text: "suitcase", link: "https://mayaontheinter.net/" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
  { text: "park", link: "https://mayaontheinter.net/" },
  { text: "🌿", link: "https://mayaontheinter.net/" },
  { text: "🌳", link: "https://mayaontheinter.net/" },
  { text: "🌱", link: "https://mayaontheinter.net/" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
  { text: "How would you describe practical examples of 'in-between spaces'?", link: "https://mayaontheinter.net/" },
  { text: "walmart", link: "https://mayaontheinter.net/" },
  { text: "Gardens and parks lie between farmland and wilderness", link: "https://mayaontheinter.net/" },
  { text: "Can you describe a situation or place where you see a struggle/tension?", link: "https://mayaontheinter.net/" },
  { text: "Is there meaning in random messages?", link: "https://mayaontheinter.net/" },
  { text: "How can the craft of hypertext invite readers to stay, to explore, and to reflect?", link: "https://www.eastgate.com/garden/Introduction.html" },
  { text: "irregularity as intention", link: "https://www.eastgate.com/garden/Virtue_of_Irregularity.html" },
  { text: "paper", link: "https://mayaontheinter.net/" },
  { text: "CD", link: "https://mayaontheinter.net/" },
  { text: "Emoji", link: "https://mayaontheinter.net/" },
  { text: "Bed", link: "https://mayaontheinter.net/" },
  { text: "Table", link: "https://mayaontheinter.net/" },
  { text: "hyperlink", link: "https://mayaontheinter.net/" },
  { text: "brain", link: "https://mayaontheinter.net/" },
  { text: "vase", link: "https://mayaontheinter.net/" },
  { text: "What do unexpected colors in a garden indicate about the underlying health of the system?", link: "https://mayaontheinter.net/" },
  { text: "I always stand in a difficult place. I am kept at arms length and viewed as a dangerous element by both sides. I am left standing outside the collectve, seen on the one hand as a fugitive and on the other as an intruder. As a result of being observed intently by others, however, I have come to observe others with great intensity. The less I am one of them and the more apart from everyone else I am, the better I can see them. The dynamics of distance have made me what I am.", link: "https://librarycat.risd.edu/search~S4?/XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D/XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D&SUBKEY=Lee+Ufan%3A+Art+of+Encounter/1%2C3%2C3%2CB/frameset&FF=XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D&3%2C3%2C" },
  { text: "“So plant your own gardens and decorate your own soul, instead of waiting for someone to bring you flowers.", link: "https://nesslabs.com/mind-garden" },
  { text: "I also want to emphasize that the artwork is not only the individual outputs, but more importantly the infinite possibility of the generative program itself. By collecting, you are not only owning that single mint, but also a piece of the project as a whole,", link: "https://mayaontheinter.net/" },
  { text: "Digital gardens let you cultivate your own little bit of the internet", link: "https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/" },
  { text: "🌿", link: "https://mayaontheinter.net/" },
  { text: "🌳", link: "https://mayaontheinter.net/" },
  { text: "🌱", link: "https://mayaontheinter.net/" },
  { text: "🌷", link: "https://mayaontheinter.net/" },
];

const typingSpeed = 50; // Typing speed in milliseconds
const pauseBetweenTexts = 1000; // Pause duration between texts (in ms)
const typingContainer = document.getElementById("typing-container");

let textIndex = 0; // Current text index

// Set behavior mode
const randomOrder = true; // Toggle between random order and sequential
const periodFirst = true; // Toggle between period-first and direct typing

// Shuffle the textsWithLinks array for random order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

if (randomOrder) {
  shuffleArray(textsWithLinks); // Shuffle if randomOrder is enabled
}

// Generate a random position within the viewport while preventing overflow
function getRandomPosition() {
  const viewportWidth = window.innerWidth; // Full viewport width
  const viewportHeight = window.innerHeight;
  const elementWidth = 200; // Approximate width of a text element
  const elementHeight = 50; // Approximate height of a text element

  const x = Math.random() * (viewportWidth - elementWidth); // Ensure within width
  const y = Math.random() * (viewportHeight - elementHeight); // Ensure within height

  return { x, y };
}

// Randomly assign one of 7 styles
function getRandomStyle() {
  return `style-${Math.ceil(Math.random() * 7)}`; // Random number between 1 and 7
}

function typeText() {
  if (textIndex >= textsWithLinks.length) {
    textIndex = 0; // Loop back to the first text
  }
  const currentTextData = textsWithLinks[textIndex];
  const { text, link } = currentTextData;

  if (!text || !link) {
    textIndex++;
    typeText();
    return;
  }

  const currentTextElement = document.createElement("p");
  currentTextElement.className = `typing-text ${getRandomStyle()}`;

  const hyperlink = document.createElement("a");
  hyperlink.href = link;
  hyperlink.target = "_blank"; // Open in a new tab
  currentTextElement.appendChild(hyperlink);

  const { x, y } = getRandomPosition();
  currentTextElement.style.left = `${x}px`;
  currentTextElement.style.top = `${y}px`;

  typingContainer.appendChild(currentTextElement);

  if (periodFirst) {
    // Initially display a period
    hyperlink.textContent = ".";

    // Change the period to the full text after 5 seconds
    setTimeout(() => {
      let charIndex = 0;
      function typeCharacter() {
        if (charIndex < text.length) {
          hyperlink.textContent = text.slice(0, charIndex + 1);
          charIndex++;
          setTimeout(typeCharacter, typingSpeed);
        } else {
          textIndex++; // Move to the next text
          setTimeout(() => {
            typeText();
          }, pauseBetweenTexts);
        }
      }
      typeCharacter();
    }, 5000); // 5 seconds delay
  } else {
    // Directly type text character by character
    let charIndex = 0;
    function typeCharacter() {
      if (charIndex < text.length) {
        hyperlink.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        textIndex++; // Move to the next text
        setTimeout(() => {
          typeText();
        }, pauseBetweenTexts);
      }
    }
    typeCharacter();
  }
}

window.onload = typeText;
document.body.style.overflow = "hidden";