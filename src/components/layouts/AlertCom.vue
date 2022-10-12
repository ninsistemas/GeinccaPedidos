<template>
    <div :class="tipo+colormen" class="alert-dismissible fade show" role="alert" v-if="textomen"> 
      <strong v-if="colormen == 'danger'" >Error</strong> 
      <strong v-else>Procesado</strong> 
      <br> {{ textomen }}
      <!-- button @click="$emit('alcerrar')" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">x</button -->
    </div>
</template>

<script>
export default {
  name: 'AlertCom',
  data(){
      return {
          tipo : 'alert alert-',
      }
  },
  props : [
      'textomen',
      'colormen'
  ]
};
</script>