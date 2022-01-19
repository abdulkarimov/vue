<template>
  <div class="home">

          <table align="center" width="50%" cellspacing="0" border="1">
               <tr>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th >count</th>
               </tr>
         </table>


        <div align="center" width="50%" v-for="(product) in products" :key="product.id" >
            <td>{{product.image}}
             {{product.name}}
             {{product.price}}
               <button v-on:click="this.updateCountProduct(product.id, '-' )">-1</button>
               {{product.count}}
               <button v-on:click="this.updateCountProduct(product.id, '+' )">+1</button>
               <a :href="`/StorageAdd/${product.id}`"> EDIT </a>
             </td>
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

    }
    },
    mounted() {
    axios
      .get('http://127.0.0.1:8000/api/storage/')
      .then(response => (this.products = response.data.Product));
  }
}
</script>
