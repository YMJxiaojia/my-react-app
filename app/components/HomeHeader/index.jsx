import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'
import styles from './style.less'

import SearchInput from '../SearchInput'

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
				<div id={styles["home-header"]} className="clear-fix">
					<div className={styles["home-header-left"]+" float-left"}>
						<Link to="/city"></Link>
						<span>{this.props.cityName}</span>
						<i className="icon-angle-down"></i>
					</div>
					<SearchInput/>
					<div className={styles["home-header-right"]+" float-right"}>
						<Link to="/user"></Link>
						<i className="icon-user"></i>
					</div>
				</div>
			)
	}
	enterHandle(value) {
		this.props.history.push('/search/all/'+encodeURIComponent(value));
	}
}

export default HomeHeader