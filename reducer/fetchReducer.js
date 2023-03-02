import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFOR,
    CLEAR_USERINFO,
    USER_TOKEN,
    CLEAR_TOKEN,
    CHECK_TYPE
} from '../utils/contants'

const initialState = {
    indicator: false,
    userInfo: [],
    token: '',
    checkType: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INDICATOR:
            return {
                ...state,
                indicator: true
            }
        case DISMISS_INDICATOR:
            return {
                ...state,
                indicator: false
            }
        case SAVE_USERINFOR:
            return {
                ...state,
                userInfo: action.payload
            }
        case CLEAR_USERINFO:
            return {
                ...state,
                userInfo: []
            }
        case USER_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case CLEAR_TOKEN:
            return {
                ...state,
                token: ''
            }
        case CHECK_TYPE:
            return {
                ...state,
                checkType: action.payload
            }
        default:
            return state
    }
}