import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import styles from './style.less'

class LoadMore extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return(
      <div className={styles["load-more"]} ref="wrapper">
        {
          this.props.isLoadingMoredev
          ? <span>加载中...</span>
          : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }
  componentDidMount() {
    const wrapper = this.refs.wrapper
    const loadMoreFn = this.props.loadMoreFn
    function callback() {
      const top = wrapper.getBoundingClientRect().top
      const windowHeight = window.screen.height
      if(top && top < windowHeight) {
        loadMoreFn()
      }
    }
    /*
    * 1. 外部定义变量用来存储定时器
    * 2. 在滚动事件里面判断那个变量有没有存定时器
    * 3. 定时器搞起来，用之前的变量存起来
    */
    let timeAction
    window.addEventListener('scroll',() => {
      if(this.props.isLoadingMore) {
        return
      }
      if(timeAction) {
        clearTimeout(timeAction)
      }
      timeAction = setTimeout(callback,50)
    })
  }
  loadMoreHandle(){
		this.props.loadMoreFn();
	}
}

export default LoadMore
