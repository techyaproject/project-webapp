// document.addEventListener("DOMContentLoaded", function () {
// 	const token = localStorage.getItem("token");
// 	if (!token) {
// 		window.location.href = "index.html";
// 	}

// 	const sidebarItems = document.querySelectorAll(".sidebar-item");
// 	const sections = document.querySelectorAll(".section");
// 	const loggedinUser = document.getElementById("loggedin-user");

// 	// Display loggedin user in header
// 	loggedinUser.innerHTML = localStorage.getItem("username");

// 	// Add event listener for logout button
// 	const logoutButton = document.getElementById("logout-btn");
// 	logoutButton.addEventListener("click", function () {
// 		localStorage.removeItem("token");
// 		localStorage.removeItem("username");
// 		window.location.href = "index.html";
// 	});

// 	sidebarItems.forEach(function (item) {
// 		item.addEventListener("click", function (event) {
// 			event.preventDefault(); // Prevent default link behavior

// 			// Remove 'active' class from all sidebar items
// 			sidebarItems.forEach(function (item) {
// 				item.classList.remove("active");
// 			});

// 			// Add 'active' class to clicked sidebar item
// 			this.classList.add("active");

// 			// Hide all sections
// 			sections.forEach(function (section) {
// 				section.classList.remove("active");
// 			});

// 			// Show the corresponding section
// 			const targetId = this.getAttribute("href").substring(1); // Get target section id
// 			const targetSection = document.getElementById(targetId);
// 			targetSection.classList.add("active");

// 			// Fetch data for the active section
// 			if (targetId === "cards-section") {
// 				fetchCards(token);

// 				// Add event listener to add cards
// 				const addCardForm = document.getElementById("add-card-form");
// 				const addCardSerialModal = document.getElementById("add-card-serial-num-modal");
// 				const addCardSerialNumberForm = document.getElementById("add-card-serial-number-form");

// 				addCardForm.addEventListener("submit", function (event) {
// 					event.preventDefault();

// 					console.log("Add card form submitted");
// 					addCardSerialModal.style.display = "block";

// 					// const formData = new FormData(addCardForm);
// 					// const data = {};
// 					// for (let [key, value] of formData.entries()) {
// 					// 	data[key] = value;
// 					// }

// 					// fetch("https://project-webapp.onrender.com/cards", {
// 					// 	method: "POST",
// 					// 	headers: {
// 					// 		"Content-Type": "application/json",
// 					// 		Authorization: "Bearer " + token
// 					// 	},
// 					// 	body: JSON.stringify(data)
// 					// })
// 					// 	.then((response) => response.json())
// 					// 	.then((data) => {
// 					// 		console.log("Card added:", data);
// 					// 		fetchCards(token);
// 					// 		addCardForm.reset();
// 					// 	})
// 					// 	.catch((error) => {
// 					// 		console.error("Error adding card:", error);
// 					// 	});
// 				});
// 			} else if (targetId === "entries-section") {
// 				fetchEntries(token);
// 			}
// 		});
// 	});

// 	// Initial data fetch for the default active section
// 	const defaultActiveItem = document.querySelector(".sidebar-item.active");
// 	const defaultActiveSectionId = defaultActiveItem.getAttribute("href").substring(1);
// 	if (defaultActiveSectionId === "cards-section") {
// 		fetchCards(token);
// 	} else if (defaultActiveSectionId === "entries-section") {
// 		fetchEntries(token);
// 	}

// 	// Update data every 30 seconds
// 	setInterval(function () {
// 		const activeItem = document.querySelector(".sidebar-item.active");
// 		const activeSectionId = activeItem.getAttribute("href").substring(1);
// 		if (activeSectionId === "cards-section") {
// 			fetchCards(token);
// 		} else if (activeSectionId === "entries-section") {
// 			fetchEntries(token);
// 		}
// 	}, 30000);

// 	function fetchCards(token) {
// 		fetch("https://project-webapp.onrender.com/cards", {
// 			method: "GET",
// 			headers: {
// 				Authorization: "Bearer " + token
// 			}
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				// console.log("Data", data);
// 				if (data.data.allCards.length === 0) {
// 					renderNoCards();
// 				} else {
// 					renderCards(data.data.allCards);
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error fetching cards:", error);
// 			});
// 	}

// 	function fetchEntries(token) {
// 		fetch("https://project-webapp.onrender.com/entries-log", {
// 			method: "GET",
// 			headers: {
// 				Authorization: "Bearer " + token
// 			}
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				console.log("Data", data.data.allEntries);
// 				if (data.data.allEntries.length === 0) {
// 					renderNoEntries();
// 				} else {
// 					renderEntries(data.data.allEntries);
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error fetching entries:", error);
// 			});
// 	}

