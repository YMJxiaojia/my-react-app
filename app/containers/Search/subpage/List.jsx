import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import {getSearchData} from '../../../fetch/search/search'
import ListData from '../../../../mock/search/list'

const initialState = {
	data: [],
	hasMore: false,
	isLoadingMore: false,
	page: 0
}

class SearchList extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = initialState
	}
	render() {
		return (
			<div>
				{
					this.state.data.length
					? <ListCompoent data={this.state.data}/>
					: <div>loading...</div>
				}
				{
					this.state.hasMore
					? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
					: ''
				}
			</div>
		)
	}
	componentDidMount() {
		this.loadFirstPageData()
	}
	loadFirstPageData() {
		const cityName = this.props.userinfo.cityName
		const keyword = this.props.keyword || ''
		const category = this.props.category
		const result = getSearchData(0,cityName,category,keyword)
		this.resultHandle(result)
	}
	loadMoreData() {
		this.setState({
			isLoadingMore: true
		})
		const cityName = this.props.userinfo.cityName
		const page = this.state.page
		const keyword = this.props.keyword || ''
		const category = this.props.category
		const result = getSearchData(page,cityName,category,keyword)
		this.resultHandle(result)
	}
	resultHandle(result) {
		const page = this.state.page
		this.setState({
			page: page + 1
		})
		result.then(res => {
			if(res.OK) {
				return res.json()
			}else {
				return ListData
			}
		}).then(json => {
			const hasMore = json.hasMore
			const data = json.data
			this.setState({
				hasMore: hasMore,
				data: this.state.data.concat(data),
				isLoadingMore: false
			})
		}).catch(err => {
			console.log(err.message)
		})
	}
	componentDidUpdate(prevProps,prevState) {
		const keyword = this.props.keyword
		const category = this.props.category
		if(keyword===prevProps.keyword && category===prevProps.category) {
			return
		}
		this.setState(initialState)
		this.loadFirstPageData()
	}
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchList)