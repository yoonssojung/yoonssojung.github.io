document.addEventListener("DOMContentLoaded", () => {
    const textCategories = [
        { text: "🛟 Garden as a metaphor 🛤️", category: "phrase" },
        { text: "📁 punctuation", category: "concept", link: "https://en.wikipedia.org/wiki/Punctuation" },
        { text: "📁 informal garden", category: "concept" },
        { text: "📁 diagram", category: "concept", link: "https://en.wikipedia.org/wiki/Diagram" },
        { text: "📁 amusement park", category: "concept", link: "https://www.google.com/search?q=amusement+park+near+me" },
        { text: "📁 sensory overload in shopping malls", category: "concept", link: "https://www.google.com/search?q=The+psychology+of+sensory+overload+in+shopping+malls" },
        { text: "📁 Collecting", category: "watch" },
        { text: "📁 hypertext garden", category: "garden", link: "https://www.eastgate.com/garden/Enter.html" },
        { text: "📕 The Undercommons: Fugitive Planning & Black Study Politics Surrounded Fantasy in the Hold", category: "readings", link: "https://monoskop.org/images/9/95/Harney_Stefano_Moten_Fred_The_Undercommons_Fugitive_Planning_and_Black_Study_2013.pdf" },
        { text: "🧘🏻 Adrienne Rich", category: "poems", link: "https://en.wikipedia.org/wiki/Adrienne_Rich" },
        { text: "📁 logging", category: "concept", link: "https://www.collinsdictionary.com/us/dictionary/english-thesaurus/longing" },
        { text: "🎞️ The Gleaners & I", category: "watch", link: "https://www.imdb.com/title/tt0247380/" },
        { text: "📕 OASE 48", category: "readings", link: "https://oasejournal.nl/en/Issues/48" },
        { text: "✨ Annotated", category: "are.na", link: "https://www.are.na/paul-soulellis/annotated-cnw8_uiegma" },
        { text: "💿 commenting", category: "img", link: "https://d2w9rnfcy7mm78.cloudfront.net/2419858/original_9648498fdc6ba57d7158ea20bab3260f.jpg?1531406583?bc=1" },
        { text: "📕 The Man in the Middle I am a solitary man without a place where I can find peace. I am not alone. In fact, I am involved in so many different relationships that none of them are permanent.", category: "readings", link: "https://librarycat.risd.edu/search~S4?/XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D/XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D&SUBKEY=Lee+Ufan%3A+Art+of+Encounter/1%2C3%2C3%2CB/frameset&FF=XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D&3%2C3%2C" },
        { text: "📕 I always stand in a difficult place. I am kept at arms length and viewed as a dangerous element by both sides. I am left standing outside the collectve, seen on the one hand as a fugitive and on the other as an intruder. As a result of being observed intently by others, however, I have come to observe others with great intensity. The less I am one of them and the more apart from everyone else I am, the better I can see them. The dynamics of distance have made me what I am. ", category: "readings", link: "https://librarycat.risd.edu/search~S4?/XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D/XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D&SUBKEY=Lee+Ufan%3A+Art+of+Encounter/1%2C3%2C3%2CB/frameset&FF=XLee+Ufan:+Art+of+Encounter&searchscope=4&SORT=D&3%2C3%2C" },
        { text: "〰️ So plant your own gardens and decorate your own soul, instead of waiting for someone to bring you flowers. — Jorge Luis Borges", category: "garden", link: "https://nesslabs.com/mind-garden" },
        { text: "🧘🏻 Moly Soda", category: "references", link: "https://mollysoda.exposed/" },
        { text: "🧘🏻 Trevor Paglen is known for investigating the invisible through the visible, with a wide-reaching approach that spans image making, sculpture, investigative journalism, writing, engineering, and numerous other disciplines.", category: "references", link: "https://www.pacegallery.com/artists/trevor-paglen/" },
        { text: "📕 Jenny Odell / Saving Time: Discovering a Life Beyond the Clock", category: "readings", link: "https://www.google.com/search?q=jenny+odell+saving+time&oq=jenny&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgoIARAuGNQCGIAEMg0IAhAuGIMBGLEDGIAEMg0IAxAuGIMBGLEDGIAEMgYIBBBFGDsyCggFEC4YsQMYgAQyBggGEEUYPDIGCAcQRRg90gEIMTMyMWowajeoAgiwAgE&sourceid=chrome&ie=UTF-8" },
        { text: "📁 Magic circle: A magic circle is a circle of space marked out by practitioners of some branches of ritual magic", category: "concept", link: "https://en.wikipedia.org/wiki/Magic_circle" },
        { text: "〰️ Digitizing the Visceral: Making Together in the Space Between", category: "concept", link: "https://earthand.com/2020/06/15/digitizing-the-visceral-making-together-in-the-space-between/" },
        { text: "〰️ The language of how we describe experiences in the environment and computation", category: "concept", link: "https://earthand.com/2020/07/02/what-is-a-digital-garden-artist-talk-with-sarah-holloway/" },
        { text: "〰️ This collection’s primary focus is on language. I want collectors to make their own judgements on the value and meaning of the phrases that are uncovered as the series is revealed. The feature set only analyzes the design elements of the output. I’m curious to see how collectors respond to the meaning of each mint themselves. I also want to emphasize that the artwork is not only the individual outputs, but more importantly the infinite possibility of the generative program itself. By collecting, you are not only owning that single mint, but also a piece of the project as a whole, which to me is greater than the 700 exact outputs that are revealed after the release.", category: "readings", link: "https://medium.com/the-link-art-blocks/in-conversation-with-maya-man-fa80839c852e" },
        { text: "〰️ It was exciting for me with this collection to try to link randomness with astrology", category: "concept", link: "https://www.lerandom.art/editorial/maya-man-on-generative-meaning" },
        { text: "〰️ Is there meaning in random messages?", category: "concept", link: "https://www.lerandom.art/editorial/maya-man-on-generative-meaning" },
        { text: "📕 Building digital gardens", category: "garden", link: "https://tomcritchlow.com/2019/02/17/building-digital-garden/" },
        { text: "📕 How to set up your digital garden", category: "garden", link: "https://nesslabs.com/digital-garden-set-up" },
        { text: "✨ Reddit r/Digital Gardens", category: "garden", link: "https://www.reddit.com/r/DigitalGardens/" },
        { text: "⚒️ Pneu.haus", category: "design", link: "https://www.pneu.haus/" },
        { text: "💿 Atmos", category: "environment", link: "https://atmos.earth/" },
        { text: "🗞️ State-sponsored disinformation is on the rise", category: "politics", link: "https://www.nytimes.com/interactive/2019/11/14/magazine/internet-future-dream.html" },
        { text: "✨ What makes it through", category: "are.na", link: "https://www.are.na/editorial/what-makes-it-through" },
        { text: "🧘🏻 Doho Suh", category: "art", link: "https://www.instagram.com/dohosuhstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
        { text: "✨ To make a flower", category: "are.na", link: "https://www.are.na/travess-smalley/to-make-a-flower" },
        { text: "〰️  Digital gardens let you cultivate your own little bit of the internet", category: "garden", link: "https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/" },
        { text: "🧘🏻 Targz: Generative art, Penplotter", category: "art", link: "https://www.instagram.com/targz/" },
        { text: "📕 On Digital Gardens: Tending to Our Collective Multiplicity", category: "garden", link: "https://www.deemjournal.com/stories/digital-gardens" },
        { text: "🗞️ This Just In: Contemporary Design of South Korea", category: "design", link: "https://letterformarchive.org/news/contemporary-design-of-south-korea/?srsltid=AfmBOoqpqA0j0oulV6oJPcYKRMSWXm1YIcZ5pHUF48QxIymmnBjmX_Fq" },
        { text: "〰️ With only one left, iconic yellow road sign showing running immigrants now borders on the extinct", category: "politics", link: "https://www.latimes.com/local/california/la-me-immigrants-running-road-sign-20170614-htmlstory.html" },
        { text: "📎 amusement park, basket, garden, web, kitchen!", category: "survey", link: "https://forms.gle/HoFK5kx5iZSMKRsq6" },
        { text: "💿 book and table", category: "references", link: "https://booksandtables.com/" },
        { text: "✨ Ways of Living", category: "are.na", link: "https://www.are.na/jake-johnson/ways-of-living-fjk6e4tbkd0" },
        { text: "💿 contain but porous", category: "img", link: "https://d2w9rnfcy7mm78.cloudfront.net/4771684/original_2bc6f76d6ccdb23c3c04d2cdd4e33300.jpg?1565144071?bc=1" },
        { text: "📕 Chris Lee / Immutable: Designing History", category: "readings", link: "https://www.librarystack.org/immutable-designing-history/" },
        { text: "📕 Intimacy and the Machine:", category: "readings", link: "https://various-artists.com/godposting/" },
        { text: "〰️ Debbie Chen : As an architect, I’m really interested in the slippery boundary between architecture and infrastructure,", category: "references", link: "hhttps://dc-dba.com/" },
        { text: "📕 Mutual Aid: Building Solidarity During This Crisis (and the Next)", category: "readings", link: "https://www.google.com/search?q=mutual+aid+dean+spade&sca_esv=a450ec3222e383cb&ei=DKBYZ5OeD5e8ptQPif622AM&gs_ssp=eJzj4tVP1zc0zErOKSw2sMgxYPQSzS0tKU3MUUjMTFFISU3MUyguSExJBQDpXQyL&oq=mutual+aid&gs_lp=Egxnd3Mtd2l6LXNlcnAiCm11dHVhbCBhaWQqAggPMgoQABiwAxjWBBhHMg0QABiwAxjWBBhHGMkDMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg4QABiABBiwAxiSAxiKBTINEAAYgAQYsAMYQxiKBTINEAAYgAQYsAMYQxiKBTINEAAYgAQYsAMYQxiKBTIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMg4QABiwAxjkAhjWBNgBATITEC4YgAQYsAMYQxjIAxiKBdgBATITEC4YgAQYsAMYQxjIAxiKBdgBATITEC4YgAQYsAMYQxjIAxiKBdgBATITEC4YgAQYsAMYQxjIAxiKBdgBAUiRD1AAWABwAXgBkAEAmAEAoAEAqgEAuAEByAEAmAIBoAIGmAMAiAYBkAYTugYGCAEQARgJkgcBMaAHAA&sclient=gws-wiz-serp#wptab=si:ACC90nyLlcElEvb2bNLvGYvz3qiAav5yCbCPJktjpzs_m80LkJZmIsZvcgiNxa_zrWCTdK-S5qARHIri2x07aP1fCb3OAWtkZoYgwNeVmgqnNaAUf8GjCIJuQWG2R-jibQAV0MOWYVE6mhl-v4o1yK9-TXE7KTDp0g%3D%3D" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
        { text: "", category: "", link: "" },
    ];

    const filterContainer = document.querySelector(".filter-buttons");
    const textContainer = document.querySelector(".grid");

    const uniqueCategories = Array.from(new Set(textCategories.map(item => item.category)));
    uniqueCategories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = `*${category}*`;
        button.classList.add("filter-button");
        button.addEventListener("click", () => filterText(category));
        filterContainer.appendChild(button);
    });

    const allButton = document.createElement("button");
    allButton.textContent = "*all*";
    allButton.classList.add("filter-button");
    allButton.addEventListener("click", () => {
        const allTextItems = document.querySelectorAll(".text-item");
        allTextItems.forEach(item => item.classList.remove("hidden")); // Show all
    });
    filterContainer.appendChild(allButton);

    textCategories.forEach(item => {
        const textElement = document.createElement("a");
        textElement.textContent = item.text;

        if (item.link && item.link.trim() !== "") {
            textElement.href = item.link;
            textElement.target = "_blank"; // Open link in a new tab
        } else {
            textElement.href = "#"; // Default fallback for empty links
        }

        textElement.classList.add("text-item", item.category); // Add category as a class
        textContainer.appendChild(textElement);
    });

    function filterText(category) {
        const allTextItems = document.querySelectorAll(".text-item");
        allTextItems.forEach(item => {
            if (item.classList.contains(category)) {
                item.classList.remove("hidden"); // Show matched items
            } else {
                item.classList.add("hidden"); // Hide unmatched items
            }
        });
        console.log(`Filtering category: ${category}`);
    }
});


