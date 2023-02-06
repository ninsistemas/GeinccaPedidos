<template>
    <main>
      <head-com/>
      <div class="mt-3">
          <table id="tabla1" class="table table-sm table-secondary table-borderless">
            <thead>
              <tr>
                <th class="text-center">MIS CLIENTES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td>
                  <div class="card shadow mb-4"> 
                      <router-link class="d-block card-header py-3" :to="{name:'pedidoclientes',params:{codclie:cliente.codclie,descrip:cliente.descrip}}">
                        <h6 class="m-0 font-weight-bold text-primary">
                          {{ cliente.descrip }}
                        </h6>
                      </router-link>
                      <div v-if="cliente.escxc>0">
                          <table class="table table-sm table-primary">
                            <tr v-for="documento in cliente.porcobrar" :key="documento.numerod">
                              <td>
                               <small>
                                <i v-if="documento.TipoCxc=='10'">Fac: </i>
                                <i v-else>ND: </i> 
                                {{ documento.NumeroD }} <br> 
                                <i class="text tex-sm">{{ documento.FactorFac | currency }} - {{ documento.Dias }}</i> 
                              </small>
                              </td>
                              <td class="text-right">
                                <div v-if="documento.TipoCxc=='10'" >
                                <small> {{ documento.SaldoDol | currency }} $</small>
                                </div>
                              </td>
                              <td class="text-right">
                                <div v-if="documento.TipoCxc=='10'" >
                                  <small> {{ documento.MtoTotal | currency }} Bs</small>
                                </div>
                                <div v-else>
                                  <small> {{ documento.saldo | currency }} Bs</small>
                                </div>
                              </td>
                            </tr>
                            <tr v-if="cliente.escxc>1">
                              <td> <small><b>Total</b></small></td>
                              <td class="text-right"><small><b>{{ cliente.totalcxcdol | currency }} $</b></small></td>
                              <td class="text-right"><small><b>{{ cliente.totalcxc | currency }} Bs</b></small></td>
                            </tr>
                          </table>
                    </div>
                   </div>
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
  