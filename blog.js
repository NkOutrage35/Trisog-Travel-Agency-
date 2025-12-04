document.addEventListener("DOMContentLoaded", initializeBlog);

async function initializeBlog() {
  try {
    // Fetch the article data from the JSON file
    const response = await fetch("articles.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();
    renderArticleList(articles);
  } catch (error) {
    console.error("Error loading blog data:", error);
    displayListError(
      "Failed to load blog posts. Please check your JSON file path and format."
    );
  }
}

/**
 * @param {Array<Object>} articles
 */
function renderArticleList(articles) {
  const container = document.getElementById("article-list-container");
  if (!container) {
    console.error("Element with ID 'article-list-container' not found.");
    return;
  }

  if (articles.length === 0) {
    container.innerHTML =
      "<p class='text-lg text-gray-500'>No blog posts found.</p>";
    return;
  }

  // Generate HTML for all article cards
  const articleHTML = articles
    .map((article) => {
      // We use the article ID to create the dynamic link to the article detail page.
      const articleLink = `article.html?id=${article.id}`;

      // Use the first tag for a category display
      const categoryTag = article.tags.length > 0 ? article.tags[0] : "General";

      return `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <a href="${articleLink}" class="block">
                    <img 
                        class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        src="${article.image_url}" 
                        alt="${article.image_alt}"
                    />
                </a>
                <div class="p-6">
                    <span class="text-xs font-semibold uppercase tracking-wider text-red-500 bg-red-100 px-3 py-1 rounded-full mb-3 inline-block">
                        ${categoryTag}
                    </span>
                    <h3 class="text-xl font-bold text-gray-800 leading-snug mb-3">
                        <a 
                            href="${articleLink}" 
                            class="hover:text-red-500 transition-colors"
                        >
                            ${article.title}
                        </a>
                    </h3>
                    <div class="flex items-center text-sm text-gray-500 space-x-3">
                        <span class="flex items-center">
                            <i class="fa-regular fa-calendar-days w-4 h-4 mr-1"></i>
                            ${article.date}
                        </span>
                        <span class="text-red-500">•</span>
                        <span class="flex items-center">
                            <i class="fa-solid fa-user w-4 h-4 mr-1"></i>
                            ${article.author}
                        </span>
                    </div>
                </div>
            </div>
        `;
    })
    .join(""); // Join the array of HTML strings into one large string

  // Inject all generated HTML into the container
  container.innerHTML = articleHTML;
}

/**
 * Displays an error message when articles fail to load on the list page.
 * @param {string} message - The error message to display.
 */
function displayListError(message) {
  const container = document.getElementById("article-list-container");
  if (container) {
    // Simple error display that spans the grid column
    container.innerHTML = `
            <div class="col-span-full p-8 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-700 font-semibold mb-2">Error Loading Blog Posts</p>
                <p class="text-red-600">${message}</p>
            </div>
        `;
  }
}
