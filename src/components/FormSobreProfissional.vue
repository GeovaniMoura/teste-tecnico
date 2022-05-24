<template>
	<div class="container">
    <div class="container-main">
      <h1>Sobre o profissional</h1>
      <h2>Dados do profissional</h2>
      <form @submit="checkForm">
        <div class="container-inputs">
          <label htmlFor="nome-completo">Nome Completo*</label>
            <input
              type="text"
              id="nome-completo"
              name="nome-completo"
              v-model="fullName"
              placeholder="Digite o nome completo"
            />
            <span style="color: red">{{ errorFullName }}</span>
        </div>
        <div class="container-inputs container-input-cpf">
          <label htmlFor="cpf">CPF*</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              v-model="cpf"
              placeholder="Digite um CPF"
            />
            <span style="color: red">{{ errorCpf }}</span>
        </div>
        <div class="container-inputs container-input-phone-number">
          <label htmlFor="numero-celular">Número de celular*</label>
            <input
              type="text"
              id="numero-celular"
              name="numero-celular"
              v-model="phoneNumber"
              placeholder="(00) 0 0000-0000"
            />
            <span style="color: red">{{ errorPhoneNumber }}</span>
        </div>
        <div class="container-selects">
          <div class="container-select-estado">
            <label htmlFor="select-estado">Estado*</label>
              <select id="select-estado">
                <option value="" disabled selected>Selecione</option>
                <option>First</option>
              </select>
          </div>
          <div class="container-select-cidade">
            <label htmlFor="select-cidade">Cidade*</label>
              <select id="select-cidade">
                <option value="" disabled selected>Selecione</option>
                <option>First</option>
              </select>
          </div>
        </div>
        <div class="container-progress-bar">
          <div class="progress-bar"></div>
          <span>1 de 2</span>
        </div>
        <button type="submit">PRÓXIMO</button>
      </form>
    </div>
  </div>
</template>

<script>
import { cpf } from 'cpf-cnpj-validator';

export default {
	name: 'FormSobreProfissional',
	data() {
		return {
			fullName: '',
			errorFullName: '',
			cpf: '',
			errorCpf: '',
			phoneNumber: '',
			errorPhoneNumber: '',
			cpfsCadastrados: null,
			errors: [],
		};
	},
	methods: {
		async getCpfs() {
			const req = await fetch(
				'https://api-teste-front-end-fc.herokuapp.com/profissionais',
				{
					method: 'GET',
				}
			);
			const data = await req.json();
			this.cpfsCadastrados = data;
		},
		validateFullName() {
			if (this.fullName.length < 3 || this.fullName.length > 48) {
				this.errorFullName = 'O número de caracteres deve ser de 3 a 48';
				this.errors.push('O número de caracteres deve ser de 3 a 48');
			} else {
				this.errorFullName = '';
			}
		},
		validateCpf() {
			// fetch('https://api-teste-front-end-fc.herokuapp.com').then(async res => {
			//   console.log(res);
			// });
			if (!cpf.isValid(cpf.format(this.cpf))) {
				this.errorCpf = 'CPF inválido';
				this.errors.push('CPF inválido');
			} else {
				this.errorCpf = '';
			}
		},
		validatePhoneNumber() {
			console.log('oi');
		},
		checkForm(event) {
			this.validateFullName();
			this.validateCpf();
			this.validatePhoneNumber();
			this.getCpfs();
			if (!this.errors.length > 0) {
				return true;
			}
			event.preventDefault();
		},
	},
	mounted() {
		this.getCpfs();
	},
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  .container {
    background-color: #FFE766;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: flex-end;
  }

  .container-main {
    background-color: white;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    border-radius: 30px 30px 0 0;
    padding: 20px;
    padding-top: 30px;
    width: 100%;
    height: 91%;
    margin: 0 auto;
    padding-bottom: 30px;
  }

  .container-main h1 {
    color: #3F2796;
    margin-bottom: 20px;
  }

  .container-main h2 {
    color: #0E0E0E;
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 18px
  }

  .container-inputs {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .container-inputs input {
    border-radius: 7px;
    border: 2px solid rgb(71, 53, 151);
    padding: 7px;
    padding-left: 30px;
    margin: 5px 0 20px 0;
    color: #959595;
    width: 100%;
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
    width:100%;
  }

  .container-selects select {
    margin-top: 5px;
    border: 2px solid rgb(71, 53, 151);
    border-radius: 7px;
    background-color: white;
    color: #959595;
    padding: 7px;
  }

  .container-select-estado {
    display: flex;
    flex-flow: column nowrap;
    width: 45%;
  }

  .container-select-cidade {
    display: flex;
    flex-flow: column nowrap;
    width: 45%;
  }

  .container button {
    width: 100%;
    border-radius: 20px;
    background-color: rgb(72, 54, 152);
  }

  .container-progress-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15px;
    background-color: #F9F9F9;
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
    color: rgb(40, 13, 148);
    right: 0;
    position: absolute;
    font-size: 100%;
  }

  @keyframes progress-animation{
    0% { width: 0%; } 
    100% { width: 35%}
  }

  /* @media screen and (min-width: 502px) and (max-width: 800px) {
    
  } */
</style>
