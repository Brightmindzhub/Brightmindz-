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

    // ✅ Search Bar Expand
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
    const postsContainer = document.getElementById("posts");
    let isGridView = false; // Default: List View
    let perPage = 10; // Default for list view

    if (viewBtn) {
        viewBtn.addEventListener("click", function () {
            isGridView = !isGridView;
            perPage = isGridView ? 20 : 10; // Grid = 20, List = 10
            viewBtn.textContent = isGridView ? "List View" : "Grid View";
            postsContainer.classList.toggle("grid-view", isGridView);
            postsContainer.classList.toggle("list-view", !isGridView);
            renderArticles(1);
        });
    }

    // ✅ Load Articles
    let data = [];
    let currentPage = 1;
    let totalPages = 1;

    fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
    .then(response => response.json())
    .then(jsonData => {
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            console.error("❌ JSON is empty or not an array!");
            return;
        }

        data = jsonData;
        totalPages = Math.ceil(data.length / perPage);
        
        console.log("✅ Loaded Articles:", data);

        renderArticles(currentPage);
    })
    .catch(error => console.error("❌ Error loading JSON:", error));

    function renderArticles(page) {
        postsContainer.innerHTML = "";
        let start = (page - 1) * perPage;
        let end = start + perPage;
        let articlesToShow = data.slice(0, end); 

        if (articlesToShow.length === 0) {
            postsContainer.innerHTML = "<p>No articles available.</p>";
            return;
        }

        articlesToShow.forEach(post => {
            let postElement = document.createElement("div");
            postElement.classList.add("post-preview");

            if (isGridView) {
                postElement.innerHTML = `
                    <div class="post-button" onclick="window.location.href='${post.url}'">
                        <h2>${post.title}</h2>
                        <p>${post.preview}</p>
                        <span class="read-more">Read More</span>
                    </div>
                `;
            } else {
                postElement.innerHTML = `
                    <div class="post-button" onclick="window.location.href='${post.url}'">
                        <h2>${post.title}</h2>
                        <p><strong>Category:</strong> ${post.category} | <strong>Date:</strong> ${post.date}</p>
                        <p>${post.preview}</p>
                        <span class="read-more">Read More</span>
                    </div>
                `;
            }

            postsContainer.appendChild(postElement);
        });

        renderPagination();
    }

    function renderPagination() {
        let paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

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

    // ✅ Sorting Functionality
    const sortOptions = document.querySelectorAll("#sortList li");

    sortOptions.forEach(option => {
        option.addEventListener("click", function () {
            let sortType = option.textContent.trim();

            if (sortType === "Trending") {
                data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
            } else if (sortType === "Recommended") {
                data.sort((a, b) => a.title.localeCompare(b.title)); // A-Z sorting
            } else if (sortType === "Random") {
                data.sort(() => Math.random() - 0.5); // Random shuffle
            }

            console.log("✅ Sorted by:", sortType);
            renderArticles(currentPage);
            sortList.classList.remove("open");
        });
    });

    // ✅ Load More button functionality
    const loadMoreBtn = document.getElementById("loadMore");

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                renderArticles(currentPage);
            }
            if (currentPage >= totalPages) {
                loadMoreBtn.style.display = "none";
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const modeToggleBtn = document.getElementById("modeToggleBtn");
    const modeList = document.getElementById("modeList");
    const elementsToChange = document.querySelectorAll("body, header, footer, .article, .tab");

    // Toggle Dropdown
    modeToggleBtn.addEventListener("click", function () {
        modeList.classList.toggle("open");
    });

    // Change Modes
    document.querySelectorAll("#modeList li").forEach(item => {
        item.addEventListener("click", function () {
            const mode = this.getAttribute("data-mode");

            elementsToChange.forEach(element => {
                element.classList.remove("night-mode", "reading-mode");
            });

            if (mode === "night") {
                elementsToChange.forEach(element => element.classList.add("night-mode"));
                modeToggleBtn.textContent = "Night Mode";
            } else if (mode === "reading") {
                elementsToChange.forEach(element => element.classList.add("reading-mode"));
                modeToggleBtn.textContent = "Reading Mode";
            } else {
                modeToggleBtn.textContent = "Day Mode";
            }

            modeList.classList.remove("open");
        });
    });

    // Close dropdown on outside click
    document.addEventListener("click", function (event) {
        if (!modeToggleBtn.contains(event.target) && !modeList.contains(event.target)) {
            modeList.classList.remove("open");
        }
    });
});