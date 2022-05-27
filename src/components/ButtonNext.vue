<template>
  <div class="button-submit">
    <button
      v-if="url === '/conclusaodocadastro'"
      class="button-register"
      @click="goToLastStep"
    >
      CADASTRAR PROFISSIONAL
    </button>
    <button
      v-if="url === '/conclusaodocadastro'"
      class="button-edit-infos"
      @click="editForms"
    >
      Editar cadastro
    </button>
    <button
      v-if="url !== '/conclusaodocadastro'"
      class=""
      type="button"
      @click="verifyFormIsValid"
    >
      PRÓXIMO
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'ButtonNext',
    props: {
      url: {
        type: String,
        required: true,
        default: '',
      },
      checkFormIsValid: {
        type: Function,
        required: false,
        default: () => {},
      }
    },
    computed: {
    ...mapState({
      fullName: state => state.fullName,
      cpf: state => state.cpf,
      phoneNumber: state => state.phoneNumber,
      state: state => state.state,
      city: state => state.city,
      mainSpecialty: state => state.mainSpecialty,
      consultationPrice: state => state.consultationPrice,
      paymentMethods: state => state.paymentMethods,
    }),
  },
    methods: {
      async verifyFormIsValid() {
        const formIsValid =  await this.checkFormIsValid();
        if (formIsValid) {
          this.$router.push(this.url);
        }
      },
      editForms() {
        localStorage.setItem('Data', JSON.stringify({
          fullName: this.fullName,
          cpf: this.cpf,
          phoneNumber: this.phoneNumber,
          state: this.state,
          city: this.city,
          mainSpecialty: this.mainSpecialty,
          consultationPrice: this.consultationPrice,
          paymentMethods: this.paymentMethods,
        }))
        this.$router.push('/');
      },
      goToLastStep() {
        this.$router.push('/conclusaodocadastro');
      }
    }
  }
</script>

<style scoped>
button {
	width: 100%;
	border-radius: 20px;
	background-color: rgb(72, 54, 152);
  border: none;
  padding: 5px;
  color: white;
  font-size: 85%;
}

.button-register {
  text-align: center;
  width: 100%;
  border-radius: 20px;
  border: none;
  background-color: rgb(255, 231, 102);
  color: black;
  padding: 5px 30px;
}

.button-edit-infos {
  background-color: #f9f9f9;
  color: rgb(72, 54, 152);
  font-size: 90%;
  text-align: center;
}
</style>