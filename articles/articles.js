// ✅ Load Articles
let data = [];
let currentPage = 1;
let totalPages = 1;

fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
    .then(response => response.json())
    .then(jsonData => {
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            console.error("❌ JSON is empty or not an array!");
            return;
        }

        data = jsonData;
        totalPages = Math.ceil(data.length / perPage);

        console.log("✅ Loaded Articles:", data);

        renderArticlePage(); // Render the current article page
        renderRelatedArticles(); // Render related articles below
    })
    .catch(error => console.error("❌ Error loading JSON:", error));

// Render Current Article Page
function renderArticlePage() {
    const articleContainer = document.querySelector('.article-content .container');

    // Assume that article data is passed or fetched from a dynamic URL
    const currentArticle = data.find(article => article.url === window.location.pathname); // Match current page's article
    if (currentArticle) {
        // Render the article content
        articleContainer.innerHTML = `
            <article>
                <img src="${currentArticle.image}" alt="${currentArticle.title}" class="article-image">
                <div class="content">
                    <p><strong>Introduction:</strong> ${currentArticle.content.intro}</p>
                    <h2>Design</h2>
                    <p>${currentArticle.content.design}</p>
                    <h2>Performance</h2>
                    <p>${currentArticle.content.performance}</p>
                    <h2>RAM and Storage Options</h2>
                    <p>${currentArticle.content.storage}</p>
                    <h2>Camera</h2>
                    <p>${currentArticle.content.camera}</p>
                    <h2>Battery Life and Charging</h2>
                    <p>${currentArticle.content.battery}</p>
                    <h2>Prices</h2>
                    <p>${currentArticle.content.price}</p>
                    <h2>Conclusion</h2>
                    <p>${currentArticle.content.conclusion}</p>
                </div>
            </article>
        `;
    }
}

// Render Related Articles Section
function renderRelatedArticles() {
    const relatedContainer = document.getElementById('related-articles-container');
    const currentArticle = data.find(article => article.url === window.location.pathname);
    
    if (currentArticle) {
        const relatedArticles = data.filter(article => article.category === currentArticle.category && article.url !== currentArticle.url);

        // Limit to 2 articles for related section
        const articlesToDisplay = relatedArticles.slice(0, 2);
        
        if (articlesToDisplay.length > 0) {
            articlesToDisplay.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('related-article');
                articleElement.innerHTML = `
                    <h3><a href="${article.url}">${article.title}</a></h3>
                    <p>${article.preview}</p>
                `;
                relatedContainer.appendChild(articleElement);
            });
        } else {
            relatedContainer.innerHTML = "<p>No related articles available.</p>";
        }
    }
}

// Go Back Button Functionality
document.getElementById('go-back-button').addEventListener('click', function () {
    window.history.back(); // Go back to previous page
});