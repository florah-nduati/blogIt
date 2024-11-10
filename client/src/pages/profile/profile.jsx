import React from 'react';
import PersonalInformationUpdateForm from '../../components/personalInformation/personalInformation';
import PersonalBlogsPreview from '../../components/PersonalBlogsPreview/PersonalBlogsPreview';
import PasswordUpdateForm from '../../components/passwordUpdate/passwordUpdate';
import ProfileUpdateForm from '../../components/profileUpdate/profileUpdate';
import "./profile.css"

function Profile() {
  return (
    <div className='profile'>
      
      <PersonalBlogsPreview/>
      <PersonalInformationUpdateForm/>
      <PasswordUpdateForm/>
      <ProfileUpdateForm/>
    </div>
  )
}

export default Profile