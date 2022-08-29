import { galleryItems } from './gallery-items.js';
// Change code below this line

const createGalleryItems = array => {
	return array.reduce((acc, { preview, original, description }) => {
			return acc += `
				<div class="gallery__item">
				  <a class="gallery__link" href="large-image.jpg">
				    <img
				      class="gallery__image"
				      src="${preview}"
				      data-source="${original}" 
				      alt="${description}"
				    />
				  </a>
				</div>`
		}, '');
}

const galleryRef = document.querySelector('.gallery');
galleryRef.insertAdjacentHTML('beforeend', createGalleryItems(galleryItems));


galleryRef.addEventListener('click', openOriginalGalleryImage);

function openOriginalGalleryImage(evt) {
	evt.preventDefault();

	if (evt.target.nodeName !== 'IMG') {
		return;
	}

	const instance = basicLightbox.create(`
        <img src="${evt.target.dataset.source}" width="800" height="600">`,
		{
			onClose: instance => document.removeEventListener('keydown', onEscClick),
		}
	);

	instance.show();

	document.addEventListener('keydown', onEscClick);

	function onEscClick(evt) {
		if (evt.code === 'Escape') {
			instance.close();
		}
	}
}