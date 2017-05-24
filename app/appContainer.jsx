import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

//redux流
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFiles from './actions/userinfo'

//本地缓存配置
import { CITYNAME } from './config/localStorekey'
import LocalStore from './util/localStore'

// bundle模型用来异步加载组件
import Bundle from './bundle';

// 不需要异步加载的组件
import HomeContainer from './containers/Home'
import FooterContainer from './components/Footer'

// 异步加载文件
import CityContainer from 'bundle-loader?lazy!./containers/City'

const City = (props) => (
	<Bundle load={CityContainer}>
		{(City) => <City history={props.props.history}/>}
	</Bundle>
)

class AppContainer extends Component{
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
	render(){
		const history = createBrowserHistory();
		return (
			<Router>
			{
				this.state.initDone
				?	<div id="app">
						<Switch>
							<Route exact path="/" component={HomeContainer} />
							<Route exact 
								path="/city" 
								render={props => (
									<City props={props} />
								)} 
							/>
						</Switch>
						<FooterContainer history={history}/>
					</div>
				: <div>正在加载...</div>
			}
			</Router>
		)
	}
	componentDidMount(){
		let cityName = LocalStore.getItem(CITYNAME)
		if(cityName == null){
			cityName = '上海'
		}

		this.props.userInfoActions.update({
			cityName:cityName
		})
		
		this.setState({
			initDone:true
		})
	}
}

function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
		userInfoActions:bindActionCreators(userInfoActionsFromOtherFiles,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppContainer)