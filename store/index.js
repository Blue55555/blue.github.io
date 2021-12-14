import {
	createStore
} from 'vuex'

const store = createStore({
	state: {
		token: '',
		userInfo: {}
	},
	mutations: {

		setToken(state, token) {
			state.token = token;
		},
		setUserInfo(state, userInfo) {
			state.userInfo = {...userInfo}
		}
	},
	actions: {

	},
	getters: {
		count(state, getters) {
			return state.count
		},
		testArr(state, getters) {
			return state.testArr
		},
	}
})
export default store
