const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const loader = document.getElementById('loader');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        resultsContainer.innerHTML = ''; // Clear previous results
        showLoader();
        searchBooks(searchTerm);
        hidetagline();
    }
});

async function searchBooks(query) {
    const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const books = data.docs;
        displayBooks(books);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        hideLoader();
    }
}

searchBooks('9780544003415')

function displayBooks(books) {
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = book.title;
        const authors = book.author_name || ['Unknown Author'];
        const publishedDate = book.first_publish_year || 'N/A';
        const coverId = book.cover_i || '';

        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'static/default-image.jpg'; // Replace 'default-cover.jpg' with the path to your default image.

        bookDiv.innerHTML = `
            <h2>${title}</h2>
            <img src="${coverUrl}" alt="${title} Cover">
            <p><strong>Author(s):</strong> ${authors.join(', ')}</p>
            <p><strong>Published Date:</strong> ${publishedDate}</p>
        `;

        resultsContainer.appendChild(bookDiv);
    });
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function hidetagline() {
    beanSearchResult.style.display = 'none';
}
