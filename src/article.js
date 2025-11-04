document.addEventListener("DOMContentLoaded", initializeArticle);

async function initializeArticle() {
  const URLParams = new new URLSearchParams(window.location.search)();
  const articleId = parseInt(URLParams.get("id"));

  if (isNaN(articleId)) {
    displayError("Article ID not found or is invalid in the URL.");
    return;
  }

  try {
    const response = await fetch(`articles.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();
    const articleData = articles.find((a) => a.id === articleId);

    if (articleData) {
      // FIX: Corrected typo from 'polulateArticle' to 'populateArticle'
      populateArticle(articleData);
    } else {
      displayError(`Article ID ${articleId} not found`);
    }
  } catch (error) {
    console.error("Error loading article:", error);
    displayError(
      "Failed to load article data. Please check your JSON file path and format."
    );
  }
}

/**
 * Populates the article detail page with fetched data.
 * @param {Object} data - The single article object.
 */
function populateArticle(data) {
  document.getElementById("page-title").textContent = data.title;
  document.getElementById("article-breadcrumb-title").textContent = data.title;
  document.getElementById("article-title").textContent = data.title;
  document.getElementById("article-body").innerHTML = data.content;

  const imageEl = document.getElementById("article-image");
  imageEl.src = data.image_url;
  imageEl.alt = data.image_alt || data.title;

  document.getElementById("article-meta").innerHTML = `
    <span class="flex items-center">
        <i class="fa-regular fa-calendar-days w-4 h-4 mr-1"></i>
        ${data.date}
    </span>
    <span class="text-red-500">•</span>
    <span class="flex items-center">
        <i class="fa-solid fa-user w-4 h-4 mr-1"></i>
        ${data.author}
    </span>
  `;

  renderTags(data.tags);
  renderComments(data.comments);
}

/**
 * Renders the tags at the bottom of the article.
 * @param {Array<string>} tags - The list of tags.
 */
function renderTags(tags) {
  const tagsContainer = document.getElementById("article-tags");
  if (!tagsContainer) return;

  tagsContainer.innerHTML = tags
    .map(
      (tag) => `
        <span class="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-red-100 hover:text-red-600 cursor-pointer transition">
            ${tag}
        </span>
    `
    )
    .join("");
}

/**
 * Renders the comment section.
 * @param {Array<Object>} comments - The list of comment objects.
 */
function renderComments(comments) {
  const commentsSection = document.getElementById("article-comments-section");
  if (!commentsSection) return;

  let html = `<h3 class="text-2xl font-bold text-gray-800 mb-6">${
    comments.length
  } Comment${comments.length !== 1 ? "s" : ""}</h3>`;

  comments.forEach((comment) => {
    html += `
        <div class="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm mt-4">
            <div class="shrink-0">
                <img class="h-12 w-12 rounded-full object-cover" src="${comment.avatar_url}" alt="${comment.author}" />
            </div>
            <div>
                <div class="flex items-center mb-1">
                    <span class="text-sm text-gray-500 mr-2">${comment.date}</span>
                    <h5 class="text-lg font-semibold text-gray-800">${comment.author}</h5>
                </div>
                <p class="text-gray-600 text-sm">${comment.body}</p>
            </div>
        </div>
    `;
  });

  commentsSection.innerHTML = html;
}

/**
 * Displays an error message on the article detail page.
 * NOTE: This function requires the IDs 'page-title', 'article-breadcrumb-title', 'article-title', and 'article-body' to exist.
 * @param {string} message - The error message to display.
 */
function displayError(message) {
  // These lines should now work correctly on article.html
  const pageTitleElement = document.getElementById("page-title");
  const breadcrumbElement = document.getElementById("article-breadcrumb-title");
  const articleTitleElement = document.getElementById("article-title");

  if (pageTitleElement) pageTitleElement.textContent = "Error";
  if (breadcrumbElement) breadcrumbElement.textContent = "Error";
  if (articleTitleElement)
    articleTitleElement.textContent = "Error Loading Article";

  const bodyElement = document.getElementById("article-body");
  if (bodyElement) {
    bodyElement.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
  }
}
