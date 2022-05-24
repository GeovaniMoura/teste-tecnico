<template>
  <div class="home">
    <FormSobreProfissional />
  </div>
</template>

<script>
// @ is an alias to /src
import FormSobreProfissional from '../components/FormSobreProfissional.vue'

export default {
  name: 'HomeView',
  components: {
    FormSobreProfissional,
  }
}
</script>
