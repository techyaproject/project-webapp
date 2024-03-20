// document.addEventListener('DOMContentLoaded', function() {
//    const themeToggle = document.getElementById('theme-toggle');
//    const body = document.body;

//    themeToggle.addEventListener('change', function() {
//        if (this.checked) {
//            body.classList.add('dark-mode');
//        } else {
//            body.classList.remove('dark-mode');
//        }
//    });
// });

document.addEventListener("DOMContentLoaded", function () {
	const loginLink = document.getElementById("login-link");
	const registerLink = document.getElementById("register-link");
	const loginModal = document.getElementById("login-modal");
	const registerModal = document.getElementById("register-modal");
	const closeModalButtons = document.querySelectorAll(".close");
	const themeToggle = document.getElementById("theme-toggle");
	const body = document.body;

	loginLink.addEventListener("click", function (event) {
		event.preventDefault();
		loginModal.style.display = "block";
	});

	registerLink.addEventListener("click", function (event) {
		event.preventDefault();
		registerModal.style.display = "block";
	});

	for (const button of closeModalButtons) {
		button.addEventListener("click", function () {
			loginModal.style.display = "none";
			registerModal.style.display = "none";
		});
	}

	themeToggle.addEventListener("click", function () {
		body.classList.toggle("dark-mode");
	});
});
