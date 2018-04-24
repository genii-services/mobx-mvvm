import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Right, Input, Button, Icon, Text } from 'native-base'
import { inject } from 'mobx-react'
import { observer} from 'mobx-react/native'
import { observable } from 'mobx'

import { NavigationButton } from '../components'
import stores from '../stores'

@observer
export default class SettingsScreen extends Component {
	static navigationOptions = {
		title:'Settings',
		headerLeft:  <NavigationButton name='ios-arrow-back' onPress={() => stores.navigation.goBack()} color='#fff' />,
	}

	state = {
		text:'0'
	}
	@observable text1 = '1'
	text2 = '2'

	render() {
		console.log('SettingsScreen', this.state.text, this.text1, this.text2)
		return (
			<Container>
				<Content>
					<List>
						<ListItem itemDivider>
							<Left><Text>Login Info</Text></Left>
							<Right><Button small onPress={() => stores.auth.logout()}><Text>Logout</Text></Button></Right>
						</ListItem>
						<ListItem>
							<Left><Text>User Name</Text></Left>
							<Right><Text>{stores.auth.loginInfo.username}</Text></Right>
						</ListItem>
						<ListItem itemDivider>
							<Text>State vs MobX</Text>
						</ListItem>
						<ListItem fixedText>
							<Left>
								<Text>state</Text>
							</Left>
							<Right>
								<TextInput
									onChangeText={(text) => this.setState({text})}
									value={this.state.text}
								/>
							</Right>
						</ListItem>
						<ListItem fixedText>
							<Left>
								<Text>observable</Text>
							</Left>
							<Right>
								<TextInput
									onChangeText={(text) => this.text1}
									value={this.text1}
								/>
							</Right>
						</ListItem>
						{/*<Item fixedText>
							<Left>
								<Text>member variable</Text>
							</Left>
							<Right>
								<TextInput style={{flex:1.9}}
									onChangeText={(text) => this.text2}
									value={this.text2}
								/>
							</Right>
						</Item>*/}
					</List>
				</Content>
			</Container>
		)
	}
}