const input = createElement({tag: "input", parent: document.body, classes: ["query"]});
const container = createElement({parent: document.body, classes: ["container"]});
var controller = new AbortController();
var sgnl = controller.signal;
let executed = false;
const arr = [];

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

function debounce(fn, delay) {
	if(executed){
		clearTimeout(timer);
		executed = false;		
	}
	//controller.abort();
	executed = true;
	timer = setTimeout(() => {		
		fn();
		executed = false;
	}, delay);	
}

function mapCountryResponse(raw) {
	container.textContent = "";
	raw.forEach((el) => {
		const card = createElement({parent: container, classes: ["card"]});
		const wrapper = createElement({parent: card, classes: ["wrapper"]});
		createElement({parent: wrapper, classes: ["flag"]}).style.backgroundImage = `url(${el.flags.png})`;
		createElement({text: el.name, parent: wrapper, classes: ["name"]});		
		const capital = createElement({parent: card, classes: ["line"]});
		createElement({tag: "p", text: "Capital", parent: capital, classes: ["feature"]});
		createElement({tag: "p", text: el.capital, parent: capital, classes: ["value"]});
		const region = createElement({parent: card, classes: ["line"]});
		createElement({tag: "p", text: "Region", parent: region, classes: ["feature"]});		
		createElement({tag: "p", text: el.region, parent: region, classes: ["value"]});
		const population = createElement({parent: card, classes: ["line"]});
		createElement({tag: "p", text: "Population", parent: population, classes: ["feature"]});
		createElement({tag: "p", text: el.population, parent: population, classes: ["value"]});
		//createElement({tag: "p", text: el.languages.toString(), parent: card});
		const langs = el.languages.map((elem) => elem.name);
		createElement({tag: "p", text: langs.toString(), parent: card});		
	});
}

input.oninput = function(e) {
	if(!e.target.value)
		container.textContent = "";	
	arr.push(e.target.value);
	debounce(async () => {		
		console.log(arr);
		if(!arr[arr.length-1])
			return;
		const data = await searchCountries(arr[arr.length-1], sgnl);		
		mapCountryResponse(data);
		arr.length = 0;
	}, 2000);
};