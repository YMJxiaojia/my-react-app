import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import HomeHeader from '../../components/HomeHeader'

class Home extends Component{
	constructor(props) {
	  super(props);
	  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
				<div>
					<HomeHeader cityName={this.props.userinfo.cityName} history={this.props.history}/>
				</div>
			)
	}
	componentDidMount(){
	}
}

function mapStateToProps(state){
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)