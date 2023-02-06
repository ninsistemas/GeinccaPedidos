<template>
<main>
  <head-com/>
  <div class="container mt-3">
      <h3>Mis Pedidos</h3>
      <table v-if="mostrarTab1>=0" id="tabla1" class="table table-sm table-secondary table-borderless">
        <thead>
          <tr>
            <th>PEDIDOS ENVIADOS</th>
            <th><small>MONTO</small></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="documento in documentosEnv" :key="documento.codigo">
            <td class="text-sm">
                <router-link :to="{name:'editardocumento',params:{
                  codigo:documento.codigo,
                  totalm:documento.tot_monto,
                  codcli:documento.codclie,
                  nomcli:documento.Descrip
                  }
                  }"><small> 
                {{ documento.Descrip }}<br>
                 Cajas: {{ documento.tot_caja }} <br>
                 <i>{{ documento.comentario }}</i></small>
                 </router-link>
            </td>
            <td class="text-sm" style=" text-align: right;"><small><b>
                {{documento.tot_monto | currency}}</b>
                </small>
            </td>
          </tr>
        </tbody>
      </table>
      <p></p>
      <table v-if="mostrarTab2>=0" id="tabla2" class="table table-sm table-primary table-borderless">
        <thead>
          <tr>
            <th>PEDIDOS PENDIENTES</th>
            <th><small>MONTO</small></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="documento in documentosPen" :key="documento.codigo">
            <td class="text-sm"><small>{{ documento.cliente }}<br>
                 Cajas: {{ documento.cantidad }} <br>
                 <i>{{ documento.comentario }}</i></small>
            </td>
            <td class="text-sm" style=" text-align: right;"><small><b>
                {{(documento.precio*0.16)+documento.precio | currency}}</b>
                </small>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <button class="btn btn-danger btn-block btn-user text-sm" aria-expanded="false" @click="totalizarpedido()">
                      <i class="fa fa-refresh"></i> &nbsp;ENVIAR PEDIDOS
              </button>
            </td>
          </tr>
        </tfoot>  
      </table>
  </div>
</main>
</template>

<script>
import axios from 'axios'
import { Global } from '../../../shared/Global'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import HeadCom from '../../layouts/HeadCom'

export default {
  name: "DocumentosCom",
  data(){
    return{
        vendedor : null,
        documentosEnv:[],
        documentosPen:[],
        mostrarTab1 : -1,
        mostrarTab2 : -1,
    }
  },
  mounted(){
    this.vendedor = localStorage.getItem('spx_use_v')
    this.checkUser()
    this.documentosEnviados()
    this.documentosPendientes()
  },
  components:{
    HeadCom,
  },
  methods: {
    documentosEnviados(){
        this.documentosEnv=JSON.parse(localStorage.getItem('spx_orderslist'));
        if(this.documentosEnv != null){
            setTimeout(() => {
              $("#tabla1").DataTable(this.tablaDinamica(true,true,false))
            })
            this.mostrarTab1 = this.documentosPen.length
        }
        else{
          this.mostrarTab1 = -1
        }
    },
    documentosPendientes(){
        let documentosIte=JSON.parse(localStorage.getItem('spx_pedidospend'));
        if(documentosIte != null){
          let item = -1;
          let codclie = '';
          let cantidad = 0;
          let totalmon = 0;
          documentosIte.forEach((pedidoit)=>{
                if(pedidoit.codclie != codclie){
                  this.documentosPen.push(pedidoit)
                  item++;
                  codclie = pedidoit.codclie;
                  cantidad = Number(pedidoit.cantidad);
                  totalmon = Number(pedidoit.precio)*Number(pedidoit.cantidad);
                  this.documentosPen[item].cantidad = cantidad;
                  this.documentosPen[item].precio = totalmon;
                }else{
                  cantidad += Number(pedidoit.cantidad);
                  totalmon += Number(pedidoit.precio)*Number(pedidoit.cantidad)
                  this.documentosPen[item].cantidad = cantidad;
                  this.documentosPen[item].precio = totalmon;
                }
          });
          //console.log(this.documentosPen);
          setTimeout(() => {
              $("#tabla2").DataTable(this.tablaDinamica(true,true,false))
            })
            this.mostrarTab2 = this.documentosPen.length
        }
        else{
          this.mostrarTab2 = -1
        }
    },
    totalizarpedido(){
            let datosDocumento=localStorage.getItem('spx_pedidospend');
            axios.post(Global.url+'documento/cerrardocu',datosDocumento,this.headRequest())
            .then(()=>{
              localStorage.removeItem('spx_pedidospend');
              this.$router.push('/home');              
            })
            .catch(function(error){
                console.log(error)
            })
        },
  },
}  
</script>