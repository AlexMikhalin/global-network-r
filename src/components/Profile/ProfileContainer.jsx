import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';

import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { withRouter } from './withRouter';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    this.props.getUserProfile(2);
    
    this.props.getStatus(2);
  }

  render() {
      return (
      <Profile 
        {...this.props}  
        profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
      )
    }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);