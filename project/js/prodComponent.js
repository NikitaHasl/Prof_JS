Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',

        }
    },
    methods: {
        FilterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
    },
    created() {
        this.$parent.getJson(`${API}${this.catalogUrl}`).then(data => {
            for (element of data) {
                this.products.push(element);
                this.filtered.push(element);
            }
        })
    },
    template: `<div class="products">
                    <product v-for="product of filtered" :key="product.id_product" :product='product' :imgCatalog='imgCatalog'></product>
                </div>`
});

Vue.component('product', {
    props: ['imgCatalog', 'product'],
    data() {
        return {
            cart: this.$root.$refs.cart,
        }
    },
    template: `<div class="product-item">
                    <img :src="imgCatalog" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}}₽</p>
                        <button class="buy-btn" @click="cart.addProduct(product)">Купить</button>
                    </div>
                </div>`
});
Vue.component('error-component', {
    data() {
        return {
            successfulRequest: true,
        }
    },
    template: `<div v-show='!successfulRequest'>
                    <h1 class='error-text'>Ошибка, не удается выполнить запрос к серверу!</h1>
                </div>`
})