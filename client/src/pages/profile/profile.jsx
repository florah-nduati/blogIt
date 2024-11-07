import React from 'react';
import PersonalInformationUpdateForm from '../../components/personalInformation/personalInformation';
import PersonalBlogsPreview from '../../components/PersonalBlogsPreview/PersonalBlogsPreview';

function Profile() {
  return (
    <div>
      <PersonalBlogsPreview/>
      <PersonalInformationUpdateForm/>
    </div>
  )
}

export default Profile