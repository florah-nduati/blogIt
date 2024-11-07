import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import useUserStore from '../../pages/store/userStore';
import apiBase from '../../pages/utils/api';
//import './information.css ';

function PersonalInformationUpdateForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAdress, setEmailAdress] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedUserObj) => {
      const response = await fetch(`${apiBase}/users`, {
        method: 'PUT',
        body: JSON.stringify(updatedUserObj),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      setUser(data);
      setMessage('Your information has been successfully updated!');
      setMessageType('success');
    },

    onError: (err) => {
      setMessage(`Error: ${err.message}`);
      setMessageType('error');
    },
  });

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmailAdress(user.emailAdress);
    setUserName(user.userName);
  }, [user]);

  function handleUpdatePersonalInformation(e) {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!firstName) {
      setMessage('First name is required.');
      setMessageType('error');
      return;
    }
    if (!lastName) {
      setMessage('Last name is required.');
      setMessageType('error');
      return;
    }
    if (!emailAdress) {
      setMessage('Email address is required.');
      setMessageType('error');
      return;
    }
    if (!userName) {
      setMessage('Username is required.');
      setMessageType('error');
      return;
    }

    // Proceed with mutation if all fields are valid
    mutate({ firstName, lastName, emailAdress, userName });
  }

  return (
    <div className="personal-info-update-form">
      <h2 className="form-title">Update Personal Information</h2>

      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleUpdatePersonalInformation} className="form">
        <div className="form-group">
          <label htmlFor="first-name" className="form-label">First Name:</label>
          <input
            type="text"
            id="first-name"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name" className="form-label">Last Name:</label>
          <input
            type="text"
            id="last-name"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email-address" className="form-label">Email Address:</label>
          <input
            type="email"
            id="email-address"
            className="form-input"
            value={emailAdress}
            onChange={(e) => setEmailAdress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Info'}
        </button>
      </form>
    </div>
  );
}

export default PersonalInformationUpdateForm;

