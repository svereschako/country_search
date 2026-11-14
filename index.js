const input = createElement({tag: "input", parent: document.body, classes: ["query"]});
var controller = new AbortController();
var sgnl = controller.signal;
let executed = false;

function createElement(options) {
 // Default values
 const { tag = 'div', text = '', parent, classes = [] } = options;

 const element = document.createElement(tag);
 element.textContent = text;

 // Adding classes if provided
 if (classes.length > 0) {
  element.classList.add(...classes);
 }

 // Adding the element to the parent element if necessary
 if (parent != null) {
  parent.appendChild(element);
 }

 return element; // Returning the created element for further manipulations
}

async function searchCountries(query, signal) {
	const res = await fetch(`https://countries.dev/name/${query}`, {signal});
	const data = await res.json();
	console.log(data);
	return data;
}