import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Chatbot from '../images/categories/programmingandtech/chatbot.jpg'
import Desktop from '../images/categories/programmingandtech/desktop.jpeg'
import Ecommerce from '../images/categories/programmingandtech/ecommerce.jpg'
import Mobile from '../images/categories/programmingandtech/mobile.jpg'
import Website from '../images/categories/programmingandtech/website.jpeg'
import Wordpress from '../images/categories/programmingandtech/wordpress.jpg'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'

  class Programming extends Component{
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
 <h2>Programming & Tech</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Programming & Tech</h5>
<h6 className="subcatrow"><a href="/programmingandtech/Mobile Apps">Mobile Apps</a></h6>
<h6 className="subcatrow"><a href="/programmingandtech/Websites & Web Apps">Websites & Web Apps</a></h6>
<h6 className="subcatrow"><a href="/programmingandtech/Desktop Applications">Desktop Applications</a></h6>
<h6 className="subcatrow"><a href="/programmingandtech/Chatbots">Chatbots</a></h6>
<h6 className="subcatrow"><a href="/programmingandtech/Ecommerce">Ecommerce</a></h6>
<h6 className="subcatrow"><a href="/programmingandtech/Wordpress">Wordpress</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/programmingandtech/Mobile Apps">
<img className="grapimg" src={Mobile}/>
<h6 className="cattext">Mobile Apps</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/programmingandtech/Websites & Web Apps">
            <img className="grapimg" src={Website}/>
<h6 className="cattext">Websites & Web Apps</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/programmingandtech/Desktop Applications">
            <img className="grapimg" src={Desktop}/>
<h6 className="cattext">Desktop Applications</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/programmingnandtech/chatbots">
<img className="grapimg" src={Chatbot}/>
<h6 className="cattext">Chatbots</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/programmingandtech/Ecommerce">
            <img className="grapimg" src={Ecommerce}/>
<h6 className="cattext">Ecommerce</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/programmingandtech/Wordpress">
            <img className="grapimg" src={Wordpress}/>
<h6 className="cattext">Wordpress</h6>
</a>
            </Col>
        </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Programming;