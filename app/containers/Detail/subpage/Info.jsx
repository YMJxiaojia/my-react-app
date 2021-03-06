import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getDetail} from '../../../fetch/detail/detail'
import DetailInfo from '../../../components/DetailInfo'

import InfoData from '../../../../mock/detail/info'

class Info extends Component {
	constructor(props) {
		super(props)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      info: false
    }
	}
	render() {
		return (
			<div>
        {
          this.state.info
          ? <DetailInfo data={this.state.info}/>
          : <div>加载中...</div>
        }
			</div>
		)
	}
  componentDidMount() {
    const id = this.props.id
    const result = getDetail(id)
    result.then(res => {
      if(res.ok) {
        return res.json()
      }else {
        console.log('当前ID：'+id)
        return InfoData
      }
    }).then(json => {
      this.setState({
        info: json
      })
    }).catch(err => {
      console.log(err.message)
    })
  }
}

export default Info
