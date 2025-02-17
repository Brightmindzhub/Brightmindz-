document.addEventListener("DOMContentLoaded", async function () {
    const articleContainer = document.getElementById("article-content");

    // URL se 'id' get karo
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId || isNaN(articleId)) {
        articleContainer.innerHTML = "<p>❌ Article not found.</p>";
        return;
    }

    try {
        // Articles ko fetch karo
        const response = await fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json");
        const articles = await response.json();

        const article = articles.find(a => a.id === articleId);
        if (!article) {
            articleContainer.innerHTML = "<p>❌ Article not found.</p>";
            return;
        }

        // Article content ko format karna
        let contentHTML = formatContent(article.content);

        // Article ko display karna
        const imageUrl = article.image || "https://brightmindzhub.github.io/default.jpg";

        articleContainer.innerHTML = `
            <h1 id="article-title">${article.title}</h1>
            <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
            <img src="${imageUrl}" alt="Article Image" style="max-width:100%;">
            ${contentHTML}
        `;

        // Meta tags update karna
        updateMetaTags(article, imageUrl);

    } catch (error) {
        console.error("❌ Error loading article:", error);
        articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
    }
});

// ✅ **Function: Nested JSON ko HTML me convert karega**
function formatContent(content) {
    let html = "";

    function generateHTML(key, value) {
        html += `<h2>${key}</h2>`; // 🟢 Headings hamesha `h2` rahengi

        if (typeof value === "object") {
            html += `<ul>`;
            for (const [subKey, subValue] of Object.entries(value)) {
                html += `<li><strong>${subKey}:</strong> `;
                if (typeof subValue === "object") {
                    html += `<ul>`;
                    for (const [nestedKey, nestedValue] of Object.entries(subValue)) {
                        html += `<li><strong>${nestedKey}:</strong> ${nestedValue}</li>`;
                    }
                    html += `</ul>`;
                } else {
                    html += `${subValue}`;
                }
                html += `</li>`;
            }
            html += `</ul>`;
        } else {
            html += `<p>${value}</p>`;
        }
    }

    for (const [key, value] of Object.entries(content)) {
        generateHTML(key, value);
    }

    return html;
}

// ✅ **Meta Tags ko dynamically update karne wala function**
document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId || isNaN(articleId)) return;

    try {
        const response = await fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json");
        const articles = await response.json();
        const article = articles.find(a => a.id === articleId);

        if (!article) return;

        // ✅ Title ko dynamically update karo
        document.title = article.title;
        setMetaTag("og:title", article.title, true);
        setMetaTag("twitter:title", article.title);

    } catch (error) {
        console.error("❌ Error loading article:", error);
    }
});

// ✅ Helper Function: Meta Tags Ko Set Karne Ke Liye
function setMetaTag(name, content, isProperty = false) {
    const selector = isProperty ? `meta[property='${name}']` : `meta[name='${name}']`;
    let metaTag = document.querySelector(selector);

    if (!metaTag) {
        metaTag = document.createElement("meta");
        if (isProperty) {
            metaTag.setAttribute("property", name);
        } else {
            metaTag.setAttribute("name", name);
        }
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", content);
}