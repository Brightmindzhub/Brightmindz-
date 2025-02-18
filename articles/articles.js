fetch("preview.json")
    .then(response => response.json())
    .then(data => {
        // Get the category of the current article (replace with actual logic for category)
        const currentCategory = "tech"; // Example category, replace with actual category logic

        // Filter articles by category
        const filteredArticles = data.filter(article => article.category === currentCategory);

        // Sort articles by date (latest first)
        const sortedArticles = filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Take the top 5 latest articles
        const top5Articles = sortedArticles.slice(0, 5);

        // Get the container where articles will be displayed
        let container = document.getElementById("related-articles-container");

        if (top5Articles.length === 0) {
            container.innerHTML = "No articles found in this category.";
        } else {
            // Display each article
            top5Articles.forEach(article => {
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
    })
    .catch(error => console.error("Error loading the articles:", error));