<template>
<main>
  <head-com/>
  <div class="container mt-3">
      <h3>Mis Pedidos</h3>
      <table id="tabla1" class="table table-sm table-secondary table-borderless">
        <thead>
          <tr>
            <th><small>Cliente</small></th>
            <th><small>Monto</small></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="documento in documentos" :key="documento.codigo">
            <td class="text-sm">
                <router-link :to="{name:'editardocumento',params:{
                  codigo:documento.codigo,
                  totalm:documento.precio,
                  codcli:documento.codclie,
                  nomcli:documento.descrip
                  }
                  }"><small> 
                {{ documento.descrip }}<br>
                 Cajas: {{ documento.cantidad }} <br>
                 <i>{{ documento.comentario }}</i></small>
                 </router-link>
            </td>
            <td class="text-sm" style=" text-align: right;"><small><b>
                {{documento.precio | currency}}</b>
                </small>
            </td>
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
  name: "DocumentosCom",
  data(){
    return{
        vendedor : null,
        documentos:[],
    }
  },
  mounted(){
    this.vendedor = localStorage.getItem('spx_use_v')
    this.checkUser()
    this.getDocumentos()
  },
  components:{
    HeadCom,
  },
  methods: {
    getDocumentos(){
        axios.get(Global.url+'documento/transito/'+this.vendedor,this.headRequest())
        .then(res=>{
            this.documentos=res.data
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