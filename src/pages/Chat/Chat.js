import React, { useEffect, useState } from 'react';
import Container from '../../Layouts/Container';
import { NavLink } from 'react-router-dom';
import Loading from '../../Utils/Loading';

const Chat = () => {
  const [loading, setLoading] = useState(false);

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
              <h2>Open Chat</h2>
              <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                  <p>Username 1</p>
                  <p>Username 2</p>
                  <p>Username 3</p>
                </div>
              </div>
            </div>
            <div className="chat__main">
              <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn">LEAVE CHAT</button>
              </header>
              <div className="message__container">
                <div className="message__chats">
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>Message from You</p>
                  </div>
                </div>
                <div className="message__chats">
                  <p>Username</p>
                  <div className="message__recipient">
                    <p>Message from Username</p>
                  </div>
                </div>
                <div className="message__chats">
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>Message from You</p>
                  </div>
                </div>
                <div className="message__chats">
                  <p>Username</p>
                  <div className="message__recipient">
                    <p>Message from Username</p>
                  </div>
                </div>
                <div className="message__chats">
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>Message from You</p>
                  </div>
                </div>
                <div className="message__chats">
                  <p>Username</p>
                  <div className="message__recipient">
                    <p>Message from Username</p>
                  </div>
                </div>
                {/* <div className="message__status">
                  <p>Typing status...</p>
                </div> */}
              </div>
              <div className="chat__footer">
                <form className="form">
                  <input type="text" placeholder="Write message" className="message" />
                  <button className="sendBtn">SEND</button>
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
