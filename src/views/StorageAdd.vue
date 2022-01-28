<template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

       <div>
                 <label v-if="!product.id"  for="productfile">Upload file:</label>
                 <input v-if="!product.id" type="file" ref="file" id="productfile" name="productfile"  @change="previewImage">
                 <div class="image-preview" v-if="imageData.length > 0">
                    <img style= 'height: 90px' :src="imageData" class="rounded mx-auto d-block" alt="...">
                 </div>
                 <div class="image-preview" v-if=" product.id > 0 " >
                    <img style= 'height: 90px' class="preview" :src="'http://127.0.0.1:8000/api/getImage/' + product.image" >
                 </div>

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
                <button v-on:click="this.saveEditions(product.image, product.name, product.price, product.count,product.category)">SAVE</button>
       </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
 data: function () {
  return {
    imageData: "" ,
    product: {},
    categories: {},
    productID: this.$route.params.id,
  }
},
    methods : {
    redirectTo(url){
           window.location=url
         },

     previewImage: function(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            },

    getProduct(id){
        axios.get('http://127.0.0.1:8000/api/getProductByID/'+this.$route.params.id).then(response => (this.product = response.data[0]));
    },
        saveEditions(image,newName,newPrice,newCount,newCategory) {
          if(this.$route.params.id){
                     axios.put('http://127.0.0.1:8000/api/storage/' + this.$route.params.id,{
                          Product:{
                               image: image,
                               name: newName,
                               price: newPrice,
                               count: newCount,
                               category_id:newCategory
                           }}).then(response => {this.redirectTo("/")} )

                           }

         else {
                const formData = new FormData();
                formData.append('file', this.$refs.file.files[0]);
                const headers = { 'Content-Type': 'multipart/form-data' };

                axios.post('http://127.0.0.1:8000/api/getFile/',formData,{ headers } ).then(response => {console.log(response)
                axios.post('http://127.0.0.1:8000/api/storage/',{
                                Product:{
                                       image: response.data.photo,
                                       name: newName,
                                       price: newPrice,
                                       count: newCount,
                                       category_id:newCategory
                                       }}).then(response => {this.redirectTo("/")} ) })


}
}
},
           mounted () {
           this.getProduct(this.productID)
           axios.get('http://127.0.0.1:8000/api/category/').then(response => (this.categories = response.data.category));

           },

}
</script>