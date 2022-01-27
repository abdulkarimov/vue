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
        delette(name){
                 axios.delete('https://a3d2-92-47-56-42.ngrok.io/api/storage/' + this.product.id)
                 axios.post('https://5b25-92-47-56-42.ngrok.io/api/notifications/',{
                        "notification":{
                            "params":{"name":name},
                            "sendMethodID_id": 2,
                            "templateID_id": 4,
                            }
                    }).then(response => {this.redirectTo("/")})



       },



    },
 mounted() {
      axios.get('https://a3d2-92-47-56-42.ngrok.io/api/getProductByID/'+this.$route.params.id)
      .then(response => (this.product = response.data[0]));
  },

}
</script>