/** @format */

let currentPage = 1; // Initialize the current page
const itemsPerPage = 6; // Number of items per page
let data = null; // Use let instead of const

const fetchDataAndPopulateCarousels = async () => {
  try {
    // Fetch data if not already fetched
    if (data === null) {
      const response = await fetch("https://zigma-backend-w96a.onrender.com");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      data = await response.json(); // Parse response as JSON
    }

    console.log("HTML has been inserted into projectCarousel.");

    const projectD = document.getElementById("projectD");
    const displayProjects = data.project.map((project, index) => {
      // Calculate the start and end indexes based on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      if (index >= startIndex && index < endIndex) {
        return `
          <div class="col-lg-4 col-sm-6 padding-15">
            <div class="project-item">
              <img src="${project.imageUrl}" alt="${project.title}">
              <div class="overlay"></div>
              <a href="${project.imageUrl}" class="view-icon img-popup">
                <i class="fas fa-expand"></i>
              </a>
              <div class="projects-content">
                <a href="#" class="category">${project.category}</a>
                <h3><a href="project-single.html" class="title">${project.title}</a></h3>
              </div>
            </div>
          </div>
        `;
      } else {
        return ""; // Return an empty string for items that are not on the current page
      }
    });

    projectD.innerHTML = displayProjects.join("");

    updatePagination(); // Update the pagination links
  } catch (error) {
    console.error(error);
  }
};

const updatePagination = () => {
  const totalItems = data.project.length;
  const maxPage = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("paginationContainer");
  const paginationUl = document.createElement("ul");
  paginationUl.classList.add("pagination", "justify-content-center");

  for (let page = 1; page <= maxPage; page++) {
    const paginationLi = document.createElement("li");
    paginationLi.classList.add("page-item");
    const paginationLink = document.createElement("a");
    paginationLink.classList.add("page-link");
    paginationLink.href = "#";
    paginationLink.textContent = page;
    paginationLink.addEventListener("click", () => {
      currentPage = page;
      fetchDataAndPopulateCarousels();
    });

    paginationLi.appendChild(paginationLink);
    paginationUl.appendChild(paginationLi);
  }

  paginationContainer.replaceChild(
    paginationUl,
    paginationContainer.firstChild
  );
};

// Call the fetchDataAndPopulateCarousels function when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndPopulateCarousels();
});
