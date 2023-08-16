import { authConstants } from "./constans";
import axiosInstance from "../helpers";
import { toast } from "react-hot-toast";


export const SignUp = (data) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.SIGNUP_REQUEST })
        const res = await axiosInstance.post('/auth/Signup', data)

        if (res.status === 201) {
            toast.success('User account created..!', {
                id: 'created'
            })
            dispatch({ type: authConstants.SIGNUP_SUCCESS })
            window.location.href = '/signIn1'
        } else if (res.status === 400) {
            toast.error("User already exist..!", {
                id: 'already'
            })
            dispatch({ type: authConstants.SIGNUP_FAILED })
            window.location.href = '/signUp1'
        } else if (res.status === 404 || res.status === 500) {
            toast.error("Somthing went wrong..!", {
                id: '500'
            })
            dispatch({ type: authConstants.SIGNUP_FAILED })
            
        }
    }
}

export const Login = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST });
            const res = await axiosInstance.post('/auth/login', data)
            console.log(res)
            if (res.status === 200) {
                const user = res.data.payload
                const token = res.data.token
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', JSON.stringify(token))
                toast.success(`Login Successfull, Welcome ${user.fullName}`, {
                    id: 'login'
                })
                window.location.href='/'
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        user,
                        token
                    }
                })
            } else if (res.status === 401) {
                toast.error("No User account under this email address..!")
                dispatch({ type: authConstants.LOGIN_FAILED })
            } else if (res.status === 404) {
                toast.error("Password Incorrect..!")
                dispatch({ type: authConstants.LOGIN_FAILED })
            } else if (res.status === 500) {
                toast.error("somthing went wrong..!")
                dispatch({ type: authConstants.LOGIN_FAILED })
            }else if(res.status === 400){
                toast.error("somthing went wrong..!")
                dispatch({ type: authConstants.LOGIN_FAILED })
            }
        }catch(error){
            toast.error('somthing went wrong..!')
        }

    }
}

export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        localStorage.clear();

        toast.success("Logout successfull..!", {
            id: "logout"
        })
        window.location.href='/'
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })


    }
}


export const isLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                })
            }

        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILED,
                payload: { error: 'Failed to login' }
            })
        }
    }
}


export const pwdRequest = (data) => {
    return async (dispatch) => {
        const res = await axiosInstance.post('/auth/pwdReq', data)
        if (res.status === 201) {
            toast.success('Request Sent Successfully..!')
        } else if (res.status === 404) {
            toast.error('User Not Found..!')
        } else if (res.status === 500) {
            toast.error('Somthing Went Wrong..!')
        }
    }
}

export const passReset = (form) => {
    return async (dispatch) => {
        const res = await axiosInstance.post('/auth/pwdReset', form);

        if (res.status === 201) {
            toast.success('Password Reset Success');
            window.location.href = '/signIn1';
        } else if (res.status === 401) {
            toast.error('Update failed..!');
            window.location.href = '/';
        } else if (res.status === 403) {
            toast.error('No user account found..!');
            window.location.href = '/';
        } else if (res.status === 400) {
            toast.error('This link is expired..!');
            window.location.href = '/';
        } else if (res.status === 402) {
            toast.error('Invalid OTP..!');
            window.location.href = '/';
        }
    };
};



