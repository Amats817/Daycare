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
          window.location.href = '/register';
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

var errorMessage = document.getElementById("error-message");
function submitForm(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('/login/teacher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (response.status === 401) {
            // Display error message if login failed
            errorMessage.style.display = "block";
        } else if (response.status === 200) {
            // Redirect to the URL provided in the response
            response.json().then(data => {
                window.location.href = data.redirect;
            });
        } else {
            console.error('Error:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
  