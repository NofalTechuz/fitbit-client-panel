import React, { useEffect, useState } from 'react';
import Container from '../../Layouts/Container';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import Loading from '../../Utils/Loading';

const Helps = () => {
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHelps = async () => {
    try {
      const response = await axiosInstance.get('/helps');
      setHelps(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHelps();
  }, []);

  const checkFileType = (fileType) => {
    if (fileType == 1) {
      return 'pdf';
    } else if (fileType == 2) {
      return 'video';
    } else if (fileType == 3) {
      return 'image';
    } else if (fileType == 4) {
      return 'audio';
    } else {
      return 'file';
    }
  };

  if (loading) {
    return <Container><Loading /></Container>;
  }

  return (
    <Container>
      <div className="header">
        <div className="left">
          <h1>Helps</h1>
          <ul className="breadcrumb">
            <NavLink to="/dashboard">
              <li>Dashboard</li>
            </NavLink>
            /
            <li>
              <NavLink to="#" className="active">
                Helps
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom-data" style={{ marginTop: '50px' }}>
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>File Type</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {helps.length > 0 ? (
                helps.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <span className="status completed">{checkFileType(item.fileType)}</span>
                    </td>
                    <td style={{width:"150px"}}>
                      <a className="download-btn" href={item.file} target="_blank" >
                        <i className="bx bx-cloud-download"></i>
                        <span>Download</span>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No helps found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Helps;
