<script>
document.addEventListener("DOMContentLoaded", function () {
    // Ye tumhari articles ki list load karega
    fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
    .then(response => response.json())
    .then(articles => {
        let currentUrl = window.location.href;
        let currentArticle = articles.find(article => currentUrl.includes(article.url));

        if (!currentArticle) return; // Agar article nahi mila to kuch nahi karega

        let relatedArticles = articles
            .filter(article => article.category === currentArticle.category && article.url !== currentArticle.url) // Same category ke articles lo
            .sort(() => Math.random() - 0.5) // Randomize kar do
            .slice(0, 2); // Sirf 2 articles lo

        let relatedContainer = document.getElementById("related-articles");

        if (relatedArticles.length === 0) {
            relatedContainer.innerHTML = "<p>No related articles found.</p>";
            return;
        }

        relatedArticles.forEach(article => {
            let articleElement = document.createElement("div");
            articleElement.classList.add("related-article");
            articleElement.innerHTML = `
                <h3><a href="${article.url}">${article.title}</a></h3>
                <p>${article.preview}</p>
            `;
            relatedContainer.appendChild(articleElement);
        });
    })
    .catch(error => console.error("Error loading related articles:", error));
});
</script>