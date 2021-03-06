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
						<Link to="/city">
							<span>{this.props.cityName}</span>
							&nbsp;
							<i className="icon-angle-down"></i>
						</Link>
					</div>
					<div className={styles["home-header-right"]+" float-right"}>
						<Link to="/user">
							<i className="icon-user"></i>
						</Link>
					</div>
					<SearchInput/>
				</div>
			)
	}
	enterHandle(value) {
		this.props.history.push('/search/all/'+encodeURIComponent(value));
	}
}

export default HomeHeader
