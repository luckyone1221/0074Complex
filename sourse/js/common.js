let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				// PLAY_START: "Start slideshow",
				// PLAY_STOP: "Pause slideshow",
				// FULL_SCREEN: "Full screen",
				// THUMBS: "Thumbnails",
				// DOWNLOAD: "Download",
				// SHARE: "Share",
				// ZOOM: "Zoom"
			},
			// beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },

		});

		// $(link).fancybox({
		// });

		$(".modal-close-js").click(function () {
			fancybox.close();
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	
	// JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }

	//luckyoneJs
	let sbBtn = document.querySelector(".sb-btn-js");

	let topNav = document.querySelector(".top-nav--js");
	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--header-h', `${topNav.offsetHeight}px`);

		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');

		//
		if (sbBtn) {
			document.documentElement.style.setProperty('--cat-btn-h', `${sbBtn.offsetHeight}px`);

			// let scrolledOverBtn = sbBtnWrap.getBoundingClientRect().top + sbBtnWrap.offsetHeight - topNav.offsetHeight < 0;
		}
	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	window.addEventListener('scroll', calcHeaderHeight, { passive: true });
	calcHeaderHeight();

	//
	$('.catalog-btn-js').click(function (){
		$('.catalog-dd--js').toggleClass('active');
	})
	document.addEventListener('click', function (){
		if (!event.target.closest('.catalog-dd--js') && !event.target.closest('.catalog-btn-js')){
			$('.catalog-dd--js').removeClass('active');
		}
	});
	//-
	$('.mob-tel-js').click(function (){
		$('.contacts-dd--js').toggleClass('active');
	});
	document.addEventListener('click', function (){
		if (!event.target.closest('.contacts-dd--js') && !event.target.closest('.mob-tel-js')){
			$('.contacts-dd--js').removeClass('active');
		}
	});

	window.addEventListener('resize', () => {
		if (window.matchMedia("(min-width: 992px)").matches){
			$('.contacts-dd--js, .catalog-dd--js').removeClass('active');
		}
	}, { passive: true });
	//-


	//
	$('.free-dd-head-js').click(function () {
		if (event.target.closest('.hint-js')) return
		$(this.parentElement).toggleClass('active');
		$(this.parentElement).find('.free-dd-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	//map
	//fix here put into pug afterwards
	window.setTimeout(function (){
		let yandexScript = document.createElement('script');
		yandexScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=ef0b1dde-1d01-4d5b-9636-c00e2adbee98');
		yandexScript.setAttribute('type', 'text/javascript');

		document.body.appendChild(yandexScript);
		//console.log(yandexScript);
		window.setTimeout(function (){
			ymaps.ready(function () {
				var myMap = new ymaps.Map('map', {
						center: [55.751574, 37.573856],
						zoom: 9,
						controls: {
							// geolocationControl: false,
							// searchControl: false,
							// trafficControl: false,
							// typeSelector: false,
							// fullscreenControl: false,
							// rulerControl: false,
						},
					}, {
						searchControlProvider: 'yandex#search'
					}),

					// // Создаём макет содержимого.
					// MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					// 	'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
					// ),

					myPlacemark = new ymaps.Placemark([55.751574, 37.573856], {
						hintContent: 'ООО Лаборатория Гемотест',
						balloonContent: 'г. Москва'
					}, {
						// Опции.
						// Необходимо указать данный тип макета.
						iconLayout: 'default#image',
						// Своё изображение иконки метки.
						iconImageHref: 'img/svg/green-mark.svg',
						// Размеры метки.
						iconImageSize: [28, 40],
						// Смещение левого верхнего угла иконки относительно
						// её "ножки" (точки привязки).
						//iconImageOffset: [-5, -38]
						iconImageOffset: [0, 0]
					});

				myMap.geoObjects
					.add(myPlacemark);

				myMap.behaviors.disable(['scrollZoom']);
			});
		}, 1000);

	}, 2000);
	//

	//footer
	$('.set-curr-year-js').each(function (){
		this.innerHTML = new Date().getFullYear();
	});
	//
	function makeDDGroup(ArrSelectors){
		for (let parentSelect of ArrSelectors){
			let parent = document.querySelector(parentSelect);
			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function (){
					let clickedHead = this;

					$(ChildHeads).each(function (){
						if (this === clickedHead){
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	}
	makeDDGroup([
		'.cat-sb--js',
	]);

	//
	$('.toggle-sb-js').click(function (){
		$('body').toggleClass('fixed2');
		$('.cat-sb--js').toggleClass('active');
	});

	//end luckyoneJs

	// modal window

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}