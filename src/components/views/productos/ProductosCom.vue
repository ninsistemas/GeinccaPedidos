<template>
<main>
  <head-com/>
  <div class="mt-3">
      <table id="tabla1" class="table table-sm table-secondary table-borderless">
        <thead>
          <tr>
            <th class="text-center">LISTA DE PRECIOS</th>
            <!-- th class="text-sm">Precio</th -->
            <!-- th class="text-sm">Cantidad</th -->
            <!-- th></th -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-1">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  {{producto.CodProd}}-{{ producto.Descrip }}</div>
                                <div class="font-weight-bold text-gray-800">Precio: {{producto.PrecioIVA | currency}} </div>
                                <div>Cantidad: {{producto.Existen | currency}}  {{producto.Unidad}}</div>
                            </div>
                            <div class="col-auto">
                              <img class="img-fluid" style="width: 7rem;" 
                              :src="'img/'+producto.CodProd+'.jpg'"  
                              alt="..." />   
                          </div>
                        </div>
                    </div>
                </div>              
             </td>
            <!--td> <small><b>{{producto.CodProd}}-{{ producto.Descrip }} </b><br>
              <i>Precio: {{producto.PrecioIVA | currency}} - Existencia: {{producto.Existen | currency}} {{producto.Unidad}}</i></small>
            </td -->
            <!-- td class="text-sm" style=" text-align: right;">{{producto.PrecioIVA | currency}}</td -->
            <!-- td class="text-sm" style=" text-align: right;">{{producto.Existen | currency}}</td -->
            <!-- td class="text-sm">{{producto.Unidad}}</td -->
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
    this.listaProductos()
  },
  components:{
    HeadCom,
  },
  methods: {
    listaProductos(){
      this.productos = JSON.parse(localStorage.getItem('spx_priceslist'));
      if(this.productos != null){
        setTimeout(() => {
          $("#tabla1").DataTable(this.tablaDinamica(true,true,false))
        })
      }
    },
  },
}  
</script>