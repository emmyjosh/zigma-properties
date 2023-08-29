/** @format */

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
    image: "../image/project-3.jpg",
    category: "Construction",
    title: "Rectangular house near italy",
  },
  {
    id: 4,
    image: "../image/project-4.jpg",
    category: "Design",
    title: "Rectangular house near italy",
  },
  {
    id: 5,
    image: "../image/project-5.jpg",
    category: "Design",
    title: "Rectangular house near italy",
  },
  {
    id: 6,
    image: "../image/project-6.jpg",
    category: "Design",
    title: "Rectangular house near italy",
  },
];

const project = document.querySelector(".carousel");
window.addEventListener("DOMContentLoaded", function () {
  let displayProject = works.map(function (works) {
    console.log(works);
    return ` <div class="project-item">
                    <img src="img/project-1.jpg" alt="projects">
                    <div class="overlay"></div>
                    <a href="img/project-1.jpg" class="view-icon img-popup" data-gall="myGallery"> <i class="fas fa-expand"></i></a>
                    <div class="projects-content">
                        <a href="projects.html" class="category">Interior</a>
                        <h3><a href="project-single.html" class="tittle">Rectangular house near italy</a></h3>
                    </div>
                </div>`;
  });
  displayProject = displayProject.join("");
  project.innerHTML = displayProject;
  console.log(displayProject);
});
