/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
/**
 * add fourth section by cloning
 */

const thirdSection = document.querySelector('#section3');
const fourthSection = document.querySelector('#section3').cloneNode(true);
// changing id attribute value
fourthSection.id = 'section4';
fourthSection.classList = 'landing__container sectionNavItem4';

// append fourth section in our page
thirdSection.before(fourthSection);

// changing data-nav attribute value

document.querySelector('#section3').setAttribute('data-nav', 'section 4');

// changing h2 value

const fourthSectionHead = document.getElementsByTagName('h2')[3];

fourthSectionHead.textContent = 'Section 4';

/**
 * Define Global Variables
 *
 */

const sectionsArray = Array.from(document.getElementsByTagName('section'));

let unorderList = document.getElementById('navbar__list');

let listLength = sectionsArray.length;
// to use media querry
let mediaQuery = window.matchMedia('(min-width: 35em)');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function createLitems() {
	sectionsArray.forEach((section) => {
		sectionLocation = section.getAttribute('id');
		sectionName = section.getAttribute('data-nav');
		lItem = document.createElement('li');
		lItem.innerHTML = `<a class='menu__link' link-location='${sectionLocation}'>${sectionName}</a>'`;
		lItem.style.cursor = 'pointer';
		// add attribte to use it in scrolling nav bar
		lItem.setAttribute('list-location', sectionLocation);
		unorderList.appendChild(lItem);
	});
}
createLitems();

// define variables contains li and a

const navList = document.querySelectorAll('li');
const menuLinks = document.querySelectorAll('.menu__link');

// using scrollIntoView to scroll to target section when click using scrollIntoView

menuLinks.forEach((link) => {
	link.addEventListener('click', () => {
		const element = document.getElementById(
			link.getAttribute('link-location')
		);
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	});
});

// Add class 'active' to section when near top of viewport

// check if section is in viewport

function sectionIsInViewport(element) {
	let sectionPosition = element.getBoundingClientRect();
	return sectionPosition.top <= 50 && sectionPosition.bottom >= 100;
}

// toggle active class

document.addEventListener('scroll', () => {
	sectionsArray.forEach((section) => {
		section.classList.remove('your-active-class');
		if (sectionIsInViewport(section)) {
			section.classList.add('your-active-class');
		} else {
			section.classList.remove('your-active-class');
		}
	});
	// check if active section on viewofport and link it with related navbar li
	let current = '';
	sectionsArray.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
			current = section.getAttribute('id');
		}
	});
	for (i = 0; i < navList.length; i++) {
		const currentList = document.getElementsByTagName('li')[i];

		currentList.classList.remove('active');

		if (currentList.getAttribute('list-location') == current) {
			currentList.classList.add('active');
		} else {
			currentList.classList.remove('active');
		}
	}
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// add Go to top button

let goToTopBtn = document.createElement('div');

goToTopBtn.innerHTML = `<button id="goTopBtn" title="Go to top">Top</button>`;

thirdSection.after(goToTopBtn);

const mybutton = document.getElementById('goTopBtn');

// show the button after user scroll down
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (
		document.body.scrollTop > 50 ||
		document.documentElement.scrollTop > 50
	) {
		mybutton.style.display = 'block';
		document.getElementById('page__header').style.top = '0';
	} else {
		mybutton.style.display = 'none';
		//using media querry
		function mediaQueryF(mediaQuery) {
			if (mediaQuery.matches) {
				// If media query matches
				document.getElementById('page__header').style.top =
					'-150px';
			} else {
				document.getElementById('page__header').style.top = '0';
			}
		}
		mediaQueryF(mediaQuery);
		mediaQuery.addListener(mediaQueryF);
	}
}

// scroll up to top when clocking on btn
goToTopBtn.addEventListener('click', function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});

// making function to appear and disappear nav menu in mobiles

const navBarMenu = document.querySelector('nav');

document
	.querySelector('#navBarIcon')
	.addEventListener('click', function () {
		navBarMenu.classList.toggle('open');
	});

// to disappear nav menu after user choose section from nav bar

function toCloseNav() {
	navList.forEach((li) => {
		li.addEventListener('click', () => {
			navBarMenu.classList.remove('open');
		});
	});
}
toCloseNav();
