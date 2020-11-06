Vue.component('serch', {
    data() {
        return {
            serchLine: '',
        }
    },
    template: `
            <div class="search-form">
                    <form action="#" @submit.prevent='$parent.$refs.products.FilterGoods(serchLine)'>
                    <input type="text" class="search-field" v-model='serchLine'>
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            </div>
    `
})