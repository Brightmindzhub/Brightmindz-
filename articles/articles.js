// Fetching data from the articles.json
fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
    .then(response => response.json())
    .then(data => {
        // Get the category from the article page
        const category = document.getElementById("category").textContent;

        // Find the current article ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id'); // Get article ID from URL

        // Find the current article by ID
        const currentArticle = data.find(article => article.id == articleId);

        if (currentArticle) {
            // Display current article content
            document.querySelector(".article-content").innerHTML = `
                <h2>${currentArticle.title}</h2>
                <p>${currentArticle.preview}</p>
                <img src="${currentArticle.image}" alt="${currentArticle.title}">
                <p>Published on: ${currentArticle.date}</p>
            `;

            // Filter related articles based on category
            const relatedArticles = data.filter(article => article.category === category && article.id !== currentArticle.id);

            let container = document.getElementById("related-articles-container");

            if (relatedArticles.length === 0) {
                container.innerHTML = "No related articles found in this category.";
            } else {
                relatedArticles.forEach(article => {
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
            }
        }
    })
    .catch(error => console.error("Error loading the articles:", error));