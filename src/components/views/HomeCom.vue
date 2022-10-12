<template>
<div class="container">
    <head-com/>
    <div class="card o-hidden border-0 shadow-lg ">
        <div class="card-body p-0">
            <div class="row">
                <div class="col-lg-12">
                    <div class="p-3">
                        <form class="user">
                            <div class="accordion" id="accordionExample">
                                <router-link type="button" to="/clientes" class="btn btn-success btn-user btn-block">
                                    <i class="fa fa-users"></i> &nbsp;MIS CLIENTES
                                </router-link>
                                <p></p>
                                <router-link type="button" to="/productos" class="btn btn-danger btn-user btn-block" aria-expanded="false">
                                    <i class="fa fa-boxes"></i> &nbsp;LISTA DE PRECIOS
                                </router-link>
                                <p></p>
                                <router-link type="button" to="/pedidostransito" class="btn btn-dark btn-user btn-block" aria-expanded="false">
                                    <i class="fa fa-shopping-cart"></i> &nbsp;MIS PEDIDOS
                                </router-link>
                                <div id="collapseUno" class="collapse" data-parent="#accordionExample">
                                </div>
                            </div>
                        </form>
                        <hr>
                        <div class="text-center">
                            <p class="text text-primary small">ninsistemas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>      
</template>

<script>
import HeadCom from '../layouts/HeadCom'
export default {
  name: "HomeCom",
  data(){
    return{

    }
  },
  components:{
    HeadCom
  },
  mounted(){
    this.checkUser()
  }
}
</script>