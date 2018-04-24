import React, { Component } from 'react'
import { Image, FlatList } from 'react-native'
import { Container, Content, Left, Body, Right, ListItem, Text } from 'native-base'
import { Screen, NavigationButton } from '../components'
import { Observer, observer } from 'mobx-react/native'
import authStore from '../stores/auth'
import navigationStore from '../stores/navigation'
import boardStore from '../stores/board'


@observer
export default class List extends Screen {
	static navigationOptions = {
		title: '공지사항',
		headerLeft:  <NavigationButton name='ios-arrow-back' back />,
		headerRight: <NavigationButton name='ios-create' onPress={() => navigationStore.navigate('Form',{title:'ᇂᇂᇂ'})} />,
	}

	render() {
		return (
			<Container>
				<FlatList
					data={boardStore.articles}
					extraData={boardStore.articles.length}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({item}) =>
						<Observer>{() =>
							<ListItem avatar
								onPress={() => navigationStore.navigate(authStore.loginInfo.username == item.author.username ? 'Form' : 'Detail', {item}) }>
								<Left>
									<Text>{item.id}</Text>
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
				/>
			</Container>
		)
	}


}