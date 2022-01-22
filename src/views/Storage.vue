<template>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div class="home">

<table class="table">


              <thead class="table-light">
                <tr >
                  <th scope="col">#</th>
                  <th scope="col">image</th>
                  <th scope="col">name</th>
                  <th scope="col">price</th>
                  <th  scope="col">count</th>
                  <th scope="col">edit</th>
                  <th scope="col">delete</th>
                </tr>
              </thead>

<tbody>


     <tr  v-for="(product) in products" :key="product.id" >
      <th scope="row">{{product.id}}</th>
             <td  >
            <img :src="'http://localhost:8000/api/getImage/' + product.image"  style="width:90%;">
            </td>
             <td>{{product.name}}</td>
             <td>{{product.price}}</td>
              <td colspan="4">
         <button v-on:click="this.updateCountProduct(product.id, '-' , product.count , product.name)">-1</button>
              {{product.count}}
              <button v-on:click="this.updateCountProduct(product.id, '+' , product.count , product.name)">+1</button></td>
              <td><a :href="`/Store/${product.id}`"> EDIT </a></td>
              <td><a :href="`/ProductDelete/${product.id}`"> DELETE </a></td>

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
       updateCountProduct(id,symbol,count,name) {
            if(count > 0){
                if(count < 5){
                    axios.post('http://127.0.0.1:7000/api/notifications/',{
                        "notification":{
                            "params":{"name":name},
                            "sendMethodID_id": 2,
                            "templateID_id": 1
                            }
                    })}
                    axios.post('http://127.0.0.1:8000/api/updateCount/'+ id , {Product:{count: 1,operation: symbol}})
            }
       }
    },
    mounted() {
    axios.get('http://127.0.0.1:8000/api/storage/')
      .then(response => (this.products = response.data.Product));
  }
}
</script>
