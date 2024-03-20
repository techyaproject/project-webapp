document.addEventListener("DOMContentLoaded", function () {
	const sidebarItems = document.querySelectorAll(".sidebar-item");
	const sections = document.querySelectorAll(".section");

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
		});
	});
});
