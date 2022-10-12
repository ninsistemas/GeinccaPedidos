<template>
<main>
  <head-com/>
  <div class="container mt-3">
      <h3>Lista de Precios</h3>
      <table id="tabla1" class="table table-sm table-secondary table-borderless">
        <thead>
          <tr>
            <th></th>
            <th class="text-sm">Precio</th>
            <th class="text-sm">Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td class="text-sm">{{producto.CodProd}}-{{ producto.Descrip }}</td>
            <td class="text-sm" style=" text-align: right;">{{producto.Precio | currency}}</td>
            <td class="text-sm" style=" text-align: right;">{{producto.Existen | currency}}</td>
            <td class="text-sm">{{producto.Unidad}}</td>
          </tr>
        </tbody>
      </table>
  </div>
</main>
</template>

<script>
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";


import axios from 'axios'
import {Global} from '../../../shared/Global'
import HeadCom from '../../layouts/HeadCom'

export default {
  name: "ProductosCom",
  data(){
    return{
        productos:[],
    }
  },
  mounted(){
    this.checkUser()
    this.getProductos()
  },
  components:{
    HeadCom,
  },
  methods: {
    getProductos(){
        axios.get(Global.url+'exproductos',this.headRequest())
        .then(res=>{
            this.productos=res.data
            setTimeout(() => {
               $("#tabla1").DataTable(this.tablaDinamica(true,true,true))
            })
          }
        )
        .catch(function(error){
            console.log(error)
        })
    },
  },
}  
</script>