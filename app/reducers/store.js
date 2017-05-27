import * as storeTypes from '../constants/store'

const initialState = []

export default function store(state = initialState, action) {
	switch (action.type) {
		case storeTypes.STORE_UPDATE:
			return action.data
		case storeTypes.STORE_ADD:
			return [action.data, ...state]
		case storeTypes.STORE_RM:
			return state.filter(item => { // 使用filter方法将不符合的项剔除，符合条件的自动组成新的数组
				if (item.id !== action.data.id) {
					return item
				}
			})
		default:
			return state;
	}
}