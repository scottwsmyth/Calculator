let buttonList = document.querySelectorAll("button");
let screen = document.querySelector(".container");

let startingState = true;
let previousValue = 0;
let hasDecimal = false;
let isNegative = false;
let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;

buttonList.forEach(button => {
	button.addEventListener("click", e => {
		checkWidth();

		if (
			startingState &&
			e.target.value != "ac" &&
			e.target.value != "percent" &&
			e.target.value != "porm" &&
			e.target.value != "divide" &&
			e.target.value != "multiply" &&
			e.target.value != "add" &&
			e.target.value != "minus" &&
			e.target.value != "equals"
		) {
			screen.textContent = e.target.value;
			startingState = false;
		} else if (e.target.value == "ac") {
			startingState = true;
			previousValue = 0;
			screen.textContent = "0";
			screen.style.fontSize = "50px";
		} else if (e.target.value == "porm") {
			plusOrMinus();
		} else if (e.target.value == "equals") {
			eval(screen.textContent);
		} else if (e.target.value == "add") {
			add();
		} else if (e.target.value == "minus") {
			subtract();
		} else if (e.target.value == "multiply") {
			multiply();
		} else if (e.target.value == "divide") {
			divide();
		} else if (e.target.value == "percent") {
			percent();
		} else if (e.target.value == "decimal") {
			addDecimal();
		} else {
			screen.textContent += e.target.value;
		}
	});
});

function eval(currValue) {
	if (isAdding) {
		screen.textContent = previousValue + parseFloat(currValue);
		isAdding = !isAdding;
	} else if (isSubtracting) {
		screen.textContent = previousValue - parseFloat(currValue);
		isSubtracting = !isSubtracting;
	} else if (isMultiplying) {
		screen.textContent = previousValue * parseFloat(currValue);
		isMultiplying = !isMultiplying;
	} else if (isDividing) {
		screen.textContent = previousValue / parseFloat(currValue);
		isDividing = !isDividing;
	}
	previousValue = 0;
	checkWidth();
}

function percent() {
	toPercent = parseFloat(screen.textContent) / 100;
	screen.textContent = toPercent;
}

function add() {
	previousValue = parseFloat(screen.textContent) + previousValue;
	screen.textContent = previousValue;
	startingState = true;
	isAdding = true;
	checkWidth();
}

function subtract() {
	previousValue = parseFloat(screen.textContent) - previousValue;
	screen.textContent = previousValue;
	startingState = true;
	isSubtracting = true;
	checkWidth();
}

function multiply() {
	if (previousValue == 0) {
		previousValue = parseFloat(screen.textContent);
		checkWidth();
	} else {
		previousValue = parseFloat(screen.textContent) * previousValue;
		checkWidth();
	}
	screen.textContent = previousValue;
	startingState = true;
	isMultiplying = true;
}

function divide() {
	if (previousValue == 0) {
		previousValue = parseFloat(screen.textContent);
		checkWidth();
	} else {
		previousValue = parseFloat(screen.textContent) / previousValue;
		checkWidth();
	}
	screen.textContent = previousValue;
	startingState = true;
	isDividing = true;
}

function plusOrMinus() {
	if (screen.textContent != "0") {
		isNegative = !isNegative;
		if (isNegative) {
			screen.textContent = "-" + screen.textContent;
			checkWidth();
		} else {
			let newString = screen.textContent.replace(/-/g, "");
			screen.textContent = newString;
			checkWidth();
		}
	}
}

function addDecimal() {
	if (!hasDecimal) {
		screen.textContent = screen.textContent + ".";
		checkWidth();
		hasDecimal = !hasDecimal;
	}
}

function checkWidth() {
	console.log(screen.scrollWidth);

	let i = 50;

	if (screen.scrollWidth < 240) {
		screen.style.fontSize = "50px";
	}

	while (screen.scrollWidth > 240) {
		screen.style.fontSize = i + "px";
		i--;
	}
}
