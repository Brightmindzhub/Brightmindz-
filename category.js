document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");

    if (!categoryName) {
        console.error("Category not found in URL!");
        return;
    }

    document.getElementById("category-title").innerText = categoryName;

    try {
        const response = await fetch("articles.json");
        if (!response.ok) throw new Error("Failed to load JSON file!");
        const articles = await response.json();

        const filteredArticles = articles.filter(article => article.category === categoryName);
        const articlesContainer = document.getElementById("articles-list");

        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = "<p>No articles found in this category.</p>";
        } else {
            filteredArticles.forEach(article => {
                const articleHTML = `
                    <div class="post-preview" onclick="location.href='article.html?id=${article.id}'">
                        <h2>${article.title}</h2>
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


const urlParams = new URLSearchParams(window.location.search);
const categoryName = decodeURIComponent(urlParams.get("category"));



document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
        document.getElementById("category-title").textContent = category;
    } else {
        document.getElementById("category-title").textContent = "Category Not Found";
    }

    // Simulate loading articles
    setTimeout(() => {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("articles-list").classList.remove("hidden");
    }, 1000); // 1 second delay for effect
});

// ✅ 1 sec delay ke baad loading message hatado aur articles dikhado
                setTimeout(() => {
                    loadingMessage.classList.add("hidden");
                    articlesList.classList.remove("hidden");
                }, 1000);
            })
            .catch(error => {
                console.error("Error loading articles:", error);
                articlesList.innerHTML = "<p>Error loading articles. Please try again.</p>";
                loadingMessage.classList.add("hidden"); // Error ke case me bhi hatao
            });
    } else {
        categoryTitle.textContent = "Category Not Found";
        loadingMessage.classList.add("hidden"); // Agar category nahi mili to bhi hatao
    }
});
