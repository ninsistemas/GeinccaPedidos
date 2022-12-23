<template>
    <main>
        <head-com/>
        <div class="container mt-2">
            <p class="text-center"> {{this.codcli  }} - {{ this.nomcli }}</p>
            <hr>
                <div class="row g-2 mt-1">
                    <table class="table table-light table-sm">
                        <tbody>
                            <tr>
                                <td>Descripcion</td>
                                <td>Total</td>
                            </tr>
                            <tr v-for="item in itemdoc" :key="item.id" class="table-secondary">
                                <td><small>{{ item.codprod }} - {{ item.descrip }}<br>
                                Cant: {{ item.cantidad }} - Precio: {{ item.precio | currency }}</small></td>
                                <td class="text-right"><small>{{ item.cantidad*item.precio | currency }}</small></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><b>SUB TOTAL</b></td>
                                <td class="text-right"><small><b>{{ this.totalm/1.16 | currency }}</b></small></td>
                            </tr>
                            <tr>
                                <td><b>IVA</b></td>
                                <td class="text-right"><small><b>{{ this.totalm-(this.totalm/1.16) | currency }}</b></small></td>
                            </tr>
                            <tr>
                                <td><b>TOTAL</b></td>
                                <td class="text-right"><small><b>{{ this.totalm | currency }}</b></small></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <hr>
                <div class="d-grid gap-2">
                    <router-link to="pedidostransito" class="btn btn-secondary" type="button" >Regresar</router-link>
                </div>
        </div>
    </main>
</template>

<script>
import HeadCom from "../../layouts/HeadCom.vue"
import axios from 'axios'
import { Global } from '../../../shared/Global'

export default {
    components : {
        HeadCom,
    },
    data(){
        return {
            codigo : null,
            totalm : null,
            codcli : null,
            nomcli : null,
            itemdoc : [],
        }
    },
    mounted(){
        this.checkUser()
        if(this.$route.params.codigo){
            this.codigo = this.$route.params.codigo
            this.totalm = this.$route.params.totalm
            this.codcli = this.$route.params.codcli
            this.nomcli = this.$route.params.nomcli
            this.getdocumento()
        }
        else{
            this.$router.push('/clientes') 
        }
    },
    methods: {
        getdocumento(){
            axios.get(Global.url+'documento/codigo/'+this.codigo,this.headRequest())
            .then( res =>{
                this.itemdoc = res.data
            })
            .catch(function(error){
                console.log(error)
            }) 
        }
    },
}
</script>