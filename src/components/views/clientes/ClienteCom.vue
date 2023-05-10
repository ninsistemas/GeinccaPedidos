<template>
  <main>
    <head-com ocultar_factor="0" />
        <div class="input-group p-2" >
            <input v-model="datoabuscar" type="text" class="form-control bg-light border-0 small" placeholder="Buscar por nombre"
                aria-label="Search" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="listaClientes()">
                    <i class="fas fa-search fa-sm"></i>
                </button>
            </div>
        </div>
    <div class="mt-2">
        <table class="table table-sm table-light table-borderless">
          <tbody>
            <tr v-for="cliente in datosPaginados" :key="cliente.id">
              <td>
                <div class="card shadow mb-4"> 
                    <p class="m-0 font-weight-bold text-primary">
                      {{ cliente.descrip }}
                    </p>
                    <div class="form-group text-right">
                      <router-link 
                      :to="{name:'pedidoclientes',params:{codclie:cliente.codclie,descrip:cliente.descrip}}"
                      class="btn btn-danger btn-sm btn-circle" style="margin-right: 2%;"><i class="fa fa-cart-plus"></i></router-link>
                      <router-link  
                      :to="{name:'equiposcliente',params:{codclie:cliente.codclie,descrip:cliente.descrip}}"
                      class="btn btn-danger btn-sm btn-circle"><i class="fa fa-tachometer"></i></router-link >
                    </div>
                    <div v-if="cliente.escxc>0">
                        <table class="table table-sm table-primary">
                          <tr v-for="documento in cliente.porcobrar" :key="documento.numerod">
                            <td>
                             <small>
                              <i v-if="documento.TipoCxc=='10'">Fac: </i>
                              <i v-else>ND: </i> 
                              {{ documento.NumeroD }} <br> 
                              <i v-if="documento.TipoCxc=='10'" class="text tex-sm">{{ documento.FactorFac | currency }} - {{ documento.Dias }}</i> 
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
        <nav v-if="this.totalPaginas() > 1 && this.totalPaginas() < 6" aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" @click="getPaginaPrevia()"><i class="fa  fa-chevron-circle-left"></i></a></li>
            <li v-for="pagina in  totalPaginas()" :key="pagina" class="page-item" :class="esActiva(pagina)"><a class="page-link" @click="getDataPagina(pagina)" >{{ pagina }}</a></li>
            <li class="page-item"><a class="page-link" @click="getPaginaProxima()"><i class="fa  fa-chevron-circle-right"></i></a></li>
          </ul>
        </nav>
        <nav v-if="this.totalPaginas() > 25" aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">DATOS EXCEDEN</li>
          </ul>
        </nav>
    </div>
  </main>
  </template>
  
  <script>
  import HeadCom from '../../layouts/HeadCom'
  
  export default {
    name: "ClienteCom",
    data(){
      return{
          datoabuscar : null,
          todosClientes : [],
          clientes:[],
          elementosPorPagina : 5,
          datosPaginados : [],
          paginaActual : 1,
      }
    },
    mounted(){
      this.checkUser()
      this.todosClientes = JSON.parse(localStorage.getItem('spx_clientlist'));
    },
    components:{
      HeadCom,
    },
    methods: {
      listaClientes(){
        this.clientes = this.todosClientes.filter(
          cliente => cliente.descrip.toLowerCase().includes(this.datoabuscar.toLowerCase())
        )
        this.totalPaginas()
        this.getDataPagina(1)
      },
      totalPaginas(){
        return Math.ceil(this.clientes.length / this.elementosPorPagina)
      },
      getDataPagina(noPagina){
        this.paginaActual = noPagina;
        this.datosPaginados = [];
        let ini = (noPagina*this.elementosPorPagina) - this.elementosPorPagina
        let fin = (noPagina*this.elementosPorPagina)
        this.datosPaginados = this.clientes.slice(ini,fin);
      },
      getPaginaPrevia(){
        if(this.paginaActual>1){
          this.paginaActual--
        }
        this.getDataPagina(this.paginaActual)
      },
      getPaginaProxima(){
        if(this.paginaActual<this.totalPaginas()){
          this.paginaActual++
        }
        this.getDataPagina(this.paginaActual)
      },
      esActiva(noPagina){
        return noPagina ==  this.paginaActual ? 'active' : '';
      }
    },
  }  
  </script>
