<template>
  <div class="container">
    <div class="container-main">
      <h1>Sobre o profissional</h1>
      <h2>Dados do profissional</h2>
      <form>
        <div class="container-inputs">
          <label htmlFor="nome-completo">Nome Completo*</label>
          <input
            id="nome-completo"
            v-model="fullName"
            type="text"
            name="nome-completo"
            placeholder="Digite o nome completo"
          >
          <span style="color: #DC3545">{{ errorFullName }}</span>
        </div>
        <div class="container-inputs container-input-cpf">
          <label htmlFor="cpf">CPF*</label>
          <input
            id="cpf"
            v-model="cpf"
            type="text"
            name="cpf"
            placeholder="Digite um CPF"
          >
          <span style="color: #DC3545">{{ errorCpf }}</span>
        </div>
        <div class="container-inputs container-input-phone-number">
          <label htmlFor="numero-celular">Número de celular*</label>
          <input
            id="numero-celular"
            v-model="phoneNumber"
            type="text"
            name="numero-celular"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
            maxlength="11"
            placeholder="(00) 0 0000-0000"
          >
          <span style="color: #DC3545">{{ errorPhoneNumber }}</span>
        </div>
        <div class="container-selects">
          <div class="container-select-estado">
            <label htmlFor="select-estado">Estado*</label>
            <select
              id="select-estado"
              v-model="selectedState"
              @change="async ({ target }) => await getCitys(target)"
            >
              <option
                value=""
                disabled
                selected
              >
                Selecione
              </option>
              <option
                v-for="state in states"
                :key="state.id"
                value="{{ state.sigla }}"
              >
                {{ state.sigla }}
              </option>
            </select>
            <span style="color: #DC3545">{{ errorState }}</span>
          </div>
          <div class="container-select-cidade">
            <label htmlFor="select-cidade">Cidade*</label>
            <select
              id="select-cidade"
              v-model="selectedCity"
            >
              <option
                value=""
                disabled
                selected
              >
                Selecione
              </option>
              <option
                v-for="city in citys"
                :key="city.id"
                value="{{city.nome}}"
              >
                {{ city.nome }}
              </option>
            </select>
            <span style="color: #DC3545">{{ errorCity }}</span>
          </div>
        </div>
        <div class="container-progress-bar">
          <div class="progress-bar" />
          <span>1 de 2</span>
        </div>
        <ButtonNext
          url="/sobreatendimento"
          :check-form-is-valid="checkFormIsValid"
        />
      </form>
    </div>
  </div>
</template>

<script>
import ButtonNext from './ButtonNext.vue'
import { cpf } from 'cpf-cnpj-validator';
const parse = require('telefone/parse');

