<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="p-5">
                              <main class="animate__animated animate__fadeInDown">
                                <div class="text-center"><img src="../../assets/spx.png" alt="spx"></div>
                                <p></p>
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Pedidos</h1>
                                </div>
                              </main>
                                <alert-com :textomen="textomen" :colormen="colormen" @alcerrar="deshabilita" />
                                <main class="animate__animated animate__backInUp">
                                <form class="user" @submit.prevent="submit">    
                                    <div class="form-group">
                                        <input v-model="parametros.usuario" type="text" class="form-control form-control-user text-align: center;" maxlength="10"
                                         id="floatingInput" placeholder="USUARIO" required>
                                    </div>
                                    <div class="form-group">
                                        <input v-model="parametros.password" type="password" class="form-control form-control-user"
                                            placeholder="CLAVE" id="floatingPassword" required>
                                    </div>
                                    <button type="submit" class="btn btn-danger btn-user btn-block">INGRESAR</button>
                                    <hr>
                                </form>
                                <div class="text-center">
                                    <a href="#">Solicitar Registro</a>
                                </div>
                                <div class="text-center">
                                    <i class="small" href="#">lnaveda@geincca.com</i>
                                </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import {Global} from '../../shared/Global'
import AlertCom from '../layouts/AlertCom.vue'
export default {
  name: 'LoginCom',
    data(){
        return{
          textomen : false,
          colormen : '',
          parametros:{
              usuario : '',
              password : '',
          }
        }
    },
    mounted() {
       if(localStorage.getItem('spx_localdata')){
          this.$router.push('/home')
       }
    },
    components : {
      AlertCom
    },
    methods: {
      submit () {
         let config={
            headers:{
              'Accept' : '*/*'
            }
          }
        axios.post(Global.url+'nrsrclassl',this.parametros,config)
        .then((response)=>{
            this.textomen=response.data.message
            if(response.data.response=='ok'){
                this.colormen='primary'
                let spx_localdata = {
                  spx_tok_p : response.data.token,
                  spx_nam_p : response.data.usuario,
                  spx_use_p : response.data.nombre,
                  spx_use_v : response.data.codvend,
                }
                localStorage.setItem('spx_localdata',JSON.stringify(spx_localdata))
                this.$router.push('/home')
            }
            else{
                 this.colormen='danger'
                console.log(this.textomen)
            }
        })
        .catch(function(error){
            console.log(error)
        })
      },
      deshabilita() {
         this.textomen = false
      }
    },
}
</script>

<style>
body {
  align-items: center;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
