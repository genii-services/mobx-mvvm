import React, { Component } from 'react'
import { Button } from 'react-native'
import { Icon } from 'native-base'

import { Container } from '../components'
import NavigationButton from './NavigationButton'

export default class Screen extends Component {
	static navigationOptions = {
		headerLeft:  <NavigationButton name='ios-menu' />,
		headerRight: <NavigationButton name='ios-arrow-forward' />,
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Container />
		)
	}
}