export default {
	name: 'FormSobreProfissional',
  components: {
    ButtonNext,
  },
	data() {
		return {
			fullName: '',
			errorFullName: '',
			cpf: '',
			errorCpf: '',
			phoneNumber: '',
			errorPhoneNumber: '',
			states: [],
			selectedState: '',
			errorState: '',
			citys: [],
			selectedCity: '',
			errorCity: '',
			errors: [],
		};
	},
	watch: {
		cpf: async function () {
			if (
				this.cpf.substring(3, 4) !== '.' ||
				this.cpf.substring(6, 7) !== '.' ||
				this.cpf.substring(11, 12) !== '-'
			) {
				this.cpf = cpf.format(this.cpf);
			}
			if (this.cpf.length === 14) {
				const data = await this.getCpfs();
				const find = data.find((item) => cpf.format(item.cpf) === this.cpf);
				if (find) {
					this.errorCpf = 'CPF já cadastrado';
				}
			}
		},
	},
	mounted() {
		this.getStates();
	},
	methods: {
		async getCpfs() {
			const req = await fetch(
				'https://api-teste-front-end-fc.herokuapp.com/profissionais'
			);
			if (req.status === 404) {
				let errorResponse = await req.json();
				this.errors.push(errorResponse.error);
				return console.log('Not Found');
			} 
			const data = await req.json();
			return data;
		},
		async getStates() {
			const req = await fetch(
				'https://api-teste-front-end-fc.herokuapp.com/estados'
			);
			if (req.status === 404) {
				let errorResponse = await req.json();
				this.errors.push(errorResponse.error);
				return console.log('Not Found');
			} 
			const data = await req.json();
			this.states = data;
		},
		async getCitys(target) {
				const selectedState = this.states.find(
					(item) => item.sigla === target.value
				);
				const req = await fetch(
					`https://api-teste-front-end-fc.herokuapp.com/estados/${selectedState.id}/cidades`
				);
				if (req.status === 404) {
					let errorResponse = await req.json();
					this.errors.push(errorResponse.error);
					return console.log('Not Found');
				}
				const data = await req.json();
				this.citys = data;
		},
		validateFullName() {
			if (this.fullName.length < 3 || this.fullName.length > 48) {
				this.errorFullName = 'Insira de 3 a 48 caracteres';
				this.errors.push('Insira de 3 a 48 caracteres');
			} else {
				this.errorFullName = '';
			}
		},
		validateCpf() {
			if (!cpf.isValid(cpf.format(this.cpf))) {
				this.errorCpf = 'CPF inválido';
				this.errors.push('CPF inválido');
			} else {
				this.errorCpf = '';
			}
		},
		validatePhoneNumber() {
			const validPhone = parse(this.phoneNumber, { apenasCelular: true });

			if (!validPhone) {
				this.errorPhoneNumber = 'Número de celular inválido';
				this.errors.push('Número de celular inválido');
			} else {
				this.errorPhoneNumber = '';
			}
		},
		validateState() {
			if (!this.selectedState.length > 0) {
				this.errorState = 'Selecione um estado';
				this.errors.push('Selecione um estado');
			} else {
				this.errorState = '';
			}
		},
		validateCity() {
			if (!this.selectedCity.length > 0) {
				this.errorCity = 'Selecione uma cidade';
				this.errors.push('Selecione uma cidade');
			} else {
				this.errorCity = '';
			}
		},
		async checkFormIsValid() {
			this.validateFullName();
			this.validateCpf();
			this.validatePhoneNumber();
			await this.getCpfs();
			this.validateState();
			this.validateCity();
			if (!this.errors.length > 0) {
				return this.validForm = true;
			}
			this.errors = [];
		},
	},
};
</script>

<style scoped>
/* Estilizado na resolução 300 x 640 */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.container {
	background-color: #ffe766;
	height: 100vh;
	min-width: 100vw;
	display: flex;
}

.container-main {
	background-color: white;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	border-radius: 30px 30px 0 0;
	padding: 20px;
	padding-top: 20px;
	width: 100%;
	height: 90%;
	margin: auto;
	margin-bottom: 0;
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

.container-inputs {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.container-inputs input {
	border-radius: 7px;
	border: 2px solid rgb(72, 54, 152);
	padding: 5px;
	padding-left: 30px;
	margin: 5px 0 0 0;
	color: #959595;
	width: 100%;
}

.container-inputs span {
	margin-bottom: 8px;
	font-size: 80%;
}

.container-input-cpf {
	width: 70%;
}

.container-input-phone-number {
	width: 70%;
}

.container-selects {
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
	margin: 0 auto;
	margin-bottom: 8%;
	width: 100%;
}

.container-selects select {
	margin-top: 5px;
	border: 2px solid rgb(72, 54, 152);
	border-radius: 7px;
	background-color: white;
	color: #959595;
	padding: 5px;
}

.container-select-estado {
	display: flex;
	flex-flow: column nowrap;
	width: 45%;
}

.container-select-estado span, .container-select-cidade span {
	font-size: 80%;
}

.container-select-cidade {
	display: flex;
	flex-flow: column nowrap;
	width: 45%;
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
	width: 35%;
	border-radius: 4px 0 0 4px;
	background-color: rgb(72, 54, 152);
}

.container-progress-bar span {
	width: 20%;
	color: rgb(72, 54, 152);
	right: 0;
	position: absolute;
	font-size: 100%;
}

@keyframes progress-animation {
	0% {
		width: 0%;
	}
	100% {
		width: 35%;
	}
}

/* @media screen and (min-width: 502px) and (max-width: 800px) {
    
  } */
</style>
