import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryWrap = document.querySelector('.gallery');

function createGallery() {
	const markup = galleryItems.map(item => `
		<div class="gallery__item">
	        <a class="gallery__link" href="${item.original}">
		    <img
		      class="gallery__image"
		      src="${item.preview}"
		      data-source="${item.original}"
		      alt="${item.description}"
		    />
	        </a>
		</div>
	`).join('');

	galleryWrap.insertAdjacentHTML('beforeend', markup);
}

createGallery();

galleryWrap.addEventListener('click', onImageClick);

function onImageClick(e) {
	e.preventDefault();

	if (e.target.nodeName !== 'IMG') {
		return;
	}

	const instance = basicLightbox.create(`
		<img src="${e.target.dataset.source}" width="800" height="600">
	`);

	instance.show();

	document.addEventListener('keydown', onEscKeyPress);

	function onEscKeyPress(e) {
		if (e.code === 'Escape') {
			instance.close();
		}
	}
}