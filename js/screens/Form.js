import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Text, Textarea, Footer } from 'native-base'
import { NavigationButton } from '../components'
import moment from 'moment'
import authStore from '../stores/auth'
import boardStore from '../stores/board'
import navigationStore from '../stores/navigation'


export default class Screen extends Component {
	static navigationOptions = ({ navigation }) => {
		let item = navigation.state.params && navigation.state.params.item
		return {
			title: `Notice ${!item ? 'Entry' : 'Modify'}`,
			headerLeft:  <NavigationButton name='ios-arrow-back' back />,
			headerRight:  item && <NavigationButton name='ios-trash' onPress={() => boardStore.delete(item) } />,
		}
	}

	constructor(props) {
		super(props)
		let params = props.navigation.state.params
		this.item = params && params.item
		if(!this.item) {
			this.isNew = true
			this.item = {
				id:(boardStore.articles.length+1).toString(),
				author:authStore.userInfo,
				updatedAt:moment().format('MM-DD hh:mm'),
			}
		}
	}

	render() {
		return (
			<Container>
				<Content style={{padding:10}}>
					<Form>
						<Item fixedLabel>
							<Label>ID</Label>
							<Input disabled value={this.item.id} />
						</Item>
						<Item fixedLabel>
							<Label>Title</Label>
							<Input value={this.item.title}
								onChangeText={text => this.item.title = text}
							/>
						</Item>
						<Item fixedLabel>
							<Label>Author</Label>
							<Input disabled value={this.item.author && this.item.author.username} />
						</Item>
						<Item fixedLabel>
							<Label>Updated At</Label>
							<Input disabled value={this.item.updatedAt} />
						</Item>
						<Item style={{flexDirection:'column', alignItems:'flex-start'}} fixedLabel last>
							<Label style={{marginTop:10, marginBottom:0}}>Content</Label>
							<Textarea style={{width:'100%'}} rowSpan={5} bordered
								value={this.item.content}
								onChangeText={text => this.item.content = text}
							/>
						</Item>
					</Form>
				</Content>
				<Button full
					onPress={() => boardStore.insertOrUpdate(this.item)}>
					<Text style={{color:'white'}}>{this.isNew ? 'Entry' : 'Modify'}</Text>
				</Button>
			</Container>
		)
	}
}