import { AppStateType } from './redux-store';
import { UserType } from './../types/types';

import { usersAPI } from "../api/api.ts";
import { updateObjectInArray } from "../utils/validators/object-helpers";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type){

        case FOLLOW:

        return { 
            ...state,
             users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case UNFOLLOW:
        return { 
            ...state,
            users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }

        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { 
                ...state, 
                followingInProgress: action.isFetching ? 
                [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
SetCurrentPageType | SetUsersTotalCountType | ToggleIsFetchingType | ToggleFollowingProgressType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
  
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUser = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })


type SetUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}

export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    userId: number
    isFetching: boolean
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


type GetStateType = () => AppStateType
type CurrentDispatchType = Dispatch<ActionsTypes>

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export const requestUsers = (page: number, pageSize: number)
: ThunkType =>{
    return async (dispatch, getState) => {

        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
           
        dispatch(toggleIsFetching(false));
        dispatch(setUser(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
          
    }
    
} 


const _followFlow = async (dispatch: CurrentDispatchType, 
    userId: number, 
    apiMethod: any, 
    actionCreator: (userId) => FollowSuccessActionType | UnfollowSuccessActionType) => {

        dispatch(toggleFollowingProgress(true, userId));

        let response = await apiMethod(userId)
        
        if (response.data.resultCode == 0){
            
            dispatch(actionCreator(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
      
    }

export const follow = (userId: number) : ThunkType =>{
    return async (dispatch) => {
        _followFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
    
} 

export const unfollow = (userId: number): ThunkType =>{
    return async (dispatch) => {
        _followFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
    
} 

export default usersReducer;