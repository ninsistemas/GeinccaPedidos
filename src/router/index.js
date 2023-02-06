import Vue from 'vue'
import VueRouter from 'vue-router' // router

// importar  componentes de rutas
import LoginCom from '../components/views/LoginCom'
import ErrorCom from '../components/views/ErrorCom'
import HomeCom from '../components/views/HomeCom'
import ClienteCom from '../components/views/clientes/ClienteCom'
import PedidoClienteCom from '../components/views/clientes/PedidoClienteCom'
import ProductosCom from '../components/views/productos/ProductosCom'
import DocumentosCom from '../components/views/documentos/DocumentosCom'
import EditarDocumentoCom from '../components/views/documentos/EditarDocumentoCom'

// crear componente de rutas
Vue.component('LoginCom',LoginCom)
Vue.component('ErrorCom',ErrorCom)
Vue.component('HomeCom',HomeCom)
Vue.component('ClienteCom',ClienteCom)
Vue.component('PedidoClienteCom',PedidoClienteCom)
Vue.component('ProductosCom',ProductosCom)
Vue.component('DocumentosCom',DocumentosCom)
Vue.component('EditarDocumentoCom',EditarDocumentoCom)

// use de vue-router
Vue.use(VueRouter)

// definir rutas
const routes = [
  {path:'/',redirect:'/login',name:'LoginCom'},
  {path:'*',component:ErrorCom,name:'errorcom'},
  {path:'/login',component:LoginCom,name:'LoginCom'},
  {path:'/home',component:HomeCom,name:'home'},
  {path:'/clientes',component:ClienteCom,name:'clientecom'},
  {path:'/pedidoclientes',component:PedidoClienteCom,name:'pedidoclientes'},
  {path:'/productos',component:ProductosCom,name:'productos'},
  {path:'/pedidostransito',component:DocumentosCom,name:'pedidostransito'},
  {path:'/editardocumento',component:EditarDocumentoCom,name:'editardocumento'},
]

// crear objeto router
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router;