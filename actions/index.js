import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFOR,
    CLEAR_USERINFO,
    USER_TOKEN,
    CLEAR_TOKEN,
    CHECK_TYPE,
} from '../utils/contants'


/**
 * 
 * Indicator controll
 */
export function indicatorControll(event) {
    return (dispatch) => {
        if (event) {
            dispatch(openIndicator())
        } else {
            dispatch(dismissIndicator())
        }
    }
}

export const openIndicator = (data) => ({
    type: OPEN_INDICATOR
})

export const dismissIndicator = (data) => ({
    type: DISMISS_INDICATOR
})
/**
 * End
 */

/**
 * User info
 */
export function userInfoControll(event, data) {
    return (dispatch) => {
        if (event == 'save') {
            dispatch(saveUserInfo(data))
        } else if (event == 'clear') {
            dispatch(clearUserInfo())
        }
    }
}

export const saveUserInfo = (data) => ({
    type: SAVE_USERINFOR,
    payload: data
})

export const clearUserInfo = (data) => ({
    type: CLEAR_USERINFO
})
/**
* End
*/

/**
 * Token
 */
export function tokenControll(event, data) {
    return (dispatch) => {
        if (event == 'save') {
            dispatch(saveToken(data))
        } else if (event == 'clear') {
            dispatch(clearToken())
        }
    }
}

export const saveToken = (data) => ({
    type: USER_TOKEN,
    payload: data
})

export const clearToken = (data) => ({
    type: CLEAR_TOKEN
})

/**
 * End
 */

/**
 * Check Type
 */
export function CheckTypeControll(data) {
    return (dispatch) => {
        dispatch(changeTypeCheck(data))
    }
}

export const changeTypeCheck = (data) => ({
    type: CHECK_TYPE,
    payload: data
})