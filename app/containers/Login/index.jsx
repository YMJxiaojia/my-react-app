import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createHistory from 'history/createBrowserHistory'

import * as userInfoActions from '../../actions/userinfo'

import {CITYNAME} from '../../config/localStorekey'
import LocalStore from '../../util/localStore'

import Header from '../../components/Header'
import LoginComponent from '../../components/LoginComponent'

class Login extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			checking: true
		}
	}
	render() {
		return (
			<div>
				<Header title="登录"/>
				{
					this.state.checking
					? <div>visibility login page</div>
					: <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
				}
			</div>
		)
	}
  componentDidMount() {
    console.log(this.props.history)
    // console.log(history)
    this.doCheck()
  }
  loginHandle(userName) { // 登陆之后的业务
  	const actions = this.props.userInfoActions
  	let userinfo = this.props.userinfo
		const hashHistory = this.props.history
  	userinfo.userName = userName
  	actions.update(userinfo)

  	const params = this.props.match.params.prevUrl
  	if(params) {
  		hashHistory.push('/'+params)
  	}else {
  		hashHistory.push('/home')
  	}
  }
  doCheck() {
  	const userinfo = this.props.userinfo
  	if(userinfo.userName) { // 已经登陆
  		this.goUserPage()
  	}else {
  		this.setState({
  			checking: false
  		})
  	}
  }
  goUserPage() {
  	hashHistory.push('/user')
  }
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		userInfoActions: bindActionCreators(userInfoActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
