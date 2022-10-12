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
                            <tr v-for="item in itemdoc" :key="item.id">
                                <td><small>{{ item.codprod }} - {{ item.descrip }}<br>
                                Cant: {{ item.cantidad }} - Precio: {{ item.precio | currency }}</small></td>
                                <td class="text-right"><small>{{ item.cantidad*item.precio | currency }}</small></td>
                                <td><button  @click="borraoitem(item.id)" class="btn btn-sm  btn-outline-dark btn-circle"><i class="fa fa-trash"></i></button></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td class="text-right"><small><b>{{ this.totalre | currency }}</b></small></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div v-if="this.cantire>0" class="row g-2">
                    <div class="form-floating col">
                        <input v-model="cerrardoc.comentario"  type="text" class="form-control" placeholder="Comentario"  maxlength="40" v-maska="{ mask: 'X*', tokens: { 'X': { pattern: /[a-zA-Z .,ñÑ]/, uppercase: true }} }">
                    </div>
                </div>
                 <hr>
                 <div v-if="this.cantire>0" class="d-grid gap-2">
                    <button @click="totalizarpedido()" class="btn btn-dark" >Hacer Pedido</button>
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
                            <input v-model="documento.cantidad" type="number" class="form-control" placeholder="Cantidad"  min="1" step="1">
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
            cerrardoc : {
                codigodocu : null,
                comentario : null,
            },
            cliente : {},
            iddelet : { id : null },
            documento : {
                codigo : null,
                codvend : null,
                codclie : null,
                codprod : null,
                cantidad : 0,
                precio : 0
            },
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
    mounted(){
        if(this.$route.params.codclie){
            this.documento.codclie = this.$route.params.codclie
            this.documento.codvend = localStorage.getItem('spx_use_v')
            this.getcliente()
            this.getProductos()
            this.codigoDoc(this.documento.codvend)
        }
        else{
            this.$router.push('/clientes') 
        }
    },
    methods: {
        getcliente(){
            axios.get(Global.url+'cliente/'+this.documento.codclie,this.headRequest())
            .then(res =>{
                this.cliente = res.data
            })
            .catch(function(error){
                console.log(error)
            })
        },
        getProductos(){
            axios.get(Global.url+'exproductos',this.headRequest())
            .then(res=>{
                res.data.forEach((producto)=> {
                    this.options.push({value : producto.CodProd+'ç'+producto.Precio, text : producto.CodProd+' - '+producto.Descrip+' (E : '+parseInt(producto.Existen)+' - P: '+producto.Precio+')' })
                });
            }
            )
            .catch(function(error){
                console.log(error)
            })
        },
        codigoDoc(codvend){
            axios.get(Global.url+'nuevodocumento/'+codvend,this.headRequest())
            .then(res =>{
                this.documento.codigo = res.data[0].correldocu
                this.cerrardoc.codigodocu = res.data[0].correldocu
            })
            .catch(function(error){
                console.log(error)
            })
        },
        nuevodocumento(){
            let itdato = this.item.value.split('ç')
            this.documento.codprod = itdato[0]
            this.documento.precio = itdato[1]
            axios.post(Global.url+'documento',this.documento,this.headRequest())
            .then(res=>{
                this.getdocumentos()
                this.textomen=res.data.message
                this.colormen=res.data.colormen
            })
            .catch(function(error){
                console.log(error)
            })
        },
        getdocumentos(){
            axios.get(Global.url+'documentovendedor/'+this.documento.codvend+'/'+this.documento.codclie,this.headRequest())
            .then(res =>{
                this.totalre = 0
                 res.data.forEach((documento)=> {
                    this.totalre = this.totalre+(documento.cantidad*documento.precio)
                });
                this.itemdoc = res.data
                this.cantire = this.itemdoc.length
            })
            .catch(function(error){
                console.log(error)
            })
        },
        deshabilita() {
            this.textomen = false
            this.colormen = ''
        },
        borraoitem(iditem){
            axios.get(Global.url+'documento/item/'+iditem,this.headRequest())
            .then(() =>{
                this.getdocumentos()
            })
            .catch(function(error){
                console.log(error)
            })
        },
        totalizarpedido(){
            axios.post(Global.url+'documento/cerrardocu',this.cerrardoc,this.headRequest())
            .then(() =>{
                 this.$router.push('/home') 
            })
            .catch(function(error){
                console.log(error)
            }) 
        },
    },
}
</script>