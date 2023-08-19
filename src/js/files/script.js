// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


// Функционал слайдера-слик (MW 3.2)
//$(document).ready(function () {
//	$('.comment__body').slick();
//})


// tabs ====================================================================================================//

const tabHeaders = document.querySelectorAll('[data-category]')
const tabContent = document.querySelectorAll('[data-tab-content]')

tabHeaders.forEach(function (i) {
	i.addEventListener('click', function () {
		const contentBox = document.querySelector('#' + this.dataset.tab)

		tabContent.forEach(function (i) {
			i.classList.add('_hidden')
		})

		contentBox.classList.remove('_hidden')
	})
})


// counter ====================================================================================================//

document.body.addEventListener('click', function (event) {

	if (event.target.dataset.action === 'plus') {

		const counterWrapper = event.target.closest('[data-counter-wrapper]')
		const counter = counterWrapper.querySelector('[data-current="counter"]')
		counter.innerText = ++counter.innerText
	}

	if (event.target.dataset.action === 'minus') {

		const counterWrapper = event.target.closest('[data-counter-wrapper]')
		const counter = counterWrapper.querySelector('[data-current="counter"]')

		if (parseInt(counter.innerText) > 1) {
			counter.innerText = --counter.innerText

		} else if (event.target.closest('.market-basket') && parseInt(counter.innerText) === 1) {
			event.target.closest('.card-market-basket').remove()
		}
	}

})

// Add goods in bascket ====================================================================================================//

const cartWrapper = document.querySelector('.market-basket__order')

window.addEventListener('click', function (event) {
	if (event.target.hasAttribute('data-cart')) {

		const card = event.target.closest('.popup-goods')

		const productInfo = {

			id: card.dataset.id,
			imgSrc: card.querySelector('.product-image').getAttribute('src'),
			title: card.querySelector('.popup-goods__title').innerText,
			weight: card.querySelector('.description-popup-goods__weight').innerText,
			price: card.querySelector('.order-popup-goods__bill').innerText,
			counter: card.querySelector('[data-current="counter"]').innerText,
		}

		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)

		if (itemInCart) {

			const counterElement = itemInCart.querySelector('[data-current="counter"]')
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter)

		} else {

			const cartItemHTML = `
			<div class="market-basket__card card-market-basket" data-id=${productInfo.id}>
			<div class="card-market-basket__image">
				<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
			</div>
			<div class="card-market-basket__definition definition-card">
				<div class="definition-card__name">${productInfo.title}</div>
				<div class="definition-card__weight">${productInfo.weight}</div>
				<div class="definition-card__price">${productInfo.price}</div>
			</div>
			<div class="card-market-basket__count order-popup-goods__count">
				<div class="order-popup-goods__count-box" data-counter-wrapper>
					<span data-action="minus">-</span>
					<span data-current="counter">${productInfo.counter}</span>
					<span data-action="plus">+</span>
				</div>
			</div>
		</div>`;

			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML)
		}

		card.querySelector('[data-current="counter"]').innerText = '1'


		const parentCard = event.target.closest('.popup')
		parentCard.classList.remove('popup_show')
		const doc = document.documentElement
		doc.classList.remove('popup-show')
		doc.classList.remove('lock')
	}
})

//  ====================================================================================================//
