<template>
  <div class="container-general">
    <div class="container-main">
      <header>
        <h1>Cadastro finalizado!</h1>
      </header>
      <main>
        <img
          src="../assets/design-pag-4.png"
          alt="logo"
        >
        <section>
          <h2>Vamos inovar juntos?</h2>
          <p style="text-align: center; margin-top: 10px">
            Conquiste novos clientes, preencha sua agenda e elimine faltas, seja o melhor médico que você pode ser.
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConclusaoDoCadastro'
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

.container-main {
  background-color: white;
  align-items: center;
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

.container-main h1 {
	color: #3f2796;
  margin-top: 40px;
	margin-bottom: 40px;
}

main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}

main img {
  margin: auto;
}

section {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

section h2 {
  text-align: center;
}
</style>