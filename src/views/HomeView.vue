<template>
  <hello-world />
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'HomeView',

    components: {
      HelloWorld,
    },

    created() {
      this.axios.get('http://larashop-api.test/buku/Laravel Vue')
      .then((response) => { console.log(response)})
      .catch((error) => {
        console.log(error);
      })
    },
    mounted(){
      console.log(process.env)
    }
  }
</script>
