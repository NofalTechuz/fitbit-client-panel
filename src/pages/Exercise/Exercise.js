import React, { useEffect, useState, useRef } from 'react';
import Container from '../../Layouts/Container';
import { useParams, NavLink } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import Loading from '../../Utils/Loading';

const Exercise = () => {
  const { id } = useParams();

  const [exercise, setExercise] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axiosInstance.get(`/exercise/category/${id}`);
        setExercise(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchExercise();
  }, [id]);




  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      const videoElement = videoRef.current;

      const handleMouseOver = () => {
        videoElement.play();
      };

      const handleMouseOut = () => {
        setTimeout(() => {
          videoElement.pause();
          videoElement.currentTime = 0;
        }, 200000); // Adding a delay of 200ms before pausing
      };

      if (videoElement) {
        videoElement.addEventListener('mouseover', handleMouseOver);
        videoElement.addEventListener('mouseout', handleMouseOut);
      }

      return () => {
        if (videoElement) {
          videoElement.removeEventListener('mouseover', handleMouseOver);
          videoElement.removeEventListener('mouseout', handleMouseOut);
        }
      };
    });
  }, [exercise]);

  const openModal = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo(null);
  };



  if (loading) {
    return <Container><Loading /></Container>;
  }

  return (
    <Container>
      <div className="header">
        <div className="left">
          <h1>Exercises</h1>
          <ul className="breadcrumb">
            <NavLink to="/dashboard">
              <li>Dashboard</li>
            </NavLink>
            /
            <NavLink to="/exercisescategory">
              <li>Exercises Category</li>
            </NavLink>
            /
            <li className="active">
              <NavLink to="#">Exercises</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="exercise-bottom-data">
        <div className="exercise-cards">
          {exercise.length > 0 ? (
            exercise.map((ex, index) => (
              <div key={index} className="exercise-card" onClick={() => openModal(ex.file)}>
                <img src={ex.logo} alt="Exercise Logo" className="exercise-logo" />
                <div className="exercise-info">
                  <h3 className="exercise-name">{ex.name}</h3>
                  <p className="exercise-description">{ex.description}</p>
                  <p className="set-of-exercise">{ex.setOfExercise}</p>
                </div>
                <video
                  key={index}
                  ref={(el) => (videoRefs.current[index] = { current: el })}
                  className="exercise-video"
                  src={ex.file}
                  muted
                ></video>
              </div>
            ))
          ) : (
            <div className="exercise-card">
              <div className="exercise-info">
                <h3 className="exercise-name">No Exercises Available</h3>
                <p className="exercise-description">Coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <video controls autoPlay src={currentVideo} className="modal-video"></video>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Exercise;
