import React from 'react';
import Container from '../../Layouts/Container';

const Chat = () => {
  // const [loading, setLoading] = useState(false);

  // if (loading) {
  //   return (
  //     <Container>
  //       <Loading />
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <div className="bottom-data">
        <div className="orders">
          <div className="chat">
            <div className="chat__sidebar">
              {/* <h2>Open Chat</h2> */}
              <div>
                <h4 className="chat__header" style={{marginTop:0}}>USERS</h4>
                <div className="chat__users">
                  <div className="chat__user">
                    <div className="chat__userImg">
                      <img
                        src="/assets/img/defultavtar.png"
                        alt="Profile"
                        height={50}
                        width={50}
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <div className="chat__userName">
                      <p className="user__name">Username 1</p>
                      <p className="user__location">Ahmedabad</p>
                    </div>
                  </div>
                  <div className="chat__user">
                    <div className="chat__userImg">
                      <img
                        src="/assets/img/defultavtar.png"
                        alt="Profile"
                        height={50}
                        width={50}
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <div className="chat__userName">
                      <p className="user__name">Username 2</p>
                      <p className="user__location">Surat</p>
                    </div>
                  </div>

                  <div className="chat__user">
                    <div className="chat__userImg">
                      <img
                        src="/assets/img/defultavtar.png"
                        alt="Profile"
                        height={50}
                        width={50}
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <div className="chat__userName">
                      <p className="user__name">Username 3</p>
                      <p className="user__location">Palanpur</p>
                    </div>
                  </div>
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
