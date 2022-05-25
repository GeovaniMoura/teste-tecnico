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
      selectedMainSpecialty: '',
    }
  },
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
  display: flex;
  align-items: center;
  border-radius: 30px 30px 0 0;
  flex-direction: column;
}

.container-back-page {
  margin: auto;
  margin-left: 15px;
  width: 100%;
  height: 10%;
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
</style>>
