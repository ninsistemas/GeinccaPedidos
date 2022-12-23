<template>
    <main>
        <head-com/>
        <div class="container mt-2">
            <p class="text-center"> {{ this.cliente.codclie }} - {{ this.cliente.descrip }}</p>
            <div class="d-grid gap-2">
                <button @click="deshabilita()" class="btn btn-danger btn-block" type="button" data-bs-toggle="modal" data-bs-target="#ModalActivos">PRODUCTOS</button>
            </div>
            <hr>
                <div class="row g-2 mt-1">
                    <table v-if="this.cantire>0" class="table table-light table-sm">
                        <tbody>
                            <tr>
                                <td>Descripcion</td>
                                <td>Total</td>
                            </tr>
                            <tr v-for="(item,index) in pedidotemp" :key="index">
                                <td><small>{{ item.codprod }} - {{ item.descrip }}<br>
                                Cant: {{ item.cantidad }} - Precio: {{ item.precio | currency }}</small></td>
                                <td class="text-right"><small>{{ item.cantidad*item.precio | currency }}</small></td>
                                <td><button  @click="borraoitem(index)" class="btn btn-sm  btn-outline-dark btn-circle"><i class="fa fa-trash"></i></button></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>SUB TOTAL</td>
                                <td class="text-right"><small><b>{{ this.totalre | currency }}</b></small></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>IVA 16% </td>
                                <td class="text-right"><small><b>{{ this.totalre*0.16 | currency }}</b></small></td>
                                <td></td>
                            </tr>
                             <tr>
                                <td>TOTAL</td>
                                <td class="text-right"><small><b>{{ this.totalre+(this.totalre*0.16) | currency }}</b></small></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div v-if="this.cantire>0" class="row g-2">
                    <div class="form-floating col">
                        <input v-model="comentario"  type="text" class="form-control" placeholder="Comentario"  maxlength="40" v-maska="{ mask: 'X*', tokens: { 'X': { pattern: /[a-zA-Z .,ñÑ]/, uppercase: true }} }">
                    </div>
                </div>
                 <hr>
                 <div v-if="this.cantire>0" class="d-grid gap-2">
                    <button @click="totalizarpedido()" class="btn btn-danger mr-3"  >GUARDAR Y ENVIAR</button>
                    <button @click="guardarPedido()" class="btn btn-dark mr-3"  >GUARDAR</button>
                    <router-link to="clientes" class="btn btn-secondary" type="button" >Cancelar</router-link>
                </div>
            <!-- Modal -->
            <div class="modal fade" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalActivosLabel">Pedir</h5>
                        <button type="button" class="btn btn-close" data-bs-dismiss="modal">X</button>
                    </div>
                    <div class="modal-body">
                        <alert-com :textomen="textomen" :colormen="colormen" @alcerrar="deshabilita" />
                        <div class="form-floating col mb-3">
                            <model-select :options="options"
                                v-model="item"
                                placeholder="select item">
                            </model-select>
                        </div>
                        <div class="form-floating col">
                            <input v-model="cantidad" type="number" class="form-control" placeholder="Cantidad"  min="1" step="1">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="nuevodocumento()" type="button" class="btn btn-danger">Agregar</button>
                    </div>
                    </div>
                </div>
            </div>
            <!--- FIN MODAL --->
        </div>
    </main>
</template>

<script>
import HeadCom from "../../layouts/HeadCom.vue"
import axios from 'axios'
import { Global } from '../../../shared/Global'
import { ModelSelect } from 'vue-search-select'
import AlertCom from '../../layouts/AlertCom.vue'

export default {
    components : {
        HeadCom,
        ModelSelect,
        AlertCom,
    },
    data(){
        return {
            textomen : false,
            colormen : '',
            cliente : {},
            iddelet : { id : null },
            pedidotemp : [],
            codvend : null,
            codclie : null,
            codprod : null,
            descrip : null,
            cantidad : 0,
            precio : 0,
            comentario : '',
            cantire : 0,
            totalre : 0,
            options : [],
            itemdoc : [],
            item: {
                value: null,
                text: null
            },
        }
    },
    created(){
        localStorage.removeItem('spx_pedidotemp')
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        if(this.$route.params.codclie){
            this.cliente = {
                codclie : this.$route.params.codclie,
                descrip : this.$route.params.descrip
            }
            this.codclie = this.cliente.codclie
            this.codvend = datoslocales.spx_use_v
            this.getProductos()
        }
        else{
            this.$router.push('/clientes') 
        }
    },
    methods: {
        getProductos(){
            let listaProductos = JSON.parse(localStorage.getItem('spx_priceslist'));
            if(listaProductos != null){
                listaProductos.forEach((producto)=>{
                    this.options.push({value : producto.CodProd+'ç'+producto.Descrip+'ç'+producto.Precio, text : producto.CodProd+' - '+producto.Descrip+' (E : '+parseInt(producto.Existen)+' - P: '+producto.Precio+')' })
                });
            }
        },       
        nuevodocumento(){
            let itdato = this.item.value.split('ç')
            this.codprod = itdato[0]
            this.descrip = itdato[1]
            this.precio = itdato[2]
            this.pedidotemp.push({
                codvend :  this.codvend,
                codclie : this.codclie,
                cliente : this.cliente.descrip,
                codprod : this.codprod,
                descrip : this.descrip,
                cantidad : this.cantidad,
                precio : this.precio,
                comentario : this.comentario
            })
            localStorage.setItem('spx_pedidotemp',JSON.stringify(this.pedidotemp))
            this.cantire = this.pedidotemp.length
            this.calculatotal()
        },
        deshabilita() {
            this.textomen = false
            this.colormen = ''
        },
        borraoitem(iditem){
            this.pedidotemp.splice(iditem)
            this.cantire = this.pedidotemp.length
            this.calculatotal()
        },
        calculatotal(){
            this.totalre = 0
            this.pedidotemp.forEach((item)=>{
                this.totalre += item.precio*item.cantidad
            })
        },
        guardarPedido(){
            this.actualizarComentario(this.comentario)
            let pedidospendi = JSON.parse(localStorage.getItem('spx_pedidospend'))
            if(pedidospendi){
                pedidospendi.forEach((pedidoit)=>{
                    this.pedidotemp.push(pedidoit)
                });
            }        
            localStorage.setItem('spx_pedidospend',JSON.stringify(this.pedidotemp))
            localStorage.removeItem('spx_pedidotemp')
            // this.pedidotemp = []
            // this.cantire = 0
            this.$router.push('/home');
        },
        totalizarpedido(){
            this.actualizarComentario(this.comentario)
            //console.log(JSON.stringify(this.pedidotemp));
            let datosDocumento = JSON.stringify(this.pedidotemp);
            axios.post(Global.url+'documento/cerrardocu',datosDocumento,this.headRequest())
            .then(()=>{
                 //console.log(res)
                 this.$router.push('/home') 
            })
            .catch(function(error){
                console.log(error)
            })
        },
        actualizarComentario(textoCo){
            this.pedidotemp.forEach((item)=>{
                item.comentario=textoCo
            })
        },
    },
}
</script>