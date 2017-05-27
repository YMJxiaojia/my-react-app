import {
	combineReducers
} from 'redux'
import userinfo from './userinfo'
import app from './app'
import store from './store'

export default combineReducers({
	userinfo,
	app,
	store
})