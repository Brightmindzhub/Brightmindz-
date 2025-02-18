// Fetching data from the articles.json
fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
    .then(response => response.json())
    .then(data => {
        // Get current article category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const currentArticleCategory = urlParams.get("category");

        // Filter articles based on the same category but exclude the current article
        let relatedArticles = data.filter(article => article.category === currentArticleCategory);

        // Get the container to display related articles
        let container = document.getElementById("related-articles-container");
        container.innerHTML = ""; // Clear previous articles

        if (relatedArticles.length === 0) {
            container.innerHTML = "<p>No related articles found.</p>";
            return;
        }

        // Display the filtered related articles (limit to 3 articles)
        relatedArticles.slice(0, 3).forEach(article => {
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