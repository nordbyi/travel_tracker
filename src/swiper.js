import Swiper, {
  Navigation,
  EffectCoverflow,
  Autoplay,
} from "swiper";

const swiper = (swiperID) =>
  new Swiper(swiperID, {
    modules: [EffectCoverflow, Navigation, Autoplay],
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
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

const insertSlides = (data, swiperContainer, slideClass) => {
  swiperContainer.innerHTML = "";
  data.forEach((el) => {
    swiperContainer.innerHTML += `<div class="${slideClass}">${`<img src="${el.image}" alt="${el.alt}"/>`}</div>`;
  });
};

export { swiper, insertSlides};
