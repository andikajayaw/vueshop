<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-text-field
                hide-details
                append-icon="mdi-microphone"
                flat
                label="Search"
                prepend-inner-icon="mdi-magnify"
                v-model="keyword"
                @input="doSearch"
            ></v-text-field>
        </v-toolbar>
        <v-card-text>
            <v-subheader v-if="keyword.length>0">Result search: "{{ keyword }}"</v-subheader>
            <v-alert
                :value="books.length==0&&keyword.length>0"
                color="warning"
            >
                Sorry, there is no result for this keyword.
            </v-alert>
            <v-container class="ma-0 pa-0" grid-list-sm>
                <v-layout wrap>
                    <v-flex v-for="book in  books" :key="`book-${book.id}`" xs6>
                        <book-item :book="book" />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
// import BookItem from './BookItem.vue'
export default {
    components: {
        BookItem: () => import('@/components/BookItem.vue')
    },
    name: 'search-comp',
    data: () => ({
        keyword: '',
        books: []
    }),
    methods: {
        doSearch() {
            let keyword = this.keyword
            if(keyword.length>0) {
                let url = `/books/search/${keyword}`
                this.axios.get(url).then((response) => {
                    let {data} = response.data
                    this.books = data
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                this.books = []
            }
        },
        close() {
            this.$emit('closed', false)
        }
    }
}
</script>

<style>

</style>