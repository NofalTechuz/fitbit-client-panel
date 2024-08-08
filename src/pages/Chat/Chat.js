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
  const [file_id, setFileId] = useState(null);
  const [senderName, setSenderName] = useState({});
  const [receiverName, setReceiverName] = useState({});

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/user');
      setUsers(response.data);

      if (response.data.length > 0) {
        setReceiverId(response.data[0].id);
      }

      setSenderName(response.data.find((user) => user.id == id));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchChats = async () => {
    try {
      const response = await axiosInstance.get(`/chats/${senderId}/${receiverId}`);
      setChats(response.data);

      setReceiverName(users.find((user) => user.id == receiverId));
    } catch (error) {
      console.error(error);
    }
  };

  // Send Message
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/chats', {
        sender_id: senderId,
        reciver_id: receiverId,
        message,
        chat_file_id: file_id,
      });
      fetchChats();
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [receiverId]);

  useEffect(() => {
    fetchUsers();
  }, []);

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
              {/* <h2>Open Chat</h2> */}
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
                              {user.id == id ? 'You' : user.firstName + ' ' + user.lastName}
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
                      src={'/assets/img/defultavtar.png'}
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
                <button className="leaveChat__btn">LEAVE CHAT</button>
              </header>
              <div className="message__container">
                {chats.length > 0
                  ? chats.map((chat) => (
                      <div className="message__chats" key={chat.id}>
                        <p className={chat.sender_id == senderId ? 'sender__name' : 'reciver__name'}>
                          {chat.sender_id == senderId
                            ? senderName?.firstName + ' ' + senderName?.lastName
                            : receiverName?.firstName + ' ' + receiverName?.lastName}
                        </p>
                        <div className={chat.sender_id == senderId ? 'message__sender' : 'message__recipient'}>
                          <p>{chat.message}</p>
                        </div>
                      </div>
                    ))
                  : null}
                {/* <div className="message__status">
                  <p>Typing status...</p>
                </div> */}
              </div>
              <div className="chat__footer">
                <form className="form">
                  <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                  <button className="sendBtn" onClick={sendMessage}>
                    SEND
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
