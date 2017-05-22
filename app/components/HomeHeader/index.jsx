import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'
import styles from './style.less'


class HomeHeader extends Component{
	constructor(props) {
	  super(props);
	  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	  this.state = {
	  	keyword:''
	  }
	}
	render(){
		return (
				<h1>HomeHeader</h1>
			)
	}
}

export default HomeHeader