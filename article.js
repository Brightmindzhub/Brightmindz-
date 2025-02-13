document.addEventListener("DOMContentLoaded", function () {
    const articleContainer = document.getElementById("article-content");

    // ✅ URL se `id` get karo
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId) {
        articleContainer.innerHTML = "<p>❌ Article not found.</p>";
        return;
    }

    // ✅ Articles load karo
    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(a => a.id === articleId);

            if (!article) {
                articleContainer.innerHTML = "<p>❌ Article not found.</p>";
                return;
            }

            // ✅ Article display karo
            articleContainer.innerHTML = `
                <h1>${article.title}</h1>
                <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
                <p>${article.preview}</p>
                
            `;
        })
        .catch(error => {
            console.error("❌ Error loading article:", error);
            articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
        });
});
