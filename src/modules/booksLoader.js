import { getLocal } from "./localStor";
import { handlerBtnClicked } from "./localStor";


 function getRating(averageRating) {
  const roundedRating = Math.round(averageRating);
  const maxRating = 5;
  let starRating = '';
  
  for (let i = 0; i < maxRating; i++) {
    if (i < roundedRating) {
      starRating += '★'; 
    } else {
      starRating += '☆'; 
    }
  }
  
  return starRating;
}

export function booksLoad (place, data, cart){
  const dataFromLocal = getLocal();


    data.forEach(item => {
        const booksCard = document.createElement('div');
        booksCard.classList.add('books__content__card-wrapper');
        const starRating = getRating(item.volumeInfo.averageRating);
        if(dataFromLocal) {
        booksCard.innerHTML = `
          <div class="books__content__card__image"><img src="${item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "/img/img-nofon.jpg"}"></div>
          <div class="books__content__card__description">
            <div class="books__content__card__description__authors">${item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : ''}</div>
            <div class="books__content__card__description__title"><h3>${item.volumeInfo.title}</h3></div>
            <div class="books__content__card__description__rating">${(item.volumeInfo.averageRating) ? starRating : '' }<span style="color: black"> ${(item.volumeInfo.ratingsCount) ? item.volumeInfo.ratingsCount + ' review': ''}</span></div>
            <div class="books__content__card__description__text">${item.volumeInfo.description ? item.volumeInfo.description.slice(0, 100) + "..." : ""}</div>
            <div class="books__content__card__description__price"><strong>${item.saleInfo && item.saleInfo.listPrice ? item.saleInfo.listPrice.amount + " " + item.saleInfo.listPrice.currencyCode : ""}</strong></div>
            <div class="books__content__card__description__button">
            <button data-id =${item.id} class="books__content__card__description__button-cart${(dataFromLocal[item.id]) ? ' active__btn' : ''}">${(dataFromLocal[item.id]) ? 'in the cart' : 'Buy now'}</button></div>
          </div>
        `
      } else{
        booksCard.innerHTML = `
        <div class="books__content__card__image"><img src="${item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "/img/img-nofon.jpg"}"></div>
        <div class="books__content__card__description">
          <div class="books__content__card__description__authors">${item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : 'Authors not found'}</div>
          <div class="books__content__card__description__title"><h3>${item.volumeInfo.title}</h3></div>
          
          <div class="books__content__card__description__text">${item.volumeInfo.description ? item.volumeInfo.description.slice(0, 100) + "..." : "Description not found"}</div>
          <div class="books__content__card__description__price"><strong>${item.saleInfo && item.saleInfo.listPrice ? item.saleInfo.listPrice.amount + " " + item.saleInfo.listPrice.currencyCode : "Price not defined"}</strong></div>
          <div class="books__content__card__description__button"><button data-id =${item.id} class="books__content__card__description__button-cart">Buy now</button></div>
        </div>
        `
      }
        place.appendChild(booksCard)
    })
    
    handlerBtnClicked(place, cart);
}

export function fetchLoad(data, index){
  return fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${data}"&printType=books&startIndex=${index}&maxResults=6&langRestrict=en`)
  .then(respone => respone.json())
  .then(books => books.items);
};

export function loadMore(button, currentCategory, startIndex, place, cart)  {
  button.addEventListener('click', () => {
      startIndex += 6;
      fetchLoad(currentCategory, startIndex)
      .then(data => booksLoad (place, data, cart));
  })
}