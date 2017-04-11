$(document).ready(function(){
  var heroSwiper = new Swiper('.swiper-hero', {
    pagination: '.swiper-hero-pagination',
    paginationClickable: true,
    autoplay: 3000
  });
  var thumbnailSwiper = new Swiper('.thumbnail-swiper', {
    slidesPerView: 6,
    paginationClickable: true,
    spaceBetween: 15,
    nextButton: '.thumbnail-next',
    prevButton: '.thumbnail-prev',
    breakpoints: {
      767: {
        slidesPerView: 1.4,
      },
      991: {
        slidesPerView: 2,
      },
      1199: {
        slidesPerView: 4,
      }
    }
  });
  var cardSwiper = new Swiper('.card-swiper', {
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 15,
    nextButton: '.card-next',
    prevButton: '.card-prev',
    breakpoints: {
      767: {
        slidesPerView: 1.1,
      },
      991: {
        slidesPerView: 2,
      },
      1199: {
        slidesPerView: 3,
      }
    }
  });
  var imgCopySwiper = new Swiper('.img-copy-swiper', {
    slidesPerView: 1.4,
    paginationClickable: true,
    spaceBetween: 15,
    nextButton: '.img-copy-next',
    prevButton: '.img-copy-prev',
  });
});
