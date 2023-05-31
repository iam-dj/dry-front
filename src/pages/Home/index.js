import React from 'react';
import './style.css';
import bfg from './assets/bg.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:'100vh',
  };

  return (
    <div>
    <body style={cardStyle}>
    <div className="card img-responsive">
          
          <div className="col-12 card-text2">
            <div className="portada"></div>
            <div className="title-total">
              <h2>trainer.name</h2>

              <div className="desc">
              </div>
              {/* <div className="actions">
                <button>
                  <i className="far fa-heart"></i>
                </button>
                <button>
                  <i className="far fa-envelope"></i>
                </button>
                <button>
                  <i className="fas fa-user-friends"></i>
                </button>
              </div> */}
            </div>
          </div>
        </div>
    </body>
    </div>
  );
}
