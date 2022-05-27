<template>
  <div class="container-general">
    <h1>Revisão do Cadastro</h1>
    <div class="container-infos">
      <label>Nome completo</label>
      {{ $store.state.fullName }}
    </div>
    <div class="container-infos">
      <label>CPF</label>
      {{ $store.state.cpf }}
    </div>
    <div class="container-infos">
      <label>Número de celular ou telefone</label>
      {{ $store.state.phoneNumber }}
    </div>
    <div class="container-infos">
      <label>Estado/Cidade</label>
      {{ $store.state.state }} - {{ $store.state.city }}
    </div>
    <div class="container-infos">
      <label>Especialidade principal</label>
      {{ $store.state.mainSpecialty }}
    </div>
    <div class="container-infos">
      <label>Preço da consulta</label>
      {{ $store.state.consultationPrice }}
    </div>
    <div class="container-infos">
      <label>Formas de pagamento da consulta</label>
      <p
        v-for="(methodPayment, index) in $store.state.paymentMethods"
        :key="index"
      >
        {{ methodPayment }}
      </p>
    </div>
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
.container-general {
  display: flex;
  flex-flow: column nowrap;
}

.container-infos {
  display: flex;
  flex-flow: column nowrap;
  font-weight: 350;
}

.container-infos label {
  font-weight: 600;
  margin-top: 20px;
}
</style>>
