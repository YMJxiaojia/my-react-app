import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userInfoActions from '../../actions/userinfo'

import {CITYNAME} from '../../config/localStorekey'
import LocalStore from '../../util/localStore'

class Login extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render() {
		return (
			<div>
				LoginPage
			</div>
		)
	}
  componentDidMount() {
    console.log(this.props)
  }
}

function mapStateToProps(state) {
	return {
		// userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// userInfoActions: bindActionCreators(userInfoActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
