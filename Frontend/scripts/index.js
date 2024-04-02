document.addEventListener("DOMContentLoaded", function () {
	const toggleBtn = document.getElementById("toggle-btn");
	const toggleIcon = document.getElementById("toggle-icon");

	toggleBtn.addEventListener("click", () => {
		document.body.classList.toggle("dark-mode");
		toggleIcon.classList.toggle("fa-sun");
		toggleIcon.classList.toggle("fa-moon");
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const loginLink = document.getElementById("login-link");
	const registerLink = document.getElementById("register-link");
	const loginModal = document.getElementById("login-modal");
	const registerModal = document.getElementById("register-modal");
	const closeModalButtons = document.querySelectorAll(".close");
	// const themeToggle = document.getElementById("theme-toggle");
	const body = document.body;

	loginLink.addEventListener("click", function (event) {
		event.preventDefault();
		loginModal.style.display = "block";
	});

	// registerLink.addEventListener("click", function (event) {
	// 	event.preventDefault();
	// 	registerModal.style.display = "block";
	// });

	for (const button of closeModalButtons) {
		button.addEventListener("click", function () {
			loginModal.style.display = "none";
			registerModal.style.display = "none";
		});
	}

	// themeToggle.addEventListener("click", function () {
	// 	body.classList.toggle("dark-mode");
	// });

	const registerForm = document.getElementById("register-form");
	const loginForm = document.getElementById("login-form");

	// registerForm.addEventListener("submit", async function (event) {
	// 	event.preventDefault();
	// 	console.log("Register form submitted");

	// 	let formData = new FormData(registerForm);
	// 	let data = {};
	// 	for (let [key, value] of formData.entries()) {
	// 		data[key] = value;
	// 	}
	// 	console.log(data);
	// 	// change the register button to a spinner
	// 	const registerButton = document.getElementById("register-button");
	// 	registerButton.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Registering...`;

	// 	await fetch("https://project-webapp.onrender.com/auth/signup", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(data)
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("Registration response:", data);
	// 			registerForm.reset();
	// 			if (data.message !== "User signed in successfully") {
	// 				const infoReg = document.getElementById("info-reg");
	// 				infoReg.style.display = "block";
	// 				infoReg.style.color = "red";
	// 				infoReg.innerHTML = data.message;
	// 				registerButton.innerHTML = "Register";
	// 			} else {
	// 				localStorage.setItem("token", data.token);
	// 				localStorage.setItem("username", data.data.first_name);
	// 				if(data.data.newUser.email === "test@gmail.com"){
	// 					localStorage.setItem("role", "super-admin");
	// 				}
	// 				window.location.href = "dashboard.html";
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error registering:", error);
	// 		});
	// });

	loginForm.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("Login form submitted");

		let formData = new FormData(loginForm);
		let data = {};
		for (let [key, value] of formData.entries()) {
			data[key] = value;
		}
		console.log(data);
		// change the register button to a spinner
		const loginButton = document.getElementById("login-button");
		loginButton.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Logging in...`;

		fetch("https://project-webapp.onrender.com/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Login response:", data);
				loginForm.reset();
				if (data.message !== "User signed in successfully") {
					const infoLoginn = document.getElementById("info-login");
					infoLoginn.style.display = "block";
					infoLoginn.style.color = "red";
					infoLoginn.innerHTML = data.message;
					loginButton.innerHTML = "Login";
				} else {
					localStorage.setItem("token", data.token);
					localStorage.setItem("username", data.data.first_name);
					if (data.data.email === "test@gmail.com") {
						localStorage.setItem("role", "super-admin");
					}
					window.location.href = "dashboard.html";
				}
			})
			.catch((error) => {
				console.error("Error logging in:", error);
			});
	});
});
