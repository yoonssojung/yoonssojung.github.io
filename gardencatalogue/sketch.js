function toggleInfo() {
    const infoDiv = document.getElementById('info');
    infoDiv.classList.toggle('hidden');
}

function toggleSort(sortType, button) {
    console.log('Sorting by:', sortType);
    // Add your sorting logic here
}

function toggleFilter(filterType, value, button) {
    console.log('Filtering by:', filterType, value);
    // Add your filtering logic here
}
