// Fetching data from the preview.json file
fetch("preview.json")
    .then(response => response.json())
    .then(data => {
        // Get the category from the article page
        const category = document.getElementById("category").textContent;

        // Find the current article ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id'); // Get article ID from URL

        // Filter related articles based on category and exclude current article
        const relatedArticles = data.filter(article => article.category === category && article.id != articleId);

        let container = document.getElementById("related-articles-container");

        // Limit to 5 related articles
        const limitedArticles = relatedArticles.slice(0, 5);

        // If no related articles found
        if (limitedArticles.length === 0) {
            container.innerHTML = "No related articles found in this category.";
        } else {
            limitedArticles.forEach(article => {
                let postElement = document.createElement("div");
                postElement.classList.add("post-preview");

                postElement.innerHTML = `
                    <div class="post-card">
                        <img src="${article.image}" alt="${article.title}" class="post-image">
                        <div class="post-content">
                            <h3>${article.title}</h3>
                            <p>${article.preview}</p>
                            <span class="read-more" onclick="window.location.href='${article.url}'">Read More</span>
                        </div>
                    </div>
                `;

                container.appendChild(postElement);
            });
        }
    })
    .catch(error => console.error("Error loading the preview articles:", error));