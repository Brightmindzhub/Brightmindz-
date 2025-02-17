// Fetching data from the articles.json
fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
.then(response => response.json())
.then(data => {
    // Show first 2 articles as related
    let relatedArticles = data.slice(0, 2);

    let container = document.getElementById("related-articles-container");
    relatedArticles.forEach(post => {
        let postElement = document.createElement("div");
        postElement.classList.add("post-preview");

        postElement.innerHTML = `
            <div class="post-button" onclick="window.location.href='${post.url}'">
                <h3>${post.title}</h3>
                <p>${post.preview}</p>
                <span class="read-more">Read More</span>
            </div>
        `;

        container.appendChild(postElement);
    });
})
.catch(error => console.error("Error loading related articles:", error));