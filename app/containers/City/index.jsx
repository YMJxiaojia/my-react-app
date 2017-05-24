import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

import * as userInfoActions from '../../actions/userinfo'

import {CITYNAME} from '../../config/localStorekey'
import LocalStore from '../../util/localStore'

class City extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render() {
		return (
			<div>
				<Header title="选择城市"/>
				<CurrentCity cityName={this.props.userinfo.cityName}/>
				<CityList changeFn={this.changeCity.bind(this)}/>
			</div>
		)
	}
	changeCity(newCity) {
		if(newCity == null) {
			return
		}
		const userinfo = this.props.userinfo
		userinfo.cityName = newCity
		this.props.userInfoActions.update(userinfo)

		LocalStore.setItem(CITYNAME,newCity)

		this.props.history.push('/')
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
)(City)