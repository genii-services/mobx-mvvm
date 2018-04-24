import React from 'react'
import { StyleSheet } from 'react-native'
import { observable, action, computed } from 'mobx'
import { Provider, observer } from 'mobx-react/native'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import { Intro, Login, Home, List, Detail, Form, Settings } from '../screens'
import stores from '../stores'
import navigationStore from '../stores/navigation'

const app = require('../../app.json')

const MainNavigator = StackNavigator({
	Home: { screen: Home },
	List: { screen: List },
	Detail: { screen: Detail },
	Form: { screen: Form },
	Settings: { screen: Settings },
}, {
	initialRouteName: 'Home',
	navigationOptions: {
		title: app.displayName,
		headerStyle: {
			backgroundColor: 'dodgerblue',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
		headerLeftStyle: {
			paddingLeft: 10,
		},
		headerRightStyle: {
			paddingRight: 10,
		},
	},
})

const RootNavigator = StackNavigator({
	Login: { screen: Login },
	Main: { screen: MainNavigator }
}, {
	headerMode: "none"
})

@observer
export default class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.store = navigationStore
		navigationStore.router = RootNavigator.router
	}

	render() {
		return (
			<Provider {...stores}>
				<RootNavigator
					navigation={addNavigationHelpers({
						dispatch: this.store.dispatch,
						state: this.store.navigationState,
						addListener: () => { /* left empty intentionally */ }
					})}
				/>
			</Provider>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
})