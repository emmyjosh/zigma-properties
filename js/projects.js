/** @format */

let axios = require("axios");
const fetchDataAndPopulateCarousels = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/projects");

    if (res.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const data = res.data.project; // Check the API response structure

    const displayProjectsCarousel = data.map((project) => {
      return `
      
        <div class="project-item swiper-slide">
          <img src=${project.imageUrl} alt=${project.category}> <!-- Use imageUrl instead of image -->
          <div class="overlay"></div>
          <a href=${project.imageUrl} class="view-icon img-popup" data-gall="myGallery">
            <i class="fas fa-expand"></i>
          </a>
          <div class="projects-content">
            <a href=${project.imageUrl} class="category">${project.category}</a>
            <h3><a href=${project.imageUrl} class="title">${project.title}</a></h3> 
          </div>
        </div>
      `;
    });

    const displayProjects = data.map((project) => {
      return `
        <div class="col-lg-4 col-sm-6 padding-15">
          <div class="project-item">
            <img src=${project.imageUrl} class="resize-image" alt="projects"> 
            <div class="overlay"></div>
            <a href=${project.imageUrl} class="view-icon img-popup"> <i class="fas fa-expand"></i></a>
            <div class="projects-content">
              <h2><a href=${project.imageUrl} class="category">${project.category}</a></h2> 
              <h4><a href=${project.imageUrl} class="title">${project.title}</a></h4>
            </div>
          </div>
        </div>
      `;
    });

    const projectCarousel = document.getElementById("projectCarousel"); // Check if this element exists in your HTML
    const project = document.getElementById("project"); // Check if this element exists in your HTML

    if (projectCarousel && project) {
      projectCarousel.innerHTML = displayProjectsCarousel.join("");
      project.innerHTML = displayProjects.join("");

      // Initialize Swiper here after the data is inserted into the carousel container
      var swiper = new swiper(".mySwiper", {
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
    }
  } catch (error) {
    console.error(error);
  }
};

// Call the fetchDataAndPopulateCarousels function when the DOM is loaded
fetchDataAndPopulateCarousels();
