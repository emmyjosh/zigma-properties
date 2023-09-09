/** @format */
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  // spaceBetween: 5,
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

const works = [
  {
    id: 1,
    image: "../img/project-1.jpg",
    category: "Design",
    title: "Rectangular house near italy",
  },
  {
    id: 2,
    image: "../img/project-2.jpg",
    category: "Interio",
    title: "Rectangular house near italy",
  },
  {
    id: 3,
    image: "../img/project-3.jpg",
    category: "Construction",
    title: "Rectangular house near italy",
  },
  {
    id: 4,
    image: "../img/project-4.jpg",
    category: "Waste management",
    title: "Rectangular house near italy",
  },
  {
    id: 5,
    image: "../img/project-1.jpg",
    category: "Design",
    title: "Rectangular house near italy",
  },
  {
    id: 6,
    image: "../img/project-6.jpg",
    category: "Import/Export",
    title: "Rectangular house near italy",
  },
  {
    id: 7,
    image: "../img/project-6.jpg",
    category: "Import/Export",
    title: "Rectangular house near italy",
  },
  {
    id: 6,
    image: "../img/services-1.jpg",
    category: "Import/Export",
    title: "Rectangular house near italy",
  },
  {
    id: 6,
    image: "../img/services-4.jpg",
    category: "Import/Export",
    title: "Rectangular house near italy",
  },
  {
    id: 6,
    image: "../img/services-6.jpg",
    category: "Import/Export",
    title: "Rectangular house near italy",
  },
];

const projectCarousel = document.querySelector(".swiper-wrapper");
window.addEventListener("DOMContentLoaded", function () {
  let displayProject = works.map(function (works) {
    // console.log(works);
    return ` <div class="project-item swiper-slide">
                    <img src=${works.image} alt=${works.category}>
                    <div class="overlay"></div>
                    <a href="img/project-1.jpg" class="view-icon img-popup" data-gall="myGallery"> <i class="fas fa-expand"></i></a>
                    <div class="projects-content">
                        <a href=${works.image} class="category">${works.category}</a>
                        <h3><a href=${works.image} class="tittle">${works.title}</a></h3>
                    </div>
                </div>`;
  });
  displayProject = displayProject.join("");
  projectCarousel.innerHTML = displayProject;
  // console.log(displayProject);
});

const project = document.querySelector(".projectD");
window.addEventListener("DOMContentLoaded", function () {
  let displayProject = works.map(function (works) {
    console.log(works);
    return `  <div class="col-lg-4 col-sm-6 padding-15">
                    <div class="project-item">
                        <img src=${works.image} alt="projects">
                        <div class="overlay"></div>
                        <a href="img/project-1.jpg" class="view-icon img-popup"> <i class="fas fa-expand"></i></a>
                        <div class="projects-content">
                            <h2><a href=${works.image} class="category">${works.category}</a></h2>
                            <h4><a href="project-single.html" class="tittle">${works.title}</a></h4>
                        </div>
                    </div>
                </div>`;
  });
  displayProject = displayProject.join("");
  project.innerHTML = displayProject;
  console.log(displayProject);
});
