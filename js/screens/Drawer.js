import React, { Component } from 'react'
import { Button } from 'react-native'
import { Icon } from 'native-base'

import { Container } from '../components'

export default class Screen extends Component {
	static navigationOptions = {
		headerLeft:  <Icon name='ios-menu' onPress={() => alert('This is a button!')} color='#fff' />,
		headerRight: <Icon name='ios-arrow-forward' onPress={() => alert('This is a button!')} color='#fff' />,
	}
	render() {
		return (
			<Container />
		)
	}
}