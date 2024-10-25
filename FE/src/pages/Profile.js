import React from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import '../assets/styles/profile.css';
import avaImage from '../assets/images/ava3.jpg'; 

function Profile() {
  return (
    <>
      <div className="container">
        <div className="grid-layout">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-image-border">
                <img src={avaImage} className="profile-image" alt="Avatar" />
              </div>
              <p className="profile-name">Do Thi Phuong</p>
              <div className="profile-info">
                <span>B21DCAT150</span>
                <span>D21CQAT02-B</span>
              </div>
            </div>

            <div className="contact-info--two">
              <div className="contact-item">
                <PhoneOutlined className="icon" />
                <span className="contact-text">0869684268</span>
              </div>

              <div className="contact-item">
                <MailOutlined className="icon" />
                <span className="contact-text">phuongtb3005@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h2 className="section-title">Thông tin</h2>
            <hr className="divider" />
            <p className="info-title">GitHub</p>
            <a href="https://github.com/DPhuongg" target="_blank" className="info-link" rel="noreferrer">My GitHub Repository</a>

            <h2 className="section-title">Bài tập lớn</h2>
            <hr className="divider" />
            <div className="assignment-links">
              <div>
                <p className="info-title">GitHub</p>
                <a href="https://github.com/DPhuongg" target="_blank" className="info-link" rel="noreferrer">Link Github</a>
              </div>

              <div>
                <p className="info-title">Báo cáo pdf</p>
                <a href="https://drive.google.com/drive/folders/1l_QCIH9Q-BHWSJj9nnCLt77dAX0Lujwt" target="_blank" className="info-link" rel="noreferrer">Link pdf</a>
              </div>

              <div>
                <p className="info-title">Postman</p>
                <a href="https://drive.google.com/drive/folders/1l_QCIH9Q-BHWSJj9nnCLt77dAX0Lujwt" target="_blank" className="info-link" rel="noreferrer">Link postman</a>
              </div>
            </div>

            <h2 className="section-title">Liên lạc</h2>
            <hr className="divider" />
            <p className="info-title">Trường học</p>
            <div className="contact-info">
              <MailOutlined className="small-icon" />
              <p className="info-link">phuongdt.b21at150@stu.ptit.edu.vn</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
