Vue.component('serch', {
    data() {
        return {
            serchLine: '',
            filtered: [],
        }
    },
    methods: {
        FilterGoods() {
            const regexp = new RegExp(this.serchLine, 'i');
            this.filtered = this.$root.$refs.products.products.filter(product => regexp.test(product.product_name));
        },
    },
    template: `
            <div class="search-form">
                    <form action="#" @submit.prevent='FilterGoods()'>
                    <input type="text" class="search-field" v-model='serchLine'>
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            </div>
    `
})