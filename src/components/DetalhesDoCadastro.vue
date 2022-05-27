<template>
  <div class="container-general">
    <div class="container-back-page">
      <router-link to="/">
        <i class="fa-solid fa-angle-left" />
      </router-link>
    </div>
    <div class="container-registration-data">
      <h1>Revisão do Cadastro</h1>
      <div class="container-infos">
        <label>Nome completo</label>
        <p>{{ fullName }}</p>
      </div>
      <div class="container-infos">
        <label>CPF</label>
        <p>{{ cpf }}</p>
      </div>
      <div class="container-infos">
        <label>Número de celular ou telefone</label>
        <p>{{ phoneNumber }}</p>
      </div>
      <div class="container-infos">
        <label>Estado/Cidade</label>
        <p>{{ state }} - {{ city }}</p>
      </div>
      <div class="container-infos">
        <label>Especialidade principal</label>
        <p>{{ mainSpecialty }}</p>
      </div>
      <div class="container-infos">
        <label>Preço da consulta</label>
        <p>{{ consultationPrice }}</p>
      </div>
      <div class="container-infos">
        <label>Formas de pagamento da consulta</label>
        <p
          v-for="(methodPayment, index) in paymentMethods"
          :key="index"
        >
          {{ methodPayment }}
        </p>
      </div>
      <div>
        <ButtonNext
          url="/conclusao"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonNext from './ButtonNext.vue';

export default {
  name: 'DetalhesDoCadastro',
  components: {
    ButtonNext,
  },
  computed: {
    ...mapState({
      fullName: state => state.fullName,
      cpf: state => state.cpf,
      phoneNumber: state => state.phoneNumber,
      state: state => state.state.nome,
      city: state => state.city,
      mainSpecialty: state => state.mainSpecialty,
      consultationPrice: state => state.consultationPrice,
      paymentMethods: state => state.paymentMethods,
    }),
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container-general {
  background-color: rgb(255, 231, 102);
  height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
}

.container-registration-data {
  background-color: white;
  height: 90%;
  margin: auto;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  border-radius: 30px 30px 0 0;
  flex-flow: column nowrap;
  justify-content: flex-start;
  padding: 20px;
	padding-top: 20px;
  padding-bottom: 0px;
}

.container-registration-data h1 {
	color: #3f2796;
	margin-bottom: 20px;
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

.container-back-page {
  margin: auto;
  margin-left: 15px;
  height: 10%;
  align-items: center;
  display: flex;
  justify-content: flex-start;
}

</style>>
