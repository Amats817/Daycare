document.addEventListener('DOMContentLoaded', function() {
  var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
          delay: 2500,
          disableOnInteraction: false,
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
  });

  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
      registerBtn.addEventListener('click', function () {
          window.location.href = 'register.html';
      });
  } else {
      console.log("Register button not found!");
  }

  const loginsec = document.querySelector('.login-section');
  const Registerlink = document.querySelector('.Register-link');
  const Loginlink = document.querySelector('.Login-link');

  Loginlink.addEventListener('click', () => {
      loginsec.classList.add('active');
  });

  Registerlink.addEventListener('click', () => {
      loginsec.classList.remove('active');
  });
});
