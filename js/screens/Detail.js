import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Header, Left, Body, Right, Card, CardItem, Content, Button, Icon, Label, Text, Thumbnail } from 'native-base'
import { Observer, observer } from 'mobx-react/native'
import _ from 'lodash'
import { NavigationButton } from '../components'
import boardStore from '../stores/board'

@observer
export default class Screen extends Component {
	static navigationOptions = {
		title:'Article',
		headerLeft:  <NavigationButton name='ios-arrow-back' onPress={() => stores.navigation.goBack()} color='#fff' />,
		headerLeft:  <NavigationButton name='ios-arrow-back' back />,
	}

	constructor(props) {
		super(props)
		let params = props.navigation.state.params
		this.item = params && params.item || {}
	}

	render() {
		return (
			<Container>
				<Content style={{padding:10}}>
					<Card>
						<CardItem header>
							<Text>{this.item.id}. </Text>
							<Text>{this.item.title}</Text>
						</CardItem>
						{this.item.author && <CardItem>
							<Left>
								<Thumbnail source={this.item.author.avatar} />
								<Body>
									<Text>{this.item.author.username}</Text>
									<Text note>{this.item.author.email}</Text>
								</Body>
							</Left>
						</CardItem>}
						<CardItem>
							<Text>{this.item.content}</Text>
						</CardItem>
						<CardItem>
							<Text>Updated At </Text>
							<Text>{this.item.updatedAt}</Text>
						</CardItem>
						<CardItem>
							<Left>
								<Button transparent
									onPress={() => boardStore.like(this.item)}>
									<Icon active name="thumbs-up" />
									<Text>{this.item.likes || 0} likes</Text>
								</Button>
							</Left>
							<Body>
							</Body>
							<Right>
								<Button transparent
									onPress={() => boardStore.comment(this.item, 'OK')}>
									<Icon active name="chatbubbles" />
									<Text>{this.item.comments && this.item.comments.length || 0} comments</Text>
								</Button>
							</Right>
						</CardItem>
					</Card>
				</Content>
			</Container>
		)
	}
}