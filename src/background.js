// Save default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === "install") {
		chrome.storage.local.set({ quality: false }).then(() => {
			console.log("Value is set");
		});
	}
});

function onStart() {
chrome.storage.local.get(["quality"]).then((result) => {
	high_quality_request = result["quality"] || false;
	setIcon(high_quality_request)
})}

onStart()

chrome.storage.onChanged.addListener((changes, namespace) => {
	let currentValue = changes["quality"]["newValue"];
	setIcon(currentValue);
});

function setIcon(currentValue) {
	if (currentValue) {
		chrome.action.setIcon({
			path: {
				16: "icons/16on.png",
				32: "icons/32on.png",
				48: "icons/48on.png",
			},
		});
	} else {
		chrome.action.setIcon({
			path: {
				16: "icons/16off.png",
				32: "icons/32off.png",
				48: "icons/48off.png",
			},
		});
	}
}

