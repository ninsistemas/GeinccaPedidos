<template>
  <main>
    <head-com/>
    <div class="mt-3">
        <table id="tabla1" class="table table-sm table-secondary table-borderless">
          <thead>
            <tr>
              <th class="text-center">MIS CLIENTES</th>
              <!-- th class="text-sm">Precio</th -->
              <!-- th class="text-sm">Cantidad</th -->
              <!-- th></th -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id">
              <td>
                  <router-link class="btn btn-dark btn-user btn-block" :to="{name:'pedidoclientes',params:{codclie:cliente.codclie,descrip:cliente.descrip}}">
                    <small>
                      {{ cliente.descrip }}
                    </small>
                  </router-link>
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
  
  import HeadCom from '../../layouts/HeadCom'
  
  export default {
    name: "ClienteCom",
    data(){
      return{
          clientes:[],
      }
    },
    mounted(){
      this.checkUser()
      this.listaClientes()
    },
    components:{
      HeadCom,
    },
    methods: {
      listaClientes(){
        this.clientes = JSON.parse(localStorage.getItem('spx_clientlist'));
        if(this.clientes != null){
          setTimeout(() => {
            $("#tabla1").DataTable(this.tablaDinamica(true,true,false))
          })
        }
      },
    },
  }  
  </script>
