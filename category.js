document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = decodeURIComponent(urlParams.get("category"));

    if (!categoryName) {
        console.error("Category not found in URL!");
        document.getElementById("category-title").innerText = "Category Not Found";
        return;
    }

    document.getElementById("category-title").innerText = categoryName;

    const loadingMessage = document.getElementById("loading");
    const articlesContainer = document.getElementById("articles-list");

    try {
        const response = await fetch("articles/preview.json");
        if (!response.ok) throw new Error("Failed to load JSON file!");
        const articles = await response.json();

        const filteredArticles = articles.filter(article => article.category === categoryName);

        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = "<p>No articles found in this category.</p>";
        } else {
            articlesContainer.innerHTML = filteredArticles.map(article => `
                <div class="post-preview" onclick="location.href='${generateArticleURL(article)}'">
                    <img class="post-image" src="${article.image}" alt="${article.title}">
                    <div class="post-content">
                        <h2>${article.title}</h2>
                        <p>${article.preview}</p>
                        <small>${article.date}</small>
                    </div>
                </div>
            `).join("");
        }
    } catch (error) {
        console.error("Error loading articles:", error);
        articlesContainer.innerHTML = "<p>Error loading articles. Please try again.</p>";
    }

    // ✅ 1 sec delay ke baad loading message hata do aur articles dikha do
    setTimeout(() => {
        loadingMessage.classList.add("hidden");
        articlesContainer.classList.remove("hidden");
    }, 1000);
});

// ✅ Dynamic Article URL Generator Function
function generateArticleURL(article) {
    return `articles/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.html`;
}