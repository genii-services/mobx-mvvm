import React, { Component } from 'react'
import {  } from 'react-native'
import { Button, Icon } from 'native-base'
import navigationStore from "../stores/navigation"

export default class NavigationButton extends Component {
	state = {  }
	render() {
		return (
			<Button transparent>
				<Icon style={{color:'#fff'}} name={this.props.name} onPress={() => this.handlePress()} />
			</Button>
		)
	}

	handlePress() {
		if(this.props.onPress) this.props.onPress()
		if(this.props.back) navigationStore.goBack()
	}
}