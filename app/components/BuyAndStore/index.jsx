import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import styles from './style.less'

class BuyAndStore extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return(
      <div className={styles["buy-store-container"] + " clear-fix"}>
        <div className={styles["item-container"] + " float-left"}>
        {
          // 是否已经收藏了
          this.props.isStore
          ? <button className={styles["selected"]} onClick={this.storeClickHandle.bind(this)}>已收藏</button>
          : <button onClick={this.storeClickHandle.bind(this)}>收藏</button>
        }
        </div>
        <div className={styles["item-container"] + " float-right"}>
          <button onClick={this.buyClickHandle.bind(this)}>购买</button>
        </div>
    </div>
    )
  }
  buyClickHandle() {
    this.props.buyHandle()
    }
    storeClickHandle() {
      this.props.storeHandle()
    }
}

export default BuyAndStore
