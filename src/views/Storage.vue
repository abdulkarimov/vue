<template>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div class="home">
 <h1  class="display-5 mb-4">Productions</h1>

<table class="table ">
<thead>

    <tr>
      <th scope="col">#</th>
      <th scope="col">image</th>
      <th scope="col">name</th>
      <th scope="col">price</th>
      <th scope="col">count</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
<tbody>

     <tr  v-for="(product, index) in products" :key="product.id" >
      <th scope="row">{{product.id}}</th>
             <td  >
            <img style= 'height: 90px' :src="'http://127.0.0.1:8000/api/getImage/' + product.image"  >
            </td>
             <td>{{product.name}}</td>
             <td>{{product.price}}</td>
              <td >
                <button class = "buttonSymbol minus" v-on:click="this.updateCountProduct(product.id, '-' , product.count , product.name, index)">
                -
                </button>
              {{product.count}}
              <button class = "buttonSymbol plus " v-on:click="this.updateCountProduct(product.id, '+' , product.count , product.name,index)">
                +
             </button></td>
              <td>
              <svg
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <a :href="`/Store/${product.id}`">
             <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </a></svg>
               </td>
               <td>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                 <a :href="`/ProductDelete/${product.id}`">
                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                 <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </a>
               </svg>
               </td>


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
       updateCountProduct(id,symbol,count,name, index) {


            console.log(this.products[index].count);
            if(count >= 0){

                if(count <= 5){
                    axios.post('http://127.0.0.1:7000/api/notifications/',{
                        "notification":{
                            "params":{"name":name},
                            "sendMethodID_id": 2,
                            "templateID_id": 6
                            }
                    })}
                    axios.post('http://127.0.0.1:8000/api/updateCount/'+ id , {Product:{count: 1,operation: symbol}})
                    .then(response => {this.redirectTo("/")})

            }
       }
       , redirectTo(url){
           window.location=url
         }
    },
    mounted() {
    axios.get('http://127.0.0.1:8000/api/storage/')
      .then(response => (this.products = response.data.Product));
  }
}
</script>

<style>
.buttonSymbol{
    border-width: 1px;
}

.minus{
background: white;
    color: white;
    border-color: white;
    background: red;
}

.plus{
background: white;
    color: white;
    border-color: white;
    background: green;
}

*{font-size:9px}
</style>