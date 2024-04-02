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
		localStorage.removeItem("role");
		window.location.href = "index.html";
	});

	// Conditional rendering for "Manage Admins" section
	const manageAdminSelect = document.getElementById("manage-admin-select");
	const manageAdminsSection = document.getElementById("manage-admins-section");
	const isAdmin = localStorage.getItem("role") === "super-admin";
	if (isAdmin) {
		manageAdminsSection.style.display = "block";
	} else {
		manageAdminSelect.style.display = "none";
		manageAdminsSection.style.display = "none";
	}

	// Add event listener for sidebar items
	sidebarItems.forEach(function (item) {
		item.addEventListener("click", function (event) {
			event.preventDefault(); // Prevent default link behavior

			// Remove 'active' class from all sidebar items
			sidebarItems.forEach(function (item) {
				item.classList.remove("active");
				// manageAdminsSection.style.display = "none";
			});

			// Add 'active' class to clicked sidebar item
			this.classList.add("active");
			if (this.id === "manage-admin-select") {
				manageAdminsSection.style.display = "block";
			} else {
				manageAdminsSection.style.display = "none";
			}

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
				// manageAdminsSection.style.display = "none";
			} else if (targetId === "entries-section") {
				fetchEntries(token);
				// manageAdminsSection.style.display = "none";
			} else if (targetId === "manage-admins-section" && isAdmin) {
				fetchAdmins(token);
			}
		});
	});

	// Initial data fetch for the default active section
	const defaultActiveItem = document.querySelector(".sidebar-item.active");
	const defaultActiveSectionId = defaultActiveItem.getAttribute("href").substring(1);
	if (defaultActiveSectionId === "cards-section") {
		fetchCards(token);
		manageAdminsSection.style.display = "none";
	} else if (defaultActiveSectionId === "entries-section") {
		fetchEntries(token);
		manageAdminsSection.style.display = "none";
	} else if (defaultActiveSectionId === "manage-admins-section" && isAdmin) {
		fetchAdmins(token);
	}

	// Update data every 30 seconds
	setInterval(function () {
		const activeItem = document.querySelector(".sidebar-item.active");
		const activeSectionId = activeItem.getAttribute("href").substring(1);
		if (activeSectionId === "cards-section") {
			fetchCards(token);
		} else if (activeSectionId === "entries-section") {
			fetchEntries(token);
		} else if (activeSectionId === "manage-admins-section" && isAdmin) {
			fetchAdmins(token);
		}
	}, 30000);

	// Add event listener for submitting add admin form
	// const addAdminForm = document.getElementById("add-admin-form");
	// addAdminForm.addEventListener("submit", function (event) {
	// 	event.preventDefault();

	// 	// Get data from the form
	// 	const adminUsername = document.getElementById("admin-username").value;
	// 	const adminPassword = document.getElementById("admin-password").value;

	// 	// Create admin object
	// 	const newAdmin = {
	// 		username: adminUsername,
	// 		password: adminPassword,
	// 		role: "admin" // Assuming the default role is admin
	// 	};

	// 	// Send POST request to add new admin
	// 	fetch("https://project-webapp.onrender.com/auth/signup", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: "Bearer " + token
	// 		},
	// 		body: JSON.stringify(newAdmin)
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("New admin added:", data);
	// 			// Clear form fields
	// 			addAdminForm.reset();
	// 			// Fetch and render updated admins
	// 			fetchAdmins(token);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error adding new admin:", error);
	// 		});
	// });

	function fetchAdmins(token) {
		fetch("https://project-webapp.onrender.com/auth/all-admins", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Admins:", data);
				if (data.message == "jwt expired") {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
				}
				if (data.data.length === 0) {
					renderNoAdmins();
				} else {
					renderAdmins(data.data);
				}
			})
			.catch((error) => {
				console.error("Error fetching admins:", error);
			});
	}

	function fetchCards(token) {
		fetch("https://project-webapp.onrender.com/cards", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Data", data.message);
				console.log("Cards:", data.data.allCards);
				if (data.message == "jwt expired") {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
				}
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
				if (data.message == "jwt expired") {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
				}

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

	function renderNoAdmins() {
		const adminList = document.querySelector(".admin-list");
		adminList.innerHTML = "<p>No admins yet.</p>";
	}

	function renderAdmins(admins) {
		const adminList = document.querySelector(".admin-list");
		adminList.innerHTML = ""; // Clear existing admins

		admins.forEach((admin) => {
			const adminItem = document.createElement("div");
			adminItem.classList.add("admin-item");
			adminItem.innerHTML = `
				  <div>
				  		<p><strong>First Name:</strong> ${admin.first_name}</p>
					  	<p><strong>Last Name:</strong> ${admin.last_name}</p>
					  	<p><strong>Email:</strong> ${admin.email}</p>
				  </div>
				  <div>
				  		<button class="delete-btn" id="delete-${admin._id}">Delete Admin</button>
				  </div>
			 `;
			adminList.appendChild(adminItem);

			// Add event listener to delete admin
			const deleteButton = adminItem.querySelector(".delete-btn");
			deleteButton.addEventListener("click", function () {
				fetch(`https://project-webapp.onrender.com/auth/${admin._id}`, {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + token
					},
					body: JSON.stringify(admin)
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Admin deleted:", data);
						fetchAdmins(token);
					})
					.catch((error) => {
						console.error("Error deleting admin:", error);
					});
			});
		});
	}

	function renderCards(cards) {
		const cardList = document.querySelector(".card-list");
		cardList.innerHTML = ""; // Clear existing cards
		manageAdminsSection.style.display = "none";

		cards = cards.reverse(); // Reverse the order of cards
		cards.forEach((card) => {
			const cardItem = document.createElement("div");
			cardItem.classList.add("card");
			cardItem.innerHTML = `
					<p><strong>Serial Number:</strong> ${card.serial_number}</p>
					<p><strong>Card Holder:</strong> ${card.owner_name}</p>
					<p><strong>Card Status:</strong> ${card.active ? "Active" : "Inactive"}</p>
					<div class="card-buttons">
						<button class="delete-btn" id="delete-${card._id}">Delete</button>
						<button class="deactivate-btn" id="deactivate-${card._id}">${
				card.active ? "Deactivate" : "Activate"
			}</button>
					</div>			  `;
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

			// Add event listener to deactivate card
			const deactivateButton = cardItem.querySelector(".deactivate-btn");
			deactivateButton.addEventListener("click", function () {
				// change the text of the button to "Loading..."
				deactivateButton.innerHTML = "Loading...";

				const newStatus = !card.active;
				fetch(`https://project-webapp.onrender.com/cards/${card._id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					},
					body: JSON.stringify({ active: newStatus })
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Card updated:", data);
						fetchCards(token);
					})
					.catch((error) => {
						console.error("Error updating card:", error);
					});
			});
		});
	}

	function renderEntries(entries) {
		const entryList = document.querySelector(".entry-list");
		entryList.innerHTML = ""; // Clear existing entries

		entries = entries.reverse(); // Reverse the order of entries
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

	// Add event listener for submitting add admin form
	const addAdminForm = document.getElementById("add-admin-form");
	addAdminForm.addEventListener("submit", function (event) {
		event.preventDefault();

		// Get data from the form
		const firstName = document.getElementById("admin-firstname").value;
		const lastName = document.getElementById("admin-lastname").value;
		const email = document.getElementById("admin-email").value;
		const password = document.getElementById("admin-password").value;

		// Create admin object
		const newAdmin = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password
		};

		// Send POST request to add new admin
		fetch("https://project-webapp.onrender.com/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify(newAdmin)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("New admin added:", data.data);
				const info = document.getElementById("add-admin-info");
				// Clear form fields
				addAdminForm.reset();

				// Display success message in the info for 3 seconds
				info.style.display = "block";
				info.innerHTML = "Admin successfully added";
				info.style.color = "green";

				setTimeout(() => {
					info.style.display = "none";
				}, 3000);
				// Fetch and render updated admins
				fetchAdmins(token);
			})
			.catch((error) => {
				console.error("Error adding new admin:", error);
				// Display success message in the info for 3 seconds
				info.style.display = "block";
				info.innerHTML = error.message;
				info.style.color = "red";

				setTimeout(() => {
					info.style.display = "none";
				}, 3000);
			});
	});

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
		}, 10000);
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
				if (data.message !== "Card created successfully") {
					// Close modal
					const cardReaderModal = document.getElementById("card-reader-modal");
					cardReaderModal.style.display = "none";
					// reset both forms
					addCardForm.reset();
					cardReaderForm.reset();

					const info = document.getElementById("add-card-info");
					info.style.display = "block";
					info.innerHTML = data.message;
					info.style.color = "red";
					setTimeout(() => {
						info.style.display = "none";
					}, 3000);

					return;
				}
				// Close modal
				const cardReaderModal = document.getElementById("card-reader-modal");
				cardReaderModal.style.display = "none";
				// reset both forms
				addCardForm.reset();
				cardReaderForm.reset();

				// add info for 3 seconds
				const info = document.getElementById("add-card-info");
				info.style.display = "block";
				info.innerHTML = "Card successfully added";
				info.style.color = "green";
				setTimeout(() => {
					info.style.display = "none";
				}, 3000);

				// Fetch and render updated cards
				fetchCards(token);
			})
			.catch((error) => {
				console.error("Error adding new card:", error);
				// add info for 3 seconds
				const info = document.getElementById("add-card-info");
				info.style.display = "block";
				info.innerHTML = error.message;
				info.style.color = "red";
				setTimeout(() => {
					info.style.display = "none";
				}, 3000);
			});
	});

	// Close card reader modal when close button is clicked
	const cardReaderCloseBtn = document.querySelector("#card-reader-modal .close");
	cardReaderCloseBtn.addEventListener("click", function () {
		const cardReaderModal = document.getElementById("card-reader-modal");
		cardReaderModal.style.display = "none";
	});

	// Add event listener for clicking download entries button
	const downloadEntriesBtn = document.getElementById("download-entries-btn");
	downloadEntriesBtn.addEventListener("click", function () {
		downloadEntries();
	});

	function downloadEntries() {
		// Fetch all entries
		fetch("https://project-webapp.onrender.com/entries-log", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				// Convert entries to a downloadable format (e.g., CSV)
				const csvContent = convertEntriesToCSV(data.data.allEntries);

				// Create a Blob object containing the CSV data
				const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

				// Create a temporary anchor element to trigger the download
				const downloadLink = document.createElement("a");
				downloadLink.href = window.URL.createObjectURL(blob);
				downloadLink.download = "entries.csv";
				document.body.appendChild(downloadLink);

				// Trigger the download
				downloadLink.click();

				// Cleanup
				document.body.removeChild(downloadLink);
			})
			.catch((error) => {
				console.error("Error fetching entries:", error);
			});
	}

	function convertEntriesToCSV(entries) {
		// Assuming entries is an array of objects with similar structure
		let csvContent = "Serial Number, Card Holder, Entry Time, Entry Status\n";
		entries.forEach((entry) => {
			csvContent += `${entry.card_serial_number},${entry.owner_name},${entry.entry_time},${entry.entry_status}\n`;
		});
		return csvContent;
	}
});
