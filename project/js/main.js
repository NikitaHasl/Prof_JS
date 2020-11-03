const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cartProducts: [],
        filtered:[],
        imgCatalog: 'https://placehold.it/200x150',
        imgCatalogCart: 'https://placehold.it/50x100',
        isVisibleCart: false,
        searchLine: '',



    },
    methods: {
        getJson(url){
            return fetch(url)
            .then(result => result.json())
            .catch(error => console.log(error));
        },
        addProduct(product){
            console.log(product.id_product);
        },
        FilterGoods(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }         
             })
        },
    },
    beforeCreate(){
        console.log('beforeCreate');
    },
    created(){
        console.log('created');
        this.getJson(`${API}${this.catalogUrl}`).then(data => {
            for(element of data){
                this.products.push(element);
                this.cartProducts.push(element);
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