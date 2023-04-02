
export function getLocal(){
    if (localStorage.getItem('shopCart') === null) {
        localStorage.setItem('shopCart', JSON.stringify({}));
    }
    const response = localStorage.getItem('shopCart')
    const data = JSON.parse(response);
    return data;
}  

 function counterAdd (indi) {
    const data = getLocal();
    let quantity = Object.keys(data).length;
    indi.innerHTML =  quantity + " ";
    indi.style.display = 'flex';
}

 function counterRemove (indi) {
    const data = getLocal();
    let quantity = Object.keys(data).length;
    indi.textContent = quantity;

    if (quantity === 0) {
        indi.textContent = '';
        indi.style.display = 'none';
    }
}

 function addCart(item, cart){
    const data = getLocal();
    if(data === null){
        cart[item] = true;
        localStorage.setItem('shopCart', JSON.stringify(cart));
    } else {
        data[item] = true;
        localStorage.setItem('shopCart', JSON.stringify(data));
    } 
} 

const indi = document.querySelector('.header__icon-shopbag--number');

let initialCounterData = getLocal();
let quantityInLocal = Object.keys(initialCounterData).length;

if (initialCounterData) {
  indi.innerHTML = quantityInLocal;
  indi.style.display = 'flex';
} 

if (quantityInLocal === 0) {
  indi.textContent = '';
  indi.style.display = 'none';
}

export function handlerBtnClicked(place, cart) {
  let counter = 0;
    
    function handlerClicked(e) {
      const data = getLocal();
      
      if(e.target.classList.contains('books__content__card__description__button-cart')) {
        const clickedButton = e.target;
        const clickedButtonId = clickedButton.getAttribute('data-id');

        if (data[clickedButtonId]) {
          deleteCart(clickedButtonId, cart);
          deleteLocal(clickedButtonId);
          clickedButton.textContent = "Buy now";
          clickedButton.classList.remove('active__btn');
          counter--
          counterRemove(indi)
          
        } else {
          addCart(clickedButtonId, cart);
          clickedButton.textContent = "in the cart";
          clickedButton.classList.add('active__btn');
          counter++
          counterAdd(indi)
        }
      }
    }
    if (place.onclick) {
      place.removeEventListener('click', place.onclick);
    }
  
    place.onclick = handlerClicked;
  }


 export function deleteBooks(place){
    place.innerHTML = '';
}

 function deleteCart(item, cart){
    delete cart[item];
}

 function deleteLocal(item){
    const dataFromLocal = getLocal();
    delete dataFromLocal[item];
    localStorage.setItem('shopCart', JSON.stringify(dataFromLocal));
}