<template>
    <main>
      <head-com/>
      <div class="container mt-3">
          <h3> <i class="fa fa-compass"></i> Mis Datos</h3>
          <hr>
          Dias Habiles: {{ dias_habiles }} - Dias Trabajados {{ dias_trabajados }}
          <hr>
          <table class="table table-dark">
            <tbody>
                <tr>
                    <td><h5>Acumulado</h5></td>
                    <td style="text-align: right;"><h5>{{ cajas_venta_mes | currency({ fractionCount: 0 }) }}</h5></td>
                </tr>
                <tr>
                    <td><h5>Probable</h5></td>
                    <td style="text-align: right;"><h5>{{ probable  | currency({ fractionCount: 0 }) }}</h5></td>
                </tr>
                <tr>
                    <td><h5>Cuota Mes</h5></td>
                    <td style="text-align: right;"><h5>{{ cajas_cuota_mes  | currency({ fractionCount: 0 }) }}</h5></td>
                </tr>
                <tr>
                    <td><h5>Alcance</h5></td>
                    <td style="text-align: right;"><h5>{{ alcance }} %</h5></td>
                </tr>
                <tr>
                    <td><h5>Probable vs Cuota</h5></td>
                    <td style="text-align: right;"><h5>{{ probable_vs_cuota }} %</h5></td>
                </tr>
                <tr>
                    <td><h5>CF x Vender</h5> </td>
                    <td style="text-align: right;"><h5>{{ cf_vender  | currency({ fractionCount: 0 }) }}</h5></td>
                </tr>
                <tr>
                    <td><h5>Cuota del Dia</h5> </td>
                    <td style="text-align: right;"><h5>{{ cuota_dia  | currency({ fractionCount: 0 }) }}</h5></td>
                </tr>
            </tbody>
          </table>
      </div>
    </main>
    </template>
    
    <script>
    import axios from 'axios'
    import { Global } from '../../../shared/Global'
    import HeadCom from '../../layouts/HeadCom'
    
    export default {
      name: "MisDatosCom",
      data(){
        return{
            vendedor : null,
            cajas_venta_mes : 0,
            cajas_cuota_mes : 0,
            dias_habiles : 0,
            dias_trabajados : 0,
            probable : 0,
            alcance : 0,
            probable_vs_cuota : 0,
            cf_vender : 0,
            cuota_dia : 0,
        }
      },
      mounted(){
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        this.vendedor = datoslocales.spx_use_v;
        this.checkUser()
        this.getMisDatos()
      },
      components:{
        HeadCom,
      },
      methods: {
        getMisDatos(){           
            axios.get(Global.url+'consultabrujula/'+this.vendedor,this.headRequest())
            .then(res=>{
                if(res.data.response!="error"){ 
                    this.cajas_venta_mes = res.data[0]['cajas_venta_mes'];
                    this.cajas_cuota_mes = res.data[0]['cajas_cuota_mes'];
                    this.dias_habiles = res.data[0]['dias_habiles'];
                    this.dias_trabajados = res.data[0]['dias_trabajados'];
                    this.probable = res.data[0]['probable'];
                    this.alcance = res.data[0]['alcance'];
                    this.probable_vs_cuota = res.data[0]['probable_vs_cuota'];
                    this.cf_vender = res.data[0]['cf_vender'];
                    this.cuota_dia = res.data[0]['cuota_dia'];
                }
                else{
                    console.log(res.data.message)
                }
            }
            )
            .catch(function(error){
                console.log(error)
            })
        },
      },
    }  
    </script>