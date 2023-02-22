<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-dark topbar static-top shadow">
      <div class="container">
          <router-link class="btn btn-danger btn-circle" type="button" to="/home"><i class="fa fa-home"></i></router-link>
          <p class="text-center" style="color: white"><small>{{ usuario }} <br> {{ vendedor }}</small></p>
          <button class="btn btn-secondary btn-circle pull-right" type="button" @click="logOutApp"><i class="fa fa-sign-out"></i></button>
      </div>
    </nav>
    <p v-if="factor" class="topnav text-center" style="background-color: #333; color: white;">BCV: {{ factor | currency }}</p>
    </div>
</template>
<script>
  export default {
    name: 'HeadCom',
    data(){
        return{
            usuario : null,
            vendedor : null,
            factor : null,
        }
    },
    props: {
      ocultar_factor : null,
    },
    mounted(){
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        this.usuario = datoslocales.spx_use_p
        this.vendedor = datoslocales.spx_use_v
        if(this.ocultar_factor != "1"){
            this.factor = localStorage.getItem('spx_factorbcv')
        }
    },
  };
</script>