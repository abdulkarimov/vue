<template>
       <div>
                 <input name="myFile" type="file">

       <div>
                <label for="name">Name:</label>
                <input v-model="product.name" type="text" id="name" name="productName" />
      </div>

       <div>
                <label for="price">Price:</label>
                <input  v-model="product.price" type="text" id="price" name="productPrice" />
       </div>

       <div>
                <label for="count">Count:</label>
                <input  v-model="product.count" type="text" id="count" name="productCount" />
      </div>

        <div>
                <label for="categoryID">CategoryID:</label>
                <select v-model = "product.category">
                          <option :selected="category.id === product.category"  v-for="(category) in categories" :key="category.id"  :value="category.id" > {{ category.name  }} </option>
                </select>
       </div>
       <div>
           <form>
                <button v-on:click="this.saveEditions(product.name, product.price, product.count,product.category)">SAVE</button>
            </form>
       </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
 data: function () {
  return {
       product: {},
    categories: {},
    productID: this.$route.params.id,
  }
},
    methods : {
    getProduct(id){
        axios.get('http://127.0.0.1:8000/api/getProductByID/'+this.$route.params.id)
      .then(response => (this.product = response.data[0]));
    },
     saveEditions(newName,newPrice,newCount,newCategory) {
     axios.put('http://127.0.0.1:8000/api/storage/' + this.$route.params.id,{
          Product:{
               name: newName,
               price: newPrice,
               count: newCount,
               category_id:newCategory
           }} )
    }

    },
    mounted () {
           this.getProduct(this.productID)

           axios.get('http://127.0.0.1:8000/api/category/')
           .then(response => (this.categories = response.data.category));

  },

}
</script>