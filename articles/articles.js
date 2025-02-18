// Fetching data from the articles.json
fetch("https://raw.githubusercontent.com/Brightmindzhub/Brightmindz-/main/articles.json")
    .then(response => response.json())
    .then(data => {
        // Get category from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        if (category) {
            // Filter articles based on the category
            const relatedArticles = data.filter(article => article.category === category);

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