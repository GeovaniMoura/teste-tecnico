<template>
  <div>
    <h1>Detalhes do Cadastro</h1>
    Nome completo: {{ $store.state.fullName }} <br>
    CPF: {{ $store.state.cpf }} <br>
    phoneNumber: {{ $store.state.phoneNumber }} <br>
    state: {{ $store.state.state }} <br>
    city: {{ $store.state.city }} <br>
    mainSpecialty: {{ $store.state.mainSpecialty }} <br>
    consultationPrice: {{ $store.state.consultationPrice }} <br>
    paymentMethods: {{ $store.state.paymentMethods }} <br>
    <button @click="editForms">
      Editar cadastro
    </button>
  </div>
</template>

<script>
export default {
  name: 'DetalhesDoCadastro',
  data() {
    return {

    }
  },
  methods: {
    editForms() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>>
