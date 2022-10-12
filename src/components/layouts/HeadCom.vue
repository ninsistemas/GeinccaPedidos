<template>
    <nav class="navbar navbar-expand navbar-light bg-dark topbar mb-4 static-top shadow">
      <div class="container">
          <router-link class="btn btn-danger btn-circle" type="button" to="/home"><i class="fa fa-home"></i></router-link>
          <p  style="color: white"><small>{{ usuario }}</small></p>
          <button class="btn btn-secondary btn-circle pull-right" type="button" @click="logOutApp"><i class="fa fa-sign-out"></i></button>
      </div>
    </nav>
</template>
<script>
  export default {
    name: 'HeadCom',
    data(){
        return{
            usuario : null,
        }
    },
    mounted(){
        this.usuario = localStorage.getItem('spx_use_p')+' - ' +localStorage.getItem('spx_use_v')
    },
  };
</script>