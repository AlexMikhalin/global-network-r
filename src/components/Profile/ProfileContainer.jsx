import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';

import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { withRouter } from './withRouter';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

const ProfileContainer = props => {

  
  let { userId } = useParams();
  if(!userId) {
    userId = this.props.authorizedUserId;
    if(!userId){
      this.props.history.push('/login');
    }
  }

  useEffect(() => {
    props.getUserProfile(userId);
    props.getStatus(userId);
  }, []);
  return <Profile 
    {...props} 
    isOwner={!!userId}
    profile={props.profile} 
    status={props.status} 
    updateStatus={props.updateStatus} 
    savePhoto={props.savePhoto}
  />;
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);