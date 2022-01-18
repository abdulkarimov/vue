<template>
       <div>

                 <input name="myFile" type="file">

       <div>
                <label for="name">Name:</label>
                <input v-model="product.name" type="text" id="name" name="productName" />
      </div>

       <div>
                <label for="price">Price:</label>
                <input type="text" id="price" name="productPrice" />
       </div>

       <div>
                <label for="count">Count:</label>
                <input type="text" id="count" name="productCount" />
      </div>

        <div>
                <label for="categoryID">CategoryID:</label>
                <select>
                          <option  v-for="(category) in categories" :key="category.id"> {{ category.name }} </option>
                </select>
       </div>
       <div>
           <form>
                <button>SAVE</button>
            </form>
       </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
 data: function () {
  return {
    categories: {},
    productID: this.$route.params.id,
     product: {},
  }
},
    methods : {
       saveProduct() {
              axios
      .post('http://127.0.0.1:8000/api/product/')
      .then(response => (this.categories = response.data.category));
    },
    getProduct(id){
        axios.get
             .get('http://127.0.0.1:8000/api/getProductByID/' + id)
      .then(response => (this.product = response.data.Product));
    }
    },

    mounted () {
            if (this.productID) {
            this.getProduct(this.productID)
        }
        axios
      .get('http://127.0.0.1:8000/api/category/')
      .then(response => (this.categories = response.data.category));
  },



}
</script>