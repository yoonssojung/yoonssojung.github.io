function filterImages(category, split) {
    // Select only the image items within the specified split
    const elements = document.querySelectorAll(`.${split} .image-item`);
    if (category === 'all') {
        elements.forEach(el => el.style.display = 'flex');  // Changed to flex to maintain your layout
    } else {
        elements.forEach(el => {
            el.style.display = el.classList.contains(category) ? 'block' : 'none';
        });
    }
}

// Adjusted to handle separate sorting for each split
function toggleSort(split) {
    const sortButton = document.getElementById(`sortToggle${split}`);
    const isLatest = sortButton.getAttribute('data-latest') === 'true';

    sortButton.setAttribute('data-latest', !isLatest);
    sortButton.textContent = isLatest ? '최신순' : '오래된순';
    sortImages(isLatest ? 'oldest' : 'latest', split);  // Pass the current state and split
}

function sortImages(order, split) {
    const imageGrid = document.getElementById(`imageGrid${split}`);
    let images = Array.from(imageGrid.getElementsByClassName('image-item'));
    images.sort((a, b) => {
        let dateA = parseInt(a.dataset.date, 10);
        let dateB = parseInt(b.dataset.date, 10);
        return order === 'latest' ? dateB - dateA : dateA - dateB;
    });
    imageGrid.innerHTML = '';  // Clear the grid
    images.forEach(image => imageGrid.appendChild(image));
}

