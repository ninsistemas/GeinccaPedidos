<template>
    
<main>
    <head-com ocultar_factor="1"/>
    <p v-if="colorfond==0" class="text-center" style="background-color: red; color: white;">BCV: {{ factorbcv | currency }} - Act: {{ fecharepl }}</p>
    <p v-else class="text-center" style="background-color: black; color: white;">BCV: {{ factorbcv | currency }} - Act: {{ fecharepl }}</p>
    <div class="container">
    <div class="card o-hidden border-0 shadow-lg ">
        <div class="card-body p-0">
            <div class="row">
                <div class="col-lg-12">
                    <div class="p-3">
                        <!--form class="user"> @submit.prevent="actualizarDatos()"-->
                            <div class="accordion" id="accordionExample">
                                <router-link type="button" to="/clientes" class="btn btn-danger btn-user btn-block">
                                    <i class="fa fa-users"></i> &nbsp;MIS CLIENTES
                                </router-link>
                                <p></p>
                                <router-link type="button" to="/productos" class="btn btn-danger btn-user btn-block" aria-expanded="false">
                                    <i class="fa fa-boxes"></i> &nbsp;LISTA DE PRECIOS
                                </router-link>
                                <p></p>
                                <router-link type="button" to="/pedidostransito" class="btn btn-danger btn-user btn-block" aria-expanded="false">
                                    <i class="fa fa-shopping-cart"></i> &nbsp;MIS PEDIDOS
                                </router-link>
                                <p></p>
                                <router-link type="button" to="/misdatos" class="btn btn-danger btn-user btn-block" aria-expanded="false">
                                    <i class="fa fa-compass"></i> &nbsp;MIS DATOS 
                                </router-link>
                                <p></p>
                                <!-- button class="btn btn-dark btn-block btn-user text-sm" @click="actualizarProductos()" aria-expanded="false">
                                    <i class="fa fa-refresh"></i> &nbsp;ACTUALIZAR PRODUCTOS<br>{{ this.actuprod }}
                                </button>
                                <p></p>
                                <button class="btn btn-dark btn-block btn-user text-sm" @click="actualizarClientes()" aria-expanded="false">
                                    <i class="fa fa-refresh"></i> &nbsp;ACTUALIZAR CLIENTES<br>{{ this.actuclie }}
                                </button>
                                <p></p>
                                <button class="btn btn-dark btn-block btn-user text-sm" @click="actualizarPedidos()" aria-expanded="false">
                                    <i class="fa fa-refresh"></i> &nbsp;ACTUALIZAR PEDIDOS<br>{{ this.actupedi }}
                                </button -->
                                <div v-if="!sincroniza" class="d-grid gap-2">
                                    <button @click="sincronizarMisdato()" class="btn btn-dark btn-block" >SINCRONIZAR MIS DATOS</button>
                                </div>
                                <div v-if="sincroniza" class="d-grid gap-2">
                                    <button class="btn btn-primary btn-block" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        SINCRONIZANDO...
                                    </button>
                                </div>
                            </div>
                        <!-- /form -->
                        <p></p>
                        <div class="text-center col-auto">
                              <img class="img-fluid" style="width: 5rem;" 
                              :src="'img/logo.jpg'"  
                              alt="..." />   
                        </div>
                        <hr>
                        <p class="text-center text text-primary small">ninsistemas</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>      
</template>

