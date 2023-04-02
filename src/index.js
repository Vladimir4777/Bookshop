import './index.scss';
import './index.html'

import {sliderOn} from "./modules/slider"
import { booksLoad, fetchLoad, loadMore } from "./modules/booksLoader";
import { deleteBooks } from "./modules/localStor";
sliderOn();



const buttonHolder = document.querySelector('.books__content__card-wrap'); 
let newButtonElem = null; 
const pasteBooks = document.querySelector('.books__content__card');
const categoriesList = document.querySelector('.books__content__categories__list');
let clickedCategory = '';
let activeCategory = null;
let startIndex = 0;
const cart = {};

 function children(element){
  const collection = element.children;

  for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove('active__link')
  }
}


categoriesList.addEventListener('click', (e) => {
 
  
  if (e.target.classList.contains('books__content__categories__list__item')) {
    deleteBooks(pasteBooks)
    children(categoriesList)
    
    if (newButtonElem) {
      newButtonElem.remove(); 
    }

    clickedCategory = e.target.textContent;
    activeCategory = e.target;
    activeCategory.classList.add('active__link');

    newButtonElem = document.createElement('button');
    newButtonElem.innerHTML = "load more";
    newButtonElem.classList.add('books__btn-load')
    buttonHolder.appendChild(newButtonElem);

    fetchLoad(clickedCategory, startIndex)
    .then(bookItems => booksLoad(pasteBooks, bookItems, cart))
    .catch(error => console.log(error));

    loadMore(newButtonElem, clickedCategory, startIndex, pasteBooks, cart);
  }
})

categoriesList.firstElementChild.click();