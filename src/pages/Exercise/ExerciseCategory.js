import React, { useEffect, useState } from 'react';
import Container from '../../Layouts/Container';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import Loading from '../../Utils/Loading';
const ExerciseCategory = () => {
  const [exerciseCategory, setExerciseCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExerciseCategory = async () => {
    try {
      const response = await axiosInstance.get('/exercisecategory');
      setExerciseCategory(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExerciseCategory();
  }, []);

  if (loading) {
    return <Container><Loading /></Container>;
  }

  return (
    <Container>
      <div className="header">
        <div className="left">
          <h1>Exercises Category</h1>
          <ul className="breadcrumb">
            <NavLink to="/dashboard">
              <li>Dashboard</li>
            </NavLink>
            /
            <li className="active">
              <NavLink to="#">Exercises Category</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <ul className="insights">
        {exerciseCategory.length > 0 &&
          exerciseCategory.map((category, index) => (
            <NavLink key={index} to={`/exercisescategory/${category.name}/${category.id}`}>
              <li key={index}>
                <i className="bx bx-calendar-check"></i>
                <span className="info">
                  <h3>{category.name}</h3>
                  {/* <NavLink to={`/exercisescategory/${category.name}/${category.id}`} style={{ }} >Visit Category</NavLink> */}
                </span>
              </li>
            </NavLink>
          ))}
      </ul>
    </Container>
  );
};

export default ExerciseCategory;
