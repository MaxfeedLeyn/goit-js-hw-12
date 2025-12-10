import SimpleLightbox from 'simplelightbox';

let gallery;

function createGallery(images) {
  let galleryContainer = document.querySelector('.gallery');

  if (galleryContainer === null) {
    const container = document.querySelector('.container');
    const htmlString = '<ul class="gallery"></ul>';

    container.insertAdjacentHTML('afterend', htmlString);
    galleryContainer = document.querySelector('.gallery');
  }

  const galleryImages = images
    .map(
      image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="gallery-info-item">Likes <span>${image.likes}</span></p>
                <p class="gallery-info-item">Views <span>${image.views}</span></p>
                <p class="gallery-info-item">Comments <span>${image.comments}</span></p>
                <p class="gallery-info-item">Downloads <span>${image.downloads}</span></p>
            </div>
        </li>`
    )
    .join('');

  if (gallery === undefined) {
    gallery = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }

  galleryContainer.insertAdjacentHTML('beforeend', galleryImages);
  gallery.refresh();
}

function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
}

function showLoader() {
  let loader = document.querySelector('.loader');
  if (loader === null) {
    const container = document.querySelector('.container');
    const htmlString = '<span class="loader visually-hidden"></span>';

    container.insertAdjacentHTML('beforeend', htmlString);
    loader = document.querySelector('.loader');
  }
  loader.classList.remove('visually-hidden');
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('visually-hidden');
}

function showLoadMoreButton() {
  let button = document.querySelector('.btn-fetch');
  if (button === null) {
    const container = document.querySelector('.container');
    const htmlString =
      '<button class="btn-fetch visually-hidden">Load More</button>';
    container.insertAdjacentHTML('beforeend', htmlString);
    button = document.querySelector('.btn-fetch');
  }
  button.classList.remove('visually-hidden');
}

function hideLoadMoreButton() {
  let fetchButton = document.querySelector('.btn-fetch');
  if (fetchButton === null) {
    const container = document.querySelector('.container');
    const htmlString =
      '<button class="btn-fetch">Load More</button>';
    container.insertAdjacentHTML('beforeend', htmlString);
    fetchButton = document.querySelector('.btn-fetch');
  }
  fetchButton.classList.add('visually-hidden');
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};
