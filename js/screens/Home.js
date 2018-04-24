import React, { Component } from 'react'
import { Image, FlatList } from 'react-native'
import { Container, Header, Content, Card, CardItem, Form, Item, Input, Label, Button, Icon, Text, Footer, FooterTab, ListItem, Left, Body, Right, Thumbnail } from 'native-base'
import { Observer, observer } from 'mobx-react/native'
import { NavigationButton } from '../components'
import authStore from '../stores/auth'
import navigationStore from '../stores/navigation'
import boardStore from '../stores/board'


@observer
export default class HomeScreen extends Component {
	static navigationOptions = {
		title:'Home',
		headerLeft:  <NavigationButton name='ios-menu' onPress={() => alert('TODO: Open the Drawer')} color='#fff' />,
		headerRight: <NavigationButton name='ios-settings' onPress={() => navigationStore.navigate('Settings')} color='#fff' />,
	}

	render() {
		console.log('home screen')
		return (
			<Container>
				<Content>
					<Card>
						<CardItem>
							<Label>Total count of Notice: </Label>
							<Text>{boardStore.articles.length}</Text>
						</CardItem>
					</Card>
					<Card>
						<FlatList
							data={boardStore.newestArticles}
							keyExtractor={(item, index) => item.id}
							ListHeaderComponent={() =>
								<CardItem header>
									<Text>Newest of Notice</Text>
								</CardItem>
							}
							renderItem={({item}) =>
								<Observer>{() =>
									<ListItem avatar
										onPress={() => navigationStore.navigate(authStore.loginInfo.username == item.author.username ? 'Form' : 'Detail', {item}) }>
										<Left>
											<Thumbnail small source={item.author.avatar} />
										</Left>
										<Body>
											<Text>{item.title}</Text>
										</Body>
										<Right>
											<Text>{item.author.username}</Text>
											<Text note>{item.updatedAt}</Text>
										</Right>
									</ListItem>
								}</Observer>
							}
							ListFooterComponent={() =>
								<CardItem style={{justifyContent:'flex-end'}} footer>
									<Text>Counter: {boardStore.newestArticles.length}</Text>
								</CardItem>
							}
						/>
					</Card>
				</Content>
				<Footer>
					<FooterTab>
					<Button vertical active
						onPress={() => navigationStore.navigate('List')}>
						<Icon name="ios-megaphone" />
						<Text>Notice</Text>
					</Button>
					<Button vertical>
						<Icon name="camera" />
						<Text>Albums</Text>
					</Button>
					<Button vertical>
						<Icon name="ios-chatbubbles" />
						<Text>Chatting</Text>
					</Button>
					<Button vertical>
						<Icon name="person" />
						<Text>Persons</Text>
					</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}