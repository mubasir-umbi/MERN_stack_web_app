import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, BLOCK_USERS_FAIL, BLOCK_USERS_REQUEST, BLOCK_USERS_SUCCESS, LIST_USERS_FAIL, LIST_USERS_REQUEST, LIST_USERS_SUCCESS } from "../constants/admin"

export const adminLoginReducer = (state={}, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return {loading: true}
        case ADMIN_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case ADMIN_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_LOGOUT:
            return {}
        default:
            return state

    }
}




export const userListReducer = (state={users: []}, action) => {
    switch (action.type) {
        case LIST_USERS_REQUEST:
            return {loading: true}
        case LIST_USERS_SUCCESS:
            return {loading: false, users: action.payload}
        case LIST_USERS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state

        }
    }

    

export const userBlockReducer = (state={}, action) => {
    switch (action.type) {
        case BLOCK_USERS_REQUEST:
            return {loading: true}
        case BLOCK_USERS_SUCCESS:
            return {loading: false, success: true}
        case BLOCK_USERS_FAIL:
            return {loading: false, error: action.payload, success: false}
        default:
            return state

    }
}