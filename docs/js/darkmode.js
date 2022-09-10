// cSpell:ignore lioshi, googlecode

$(function(){
	// Stylesheets used by highlight.js
	const hljs_dark = '\n<link rel="stylesheet" href="css/hljs_lioshi.min.css">';
	const hljs_light = '\n<link rel="stylesheet" href="css/hljs_googlecode.min.css">';

	function updateHLjsStyle(theme, deleteLast = true) { 
		var head = document.getElementsByTagName('head')[0].innerHTML;
		var withThis = ""
		if (deleteLast) {
			// Delete last stylesheet
			//console.log("Delete previous stylesheet")
			// We can add and remove the stylesheet assuming it is the last one
			// However this may not be true. For example DarkReader injects its
			// own elements into the <head>
			//head = head.replace(/\n.*$/, '') 
			if (theme == "dark") {
				withThis += hljs_light
			}
			else {
				withThis += hljs_dark
			}
			head = head.replace(withThis, '') 
		}
		// Add new stylesheet
		if (theme == "dark") {
			head += hljs_dark
		}
		else {
			head += hljs_light
		}
		document.getElementsByTagName('head')[0].innerHTML = head;		  
	}

	// Get initial stylesheet
	//const btn = document.querySelector("checkbox");
	const btn = document.getElementById("mode_checkbox");
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	
	const currentTheme = localStorage.getItem("theme");
	if (currentTheme == "dark") {
		document.documentElement.className = "dark-theme";
	} else if (currentTheme == "light") {
		document.documentElement.className = "light-theme";
	}
	else {
		// default
		if (prefersDarkScheme.matches)
			document.documentElement.className = "dark-theme";  
		else
		  document.documentElement.className = "light-theme";  
	}
	//console.log("Initial class:" + document.documentElement.className)
	var theme = (document.documentElement.className == "light-theme") ? "light" : "dark";
	updateHLjsStyle(theme, false)
	
	// Toggle stylesheet
	btn.addEventListener("click", function () {
		//console.log("Current class: " + document.documentElement.className)
		// Toggle
		var theme = (document.documentElement.className == "light-theme")
				? "dark"
				: "light";
		// Set new class
		if (theme == "light")
			document.documentElement.className = "light-theme";
		else
			document.documentElement.className = "dark-theme";

		updateHLjsStyle(theme)

	  // Store mode
		//console.log("Save new mode:" + theme)
		localStorage.setItem("theme", theme);
	});
		
});