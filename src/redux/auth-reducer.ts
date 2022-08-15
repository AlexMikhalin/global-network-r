import { ResultCodeEnum, ResultCodeForCaptchaEnum } from '../api/api.ts';

import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api.ts";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

export type InitialStateTypeA = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};


export type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: any): InitialStateTypeA => {

    switch(action.type){

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:

        return { 
            ...state,
            ...action.payload,
            }

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType ={
    userId: number | null,
     email: string | null, 
     login: string | null,
     isAuth: boolean
}

type SetAuthUserDataActionType ={
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}

type GetCaptchaUrlSuccessType ={
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string}
}

export const setAuthUserData = (userId: number, email: string, login: string,
     isAuth: boolean): SetAuthUserDataActionType => 
({ type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => 
({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});


export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me();
    
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string | null, password: string| null, rememberMe: boolean, captcha: string| null) => async (dispatch: any) => {

    let loginData = await authAPI.login(email, password, rememberMe, captcha);
        
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    }
    else{
         if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl());
        }

        let messages = loginData.messages.length > 0 ? 
        loginData.messages[0] : 'someError';
        dispatch(stopSubmit('login', {_error: messages}));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {

    let response = await securityAPI.getCaptchaUrl();
        
    const captchaUrl = response.data.url;
  
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) =>  {

    let response = await authAPI.login();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;