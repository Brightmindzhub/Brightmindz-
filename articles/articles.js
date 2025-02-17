document.addEventListener("DOMContentLoaded", function () {
    fetch("../articles.json")
        .then(response => response.json())
        .then(articles => {
            // Current page ka URL se ID extract karna
            const urlParams = new URLSearchParams(window.location.search);
            const currentArticleId = parseInt(urlParams.get("id"));

            // Current article ka data dhoondhna
            const currentArticle = articles.find(article => article.id === currentArticleId);
            if (!currentArticle) return;

            // Usi category ke articles filter karna (jo current article na ho)
            const relatedArticles = articles
                .filter(article => article.category === currentArticle.category && article.id !== currentArticleId)
                .slice(0, 2); // Sirf 2 articles lena

            // Related articles ko display karna
            const relatedContainer = document.getElementById("related-articles");
            relatedArticles.forEach(article => {
                const articleElement = document.createElement("div");
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