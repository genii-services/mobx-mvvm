import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container } from 'native-base'

export default class Screen extends Component {
	static navigationOptions = {
		title: 'App',
	}

	render() {
		console.log('intro')
		return (
				<Container><Text>123</Text></Container>
		)
	}
}