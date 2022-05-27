<template>
  <div class="container">
    <div class="container-back-page">
      <router-link to="/">
        <i class="fa-solid fa-angle-left" />
      </router-link>
    </div>
    <div class="container-main">
      <h1>Sobre o atendimento</h1>
      <h2>Detalhes do atendimento</h2>
      <form>
        <div class="container-select-main-specialty">
          <label for="select-main-specialty">Especialidade principal*</label>
          <select
            id="select-main-specialty"
            v-model="selectedMainSpecialty"
          >
            <option
              value=""
              disabled
              selected
            >
              Selecione a especialidade
            </option>
            <option
              v-for="specialty in mainSpecialtys"
              :key="specialty.id"
            >
              {{ specialty.nome }}
            </option>
          </select>
          <span>{{ errorMainSpecialty }}</span>
        </div>
        <label>Informe o preço da consulta*</label>
        <div class="container-consultation-price">
          <div class="container-input-consultation-price">
            <label htmlFor="input-consultation-price">
              R$
            </label>
            <input
              id="input-consultation-price"
              v-model="consultationPrice"
              type="number"
              min="30"
              max="350"
              placeholder="Valor"
            >
          </div>
          <span>{{ errorConsultationPrice }}</span>
        </div>
        <label id="legends-payment-methods">Formas de pagamento da consulta*</label>
        <div class="container-checkbox-payment-methods">
          <label htmlFor="checkbox-cash">
            <input
              id="checkbox-cash"
              type="checkbox"
              @change="checkboxCash"
            >
            Em dinheiro
          </label>
          <label htmlFor="checkbox-pix">
            <input
              id="checkbox-pix"
              type="checkbox"
              @change="checkboxPix"
            >
            Pix
          </label>
          <div>
            <label for="checkbox-card">
              <input
                id="checkbox-card"
                v-model="valueCheckboxCard"
                type="checkbox"
                @change="checkBoxCard"
              >
              Cartão de crédito
              <div
                v-if="valueCheckboxCard"
                class="conteiner-installment-options"
              >
                <div>
                  <label>Parcelamento em</label>
                </div>
                <div>
                  <label for="firstInstallmenteOption">
                    <input
                      id="firstInstallmenteOption"
                      v-model="selectedInstallmentOption"
                      value="1x sem juros"
                      type="radio"
                      name="installment"
                      @change="radioInputInstallmentOption"
                    >
                    1x, sem juros
                  </label>
                  <label for="secondInstallmentOption">
                    <input
                      id="secondInstallmentOption"
                      v-model="selectedInstallmentOption"
                      value="2x sem juros"
                      type="radio"
                      name="installment"
                      @change="radioInputInstallmentOption"
                    >
                    2x, sem juros
                  </label>
                  <label for="thirdInstallmentOption">
                    <input
                      id="thirdInstallmentOption"
                      v-model="selectedInstallmentOption"
                      value="3x sem juros"
                      type="radio"
                      name="installment"
                      @change="radioInputInstallmentOption"
                    >
                    3x, sem juros
                  </label>
                </div>
              </div>
            </label>
          </div>
          <span v-if="errorSelectedPaymentMethods !== ''">{{ errorSelectedPaymentMethods }}</span>
          <span v-if="errorSelectedInstallmentOption !== ''">{{ errorSelectedInstallmentOption }}</span>
        </div>
        <div class="container-progress-bar">
          <div class="progress-bar" />
          <span>2 de 2</span>
        </div>
        <ButtonNext
          url="/detalhesdocadastro"
          :check-form-is-valid="checkFormIsValid"
        />
      </form>
    </div>
  </div>
</template>

<script>
import ButtonNext from './ButtonNext.vue';
import { mapActions } from 'vuex';

