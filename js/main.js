/** @format */

(function ($) {
  "use strict";
  $(window).on("load", function () {
    $("body").addClass("loaded");
  });
  function headerHeight() {
    var height = $("#header").height();
    $(".header-height").css("height", height + "px");
  }
  $(function () {
    var header = $("#header"),
      yOffset = 0,
      triggerPoint = 80;
    headerHeight();
    $(window).resize(headerHeight);
    $(window).on("scroll", function () {
      yOffset = $(window).scrollTop();
      if (yOffset >= triggerPoint) {
        header.addClass("navbar-fixed-top animated slideInDown");
      } else {
        header.removeClass("navbar-fixed-top animated slideInDown");
      }
    });
  });
  $(document).ready(function () {
    $("#main-slider").on("init", function (e, slick) {
      var $firstAnimatingElements = $("div.single-slide:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    $("#main-slider").on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          'div.single-slide[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    $("#main-slider").slick({
      autoplay: true,
      autoplaySpeed: 10000,
      dots: true,
      fade: true,
      prevArrow:
        '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
      nextArrow:
        '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>',
    });
    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  });
  $(".menu-wrap ul.nav").slicknav({
    prependTo: ".header-section .navbar",
    label: "",
    allowParentLinks: true,
  });
  $("#about-carousel").owlCarousel({
    loop: true,
    margin: 25,
    autoplay: true,
    smartSpeed: 800,
    nav: true,
    navText: [
      '<i class="ti-arrow-left"></i>',
      '<i class="ti-arrow-right"></i>',
    ],
    dots: false,
    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      768: { items: 1 },
      992: { items: 1 },
    },
  });
  $("#projects-carousel").owlCarousel({
    loop: true,
    margin: 5,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ],
    dots: false,
    responsive: {
      0: { items: 1 },
      580: { items: 2 },
      768: { items: 2 },
      992: { items: 4 },
    },
  });
  $("#project-carousel-2").owlCarousel({
    loop: true,
    margin: 25,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ],
    dots: true,
    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      768: { items: 2 },
      992: { items: 1 },
    },
  });
  $("#project-single-carousel").owlCarousel({
    loop: true,
    margin: 5,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ],
    dots: true,
    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      768: { items: 1 },
      992: { items: 1 },
    },
  });
  $("#testimonial-carousel").owlCarousel({
    loop: true,
    margin: 10,
    center: false,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ],
    dots: true,
    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      768: { items: 1 },
      992: { items: 2 },
    },
  });
  $("#sponsor-carousel").owlCarousel({
    loop: true,
    margin: 5,
    center: false,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ],
    dots: false,
    responsive: {
      0: { items: 2 },
      480: { items: 3 },
      768: { items: 3 },
      992: { items: 6 },
    },
  });
  var counterSelector = $(".counter");
  counterSelector.counterUp({ delay: 10, time: 1000 });
  $(".video-bg").YTPlayer();
  smoothScroll.init({ offset: 60 });
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#scroll-to-top").fadeIn();
    } else {
      $("#scroll-to-top").fadeOut();
    }
  });
  new WOW().init();
  $(".img-popup").venobox({ numeratio: true, infinigall: true });
  if ($(".subscribe_form").length > 0) {
    $(".subscribe_form").ajaxChimp({
      language: "es",
      callback: mailchimpCallback,
      url: "//alexatheme.us14.list-manage.com/subscribe/post?u=48e55a88ece7641124b31a029&amp;id=361ec5b369",
    });
  }
  function mailchimpCallback(resp) {
    if (resp.result === "success") {
      $("#subscribe-result").addClass("subs-result");
      $(".subscription-success").text(resp.msg).fadeIn();
      $(".subscription-error").fadeOut();
    } else if (resp.result === "error") {
      $("#subscribe-result").addClass("subs-result");
      $(".subscription-error").text(resp.msg).fadeIn();
    }
  }
  $.ajaxChimp.translations.es = {
    submit: "Submitting...",
    0: "We have sent you a confirmation email",
    1: "Please enter your email",
    2: "An email address must contain a single @",
    3: "The domain portion of the email address is invalid (the portion after the @: )",
    4: "The username portion of the email address is invalid (the portion before the @: )",
    5: "This email address looks fake or invalid. Please enter a real email address",
  };
  if ($("body").hasClass("contact-page")) {
    google.maps.event.addDomListener(window, "load", init);
    function init() {
      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(40.67, -73.94),
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [{ saturation: "-100" }],
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              { saturation: -100 },
              { lightness: 65 },
              { visibility: "on" },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              { saturation: -100 },
              { lightness: "50" },
              { visibility: "simplified" },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: "-100" }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [{ lightness: "30" }],
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [{ lightness: "40" }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ saturation: -100 }, { visibility: "simplified" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              { hue: "#ffff00" },
              { lightness: -25 },
              { saturation: -97 },
            ],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [{ lightness: -25 }, { saturation: -100 }],
          },
        ],
      };
      var mapElement = document.getElementById("google-map");
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.67, -73.94),
        map: map,
        title: "Location!",
      });
    }
  }
})(jQuery);

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
    // console.log(works);
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