// 	function renderNoCards() {
// 		const cardList = document.querySelector(".card-list");
// 		cardList.innerHTML = "<p>No card registered yet. Add a new card.</p>";
// 	}

// 	function renderNoEntries() {
// 		const entryList = document.querySelector(".entry-list");
// 		entryList.innerHTML = "<p>No entries yet.</p>";
// 	}

// 	function renderCards(cards) {
// 		const cardList = document.querySelector(".card-list");
// 		cardList.innerHTML = ""; // Clear existing cards

// 		cards.forEach((card) => {
// 			const cardItem = document.createElement("div");
// 			cardItem.classList.add("card");
// 			cardItem.innerHTML = `
// 					<p><strong>Serial Number:</strong> ${card.serial_number}</p>
// 					<p><strong>Card Holder:</strong> ${card.card_holder}</p>
// 					<p><strong>Card Status:</strong> ${card.active ? "Active" : "Inactive"}</p>
// 					<button class="delete-btn" id="delete-${card._id}">Delete</button>
// 			  `;
// 			cardList.appendChild(cardItem);

// 			// Add event listener to delete card
// 			const deleteButton = cardItem.querySelector(".delete-btn");
// 			deleteButton.addEventListener("click", function () {
// 				fetch(`https://project-webapp.onrender.com/cards/${card._id}`, {
// 					method: "DELETE",
// 					headers: {
// 						Authorization: "Bearer " + token
// 					}
// 				})
// 					.then((response) => response.json())
// 					.then((data) => {
// 						console.log("Card deleted:", data);
// 						fetchCards(token);
// 					})
// 					.catch((error) => {
// 						console.error("Error deleting card:", error);
// 					});
// 			});
// 		});
// 	}

// 	function renderEntries(entries) {
// 		const entryList = document.querySelector(".entry-list");
// 		entryList.innerHTML = ""; // Clear existing entries

// 		entries.forEach((entry) => {
// 			const entryItem = document.createElement("div");
// 			entryItem.classList.add("entry");
// 			entryItem.innerHTML = `
// 					<p><strong>Serial Number:</strong> ${entry.card_serial_number}</p>
// 					<p><strong>Card Holder:</strong> ${entry.card_holder}</p>
// 					<p><strong>Entry Time:</strong> ${entry.entry_time}</p>
// 					<p><strong>Entry Status:</strong> ${entry.entry_status}</p>
// 			  `;
// 			entryList.appendChild(entryItem);
// 		});
// 	}
// });

