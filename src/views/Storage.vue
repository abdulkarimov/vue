<template>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div class="home">

            <table class="table table-bordered mytbl" >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">image</th>
                  <th scope="col">name</th>
                  <th scope="col">price</th>
                  <th scope="col">count</th>
                  <th scope="col">edit</th>
                </tr>
              </thead>


<tbody>
    <tr  v-for="(product) in products" :key="product.id" >
      <th scope="row">{{product.id}}</th>
             <td>
            <img :src="'http://localhost:8000/api/getImage/' + product.image"  style="width:90%;">
            </td>
             <td>{{product.name}}</td>
             <td>{{product.price}}</td>
             <td>  <button v-on:click="this.updateCountProduct(product.id, '-' )">-1</button>
              {{product.count}}
              <button v-on:click="this.updateCountProduct(product.id, '+' )">+1</button></td>
              <td><a :href="`/Store/${product.id}`"> EDIT </a></td>

</tr>

 </tbody>

</table>

  </div>
  </body>
  </html>
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
        axios.post('http://127.0.0.1:8000/api/updateCount/'+ id , {
          Product:{
               count: 1,
               operation: symbol
           }} )

    }




    },
    mounted() {
    axios.get('http://127.0.0.1:8000/api/storage/')
      .then(response => (this.products = response.data.Product));
  }
}
</script>
  <style type="text/css">
.mytbl,
.mytbl tr th,
.mytbl tr td {
  border-style: solid;
  border-color: #000;
  border-spacing: 0;
  border-collapse: collapse;
  padding: 4px;
  border-width: 1px;
  font: 12px helvetica,arial,sans-serif;
}
.mytbl tr td {
width: 25%;
}
</style>
