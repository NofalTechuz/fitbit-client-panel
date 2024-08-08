import React, { useEffect, useState } from 'react';
import Container from '../../Layouts/Container';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import Loading from '../../Utils/Loading';

const Helps = () => {
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', file: '' });

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
    switch (fileType) {
      case 1: return 'pdf';
      case 2: return 'video';
      case 3: return 'image';
      case 4: return 'audio';
      default: return 'file';
    }
  };

  const handleDownloadClick = (fileType, file) => {
    setModalContent({ type: checkFileType(fileType), file });
    setModalOpen(true);
  };

  const renderModalContent = () => {
    const { type, file } = modalContent;

    switch (type) {
      case 'video':
        return <video src={file} controls className="modal-video" />;
      case 'pdf':
        return (
          <div className="pdf-container">
          <iframe
            src={modalContent.file}
            title="PDF"
            // className="modal-video"
            width="100%"
            height="600px"
          />
        </div>

        )
      case 'image':
        return <img src={file} alt="Help" className="modal-video" />;
      case 'audio':
        return <audio src={file} controls className="modal-video" />;
      default:
        return <a href={file} target="_blank" rel="noopener noreferrer" className="modal-video">Download File</a>;
    }
  };

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
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
                    <td style={{ width: '150px' }}>
                      <button
                        type="button"
                        style={{ cursor: 'pointer' }}
                        className="download-btn"
                        onClick={() => handleDownloadClick(item.fileType, item.file)}
                      >
                        <i className="bx bx-low-vision"></i>
                        <span>View</span>
                      </button>
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

      {modalOpen && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className=" close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            {renderModalContent()}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Helps;
