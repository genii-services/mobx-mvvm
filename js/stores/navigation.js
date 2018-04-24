import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { observable, action, computed } from 'mobx'
import { create, persist } from 'mobx-persist'


class NavigationStore {
	@observable headerTitle = "Title"
	@observable.ref navigationState = {
		index: 0,
		routes: [
			{
				key: "Login",
				routeName: "Login",
				params: { title: "Login" }
			}
		],
	}
	// NOTE: the second param, is to avoid stacking and reset the nav state
	@action dispatch = (action, stackNavState = true) => {
		const previousNavState = stackNavState ? this.navigationState : null;
		const newState = (this.navigationState = this.router.getStateForAction(
			action,
			previousNavState
		))
		return true
	}

	navigate(routeName, params, action) {
		this.dispatch(NavigationActions.navigate({
			routeName,
			params
		}))
	}

	goBack() {
		this.dispatch(NavigationActions.pop())
	}

	redirect(routeName) {
		let opt = {
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName,
					//params: { title: "메인" }
				})
			]
		}
		this.dispatch(NavigationActions.reset(opt))
	}
}

// create the state
export default store = new NavigationStore()
