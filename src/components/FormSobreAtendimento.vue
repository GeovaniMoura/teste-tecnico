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
        <label htmlfor="select-main-specialty">Especialidade principal*</label>
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
            value="{{specialty.nome}}"
          >
            {{ specialty.nome }}
          </option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSobreAtendimento',
  data() {
    return {
      mainSpecialtys: [],
      selectedMainSpecialty: '',
    }
  },
  mounted() {
    this.getSpecialty();
  },
  methods: {
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
  height: 88%;
  margin: auto;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 30px 30px 0 0;
  flex-flow: column nowrap;
  justify-content: flex-start;
  padding: 20px;
	padding-top: 20px;
  padding-bottom: 0px;
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
