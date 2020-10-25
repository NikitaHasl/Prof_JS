const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
let prom = (url) =>{ 
return new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        reject(xhr.status);
      } else {
        resolve(xhr.responseText);
      }
    }
  };
  xhr.send();
})  
};

// –--------------------------------
class List {
  constructor(container, url, list = listContext){
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this._init();
  };
  getData(url){
    return prom(`${API + url}`)
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error))
  }
  fillData(data){
    this.goods = [...data];
    this.render();
  }
  calcSum(){
    return this.allProducts.reduce((sum, item) => sum+= item.price, 0)
  }
  render(){
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new this.list[this.constructor.name](product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }
  }
  _init(){
    return false
  }
};
class Item {
  constructor(el, img = 'https://placehold.it/200x150'){
    this.product_name = el.product_name;
      this.price = el.price;
      this.id_product = el.id_product;
      this.img = img;
  }
  getGoodHTML(){
    return ``
  }
};


class ProductList extends List{
  constructor(cart, container = '.products', url='/catalogData.json') {
    super(container, url);
    this.cart = cart;
    this.getData(url).then((data) => this.fillData(data));
  }
  _init(){
    document.querySelector(this.container).addEventListener('click', event => {
      if(event.target.classList.contains('buy-btn')){
        CartList.prototype.addProduct(event.target);
      }
    })
  }
  
}

class ProductItem extends Item{
  constructor(product) {
    super(product);
  }

  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
};

class CartList extends List{
  constructor(container = ".cart-block", url = "/getBasket.json"){
    super(container, url);
    this.getData(url).then((data) => this.fillData(data.contents));
  }
  addProduct(element){
    this.getData(`/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = cart.allProducts.find(product => product.id_product === productId);
          if(find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this.goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this.getGoodHTML();
          }
        } else {
          alert('Error');
        }
      })
  }
  removeProduct(element){
    this.getData(`/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }
  _updateCart(product){
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }
  _init(){
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('del-btn')){
        this.removeProduct(e.target);
      }
    })
  }
}
class CartItem extends Item{
  constructor(el, img = 'https://placehold.it/50x100'){
    super(el, img);
    this.quantity = el.quantity;
  }
  getGoodHTML(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}
const listContext = {
  ProductList: ProductItem,
  CartList: CartItem
};


let cart = new CartList();
let list = new ProductList(cart);
