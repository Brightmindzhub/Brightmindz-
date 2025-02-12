document.addEventListener("DOMContentLoaded", function () {
    // ✅ Sidebar Toggle 
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });

    // ✅ Search Bar Expand with Animation
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

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
            categoryList.classList.toggle("open");
            categoryList.style.maxHeight = categoryList.classList.contains("open") ? "300px" : "0px";
            categoryList.style.opacity = categoryList.classList.contains("open") ? "1" : "0";
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

    fetch("articles.json")
    .then(response => response.json())
    .then(data => {
        // ✅ Date ke basis par sort karna (newest first)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        let postsContainer = document.getElementById("posts");
        let perPage = 10;  // ✅ Sirf 10 articles ek page pe

        let currentPage = 1;
        let totalPages = Math.ceil(data.length / perPage);

        function renderArticles(page) {
            postsContainer.innerHTML = ""; // Pehle wale articles hatao
            let start = (page - 1) * perPage;
            let end = start + perPage;
            let articlesToShow = data.slice(start, end);

            articlesToShow.forEach(post => {
                let postElement = document.createElement("div");
                postElement.classList.add("post-preview");
                postElement.innerHTML = `
                    <div class="post-button" onclick="window.location.href='article.html?id=${post.id}'">
                        <h2>${post.title}</h2>
                        <p><strong>Category:</strong> ${post.category} | <strong>Date:</strong> ${post.date}</p>
                        <p>${post.preview}</p>
                        <span class="read-more">Read More</span>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });

            renderPagination();
        }

        function renderPagination() {
            let paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = ""; // Purana clear karo

            for (let i = 1; i <= totalPages; i++) {
                let pageBtn = document.createElement("button");
                pageBtn.textContent = i;
                pageBtn.classList.add("page-btn");
                if (i === currentPage) pageBtn.classList.add("active");

                pageBtn.addEventListener("click", function () {
                    currentPage = i;
                    renderArticles(currentPage);
                });

                paginationContainer.appendChild(pageBtn);
            }
        }

        renderArticles(currentPage);
    })
    .catch(error => console.error("Error loading JSON:", error));