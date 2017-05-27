import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'

class User extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render() {
		const userinfo = this.props.userinfo
		// console.log(userinfo)
		return (
			<div>
				<Header backRouter="/" history={this.props.history} title="用户中心"/>
				<UserInfo userinfo={userinfo}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// appActions: bindActionCreators(appActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)