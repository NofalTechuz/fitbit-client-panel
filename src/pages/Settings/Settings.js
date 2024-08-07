import React, { useEffect, useState } from 'react';
import Container from '../../Layouts/Container';
import { NavLink, useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import Loading from '../../Utils/Loading';

const Settings = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Container><Loading /></Container>;
  }

  return (
    <Container>
      <div className="header">
        <div className="left">
          <h1>Settings</h1>
          <ul className="breadcrumb">
            <NavLink to="/dashboard">
              <li>Dashboard</li>
            </NavLink>
            /
            <li>
              <NavLink to="#" className="active">
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom-data" style={{ marginTop: '50px' }}>
        <div className="orders">
          <div className="header">
            <i className="bx bx-cog"></i>
            <h3>Settings</h3>
          </div>
          <div className="profile-container">
            <div className="profile-header">
              <img src={user.profileImage || '/assets/img/defultavtar.png'} alt="Profile" className="profile-image" />
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <p>@{user.username}</p>
            </div>
            <div className="profile-body">
              <div className="profile-info">
                <h3>Personal Information</h3>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {user.isdCode} {user.mobileNumber}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender === '1' ? 'Male' : user.gender === '2' ? 'Female' : 'Other'}
                </p>
              </div>
              <div className="profile-info">
                <h3>Account Details</h3>
                <p>
                  <strong>Role:</strong> {user.role === '1' ? 'Admin' : 'User'}
                </p>
                <p>
                  <strong>Email Verified:</strong> {user.is_email_verified ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Account Active:</strong> {user.is_active ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
