import Swiper, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper";
const swiperSlideContainer = document.querySelector("#swiperContainer");

const swiper = () =>
  new Swiper(".swiper", {
    modules: [EffectCoverflow, Navigation, Pagination, Autoplay],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

const insertSlides = (data) => {
  swiperSlideContainer.innerHTML = "";
  data.forEach((el) => {
    swiperSlideContainer.innerHTML += `<div class="swiper-slide">${`<img src="${el.image}" alt="${el.alt}"/>`}</div>`;
  });
};

export { swiper, insertSlides };
