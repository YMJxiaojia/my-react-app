import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import styles from './style.less'

class UserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className={styles["userinfo-container"]}>
                <p>
                    <i className="icon-user"></i>
                    &nbsp;
                    <span>{this.props.userinfo.userName}</span>
                </p>
                <p>
                    <i className="icon-map-marker"></i>
                    &nbsp;
                    <span>{this.props.userinfo.cityName}</span>
                </p>
            </div>
        )
    }
}

export default UserInfo