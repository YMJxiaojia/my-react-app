import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as storeActionsFromFile from '../../../actions/store.js'

import BuyAndStore from '../../../components/BuyAndStore'

class Detail extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			isStore: false
		}
	}
	render() {
    const id = this.props.id
		return (
			<div>
				<BuyAndStore 
					isStore={this.state.isStore}
					buyHandle={this.buyHandle.bind(this)}
					storeHandle={this.storeHandle.bind(this)}
				/>
			</div>
		)
	}
	// 检验商户是否已经被收藏
	checkStoreState() {
		const id = this.props.id
		const store = this.props.store

		store.some(item => { // some函数表示只要有一个满足即可
			if(item.id === id) {
				this.setState({
					isStore: true
				})
				return true
			}
		})
	}
	buyHandle() {
		const loginFlag = this.loginCheck()
		if(!loginFlag) {
			return
		}
		this.props.history.push('/user')
	}
	storeHandle() {
		// 验正登录
		const loginFlag = this.loginCheck()
		if(!loginFlag) {
			return
		}

		const id = this.props.id
		const storeActions = this.props.storeActions
		if(this.state.isStore) { // 已被收藏的状态，点击时要取消收藏
			storeActions.rm({id: id})
		}else {
			storeActions.add({id: id})
		}
		this.setState({
			isStore: !this.state.isStore
		})
	}
	loginCheck() {
		const id = this.props.id
		const userinfo = this.props.userinfo
		if(!userinfo.userName) {
			this.props.history.push('/login' + encodeURIComponent('/detail/' + id))
		}
	}
	componentDidMount() {
		// console.log("sdfj",this.props.store)
		// console.log(this.props.storeActions)
		this.checkStoreState()
	}
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo,
		store: state.store
	}
}

function mapDispatchToProps(dispatch) {
	return {
		storeActions: bindActionCreators(storeActionsFromFile,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail)
