let high_quality_request = false;

chrome.storage.local.get(["quality"]).then((result) => {
	high_quality_request = result["quality"] || false;
	console.log({ variable: high_quality_request, storage: result["quality"] });

	const container = document.querySelector("#thumbnail-container");
	if (container) {
		const main_container = container.querySelector("div.thumbs");
		main_container.classList.add("content-container");

		main_container.removeAttribute("style");

		const image_containers = main_container.querySelectorAll(
			"div.thumb-container"
		);

		for (let index = 0; index < image_containers.length; index++) {
			const element = image_containers[index];

			element.classList.remove("thumb-container");

			element.classList.add("content-container-parent");

			const a_ref = element.querySelector("a");
			const image = a_ref.querySelector("img");

			image.setAttribute("loading", "lazy");

			image.setAttribute("width", "100%");
			image.removeAttribute("height");

			const origin = image.getAttribute("data-src");
			if (high_quality_request) {
				let newUrl = origin
					.replace("https://t", "https://i")
					.replace("t.jpg", ".jpg")
					.replace("t.png", ".png");
				image.setAttribute("data-src", newUrl);
				image.setAttribute("src", newUrl);
				image.addEventListener("error", () => {
					image.setAttribute("src", newUrl);
				});
			} else {
				image.addEventListener("error", () => {
					image.setAttribute("src", origin);
				});
			}
		}
	}
});
