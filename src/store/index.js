import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    fullName: '',
    cpf: '',
    phoneNumber: '',
    state: '',
    city: '',
    mainSpecialty: '',
    consultationPrice: 0,
    paymentMethods: [],
  },
  getters: {
  },
  mutations: {
    saveFormInfos: (state, payload) => state[payload.key] = payload.value,
  },
  actions: {
    saveFormInfos: (context, payload) => context.commit('saveFormInfos', payload),
  },
  modules: {
  }
})
