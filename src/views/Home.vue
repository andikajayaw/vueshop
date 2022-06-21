<template>
    <div>
        <!-- template categries -->
        <v-container class="ma-0 pa-0" grid-list-sm>
            <div class="text-right">
                <v-btn small text to="/categories" class="blue--text">
                All Categories <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div> 
            <div class="text-center" v-if="loading" pt-10>
                <v-progress-circular
                indeterminate
                color="primary"
                ></v-progress-circular>
            </div>
            <v-layout wrap v-else>
                <v-flex v-for="(category) in categories" :key="`category-`+category.id" xs6>
                <v-card :to="'/category/'+ category.slug">
                    <v-img 
                    :src="getImage(category.image)"
                    class="white--text"
                    >
                    <v-card-title 
                        class="fill-height align-end"
                        v-text="category.name"
                    ></v-card-title>
                    </v-img>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- Template Books -->
        <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
            <div class="text-right">
                <v-btn small text to="/books" class="blue--text">
                All Books <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div> 
            <v-layout wrap>
                <v-flex v-for="(book) in books" :key="`book-`+book.id" xs6>
                <v-card :to="'/book/'+ book.slug">
                    <v-img
                    :src="getImage(book.cover)"
                    class="white--text"
                    >
                    <v-card-title 
                        class="fill-height align-end"
                        v-text="book.title"
                    ></v-card-title>
                    </v-img>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

    <!-- Temp -->
</template>

<script>
export default {
    name: 'HomeComponent',
    data: () => ({
        categories: [],
        books: [
        ],
        loading: false
    }),
    methods: {
        async getDataCategories() {
            this.loading = true;
            const res = await this.axios.get('categories/random/3');
            this.loading = false;
            const { data } = await res.data;
            // console.log(data);
            this.categories = data;
        },
        async getDataBooks() {
            this.loading = true;
            const res = await this.axios.get('books/top/3');
            this.loading = false;
            const { data } = await res.data;
            // console.log(data);
            this.books = data;
        },
    },
    mounted() {
        this.getDataCategories();
        this.getDataBooks();
    }
}
</script>

<style>

</style>