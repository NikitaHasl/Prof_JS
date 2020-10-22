const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

// –--------------------------------
class ProductList {
  #goods;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this._allProducts = [];

    this.#getProducts();
    
    this._sumGoodsList();
  }
  _sumGoodsList(){
    let sum = 0;
    for(let product of this._allProducts){
      sum += product.price;
    }
    console.log(sum);
  }
  #getProducts(){
    return fetch(`${API}/catalogData.json`).then((response) => response.json()).then((data) => {
      this.#goods = [...data];
      this.#render();
    }).catch((error) => console.log(error))
  }
  // _fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //   });
  // }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

class CartList {
  constructor(){

  }
  _sumAllCartItem(){//Сумма всех товаров в корзине

  }
  _renderCart(){

  }
}

class CartItem {
  constructor(){

  }

}


const list = new ProductList();
