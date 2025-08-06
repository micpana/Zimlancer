import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Composers from '../images/categories/musicandaudio/composers.jpg'
import Mixing from '../images/categories/musicandaudio/mixing.jpg'
import Producers from '../images/categories/musicandaudio/producers.jpg'
import Singers from '../images/categories/musicandaudio/singers.jpg'
import Song from '../images/categories/musicandaudio/songwriters.jpg'
import Voice from '../images/categories/musicandaudio/voice.jpg'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'


  class Music extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="graphics">
      <Row style={{marginTop: '2%', marginBottom: '2%'}}>
          <Col>
          <h6 style={{color: 'rebeccapurple', textAlign: 'left', marginLeft: '6%'}}>Follow us on social media</h6>
          <Row style={{marginLeft: '2%'}}>
            <Col xs="1">
            <SocialIcon url="https://www.instagram.com/zimlancer" style={{ height: 25, width: 25 }}/>
            </Col>
            <Col xs="1">
            <SocialIcon url="https://www.facebook.com/zimlancerZW/" style={{ height: 25, width: 25 }}/>
            </Col>
            <Col xs="1">
            <SocialIcon url="https://twitter.com/zimlancer" style={{ height: 25, width: 25 }}/>
            </Col>
            <Col xs="1">
            <SocialIcon url="https://plus.google.com/101601834693120746253" style={{ height: 25, width: 25 }}/>
            </Col>
          </Row>
          </Col>
 <Col>
 <h2>Music & Audio</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Music & Audio</h5>
<h6 className="subcatrow"><a href="/musicandaudio/Voice Over">Voice Over</a></h6>
<h6 className="subcatrow"><a href="/musicandaudio/Mixing & Mastering">Mixing & Mastering</a></h6>
<h6 className="subcatrow"><a href="/musicandaudio/Producers">Producers</a></h6>
<h6 className="subcatrow"><a href="/musicandaudio/Song writers">Song writers</a></h6>
<h6 className="subcatrow"><a href="/musicandaudio/Singers">Singers</a></h6>
<h6 className="subcatrow"><a href="/musicandaudio/Composers">Composers</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/musicandaudio/Voice Over">
<img className="grapimg" src={Voice}/>
<h6 className="cattext">Voice Over</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/musicandaudio/Mixing & Mastering">
            <img className="grapimg" src={Mixing}/>
<h6 className="cattext">Mixing & Mastering</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/musicandaudio/Producers">
            <img className="grapimg" src={Producers}/>
<h6 className="cattext">Producers</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/musicandaudio/Song Writers">
<img className="grapimg" src={Song}/>
<h6 className="cattext">Song Writers</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/musicandaudio/Singers">
            <img className="grapimg" src={Singers}/>
<h6 className="cattext">Singers</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/musicandaudio/Composers">
            <img className="grapimg" src={Composers}/>
<h6 className="cattext">Composers</h6>
</a>
            </Col>
        </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Music;