<template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

        <div>
                <h1>Удалить предмет?</h1>
                <h1>{{this.product.name}}</h1>

                <button v-on:click="this.delette(this.product.name)" type="button" class="btn btn-danger">YES</button>
                <button  @click="redirectTo('/')"  type="button" class="btn btn-primary">NO</button>

        </div>
</template>

<script>
import axios from 'axios';
export default {
 data: function () {
  return {
   product: {},
}
},
    methods : {
       redirectTo(url){
           window.location=url
         },
        delette(name){
                 axios.delete('http://127.0.0.1:8000/api/storage/' + this.product.id)
                 axios.post('http://127.0.0.1:7000/api/notifications/',{
                        "notification":{
                            "params":{"name":name},
                            "sendMethodID_id": 2,
                            "templateID_id": 5,
                            }
                    }).then(response => {this.redirectTo("/")})
       },
    },
 mounted() {
      axios.get('http://127.0.0.1:8000/api/getProductByID/'+this.$route.params.id)
      .then(response => (this.product = response.data[0]));
  },

}
</script>