document.addEventListener("DOMContentLoaded", async function () {
    // ✅ Category name URL se le raha hai
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");

    if (!categoryName) {
        console.error("Category not found in URL!");
        return;
    }

    document.getElementById("category-title").innerText = categoryName;
    document.getElementById("category-content").innerText = `Explore the latest articles in "${categoryName}" category.`;

    try {
        // ✅ JSON data load karo
        const response = await fetch("../articles.json");
        if (!response.ok) throw new Error("Failed to load JSON file!");
        const articles = await response.json();

        // ✅ Category match karo
        const filteredArticles = articles.filter(article => article.category === categoryName);

        const articlesContainer = document.getElementById("articles-list");
        articlesContainer.innerHTML = ""; // Purane articles hatao

        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = "<p>No articles found in this category.</p>";
        } else {
            filteredArticles.forEach(article => {
                const articleHTML = `
                    <div class="article">
                        <h3><a href="${article.url}">${article.title}</a></h3>
                        <p>${article.preview}</p>
                        <small>${article.date}</small>
                    </div>
                `;
                articlesContainer.innerHTML += articleHTML;
            });
        }
    } catch (error) {
        console.error("Error loading articles:", error);
    }
});