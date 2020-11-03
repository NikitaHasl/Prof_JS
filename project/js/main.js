const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cartProducts: [],
        filtered: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCatalogCart: 'https://placehold.it/50x100',
        isVisibleCart: false,
        searchLine: '',



    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },

        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
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
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            let index = this.cartProducts.indexOf(product)
                            this.cartProducts.splice(index, 1);
                            console.log(this.cartProducts);
                        }
                    }
                })
                .catch(error => console.log(error))
        },
        FilterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));

            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        this.getJson(`${API}${this.catalogUrl}`).then(data => {
            for (element of data) {
                this.products.push(element);
            }
        })
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
});