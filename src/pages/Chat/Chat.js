import React, { useEffect, useState } from 'react';
import Container from '../../Layouts/Container';
import Loading from '../../Utils/Loading';
import axiosInstance from '../../Utils/axiosInstance';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [senderId, setSenderId] = useState(id);
  const [receiverId, setReceiverId] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]); // Updated to handle multiple files
  const [senderName, setSenderName] = useState({});
  const [receiverName, setReceiverName] = useState({});
  const [fetchChatStatus, setFetchChatStatus] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length <= 5) {
      setSelectedFiles([...selectedFiles, ...files]);
    } else {
      alert('You can upload a maximum of 5 files.');
    }
  };

  const removeSelectedFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message && !selectedFiles.length) {
      alert('Please enter a message or upload files.');
      return;
    }

    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append('sender_id', senderId);
      formData.append('reciver_id', receiverId);
      formData.append('message', message);

      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      await axiosInstance.post('/chats', formData);
      setMessage('');
      setSelectedFiles([]);
      setFetchChatStatus(!fetchChatStatus);
    } catch (error) {
      console.error(error);
    }
    setIsSending(false);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get(`/chats/${senderId}/${receiverId}`);
        setChats(response.data);
        setReceiverName(users.find((user) => user.id === parseInt(receiverId)));
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [receiverId, senderId, users, fetchChatStatus]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/user');
        setUsers(response.data);

        if (response.data.length > 0) {
          setReceiverId(response.data[0].id);
        }

        setSenderName(response.data.find((user) => user.id === parseInt(id)));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchUsers();
    setSenderId(id);
  }, [id]);

  const CheckFileType = ({ file }) => {
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      return <i className="bx bxs-file-image" style={{ fontSize: '50px', color: '#FF6F61' }}></i>;
    } else if (file.type === 'video/mp4') {
      return <i className="bx bxs-file-image" style={{ fontSize: '50px', color: '#1E90FF' }}></i>;
    } else if (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/ogg') {
      return <i className="bx bxs-file" style={{ fontSize: '50px', color: '#32CD32' }}></i>;
    } else if (file.type === 'application/pdf') {
      return <i className="bx bxs-file-pdf" style={{ fontSize: '50px', color: '#FF4500' }}></i>;
    } else if (file.type === 'text/plain') {
      return <i className="bx bxs-file" style={{ fontSize: '50px', color: '#FFD700' }}></i>;
    } else {
      return <i className="bx bxs-file-blank" style={{ fontSize: '50px', color: '#A9A9A9' }}></i>;
    }
  };

  const checkFileTypeForDisplay = (file) => {
    switch (file.file_type) {
      case 1: // Image
        return <img src={file.file} alt="Media" style={{ maxWidth: '100%', borderRadius: '8px' }} />;
      case 2: // Video
        return <video src={file.file} controls style={{ maxWidth: '100%', borderRadius: '8px' }} />;
      // Add more cases as needed
      default:
        return <div>Unsupported file type</div>;
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
      <div className="bottom-data">
        <div className="orders">
          <div className="chat">
            <div className="chat__sidebar">
              <div>
                <h4 className="chat__header" style={{ marginTop: 0 }}>
                  USERS
                </h4>
                <div className="chat__users">
                  {users.length > 0
                    ? users.map((user) => (
                        <div className="chat__user" key={user.id} onClick={() => setReceiverId(user.id)}>
                          <div className="chat__userImg">
                            <img
                              src={user.profileImage !== null ? user.profileImage : '/assets/img/defultavtar.png'}
                              alt="Profile"
                              height={50}
                              width={50}
                              style={{ borderRadius: '50%' }}
                            />
                          </div>
                          <div className="chat__userName">
                            <p className="user__name">
                              {user.id === parseInt(id) ? 'You' : user.firstName + ' ' + user.lastName}
                            </p>
                            <p className="user__location">{user.mobileNumber}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="chat__main">
              <header className="chat__mainHeader">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="chat__userImg__Profile">
                    <img
                      src={
                        receiverName?.profileImage !== null ? receiverName?.profileImage : '/assets/img/defultavtar.png'
                      }
                      alt="Profile"
                      height={50}
                      width={50}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <div className="chat__userName">
                    <p className="user__name">{receiverName?.firstName + ' ' + receiverName?.lastName}</p>
                  </div>
                </div>
                {/* <button className="leaveChat__btn">LEAVE CHAT</button> */}
              </header>
              <div className="message__container">
                {chats.length > 0
                  ? chats.map((chat) => (
                      <div className="message__chats" key={chat.id}>
                        <p className={chat.sender_id === parseInt(senderId) ? 'sender__name' : 'reciver__name'}>
                          {chat.sender_id === parseInt(senderId)
                            ? senderName?.firstName + ' ' + senderName?.lastName
                            : receiverName?.firstName + ' ' + receiverName?.lastName}
                        </p>

                        {chat.chat_files.length > 0 ? (
                          chat.chat_files.map((file) => (
                            <div
                              className={
                                chat.sender_id === parseInt(senderId) ? 'message__sender' : 'message__recipient'
                              }
                            >
                              <div key={file.id} className="media__file">
                                {checkFileTypeForDisplay(file)}
                              </div>
                              {chat.message && <p className="message__text">{chat.message}</p>}
                            </div>
                          ))
                        ) : (
                          <div
                            className={chat.sender_id === parseInt(senderId) ? 'message__sender' : 'message__recipient'}
                          >
                            <p>{chat.message}</p>
                          </div>
                        )}
                      </div>
                    ))
                  : null}
              </div>
              <div className="chat__footer">
                {selectedFiles.length > 0 && (
                  <div className="selectedFile-container">
                    {selectedFiles.map((file, index) => (
                      <div className="selectedFile" key={index}>
                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
                          <button type="button" className="removeFileBtn" onClick={() => removeSelectedFile(index)}>
                            <i className="bx bx-x"></i>
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckFileType file={file} />
                        </div>
                        <p style={{ marginTop: '10px' }}>{file.name.substring(0, 10)}...</p>
                      </div>
                    ))}
                  </div>
                )}

                <form className="form">
                  <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />

                  <label htmlFor="mediaUpload" className="uploadBtn">
                    <i className="bx bx-paperclip"></i>
                  </label>

                  <input
                    type="file"
                    id="mediaUpload"
                    className="mediaUpload"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    multiple
                  />

                  <button className="sendBtn" type="button" disabled={isSending} onClick={sendMessage}>
                    {isSending ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Chat;
