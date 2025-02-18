fetch("preview.json")
    .then(response => response.json())
    .then(data => {
        // Get the current article URL or title from the page (replace with actual selector)
        const currentUrl = window.location.href;
        const currentTitle = document.title; // Or, you can get it from a specific HTML element

        console.log("Current URL:", currentUrl); // Debugging line to check the current URL
        console.log("Current Title:", currentTitle); // Debugging line to check the current title

        // Find the current article by URL or title
        const currentArticle = data.find(article => currentUrl.includes(article.url) || currentTitle.includes(article.title));

        if (currentArticle) {
            // Find the article content container and hide preview content
            const currentArticleContent = document.querySelector(".article-content");
            if (currentArticleContent) {
                // Clear the content of the preview or any other old content
                currentArticleContent.innerHTML = ""; 
                
                // Display the full article content
                currentArticleContent.innerHTML = `
                    <h2>${currentArticle.title}</h2>
                    <p>${currentArticle.preview}</p>
                    <img src="${currentArticle.image}" alt="${currentArticle.title}">
                    <p>Published on: ${currentArticle.date}</p>
                `;
            }

            // Get category of the current article
            const category = currentArticle.category;
            console.log("Category of current article: ", category); // Debugging line

            // Filter related articles based on category (and exclude the current article)
            const relatedArticles = data.filter(article => 
                article.category === category && article.url !== currentArticle.url
            );

            let container = document.getElementById("related-articles-container");

            if (relatedArticles.length === 0) {
                container.innerHTML = "No related articles found in this category.";
            } else {
                relatedArticles.slice(0, 5).forEach(article => {
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