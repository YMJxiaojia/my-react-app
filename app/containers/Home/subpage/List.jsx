import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getListData} from '../../../fetch/home/home'
import HomeList from '../../../components/List'
// import LoadMore from '../../../components/LoadMore'

import ListData from '../../../../mock/home/list'

import styles from './style.less'

class List extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			hasMore: false,
			data: [],
			isLoadingMore: false,
			page: 0
		}
	}
	render() {
		return (
			<div>
				<h2 className={styles["home-list-title"]}>猜你喜欢</h2>
				{
					this.state.data.length
					? <HomeList data={this.state.data}/>
					: <div>{this.state.data.length} 页</div>
				}
				{
					/*this.state.hasMore
						? <LoadMore isLoadingMore={this.state.isLoadingMore} LoadMoreFn={this.LoadMoreData.bind(this)}/>
						: ''*/
				}
			</div>
		)
	}
	componentDidMount() {
		const cityName = this.props.cityName
		// console.log(cityName)
		const result = getListData(cityName,0)
		this.resultHandle(result)
	}
	resultHandle(result) {
		result.then(res => {
			if(res.ok) {
				// console.log('成功')
				return res.json()
			}else {
				console.log("当前城市"+this.props.cityName)
				console.log("当前页码数"+this.state.page)
				return ListData
			}
		}).then(json => {
			const data = json.data
			const hasMore = json.hasMore
			// console.log(this.setState)
			this.setState({
				hasMore: hasMore,
				data: this.state.data.concat(data),
				isLoadingMore: false
			})
		}).then(()=>{
			console.log(this.state)
		})/*.catch(err => {
			console.log(this.state.data)
			// console.log(err.message) 
		})*/
	}
}

export default List