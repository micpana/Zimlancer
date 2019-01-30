import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Email from '../images/categories/digitalmarketing/email.jpg'
import Influencer from '../images/categories/digitalmarketing/influencer.jpg'
import Music from '../images/categories/digitalmarketing/music.jpg'
import Seo from '../images/categories/digitalmarketing/seo.jpg'
import Social from '../images/categories/digitalmarketing/social.jpg'
import Video from '../images/categories/digitalmarketing/video.jpg'



  class DigitalMarketing extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="graphics">
        <h2 className="grapheading">Digital Marketing</h2>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Digital Marketing</h5>
<h6 className="subcatrow"><a href="/digitalmarketing/Search Engine Optimization">Search Engine Optimization</a></h6>
<h6 className="subcatrow"><a href="/digitalmarketing/Social Media Marketing">Social Media Marketing</a></h6>
<h6 className="subcatrow"><a href="/digitalmarketing/Email Marketing">Email Marketing</a></h6>
<h6 className="subcatrow"><a href="/digitalmarketing/Video Marketing">Video Marketing</a></h6>
<h6 className="subcatrow"><a href="/digitalmarketing/Influencer Marketing">Influencer Marketing</a></h6>
<h6 className="subcatrow"><a href="/digitalmarketing/Music Promotion">Music Promotion</a></h6>
</Col>
<Col className="subcategories">
        <Row>
        <Col>
            <a className="piclink" href="/digitalmarketing/Video Marketing">
<img className="grapimg" src={Video}/>
<h6 className="cattext">Video Marketing</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/digitalmarketing/Influencer Marketing">
            <img className="grapimg" src={Influencer}/>
<h6 className="cattext">Influencer Marketing</h6>
</a>
            </Col>
            
            <Col>
            <a className="piclink" href="/digitalmarketing/Social Media Marketing">
            <img className="grapimg" src={Social}/>
<h6 className="cattext">Social Media Marketing</h6>
</a>
            </Col>
          
        </Row>
    
        <Row>
        <Col>
            <a className="piclink" href="/digitalmarketing/Email Marketing">
            <img className="grapimg" src={Email}/>
<h6 className="cattext">Email Marketing</h6>
</a>
            </Col>
        <Col>
            <a className="piclink" href="/digitalmarketing/Search Engine Optimization">
<img className="grapimg" src={Seo}/>
<h6 className="cattext">Search Engine Optimization</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/digitalmarketing/Music Promotion">
            <img className="grapimg" src={Music}/>
<h6 className="cattext">Music Promotion</h6>
</a>
            </Col>
        </Row>


        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default DigitalMarketing;