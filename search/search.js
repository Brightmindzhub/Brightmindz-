let articles = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch("../articles/preview.json")
    .then(response => response.json())
    .then(data => {
        articles = data;
        let urlParams = new URLSearchParams(window.location.search);
        let query = urlParams.get("q");
        if (query) {
            document.getElementById("searchInput").value = query;
            searchArticles(query);
        }
    })
    .catch(error => console.error("Error loading articles:", error));
});

function showSuggestions() {
    let searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (!searchQuery) return;

    let matches = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery) ||
        article.preview.toLowerCase().includes(searchQuery)
    );

    matches.slice(0, 7).forEach(match => {
        let li = document.createElement("li");
        li.textContent = match.title;
        li.onclick = function () {
            document.getElementById("searchInput").value = match.title;
            searchArticles(match.title);
            suggestionsBox.innerHTML = "";
        };
        suggestionsBox.appendChild(li);
    });
}

function searchArticles(query = null) {
    let searchQuery = query || document.getElementById("searchInput").value.trim();
    let resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "<p id='loading'>🔍 Searching...</p>";

    if (!searchQuery) {
        resultsContainer.innerHTML = `<div class="empty-search">⚠️ Please enter a search term!</div>`;
        return;
    }

    let fuse = new Fuse(articles, {
        keys: ["title", "preview"], 
        threshold: 0.4,  
        distance: 50,   
        ignoreLocation: true,
        minMatchCharLength: 2
    });

    let results = fuse.search(searchQuery);
    resultsContainer.innerHTML = "";

    if (results.length > 0) {
        results.forEach(({ item }) => {
            let articleElement = document.createElement("div");
            articleElement.classList.add("post-preview");
            articleElement.innerHTML = `
                <a href="${item.url}" class="post-button">
                    <img src="${item.image}" alt="Article Image" class="post-image">
                    <div class="post-content">
                        <h2>${highlightMatch(item.title, searchQuery)}</h2>
                        <p>${highlightMatch(item.preview, searchQuery)}</p>
                    </div>
                </a>
            `;
            resultsContainer.appendChild(articleElement);
        });
    } else {
        resultsContainer.innerHTML = `<div class="empty-search">❌ No articles found. Try a different search.</div>`;
    }
}

function highlightMatch(text, query) {
    let regex = new RegExp(query, "gi");
    return text.replace(regex, match => `<mark>${match}</mark>`);
}