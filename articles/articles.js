// Fetching data from the articles.json
fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
.then(response => response.json())
.then(data => {
    // Show the latest article (first in the list)
    let latestArticle = data[0];

    let container = document.getElementById("related-articles-container");

    let postElement = document.createElement("div");
    postElement.classList.add("post-preview");

    postElement.innerHTML = `
        <div class="post-button" onclick="window.location.href='${latestArticle.url}'">
            <h3>${latestArticle.title}</h3>
            <p>${latestArticle.preview}</p>
            <span class="read-more">Read More</span>
        </div>
    `;

    container.appendChild(postElement);
})
.catch(error => console.error("Error loading the latest article:", error));