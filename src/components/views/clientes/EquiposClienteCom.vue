<template>
    <main>
        <head-com/>
        <div class="container">
        <div class="text-sm text-center">Equipos asignados a: <br/>{{ cliente.codclie }} - {{ cliente.descrip }}</div>
        <button @click="nuevoEquipo()" class="btn btn-danger btn-block btn-sm" style="margin-bottom: 3%;margin-top: 2%;" data-bs-toggle="modal" data-bs-target="#ModalActivos">Nuevo</button>
        <div v-for="equipo in equipos" :key="equipo.id" class="alert alert-dark alert-dismissible fade show" role="alert">
                <strong>Puertas: {{ equipo.puertas }}</strong>
                <div v-if="equipo.activo==1"> 
                    <i style="color: green;">Activo</i>
                    <i v-if="equipo.productos_femsa==1" style="color: green;"> - Femsa</i>
                    <i v-if="equipo.contaminado==1" style="color: red;"> - Contaminado</i> 
                
                </div>
                <div v-else> 
                    <i style="color: red;">Inactivo</i>  
                </div>
                <i class="text-dark text-xs">{{ equipo.id }} - {{ equipo.serial }}</i>
                    
                <button @click="borraEquipo(equipo)" type="button" class="close btn-circle" data-bs-toggle="modal" data-bs-target="#ModalActivos"  style="margin-right: 10%;">
                    <i class="fa fa-trash"></i>
                </button>

                <button @click="editarEquipo(equipo)" type="button" class="close btn-circle" data-bs-toggle="modal" data-bs-target="#ModalActivos">
                    <i class="fa fa-pencil"></i>
                </button>

        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="ModalActivosLabel">{{ titulomodal }}</h5>
            <button type="button" class="btn btn-close" data-bs-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
            <div v-if="titulomodal=='ELIMINAR EQUIPO'" class="text-center">
                <b>REALMENTE QUIERE ELIMINAR EL EQUIPO</b> 
            </div>
            <div v-else>
            <div class="form-floating col mb-3">
                <input v-model="datosequipo.serial" type="text" maxlength="20" class="form-control" placeholder="SERIAL">
            </div>
            <div class="form-floating col mb-3">
                <select v-model="datosequipo.puertas" class="form-control">
                    <option value="1">1 Puerta</option>
                    <option value="2">2 Puertas</option>
                    <option value="3">3 Puertas</option>
                </select>
            </div>
            <div class="form-floating col mb-3">
                <select v-model="datosequipo.activo" class="form-control">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>
            <div class="form-floating col mb-3">
                <select v-model="datosequipo.productos_femsa" class="form-control">
                    <option value="1">Contine productos FEMSA</option>
                    <option value="0">NO tiene productos FEMSA</option>
                </select>
            </div>
            <div class="form-floating col mb-3">
                <select v-model="datosequipo.contaminado" class="form-control">
                    <option value="0" default>No esta contaminado</option>
                    <option value="1">EQUIPO CONTAMINADO</option>
                </select>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <div v-if="titulomodal=='Nuevo Equipo'">
            <button @click="agregarEquipo()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Agregar</button>
            </div>
            <div v-if="titulomodal=='Editar Equipo'">
                <button @click="actualizarEquipo()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
            </div>
            <div v-if="titulomodal=='ELIMINAR EQUIPO'">
                <button @click="eliminarEquipo()" type="button" class="btn btn-warning" data-bs-dismiss="modal">ELIMINAR</button>
            </div>
        </div>
        </div>
        </div>
    </div>
    <!--- FIN MODAL --->
    </main>
</template>

<script> 
import axios from 'axios'
import { Global } from '../../../shared/Global'
import HeadCom from '../../layouts/HeadCom'

export default {
  name: "EquiposCliente",
  data(){
    return{
        cliente : {},
        equipos:[],
        datosequipo : {},
        titulomodal : "",
    }
  },
  created(){
    if(this.$route.params.codclie){
        this.cliente = {
            codclie : this.$route.params.codclie,
            descrip : this.$route.params.descrip
        };
    }
    else{
        this.$router.push('/clientes') 
    }
  },
  mounted(){
    this.checkUser()
    this.listaEquipos()
  },
  components:{
    HeadCom,
  },
  methods: {
    titulo(des){ this.titulomodal=des; },
    listaEquipos(){
        axios.get(Global.url+'equipos/cliente/'+this.cliente.codclie,this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.equipos = res.data
            }
            else{
                console.log(res.data.message)
            }
          }
        )
        .catch(function(error){
            console.log('respuesta erronea - '+error)
        });
    
    },
    nuevoEquipo(){
        this.titulomodal='Nuevo Equipo';
        this.datosequipo = {
            id: "",
            cliente: this.cliente.codclie,
            serial: "",
            puertas: 1,
            activo: 1,
            productos_femsa: 1,
            contaminado: 0
        };
    },
    agregarEquipo(){
        axios.post(Global.url+'equipos',this.datosequipo,this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.listaEquipos();
            }
            else{
                console.log(res.data.message)
            }
          }
        )
        .catch(function(error){
            console.log('respuesta erronea - '+error)
        }); 
    },
    editarEquipo(equipo){
        this.titulomodal='Editar Equipo';
        this.datosequipo = {
            id: equipo.id,
            cliente: equipo.codclie,
            serial: equipo.serial,
            puertas: equipo.puertas,
            activo: equipo.activo,
            productos_femsa: equipo.productos_femsa,
            contaminado: equipo.contaminado
        }
    },
    actualizarEquipo(){
        axios.put(Global.url+'equipos',this.datosequipo,this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.listaEquipos();
            }
            else{
                console.log(res.data.message)
            }
          }
        )
        .catch(function(error){
            console.log('respuesta erronea - '+error)
        }); 
    },
    borraEquipo(equipo){
        this.titulomodal='ELIMINAR EQUIPO';
        this.datosequipo = {
            id: equipo.id,
            cliente: equipo.codclie,
            serial: equipo.serial,
            puertas: equipo.puertas,
            activo: equipo.activo,
            productos_femsa: equipo.productos_femsa,
            contaminado: equipo.contaminado
        }
    },
    eliminarEquipo(){
        axios.post(Global.url+'equipos/codigoe',this.datosequipo,this.headRequest())
        .then(res=>{
            if(res.data.response!="error"){
                this.listaEquipos();
            }
            else{
                console.log(res.data.message)
            }
          }
        )
        .catch(function(error){
            console.log('respuesta erronea - '+error)
        }); 
    },
  },
}  
</script>