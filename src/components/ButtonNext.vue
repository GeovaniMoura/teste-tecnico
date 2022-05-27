<template>
  <div class="button-submit">
    <button
      type="button"
      @click="verifyFormIsValid"
    >
      PRÓXIMO
    </button>
  </div>
</template>

<script>
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
        required: true,
        default: () => {},
      }
    },
    methods: {
      async verifyFormIsValid() {
        const formIsValid =  await this.checkFormIsValid();
        if (formIsValid) {
          this.$router.push(this.url)
        }
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
}
</style>