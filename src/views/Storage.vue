<template>
  <div class="home">
        <div v-for="(product) in products" :key="product.id" >
            <h5>image =  {{product.image}} </h5>
            <h5>name =  {{product.name}} </h5>
            <h5>price = <button>-</button>   {{product.price}}    </h5>
            <h5>count =  <button v-on:click="this.updateCountProduct(product.id, '-' )">-1</button>
               {{product.count}}  <button v-on:click="this.updateCountProduct(product.id, '+' )">+1</button>
               <a :href="`/StorageAdd/${product.id}`"> EDIT </a>
             </h5>

            <h5>category_id =  {{product.category}} </h5>
       </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
 data: function () {
  return {
    products: {}
  }
},
 methods : {
       updateCountProduct(id,symbol) {
              axios
      .post('http://127.0.0.1:8000/api/updateCount/'+ id , {

      Product:{
           count: 1,
           operation: symbol
       }} )
      .then(response => (this.categories = response.data.category));
    }
    },
    mounted() {
    axios
      .get('http://127.0.0.1:8000/api/storage/')
      .then(response => (this.products = response.data.Product));
  }
}
</script>
