document.addEventListener("DOMContentLoaded", function () {
    const words1 = ["The Sri Aurobindo Ashram at Pondicherry where I go to meditate",
        "I get really overstimulated easily, so quieter spaces help me calm down much more, but not total silence, background sounds or noises can be nice.",
        "I love corners! somehow being surrounded by two walls is comforting to me?",
        "Pick an argument with stranger",
        "Libraries– Fleet, Rockefeller; Manning Hall",
        "There is a huge Buddha sculpture in the Metropolitan Museum which is originally from my hometown. When I cannot go back home during covid, I went to cry in front of the Buddha when I was homesick.",
        "Bathroom",
        "1) That closet on CIT 5th between the bathroom and elevator- I use it as my secret spray booth 💀; 2) the space in front of my apartment door- I know we shouldn't put stuff in the corridor, but when I get packages, I usually leave it in front of my door for 1-2 hours before I bring things in, because package boxes are dirty and I only open the boxes in front of my door so that I don't have to bring the boxes inside; 3) there's a boiler room in my apartment, which is a space where all the AC and machines stay. There's a door that opens to this room that I never open, but somehow it's an important space in my studio apartment because without it I wouldn't be able to use AC. Because of its hidden place and space, I store my luggages inside this room. 4) When I was back in St. Louis, I found this coffee house very far away from my house and school, but I would still pay a long journey to visit it in order to sit there for an afternoon once in a while. I call it my temple, and the journey there is almost like a pilgrimage. I need a space that's neither home (somewhere without a bed and where I can work) nor school (I wanted to get out of the campus and find somewhere peaceful yet still productive), and the existence of this coffee house is a tranquil in-between.",
        "A massage parlour or a water spa?",
        "I'd say my bathtub. I need to take baths because it calms me down and it feels nice. Not everywhere I go has one so it's inconvenient but I love a good bath.",
        "Yoga studio + bedroom (peace), nature (feeling of being connected to the earth)",
        "I like going to grocery stores and browse the aisles to relax and destress, seeing all the produce and items full of possibilities just make me feel so calm",
        "I don't know if this counts as an unconventional space but I like airports (after I get through security). Not really sure why. Maybe having to wait + the excitement of traveling?"];
    const words2 = ["Laptop", "AirCon", "Books, Car, Skull, GIftbox, Piano, Cable Wire, Pastry, Your nose", "TikTok, Instagram shorts, YouTube, games, shopping",
        "Fridge, Microwave, Spray bottles",
        "Human, book, box, drawer, water kettle",
        "Fortune cookie, phone, body, pencil, coconut, fruit, cans, clam",
        "Fruits / vegetables, fridge, boxes, the ground, human bodies",
        "Pockets, handbags, cups, boxes, rooms, houses, elevators",
        "A safe, A shed, A jail cell, A geode, A kiln, A diary with a lock, A beehive"
    ];
    const words3 = ["Elevator, airplane",
        "I'm not exactly sure what an in-between space is, but I infer this as meaning a space that gets me from one place to another. So a specific example is the Providence footbridge that connects downtown to the east end, which I walk across everyday to get from home to studio and back.",
        "This somehow reminds me of the rock barriers near waterbodies, even airport runways to some extent. In between spaces somehow feel like spaces that don't have a defined meaning, yet are important to the space in some way? Like if we had no rock barriers, and the land would directly lead to water, it would feel weird?",
        "Escalators in shopping malls - when you're in air, in-between two floors, trying to get to another level but not really belong to either level yet until you get off; waiting rooms in hospitals/service locations, where the 'in-between' is more temporal",
        "The spaces that we don't have easy access to. Like the space between the bed backboard and the wall. Spaces that accumulate dust overtime but we don't see or can't see.",
        "In-between spaces conceptually be something in process in progress - makes me think of AI and when its creating your image its blurry until it becomes clear. Another example is the space between your oven and counter top and food falls in but you cant take it out.",
        "(1) Physically being in between 2 spaces (two countries), two cities. I am in between Venezuela and Providence. 2) Inside an architectural space and outside (looking from a window)",
        "I often think of portals or things one encounters on the way to something, like a corridor or tunnel, the connector between places"];
    const words4 = ["Share music",
        "I collect in private channels on are.na... I think also the artwork that I'm choosing to frame and display in my home does that. I speak to my close friends + partner about those things to process and share them too.",
        "This is ridiculous but I think sending voice notes is my way of expressing emotion? writing it down doesn't feel enough, somehow making myself say things out loud makes the emotion more real.",
        "Shopping, or play video games",
        "Dancing on my own, writing in my journal, running, working out, ranting to a loved one",
        "If I feel depressed for a while, I like to move my furniture around so I feel fresh and organized. I also like writing journals when I feel overwhelmed by my feelings. I also like to go near the nature when I need inner peace.",
        "Post on my story, call my friends, clean my house, and cook (a lot)",
        "I talk to friends to share my thoughts or journal. I also go to therapy. I cry, decorate my spaces, watch movies, listen to music, dance",
        "I buy flowers then cut and arrange them to destress and feel calm. Or go to target and smell the candles. Or light a candle in my bedroom, play nice music and read a book with my lamp on. I love doing routines for calmness.",
        "I collect things on Pinterest and create mood boards there, to manifest certain things. Occasionally I jot down things in my Notes app or Notion."];
    const words5 = ["Riding my motorbike on a long and smooth highway",
        "My bed, my home. Anywhere that feels safe. Being with my close friends back home (who I miss constantly), which is less of a physical space and more of a created intangible location.",
        "Somewhere with trees and water? the beach? I grew up in a very very crowded city so anywhere with more space feels like an escape to me.",
        "My cozy bedroom and office, away from people I know",
        "Parks, botanical gardens, aquarium and video games",
        "My escape is anywhere near large body of water. When I was back home, we used to live near Yangtze River (one of the two biggest rivers in China). It's 3 kilometers away from my home, and there's a smaller river directly connecting my home to Yangtze River. When I feel like 'escaping', I just put on my most comfy sneakers, put on my headphones, depart about one hour before golden hour, and start chasing sunset along the small river until I reach Yangtze River. When I reach Yangtze River, as I always perfectly time it, it will be the perfect golden hour to watch sunset along the water. I will just stand and lean on the bridge until it gets completely dark. Every time after such a trip, I felt refreshed and so blissful. So whichever city I pick, I will always try to search for large body of water. When I was living in Chicago, I fell in love with Lake Michigan. I would bike along the entire lakeshore of Lake Michigan from Edgewater in the very north to Hyde Park in the very south. Those were the best afternoons I spent in Chicago. I never failed to feel completely escaped from my reality, regardless of if the reality was good or bad.",
        "Somewhere cozy where I can relax, or somewhere with a good view and surrounding, like a beach house or a cabin on a pretty mountain",
        "Any place where I don't have to work, so basically any place I get to travel to because I work everywhere, even at home!"];
    const words6 = ["Back at home where I don't fit the binary aesthetic",
"One I've encountered in the past is having a physical space filled with my women close friends, and then a man entering that space (ex. someone's boyfriend). It changes the dynamic from one of complete honesty/openness/safety/sharing to one where we feel we need to be conscious of how and what we are speaking about, to not share confidential information, or information that might feel unsafe to share around men.",
"I feel SUPER uncomfortable in large crowded spaces, I went to a concert a long long time ago and just the amount of people felt overwhelming to me. I think just over-all crowded spaces are where I feel a lot of struggle/tension. Also going a little on a tangent, but the local trains+stations in Mumbai are always overflowing with people, this question also reminded me of that- not the 'tension' part, but the 'struggle' definitely (in terms of space, but also in terms of socioeconomic conditions)- sorry if this is too vague",
"When someone treats me un respectfully",
"The tension I experience these days come from feeling that I'm not working hard enough as others in my cohort. I'm struggling to sacrifice my wellbeing (i.e., staying up late in the studio working). Loud places with loud people (American bars is one, why do they have to speak so loud)",
"I really enjoy aquariums and the serenity they brought. But at the same time I feel how human traps sea creatures in tanks and the way I look at them as some unusual creatures makes me uncomfortable. It's different from watching birds in parks because they are still in nature, but fish are caught and kept for tourism and research purpose.",
"1) Stairs. I hate stairs! Especially the pivot mid-point that you have to turn around and finish the rest 50% of the stairs. Pure despair sometimes. 2) Elevator. It's always fun to observe how strangers crowd into such a small space and try to stand away from each other as far / as diagonally as possible. It's sometimes wrong to talk, and it's also wrong to start conversation.",
"Every time I see a homeless person sitting or sleeping on the sidewalk, I feel bad for their situation, but I also don't think I can really help them on an individual level.",
"Trying to open a wine bottle without an opener",
"When I am stressed by school",
"Struggle of what I want to do vs. should do",
"A situation might be the political environment right now in the United States. A place might be Providence in general–I think socioeconomic differences are more obvious here than in other places I have lived. That difference creates more obvious moral tensions in my head. Also just my home in general, there is interpersonal tension.",
"I see struggle in being able to fully and openly express myself sometimes, whether platonically or romantically because of a fear of being perceived or misinterpreted."];



    const images = { // Mapping words to images
        "The Sri Aurobindo Ashram at Pondicherry where I go to meditate": "image-1.png",
        "Libraries– Fleet, Rockefeller; Manning Hall": "image-2.png",
        // Add more mappings as necessary
    };

    const wordsCombined = [
        ...words1.map(word => ({ word, color: 'brown' })),
        ...words2.map(word => ({ word, color: 'blue' })),
        ...words3.map(word => ({ word, color: 'green' })),
        ...words4.map(word => ({ word, color: 'orange' })),
        ...words5.map(word => ({ word, color: 'purple' })),
        ...words6.map(word => ({ word, color: 'pink' })),
        // Include other words groups with respective colors
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledWords = shuffle(wordsCombined);
    const container = document.getElementById('wordContainer');
    const hoverImage = document.getElementById('hoverImage');

    shuffledWords.forEach(({ word, color }) => {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = word;
        wordDiv.className = `word ${color}`;
        // wordDiv.style.color = color;
        wordDiv.style.color = 'white'; // Text color set to white for better visibility
        wordDiv.style.backgroundColor = color; // Sets background color to the specified color
        wordDiv.style.padding = '5px'; // Adds some padding
        wordDiv.style.margin = '2px'; // Adds a small margin
        wordDiv.style.display = 'inline-block'; // Ensures the divs are in line
        wordDiv.addEventListener('mouseover', function () {
            hoverImage.style.display = 'block';
            hoverImage.src = `common/${images[word] || 'image-1.png'}`; // Display image corresponding to the word
        });
        wordDiv.addEventListener('mouseout', function () {
            hoverImage.style.display = 'none';
        });
        container.appendChild(wordDiv);
    });

    document.addEventListener('mousemove', function (e) {
        hoverImage.style.top = `${e.pageY + 10}px`;
        hoverImage.style.left = `${e.pageX + 10}px`;
    });

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
    
});

