document.addEventListener("DOMContentLoaded", async function () {
    const categoryName = decodeURIComponent(window.location.pathname.split("/").pop()); // ✅ URL se category name lo

    document.getElementById("category-title").innerText = categoryName;
    document.getElementById("category-content").innerText = `Explore the latest articles in "${categoryName}" category.`;

    try {
        const response = await fetch("../articles.json"); // ✅ JSON file load karo
        const articles = await response.json();

        // ✅ Filter karo sirf wahi articles jo iss category ke hai
        const filteredArticles = articles.filter(article => article.category === categoryName);

        // ✅ HTML me articles add karo
        const articlesContainer = document.getElementById("articles-list");
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