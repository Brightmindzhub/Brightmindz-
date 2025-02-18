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
            // Display current article content
            document.querySelector(".article-content").innerHTML = `
                <h2>${currentArticle.title}</h2>
                <p>${currentArticle.preview}</p>
                <img src="${currentArticle.image}" alt="${currentArticle.title}">
                <p>Published on: ${currentArticle.date}</p>
            `;

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
                // Only display related articles, current article is excluded
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

// New functionality to remove the current article from the preview section
fetch("preview.json")
    .then(response => response.json())
    .then(data => {
        // Get the current article's URL
        const currentUrl = window.location.href;

        // Find the current article in preview.json by URL
        const currentArticle = data.find(article => currentUrl.includes(article.url));

        if (!currentArticle) {
            console.error("Current article not found in preview.json.");
            return;
        }

        // Remove the current article's preview from the container
        let container = document.getElementById("related-articles-container");
        let articlePreviews = container.getElementsByClassName("post-preview");

        for (let i = 0; i < articlePreviews.length; i++) {
            let previewUrl = articlePreviews[i].querySelector(".post-button").getAttribute("onclick").split("'")[1];

            // If the preview is for the current article, remove it
            if (previewUrl === currentArticle.url) {
                container.removeChild(articlePreviews[i]);
            }
        }

        // Now add the related articles below the current article
        const relatedArticles = data.filter(article => 
            article.category === currentArticle.category && article.url !== currentArticle.url
        );

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
    })
    .catch(error => console.error("Error loading the articles:", error));