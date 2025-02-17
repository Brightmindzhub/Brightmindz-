// Fetching data from the articles.json
fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
.then(response => response.json())
.then(data => {
    // Show the latest 2 articles
    let latestArticles = data.slice(0, 2); // First 2 articles

    let container = document.getElementById("related-articles-container");

    latestArticles.forEach(article => {
        let postElement = document.createElement("div");
        postElement.classList.add("post-preview");

        postElement.innerHTML = `
            <div class="post-button" onclick="window.location.href='${article.url}'">
                <img src="${article.image}" alt="${article.title}" class="post-image">
                <div class="post-content">
                    <h3>${article.title}</h3>
                    <p>${article.preview}</p>
                    <span class="read-more">Read More</span>
                </div>
            </div>
        `;

        container.appendChild(postElement);
    });
})
.catch(error => console.error("Error loading the articles:", error));