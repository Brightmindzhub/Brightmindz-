document.addEventListener("DOMContentLoaded", function () {
    const categoryName = new URLSearchParams(window.location.search).get("category");

    if (!categoryName) {
        document.getElementById("category-title").innerText = "No Category Selected";
        document.getElementById("category-content").innerText = "Please select a category from the homepage.";
        return;
    }

    document.getElementById("category-title").innerText = categoryName;
    document.getElementById("category-content").innerHTML = `Loading articles for <strong>${categoryName}</strong>...`;

    // ✅ Fetch articles.json to get articles of this category
    fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
        .then(response => response.json())
        .then(articles => {
            const filteredArticles = articles.filter(a => a.category === categoryName);

            if (filteredArticles.length === 0) {
                document.getElementById("category-content").innerHTML = `<p>No articles found in <strong>${categoryName}</strong>.</p>`;
                return;
            }

            let articleList = "<ul>";
            filteredArticles.forEach(article => {
                articleList += `<li><a href="Homepage/article.html?id=${article.id}">${article.title}</a></li>`;
            });
            articleList += "</ul>";

            document.getElementById("category-content").innerHTML = articleList;
        })
        .catch(error => {
            console.error("Error loading articles:", error);
            document.getElementById("category-content").innerHTML = "<p>Error loading articles.</p>";
        });
});