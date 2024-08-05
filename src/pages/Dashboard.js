import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../Layouts/Container';
import axiosInstance from '../Utils/axiosInstance';
import Loading from '../Utils/Loading';

const Dashboard = () => {
  const [exercises, setExercises] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/exercise');
      console.log(response.data);
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchDietPlans = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/dietplan');
      console.log(response.data);
      setDietPlans(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchHelps = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/helps');
      console.log(response.data);
      setHelps(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises();
    fetchDietPlans();
    fetchHelps();
  }, []);


  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  return (
    <>
      <Container>
        <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>
                <NavLink to="#">Analytics</NavLink>
              </li>
              /
              <li>
                <NavLink to="#" className="active">
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="#" className="report">
            <i className="bx bx-cloud-download"></i>
            <span>Download CSV</span>
          </NavLink>
        </div>

        <ul className="insights">
          <NavLink to="/exercisescategory">
            <li>
              <i className="bx bx-calendar-check"></i>
              <span className="info">
                <h3>{exercises.length}</h3>
                <p>Total Exercises</p>
              </span>
            </li>
          </NavLink>
          <NavLink to="/dietplan"> 
          <li>
            <i className="bx bx-show-alt"></i>
            <span className="info">
              <h3>{dietPlans.length}</h3>
              <p>Total Diet Plans</p>
            </span>
          </li>
            </NavLink>
            <NavLink to="/chat">
          <li>
            <i className="bx bx-line-chart"></i>
            <span className="info">
              <h3>14,721</h3>
              <p>Chat</p>
            </span>
          </li>
          </NavLink>
          <NavLink to="/helps">
          <li>
            <i className="bx bx-dollar-circle"></i>
            <span className="info">
              <h3>{helps.length}</h3>
              <p>Total Helps Documents</p>
            </span>
          </li>
          </NavLink>
        </ul>

        <div className="bottom-data">
          <div className="orders">
            <div className="header">
              <i className="bx bx-receipt"></i>
              <h3>Recent Orders</h3>
              <i className="bx bx-filter"></i>
              <i className="bx bx-search"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img alt="img" src="/assets/img//profile-1.jpg" />
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img alt="img" src="/assets/img//profile-1.jpg" />
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img alt="img" src="/assets/img//profile-1.jpg" />
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <span className="status process">Processing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="reminders">
            <div className="header">
              <i className="bx bx-note"></i>
              <h3>Remiders</h3>
              <i className="bx bx-filter"></i>
              <i className="bx bx-plus"></i>
            </div>
            <ul className="task-list">
              <li className="completed">
                <div className="task-title">
                  <i className="bx bx-check-circle"></i>
                  <p>Start Our Meeting</p>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
              <li className="completed">
                <div className="task-title">
                  <i className="bx bx-check-circle"></i>
                  <p>Analyse Our Site</p>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
              <li className="not-completed">
                <div className="task-title">
                  <i className="bx bx-x-circle"></i>
                  <p>Play Footbal</p>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
