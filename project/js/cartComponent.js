Vue.component('cart', {
    data() {
        return {
            cartProducts: [],
            imgCatalogCart: 'https://placehold.it/50x100',
            isVisibleCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = +product.id_product;
                        let find = this.cartProducts.find(product => product.id_product === productId);
                        if (find) {
                            find.quantity++;
                        } else {
                            let newProduct = {
                                id_product: productId,
                                price: +product.price,
                                product_name: product.product_name,
                                quantity: 1,
                            };
                            this.cartProducts.push(newProduct);
                        }
                    }
                })
                .catch(error => console.log(error))
        },
        removeProduct(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            let index = this.cartProducts.indexOf(product)
                            this.cartProducts.splice(index, 1);
                        }
                    }
                })
                .catch(error => console.log(error))
        },
    },
    template: `
                <div class='div-btn-cart'>
                    <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
                    <div class="cart-block" v-show="isVisibleCart">
                        <p v-if='!cartProducts.length'>Корзина пуста</p>
                        <cart-item class="cart-item" 
                        v-for='product of cartProducts' 
                        :key="product.id_product" 
                        :product='product' 
                        :imgCatalogCart='imgCatalogCart' 
                        @remove='removeProduct'>
                        </cart-item>
                    </div>
                </div>`

});
Vue.component('cart-item', {
    props: ['product', 'imgCatalogCart'],
    template: `<div class='cart-item'>
                <div class="product-bio">
                    <img :src="imgCatalogCart" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{product.product_name}}</p>
                        <p class="product-quantity">Количество: {{product.quantity}}</p>
                        <p class="product-single-price">{{product.price}} за ед.</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{product.price * product.quantity}}₽</p>
                    <button class="del-btn" @click="$emit('remove', product)">&times;</button>
                </div>
            </div>`
})