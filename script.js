document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded");

    // ✅ Sidebar Toggle 
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector(".sidebar");

    if (menuIcon && sidebar) {
        menuIcon.addEventListener("click", function () {
            sidebar.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
                sidebar.classList.remove("active");
            }
        });
    }

    // ✅ Search Bar Expand
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    if (searchContainer && searchInput) {
        searchContainer.addEventListener("click", function () {
            searchContainer.classList.add("active");
            searchInput.focus();
        });

        document.addEventListener("click", function (event) {
            if (!searchContainer.contains(event.target)) {
                searchContainer.classList.remove("active");
            }
        });
    }

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
    let isGridView = false;
    let perPage = 10;
    let currentPage = 1;
    let data = [];

    if (viewBtn && postsContainer) {
        viewBtn.addEventListener("click", function () {
            isGridView = !isGridView;
            perPage = isGridView ? 20 : 10;
            viewBtn.textContent = isGridView ? "List View" : "Grid View";
            postsContainer.classList.toggle("grid-view", isGridView);
            postsContainer.classList.toggle("list-view", !isGridView);
            renderArticles();
        });
    }

    // ✅ Load Articles
    fetch("../articles/preview.json")
        .then(response => response.json())
        .then(jsonData => {
            if (!Array.isArray(jsonData) || jsonData.length === 0) {
                console.error("❌ JSON is empty or not an array!");
                return;
            }

            data = jsonData;
            console.log("✅ Loaded Articles:", data);

            renderArticles();
        })
        .catch(error => console.error("❌ Error loading JSON:", error));

    function renderArticles() {
    if (!postsContainer) return;

    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    let articlesToShow = data.slice(start, end);

    if (articlesToShow.length === 0) {
        return;
    }

    articlesToShow.forEach(post => {
        let postElement = document.createElement("div");
        postElement.classList.add("post-preview");

        postElement.innerHTML = `
            <div class="post-button" onclick="window.location.href='${post.url}'">
                <img src="${post.image}" alt="${post.title}" loading="lazy" class="post-image">
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p><strong>Category:</strong> ${post.category} <br> <strong>Date:</strong> ${formatDate(post.date)}</p>
                    <p>${post.preview}</p>
                    <span class="read-more">Read More</span>
                </div>
            </div>
        `;

        postsContainer.appendChild(postElement); // ✅ Purane articles delete nahi honge, naye neeche add honge
    });

    updateLoadMoreButton();
}

    function updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById("loadMore");
        if (!loadMoreBtn) return;

        if (currentPage * perPage >= data.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "block";
        }
    }

    function formatDate(dateString) {
        let dateObj = new Date(dateString);
        if (isNaN(dateObj)) return dateString; // Agar date invalid ho toh original return kar do

        // Custom formatting
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = dateObj.getDate();
        let month = months[dateObj.getMonth()];
        let year = dateObj.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    // ✅ Load More Button
    const loadMoreBtn = document.getElementById("loadMore");

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
            currentPage++;
            renderArticles();
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



function showPopup() {
    let popup = document.getElementById("popup-message");
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // 2 seconds me popup khatam ho jayega
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let welcomeText = document.querySelector(".welcome-text");
        if (welcomeText) {
            welcomeText.style.opacity = "1";
            welcomeText.style.transform = "translateX(0)";
        }
    }, 50);
});




function updateThemeColor(mode) {
    let metaTag = document.querySelector("meta[name=theme-color]");
    if (metaTag) {
        metaTag.remove(); // Purana meta tag hatao
    }

    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "theme-color");

    if (mode === "night-mode") {
        metaTag.setAttribute("content", "#2C3E50"); // Dark mode color
    } else if (mode === "reading-mode") {
        metaTag.setAttribute("content", "#B0AFAF"); // Reading mode color
    } else {
        metaTag.setAttribute("content", "#012A4A"); // Default light mode color
    }

    document.head.appendChild(metaTag); // Naya meta tag add karo
}