<script>
import axios from 'axios'
import {Global} from '../../shared/Global'
import HeadCom from '../layouts/HeadCom'
export default {
  name: "HomeCom",
  data(){
    return{
        sincroniza : false,
        productos : [],
        clientes : [],
        pedidos : [],
        vendedor : null,
        datoslocales : null,
        actuprod : null,
        actuclie : null,
        actupedi : null,
        factorbcv : 0,
        fecharepl : null,
        colorfond : 0,
    }
  },
  components:{
    HeadCom
  },
  mounted(){
    this.checkUser();
    this.actuprod = localStorage.getItem('spx_updateprices');
    this.actuclie = localStorage.getItem('spx_updateclient');
    this.actupedi = localStorage.getItem('spx_updateorders');
    this.datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
    this.vendedor = this.datoslocales.spx_use_v;
    this.factorbcv = localStorage.getItem('spx_factorbcv');
    this.fecharepl = localStorage.getItem('spx_fechareplica');
    this.colorband();
  },
  methods: {
    sincronizarMisdato(){
        //console.log('sincronizando');
        this.sincroniza=true;
        this.actualizarProductos();
        this.actualizarClientes();
        this.actualizarPedidos();
        this.fechareplica();
    },
    actualizarProductos(){
        localStorage.removeItem('spx_updateprices');
        localStorage.removeItem('spx_priceslist');
        this.actuprod = null;
        axios.get(Global.url+'exproductos',this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.productos = res.data
                //console.log(this.productos) ///
                localStorage.setItem('spx_priceslist',JSON.stringify(this.productos))
                this.actualizaDatos('productos')
            }
            else{
                this.actuprod = res.data.message
            }
          }
        )
        .catch(function(error){
            console.log('respuesta erronea - '+error)
        });
        //this.fechareplica();
    },
    actualizarClientes(){
        this.clientescobranza();
        this.factorcambiario();
        //this.fechareplica();
    },
    actualizarPedidos(){
        localStorage.removeItem('spx_orderslist');
        localStorage.removeItem('spx_updateorders');
        this.actupedi = null;
        axios.get(Global.url+'documento/pendientes/'+this.vendedor,this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.pedidos = res.data
                localStorage.setItem('spx_orderslist',JSON.stringify(this.pedidos))
                this.actualizaDatos('pedidos')
            }
            else{
                this.actupedi = res.data.message
            }
          }
        )
        .catch(function(error){
            console.log(error)
        });
    },
    actualizaDatos(tipo){
        let today = new Date();
        let now = today.toLocaleString();
        if(tipo=='clientes'){
            localStorage.setItem('spx_updateclient',now)
            this.actuclie = localStorage.getItem('spx_updateclient')
        }
        else if(tipo=='productos'){
            localStorage.setItem('spx_updateprices',now)
            this.actuprod = localStorage.getItem('spx_updateprices')
        }
        else{
            localStorage.setItem('spx_updateorders',now)
            this.actupedi = localStorage.getItem('spx_updateorders')
        }

    },
    clientescobranza(){
        localStorage.removeItem('spx_clientlist');
        localStorage.removeItem('spx_updateclient');
        this.actuclie = null;
        axios.get(Global.url+'clientesvendedor/'+this.vendedor,this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.clientes = res.data
                //console.log(this.clientes);
                localStorage.setItem('spx_clientlist',JSON.stringify(this.clientes))
                this.actualizaDatos('clientes')
            }
            else{
                this.actuclie = res.data.message
            }
          }
        )
        .catch(function(error){
            console.log(error)
        })
    },
    factorcambiario(){
        localStorage.removeItem('spx_factorbcv')
        this.factorbcv = 0
        axios.get(Global.url+'factorcambiario',this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){ 
                this.factorbcv = res.data[0]['FactorAct']
                localStorage.setItem('spx_factorbcv',JSON.stringify(this.factorbcv))
            }
            else{
                this.actuclie = res.data.message
            }
          }
        )
        .catch(function(error){
            console.log(error)
        })
    },
    fechareplica(){
        axios.get(Global.url+'configurador/parametros',this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){ 
                let fecharespu = res.data[0]['fecha_replica'] 
                this.fecharepl =fecharespu.substring(8,10)+'/'+fecharespu.substring(5,7)+'/'+fecharespu.substring(0,4)+' '+fecharespu.substring(11,16);
                localStorage.removeItem('spx_fechareplica')
                localStorage.setItem('spx_fechareplica',this.fecharepl)
                this.sincroniza=false;
                this.colorband();
            }
            else{
                this.actuprod = res.data.message
            }
          }
        )
        .catch(function(error){
            console.log(error)
        });
        this.colorband();
    },
    colorband(){
        let today = new Date();
        let now = today.getDate().toString().padStart(2, "0")+'/'+(today.getMonth() + 1).toString().padStart(2, "0")+'/'+today.getFullYear();
        if (now == this.fecharepl.substring(0,10)){
            this.colorfond = 1;
        }
        else{
            this.colorfond = 0;
        }
    },
  },
}
</script>   