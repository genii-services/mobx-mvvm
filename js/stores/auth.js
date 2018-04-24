import { AsyncStorage } from 'react-native'
import { observable, action, computed } from 'mobx'
import { create, persist } from 'mobx-persist'
import navigationStore from './navigation'


class AuthStore {
	@persist @observable authToken
	@persist('object') @observable loginInfo = { username:'' }
	@persist('object') @observable userInfo = { }

	@action login() {
		if(!this.loginInfo.username) return alert('Username is missing')
		if(!this.loginInfo.password) return alert('Password is missing')

		/* Put a check routine here
		if(this.loginInfo.username != 'sunny' && this.loginInfo.password == 'nice') {
			return alert('Login information is incorrect')
		}
		*/

		this.authToken = '7328756d-9ec7-403d-8c75-9907d91d0511'
		this.loginInfo.password = undefined
		// download user Info
		this.userInfo = {
			username:this.loginInfo.username,
			email:`${this.loginInfo.username}@mail.com`,
			avatar:{uri:'https://ssproxy.ucloudbiz.olleh.com/v1/AUTH_6a92e249-183a-47ef-870b-b6f2fb771cfa/gae9/trend/cd5c18a5739ae343.orig'},
		}
		navigationStore.redirect('Main')
	}

	@action logout() {
		this.authToken = undefined
		navigationStore.navigate('Login')
	}
}

export default store = new AuthStore()

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})

hydrate('auth', store).then((store) => {
	console.log('authStore hydrated')
	if(store.authToken) return navigationStore.redirect('Main')
})
