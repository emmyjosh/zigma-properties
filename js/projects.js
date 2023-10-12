/** @format */

const fetchDataAndPopulateCarousels = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/projects");

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json(); // Parse response as JSON

    console.log("HTML has been inserted into projectCarousel.");

    const displayProjects = data.project.map((project) => {
      return `
        <div class="col-lg-4 col-sm-6 padding-15">
          <div class="project-item swiper-slide">
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
    });

    const project = document.getElementById("projectD");

    project.innerHTML = displayProjects.join("");

    // Initialize Swiper with pagination
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// Call the fetchDataAndPopulateCarousels function when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndPopulateCarousels();
});
