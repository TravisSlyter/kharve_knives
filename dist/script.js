const TypeWriter = function(txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
	//Current index of word
	const current = this.wordIndex % this.words.length;
	//Get full text of current word
	const fullTxt = this.words[current];

	// Check if Deleting
	if (this.isDeleting) {
		// Remove character
				this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		// Add character
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	//Insert txt into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	// Initial Type Speed
	let typeSpeed = 150;

	if(this.isDeleting) {
		typeSpeed /= 2; 
	}

	// If word is complete
	if(!this.isDeleting && this.txt === fullTxt) {
		// make pause at end
		typeSpeed = this.wait;
		//set delete to true
		this.isDeleting = true;
	} else if(this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		// move to next word
		this.wordIndex++;
		// pause before start typing
		typeSpeed = 500;
	}

	setTimeout(() => this.type(), typeSpeed)
}

//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init app
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

// Menu
function openNav() {
	document.getElementById("sideNav").style.width = "25%";
	document.getElementById("menuBtn").style.visibility = "hidden";
}

function closeNav() {
	document.getElementById("sideNav").style.width = "0";
	document.getElementById("menuBtn").style.visibility = "visible";
}



