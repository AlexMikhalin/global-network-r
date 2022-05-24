import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {

    if(!profile){
      return <Preloader />
    }

    return (
      <div>
          <div className={s.describtionBlock}>
            {profile && <img src={profile.photos.large} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          </div>
      </div>
    )
}

export default  ProfileInfo;