let checkbox = document.getElementById("high_quality");

chrome.storage.local.get(["quality"]).then((result) => {
    checkbox.checked = result["quality"]
	document.getElementById("debug").innerText = result["quality"];
});

checkbox.addEventListener("change", () => {
	chrome.storage.local.set({ quality: checkbox.checked || false }).then(() => {
		console.log("Value is set");
	});
});

chrome.storage.onChanged.addListener((changes, namespace) => {
	document.getElementById("debug").innerText = changes["quality"]["newValue"]
});