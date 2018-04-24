import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Header, Content, Body, Form, Item, Input, Label, Button, Ico, Text } from 'native-base'
import { inject } from 'mobx-react'
import { observer} from 'mobx-react/native'
import { observable } from 'mobx'
import authStore from '../stores/auth'

@observer
export default class LoginScreen extends Component {
	render() {
		console.log('LoginScreen.render')
		return (
			<Container>
				<Content style={{padding:20}}>
					<Image source={{uri:'https://i0.wp.com/mmiyauchi.com/wp-content/uploads/2017/05/React-icon-mini2.png?fit=800%2C566'}} style={{marginTop:'20%',width:'100%', height:'100%'}}/>>
					<Form style={{paddingHorizontal:0, paddingVertical:20}}>
						<Item fixedLabel last>
							<Label>Username</Label>
							<Input value={authStore.loginInfo.username}
								onChangeText={text => authStore.loginInfo.username = text}
							/>
						</Item>
						<Item fixedLabel last>
							<Label>Password</Label>
							<Input secureTextEntry
								value={authStore.loginInfo.password}
								onChangeText={text => authStore.loginInfo.password = text}
							/>
						</Item>
					</Form>
					<Button full rounded primary
						onPress={() => authStore.login()}>
						<Text style={{color:'white'}}>Login</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}