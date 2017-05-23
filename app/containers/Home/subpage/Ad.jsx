import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HomeAd from '../../../components/HomeAd'
import AdData from '../../../../mock/home/ad'
import {getAdData} from '../../../fetch/home/home'

class  Ad extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: []
    }
  }
  render() {
    return(
      <div>
        {
          this.state.data.length
            ? <HomeAd data={this.state.data}/>
            : <div>加载中...</div>
        }
      </div>
    )
  }
  componentDidMount() {
    // 第一步，调接口
    const result = getAdData();
    // 第二步，拿到结果，如果成功，将字符串转成JSON对象
    result.then(res => {
      if(res.ok) {
        return res.json()
      }else {
        return AdData
      }
    }).then(json => { // 将转换后的数据跟UI组件的显示数据对接起来
      const data = json
      if(data.length) {
        this.setState({
          data: data
        })
      }
    }).catch(err => {
      console.log(err.message)
    })
  }
}

export default Ad