export default {
  name: 'FormSobreAtendimento',
  components: {
    ButtonNext
  },
  data() {
    return {
      mainSpecialtys: [],
      selectedMainSpecialty: '',
      errorMainSpecialty: '',
      consultationPrice: '',
      errorConsultationPrice: '',
      selectedPaymentMethods: [],
      valueCheckboxCard: false,
      selectedInstallmentOption: '',
      errorSelectedInstallmentOption: '',
      errorSelectedPaymentMethods: '',
      errors: [],
    }
  },
  watch: {
    consultationPrice: function () {
      if ((this.consultationPrice.toString().length > 1 && Number(this.consultationPrice) < 30) || Number(this.consultationPrice) > 350) {
        this.errorConsultationPrice = 'Digite um valor entre 30,00 e 350,00';
      } else {
        this.errorConsultationPrice = '';
      }
    },
  },
  mounted() {
    this.getSpecialty();
    
    if (localStorage.getItem('Data')) {
			const saveInfos = JSON.parse(localStorage.getItem('Data'));
			this.selectedMainSpecialty = saveInfos.mainSpecialty;
      console.log(saveInfos.consultationPrice);
			this.consultationPrice = parseFloat(saveInfos.consultationPrice.replace('R$ ', '').replace(',', '.'));
      console.log(this.consultationPrice);
		}
  },
  beforeUpdate() {
    if (localStorage.getItem('Data')) {
      const saveInfos = JSON.parse(localStorage.getItem('Data'));
      this.consultationPrice = parseFloat(saveInfos.consultationPrice.replace('R$ ', '').replace(',', '.'));
    }
  },
  methods: {
    ...mapActions(['saveFormInfos']),
    async getSpecialty() {
      const req = await fetch(
        'https://api-teste-front-end-fc.herokuapp.com/especialidades'
      );
      if (req.status === 404) {
				let errorResponse = await req.json();
				this.errors.push(errorResponse.error);
				return console.log('Not Found');
			} 
			const data = await req.json();
      this.mainSpecialtys = data;
    },
    validateMainSpecialty() {
      if (!this.selectedMainSpecialty.length > 0) {
        this.errorMainSpecialty = 'Selecione uma especialidade';
        this.errors.push('Selecione uma especialidade');
      } else {
        this.errorMainSpecialty = '';
      }
    },
    validateConsultationPrice() {
      if (!this.consultationPrice.toString().length > 1 || Number(this.consultationPrice) < 30 || Number(this.consultationPrice) > 350) {
        this.errorConsultationPrice = 'Digite um valor entre 30,00 e 350,00';
        this.errors.push('Digite um valor entre 30,00 e 350,00');
      } else {
        if (this.consultationPrice.toString().includes('R$')) {
          this.errorConsultationPrice = '';
          return this.consultationPrice = this.consultationPrice.toString().replace('.', ',');
        }
        this.consultationPrice = `R$ ${this.consultationPrice.toString().replace('.', ',')}`;
      }
    },
    validateInstallmentOption() {
      const findCard = this.selectedPaymentMethods.find(item => item === 'Card');
      if (!this.selectedInstallmentOption.length > 0 && findCard ) {
        this.errorSelectedInstallmentOption = 'Selecione a opção de parcelamento';
        this.errors.push('Selecione a opção de parcelamento');
      } else {
        this.errorSelectedInstallmentOption = '';
      }
    },
    checkboxCash({ target }) {
      const findCash = this.selectedPaymentMethods.find(item => item === 'Dinheiro');
      if (target.checked && !findCash) {
        this.selectedPaymentMethods.push('Dinheiro');
      } else {
        this.selectedPaymentMethods = this.selectedPaymentMethods.filter(
          (item) => item !== 'Dinheiro'
        )
      }
    },
    checkboxPix({ target }) {
      const findPix = this.selectedPaymentMethods.find(item => item === 'Pix');
      if (target.checked && !findPix) {
        this.selectedPaymentMethods.push('Pix');
      } else {
        this.selectedPaymentMethods = this.selectedPaymentMethods.filter(
          (item) => item !== 'Pix'
        )
      }
    },
    checkBoxCard({ target }) {
      const findCard = this.selectedPaymentMethods.find(item => item === 'Card');
      if (target.checked && !findCard) {
        this.selectedPaymentMethods.push('Card');
      }
    },
    radioInputInstallmentOption() {
      const findCard = this.selectedPaymentMethods.find(item => item === 'Card');
      if (!findCard) {
        this.selectedInstallmentOption = '';
      }
    },
    validatePaymentMethods() {
      if (!this.selectedPaymentMethods.length > 0) {
        this.errorSelectedPaymentMethods = 'Selecione uma forma de pagamento';
        this.errors.push('Selecione uma forma de pagamento');
      } else {
        this.errorConsultationPrice = '';
      }
    },
    checkFormIsValid() {
      this.validateMainSpecialty();
      this.validateConsultationPrice();
      this.validatePaymentMethods();
      this.validateInstallmentOption();
      if (!this.errors.length > 0) {
        const findCard = this.selectedPaymentMethods.find(item => item === 'Card');
        if (findCard) {
          this.selectedPaymentMethods = [
          ...this.selectedPaymentMethods.filter((item) => item !== 'Card'),
          `Cartão de crédito - Parcelamento em ${this.selectedInstallmentOption}`,
          ]
        }
        if (!this.consultationPrice.includes(',')) {
          this.consultationPrice = `${this.consultationPrice},00`;
        }
        this.saveFormInfos({ key: 'mainSpecialty', value: this.selectedMainSpecialty });
				this.saveFormInfos({ key: 'consultationPrice', value: this.consultationPrice });
				this.saveFormInfos({ key: 'paymentMethods', value: this.selectedPaymentMethods });
        return true;
      }
      this.errors = [];
    }
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

label {
  margin: 5px;
  font-size: 90%
}


span {
  color: #DC3545;
  margin: 5px;
  font-size: 90%;
}

.container {
  background-color: rgb(255, 231, 102);
  height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
}

.container-main {
  background-color: white;
  height: 95%;
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

.container-main h1 {
	color: #3f2796;
	margin-bottom: 20px;
}

.container-main h2 {
	color: #0e0e0e;
	margin-bottom: 15px;
	font-weight: 600;
	font-size: 18px;
}

.container-back-page {
  margin: auto;
  margin-left: 15px;
  height: 10%;
  align-items: center;
  display: flex;
  justify-content: flex-start;
}

.container-select-main-specialty {
  display: flex;
  flex-flow: column nowrap;
}

.container-select-main-specialty select {
	margin-top: 5px;
	border: 2px solid rgb(72, 54, 152);
	border-radius: 7px;
	background-color: white;
	color: #959595;
	padding: 8px;
  width: 100%;
}

.container-consultation-price {
  display: flex;
  flex-flow: column nowrap;
}

.container-input-consultation-price {
  display: flex;
  border: 2px solid rgb(72, 54, 152);
  border-radius: 7px;
}

.container-input-consultation-price label {
  color: white;
  margin: 0;
  padding: 6px 0;
  text-align: center;
  background-color: rgb(72, 54, 152);
  width: 15%;
  font-size: 100%
}

.container-input-consultation-price input {
  border-radius: 7px;
  width: 85%;
  padding: 6px;
  padding-left: 7px;
  border: none;
}

.container-checkbox-payment-methods {
  display: flex;
  flex-flow: column nowrap;
}

.container-checkbox-payment-methods label {
  border-radius: 10px;
  padding: 12px;
  padding-left: 20px;
  margin: 10px;
  margin-left: 0;
  margin-bottom: 15px;
  box-shadow: 0 0.8px 0.8px 0.8px #b9b9b9;
  width: 100%;
}

.container-checkbox-payment-methods input {
  margin-right: 30px; 
}

#legends-payment-methods {
  padding: 0;
  margin: 0;
  box-shadow: none;
  margin: 5px;
  font-size: 90%
}

.conteiner-installment-options input {
  margin: 0;
  padding: 0;
}

.conteiner-installment-options label {
  margin: 0;
  margin-bottom: 8px;
  padding: 0;
  border: none;
  box-shadow: none;
}

.conteiner-installment-options {
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: none;
  padding-left: 52px;
}

.container-progress-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 15px;
	background-color: #f9f9f9;
	position: relative;
	width: 99%;
	margin: 0 auto;
	margin-bottom: 15px;
}

.progress-bar {
	position: absolute;
	height: 100%;
	animation: progress-animation 1.3s;
	width: 75%;
	border-radius: 4px;
	background-color: rgb(72, 54, 152);
}

.container-progress-bar span {
	width: 20%;
	color: rgb(72, 54, 152);
	right: 0;
	position: absolute;
	font-size: 100%;
}
</style>>
