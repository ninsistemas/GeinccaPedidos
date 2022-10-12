<template>
<div class="container">
    <head-com/>
    <div class="input-group mt-4">
        <input v-model="datosbusqueda" type="search" class="form-control rounded" placeholder="INGRESE NOMBRE - RIF" aria-label="Search" aria-describedby="search-addon" />
        <button @click="getClientes()" type="button" class="btn btn-danger"><i class="fa fa-search"></i></button>
    </div>
    <hr>
    <table class="table table-Light">
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>
              <router-link class="btn btn-dark btn-user btn-block" :to="{name:'pedidoclientes',params:{codclie:cliente.codclie}}">
                <small>
                  {{ cliente.descrip }}
                </small>
              </router-link>
          </td>
        </tr>
      </tbody>
    </table>
</div>      
</template>

<script>
import axios from 'axios'
import {Global} from '../../../shared/Global'
import HeadCom from '../../layouts/HeadCom'

export default {
  name: "ClienteCom",
  data(){
    return{
        clientes:[],
        datosbusqueda : null,
        vendedor : null
    }
  },
  mounted(){
    this.vendedor = localStorage.getItem('spx_use_v')
    this.checkUser()
  },
  components:{
    HeadCom,
  },
  methods: {
    getClientes(){
        axios.get(Global.url+'clientesbusqueda/'+this.datosbusqueda,this.headRequest())
        .then(res=>{
            this.clientes=res.data
          }
        )
        .catch(function(error){
            console.log(error)
          })
    },
  }
}  
</script>
