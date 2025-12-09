import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let inputQuery;
const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loadMore = document.querySelector('.btn-fetch');

loadMore.addEventListener('click', async () => {
  let totalCheck;
  hideLoadMoreButton();
  showLoader();
  try { 
    const response = await getImagesByQuery(inputQuery, ++page);
    totalCheck = response.total;
    createGallery(response.images);
  }
  catch (error) { 
    console.error('Error fetching images:', error);
  }
  finally {
    hideLoader();
    console.log(totalCheck);
    if (totalCheck === undefined) {
      console.error("Error during extract total");
      return;
    }
    if (page * 15 < totalCheck) {
      showLoadMoreButton();
    }
    else {
      iziToast.info({
        title: 'We\'re sorry, but you\'ve reached the end of search results',
        position: 'topRight',
      });
    }
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  page = 1;
  if (input.value.trim() === '') {
    iziToast.error({
      title: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
    form.reset();
    return;
  }
  inputQuery = input.value;
  clearGallery();
  showLoader();
  try {
    const response = await getImagesByQuery(input.value, page);

    if (!response || response.images.length === 0) {
      iziToast.error({
        title: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    } else {
      createGallery(response.images);
      showLoadMoreButton();
    }

    const gallery = document.querySelector('.gallery');
    let elementHeight = gallery.firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
      top: elementHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
    form.reset();
  }
});
