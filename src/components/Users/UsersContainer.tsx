import React from "react";
import { connect } from "react-redux";
import { followSuccess, setCurrentPage, unfollowSuccess, toggleFollowingProgress, requestUsers } from "../../redux/users-reducer.ts";
import Users from './Users.tsx';
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers} from "../../redux/users-selectors.ts";
import { UserType } from '../../types/types.ts'
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType 

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {

        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {

        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() { 
        return <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
            <Users 
                totalUsersCount={this.props.totalUsersCount} 
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
       users: getUsers(state), 
       pageSize: getPageSize(state),
       totalUsersCount: getTotalUsersCount(state),
       currentPage: getCurrentPage(state),
       isFetching: getIsFetching(state),
       followingInProgress: getFollowingInProgress(state)
   } 
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, 
        { follow: followSuccess, unfollow: unfollowSuccess, getUsers: requestUsers} ),
    withAuthRedirect
  )(UsersContainer)