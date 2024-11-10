import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import useUserStore from '../../pages/store/userStore';
import apiBase from '../../pages/utils/api';
import './profileUpdate.css';

function ProfileUpdateForm() {
  const user = useUserStore((state) => state.user);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [statusText, setStatusText] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedProfile) => {
      const response = await fetch(`${apiBase}/users/profile`, { 
        method: 'PUT',
        body: JSON.stringify(updatedProfile),
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    },
    
    onSuccess: (data) => {
      setMessage('Profile updated successfully.');
      setMessageType('success');
    },
    
    onError: (error) => {
      setMessage(error.message);
      setMessageType('error');
    },
  });

  
  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phoneNumber || '');
      setOccupation(user.occupation || '');
      setBio(user.bio || '');
      setStatusText(user.statusText || '');
      setSecondaryEmail(user.secondaryEmail || '');
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage('');
    
    
    mutate({ 
      phoneNumber, 
      occupation, 
      bio, 
      statusText, 
      secondaryEmail 
    });
  };

  return (
    <div className="profile-update-form">
      <h2>Update Profile</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      
      <form onSubmit={handleUpdateProfile}>

        <label>Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        
        <label>Occupation:
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>
        
        <label>Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        
        <label>Status Text:
          <input
            type="text"
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
          />
        </label>
        
        <label>Secondary Email:
          <input
            type="email"
            value={secondaryEmail}
            onChange={(e) => setSecondaryEmail(e.target.value)}
          />
        </label>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdateForm;




