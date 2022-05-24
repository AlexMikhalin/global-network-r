import React from "react";
import { connect } from "react-redux";
import { followSuccess, setCurrentPage, unfollowSuccess, toggleFollowingProgress, requestUsers } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersSuper, getUsersSuperSelector } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {

        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {

        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() { 
        return <>
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

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, { follow: followSuccess, unfollow: unfollowSuccess, 
        setCurrentPage,
        toggleFollowingProgress, getUsers: requestUsers
    } ),
    withAuthRedirect
  )(UsersContainer);