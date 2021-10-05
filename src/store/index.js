import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		round: true,
	},
	actions: {
	},
	getters: {
	},
	mutations: {
		toggleRound(value) {
			console.log('toggle round', value);
			this.state.round = value;
		},
	},
})
