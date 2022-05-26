import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
      <div>
          <ProfileInfo 
          isOwner={props.isOwner}
           profile={props.profile} 
          status={props.status} 
          saveProfile={props.saveProfile}
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto}
          />
          <MyPostsContainer />
      </div>
    )
}

export default  Profile;