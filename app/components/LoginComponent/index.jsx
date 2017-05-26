import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import styles from './style.less'


class LoginComponent extends Component{
	constructor(props) {
	  super(props);
	  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	  this.state = {
	  	phone: ''
	  }
	}
	render() {
		// console.log(this.props.loginHandle)
		return(
			<div id={styles["login-container"]}>
        <div className={styles["input-container"]+" phone-container"}>
          <i className="icon-tablet"></i>
          <input 
            type="text" 
            placeholder="输入手机号" 
            onChange={this.changeHandle.bind(this)} 
            value={this.state.username}
          />
        </div>
        <div className={styles["input-container"]+' '+styles["password-container"]}>
          <i className="icon-key"></i>
          <button>发送验证码</button>
          <input type="text" placeholder="输入验证码"/>
        </div>
        <button className={styles["btn-login"]} onClick={this.clickHandle.bind(this)}>登录</button>
    </div>
		)
	}
	changeHandle(e) {
		this.setState({
			phone: e.target.value
		})
	}
	clickHandle() {
		const userName = this.state.phone
		const loginHandle = this.props.loginHandle
		loginHandle(userName)
	}
}
export default LoginComponent
