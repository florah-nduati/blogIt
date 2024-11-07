import React from 'react';
import PersonalInformationUpdateForm from '../../components/personalInformation/personalInformation';
import PersonalBlogsPreview from '../../components/PersonalBlogsPreview/PersonalBlogsPreview';
import PasswordUpdateForm from '../../components/passwordUpdate/passwordUpdate';

function Profile() {
  return (
    <div>
      <PersonalBlogsPreview/>
      <PersonalInformationUpdateForm/>
      <PasswordUpdateForm/>
    </div>
  )
}

export default Profile