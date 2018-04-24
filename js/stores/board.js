import { AsyncStorage } from 'react-native'
import { observable, action, computed } from 'mobx'
import { create, persist } from 'mobx-persist'
import navigationStore from './navigation'
import _ from 'lodash'

const initialData = require('../data/board')

class BoardStore {
	@persist('list') @observable articles = observable.array(initialData)


	get newestArticles() {
		return _.sortBy(this.articles, o => -Number(o.id)).slice(0, 4)	// 최신순으로 정렬해서 가장 최신 4개만 반환
	}

	getArticleIndex(article) {
		if(!article) return -1
		return _.findIndex(this.articles, { id: article.id || article.index })
	}

	@action insert(article) {
		if(!article) return
		let newArticle = {id:article.index, ...article}
		this.articles.push(newArticle)
		navigationStore.goBack()
	}

	@action update(article) {
		let idx = this.getArticleIndex(article)
		if(0 <= idx) {
			let newArticle = {id:article.index, ...article}
			this.articles[idx] = newArticle
		}
		navigationStore.goBack()
	}

	insertOrUpdate(article) {
		if(!article) return
		let newArticle = {id:article.index, ...article}
		let idx = this.getArticleIndex(article)
		if(0 > idx) this.articles.push(newArticle)
		else this.articles[idx] = newArticle
		setTimeout(() => navigationStore.goBack(), 100)
	}

	@action delete(article) {
		let idx = this.getArticleIndex(article)
		if(0 <= idx) {
			this.articles.splice(idx, 1)
		}
		navigationStore.goBack()
	}

	@action like(article) {
		let idx = this.getArticleIndex(article)
		if(0 <= idx) {
			this.articles[idx].likes = (this.articles[idx].likes || 0) + 1
		}
	}

	@action comment(article, text) {
		if(!text) return
		let idx = this.getArticleIndex(article)
		if(0 <= idx) {
			this.articles[idx].comments.push(text)
		}
	}
}

// create the state
export default store = new BoardStore()

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})

hydrate('board', store).then(() => console.log('boardStore hydrated'))