document.addEventListener("DOMContentLoaded", function () {
	const token = localStorage.getItem("token");
	if (!token) {
		window.location.href = "index.html";
	}

	const sidebarItems = document.querySelectorAll(".sidebar-item");
	const sections = document.querySelectorAll(".section");
	const loggedinUser = document.getElementById("loggedin-user");

	// Display loggedin user in header
	loggedinUser.innerHTML = localStorage.getItem("username");

	// Add event listener for logout button
	const logoutButton = document.getElementById("logout-btn");
	logoutButton.addEventListener("click", function () {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		window.location.href = "index.html";
	});

	sidebarItems.forEach(function (item) {
		item.addEventListener("click", function (event) {
			event.preventDefault(); // Prevent default link behavior

			// Remove 'active' class from all sidebar items
			sidebarItems.forEach(function (item) {
				item.classList.remove("active");
			});

			// Add 'active' class to clicked sidebar item
			this.classList.add("active");

			// Hide all sections
			sections.forEach(function (section) {
				section.classList.remove("active");
			});

			// Show the corresponding section
			const targetId = this.getAttribute("href").substring(1); // Get target section id
			const targetSection = document.getElementById(targetId);
			targetSection.classList.add("active");

			// Fetch data for the active section
			if (targetId === "cards-section") {
				fetchCards(token);
			} else if (targetId === "entries-section") {
				fetchEntries(token);
			}
		});
	});

	// Initial data fetch for the default active section
	const defaultActiveItem = document.querySelector(".sidebar-item.active");
	const defaultActiveSectionId = defaultActiveItem.getAttribute("href").substring(1);
	if (defaultActiveSectionId === "cards-section") {
		fetchCards(token);
	} else if (defaultActiveSectionId === "entries-section") {
		fetchEntries(token);
	}

	// Update data every 30 seconds
	setInterval(function () {
		const activeItem = document.querySelector(".sidebar-item.active");
		const activeSectionId = activeItem.getAttribute("href").substring(1);
		if (activeSectionId === "cards-section") {
			fetchCards(token);
		} else if (activeSectionId === "entries-section") {
			fetchEntries(token);
		}
	}, 30000);

	function fetchCards(token) {
		fetch("https://project-webapp.onrender.com/cards", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Data", data);
				if (data.data.allCards.length === 0) {
					renderNoCards();
				} else {
					renderCards(data.data.allCards);
				}
			})
			.catch((error) => {
				console.error("Error fetching cards:", error);
			});
	}

	function fetchEntries(token) {
		fetch("https://project-webapp.onrender.com/entries-log", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.data.allEntries.length === 0) {
					renderNoEntries();
				} else {
					renderEntries(data.data.allEntries);
				}
			})
			.catch((error) => {
				console.error("Error fetching entries:", error);
			});
	}

	function renderNoCards() {
		const cardList = document.querySelector(".card-list");
		cardList.innerHTML = "<p>No card registered yet. Add a new card.</p>";
	}

	function renderNoEntries() {
		const entryList = document.querySelector(".entry-list");
		entryList.innerHTML = "<p>No entries yet.</p>";
	}

	function renderCards(cards) {
		const cardList = document.querySelector(".card-list");
		cardList.innerHTML = ""; // Clear existing cards

		cards.forEach((card) => {
			const cardItem = document.createElement("div");
			cardItem.classList.add("card");
			cardItem.innerHTML = `
					<p><strong>Serial Number:</strong> ${card.serial_number}</p>
					<p><strong>Card Holder:</strong> ${card.owner_name}</p>
					<p><strong>Card Status:</strong> ${card.active ? "Active" : "Inactive"}</p>
					<button class="delete-btn" id="delete-${card._id}">Delete</button>
			  `;
			cardList.appendChild(cardItem);

			// Add event listener to delete card
			const deleteButton = cardItem.querySelector(".delete-btn");
			deleteButton.addEventListener("click", function () {
				fetch(`https://project-webapp.onrender.com/cards/${card._id}`, {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + token
					}
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Card deleted:", data);
						fetchCards(token);
					})
					.catch((error) => {
						console.error("Error deleting card:", error);
					});
			});
		});
	}

	function renderEntries(entries) {
		const entryList = document.querySelector(".entry-list");
		entryList.innerHTML = ""; // Clear existing entries

		entries.forEach((entry) => {
			const entryItem = document.createElement("div");
			entryItem.classList.add("entry");
			entryItem.innerHTML = `
					<p><strong>Serial Number:</strong> ${entry.card_serial_number}</p>
					<p><strong>Card Holder:</strong> ${entry.owner_name}</p>
					<p><strong>Entry Time:</strong> ${entry.entry_time}</p>
					<p><strong>Entry Status:</strong> ${entry.entry_status}</p>
			  `;
			entryList.appendChild(entryItem);
		});
	}

	// Add event listener for submitting add card form
	const addCardForm = document.getElementById("add-card-form");
	addCardForm.addEventListener("submit", function (event) {
		event.preventDefault();

		// Display card reader modal
		const cardReaderModal = document.getElementById("card-reader-modal");
		cardReaderModal.style.display = "block";

		// wait for 20 seconds then make get request to read card
		setTimeout(() => {
			
			// Fetch most recent card data
			fetch("https://project-webapp.onrender.com/read-card/latest", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token
				}
			})
				.then((response) => response.json())
				.then((data) => {
					const cardSerialNumberInput = document.getElementById("card-serial-number");
					cardSerialNumberInput.value = data.data.serial_number;
				})
				.catch((error) => {
					console.error("Error fetching most recent card data:", error);
				});
		}, 20000);
	});

	// Add event listener for submitting card reader modal form
	const cardReaderForm = document.getElementById("add-card-from-reader-form");
	cardReaderForm.addEventListener("submit", function (event) {
		event.preventDefault();

		// Get data from add card form
		const ownerName = document.getElementById("owner-name").value;
		const ownerEmail = document.getElementById("owner-email").value;
		const ownerDepartment = document.getElementById("owner-department").value;
		const ownerMatric = document.getElementById("owner-matric").value;
		const cardSerialNumber = document.getElementById("card-serial-number").value;

		// Create card object
		const newCard = {
			owner_name: ownerName,
			owner_email: ownerEmail,
			owner_department: ownerDepartment,
			owner_matric: ownerMatric,
			serial_number: cardSerialNumber
		};

		// Send POST request to add new card
		fetch("https://project-webapp.onrender.com/cards", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify(newCard)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("New card added:", data);
				// Close modal
				const cardReaderModal = document.getElementById("card-reader-modal");
				cardReaderModal.style.display = "none";
				// Fetch and render updated cards
				fetchCards(token);
			})
			.catch((error) => {
				console.error("Error adding new card:", error);
			});
	});

	// Close card reader modal when close button is clicked
	const cardReaderCloseBtn = document.querySelector("#card-reader-modal .close");
	cardReaderCloseBtn.addEventListener("click", function () {
		const cardReaderModal = document.getElementById("card-reader-modal");
		cardReaderModal.style.display = "none";
	});
});
