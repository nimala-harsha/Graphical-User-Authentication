import { authConstants } from "../actions/constans"

const initState = {
    user: {},
    authenticated: false,
    authenticating: false,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;

        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticated: true,
                user: action.payload.user
            }
            break;

        case authConstants.LOGIN_FAILED:
            state = {
                ...state,
                authenticating: false
            }
            break;

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break

        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState

            }
            break

        case authConstants.LOGOUT_FAILED:
            state = {
                ...state,
                loading: false
            }
            break

        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break

        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...initState

            }
            break

        case authConstants.SIGNUP_FAILED:
            state = {
                ...state,
                loading: false
            }
            break
    }
    return state;
}