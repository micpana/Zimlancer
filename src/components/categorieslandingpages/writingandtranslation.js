import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Articles from '../images/categories/writingandtranslation/articles.jpg'
import Resumes from '../images/categories/writingandtranslation/resumes.jpg'
import Website from '../images/categories/writingandtranslation/website.jpg'
import Technical from '../images/categories/writingandtranslation/technical.jpg'
import Press from '../images/categories/writingandtranslation/press.jpg'
import Legal from '../images/categories/writingandtranslation/legal.jpg'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'



  class Writing extends Component{
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
 <h2>Writing & Translation</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Writing & Translation</h5>
<h6 className="subcatrow"><a href="/writingandtranslation/Articles & Blog Posts">Articles & Blog Posts</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Resumes & Cover Letters">Resumes & Cover Letters</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Website Content">Website Content</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Technical Writing">Technical Writing</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Press Releases">Press Releases</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Legal Writing">Legal Writing</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/writingandtranslation/Articles & Blog Posts">
<img className="grapimg" src={Articles}/>
<h6 className="cattext">Articles & Blog Posts</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/writingandtranslation/Resumes & Cover letters">
            <img className="grapimg" src={Resumes}/>
<h6 className="cattext">Resumes & Cover letters</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/writingandtranslation/Website Content">
            <img className="grapimg" src={Website}/>
<h6 className="cattext">Website Content</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/writingandtranslation/Technical Writing">
<img className="grapimg" src={Technical}/>
<h6 className="cattext">Technical Writing</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/writingandtranslation/Press Releases">
            <img className="grapimg" src={Press}/>
<h6 className="cattext">Press Releases</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/writingandtranslation/Legal Writing">
            <img className="grapimg" src={Legal}/>
<h6 className="cattext">Legal Writing</h6>
</a>
            </Col>
        </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Writing;