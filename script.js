document.addEventListener("DOMContentLoaded", function () {
    // ✅ Sidebar Toggle 
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove("active"); // Sidebar ke bahar click karne par band ho jaye
        }
    });

    // ✅ Search Bar Expand with Animation
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.querySelector(".search-icon"); // Search icon ko move karne ke liye

    searchContainer.addEventListener("click", function () {
        searchContainer.classList.add("active");
        searchInput.focus();
    });

    document.addEventListener("click", function (event) {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove("active");
        }
    });

    // ✅ Category Dropdown Toggle
    const categoryBtn = document.getElementById("categoryBtn");
    const categoryList = document.getElementById("categoryList");

    if (categoryBtn && categoryList) {
        categoryBtn.addEventListener("click", function () {
            if (categoryList.classList.contains("open")) {
                categoryList.style.maxHeight = "0px";
                categoryList.style.opacity = "0";
                categoryList.classList.remove("open");
            } else {
                categoryList.style.maxHeight = "300px";
                categoryList.style.opacity = "1";
                categoryList.classList.add("open");
            }
        });
    }

    // ✅ Sorting Options Toggle
    const sortBtn = document.getElementById("sortBtn");
    const sortList = document.getElementById("sortList");

    if (sortBtn && sortList) {
        sortBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            sortList.classList.toggle("open");
        });

        document.addEventListener("click", function (event) {
            if (!sortBtn.contains(event.target) && !sortList.contains(event.target)) {
                sortList.classList.remove("open");
            }
        });
    }

    // ✅ View Toggle (Grid ↔ List)
    const viewBtn = document.getElementById("viewBtn");

    if (viewBtn) {
        let isGridView = true;
        viewBtn.addEventListener("click", function () {
            isGridView = !isGridView;
            viewBtn.textContent = isGridView ? "Grid View" : "List View";
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            const articleList = document.getElementById("article-list");
            articles.forEach(article => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${article.url}">${article.title}</a> - <strong>${article.category}</strong>`;
                articleList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading articles:", error));
});


// Articles JSON file se data fetch karna aur homepage pe preview dikhana
fetch("articles.json")
    .then(response => response.json())
    .then(data => {
        let postsContainer = document.getElementById("posts");
        data.forEach(post => {
            let postElement = document.createElement("div");
            postElement.classList.add("post-preview");
            postElement.innerHTML = `
                <h2><a href="article.html?id=${post.id}">${post.title}</a></h2>
                <p><strong>Category:</strong> ${post.category} | <strong>Date:</strong> ${post.date}</p>
                <p>${post.preview}</p>
                <a href="article.html?id=${post.id}">Read More</a>
            `;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error("Error loading JSON:", error));
