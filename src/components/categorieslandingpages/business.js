import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Plans from '../images/categories/business/plans.jpg'
import Branding from '../images/categories/business/branding.jpg'
import Legal from '../images/categories/business/legal.jpg'
import Financial from '../images/categories/business/financial.jpg'
import Tips from '../images/categories/business/tips.jpg'
import Presentations from '../images/categories/business/presentations.jpg'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'


  class Business extends Component{
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
 <h2>Business</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Business</h5>
<h6 className="subcatrow"><a href="/business/Business Plans">Business Plans</a></h6>
<h6 className="subcatrow"><a href="/business/Branding Services">Branding Services</a></h6>
<h6 className="subcatrow"><a href="/business/Legal Consulting">Legal Consulting</a></h6>
<h6 className="subcatrow"><a href="/business/Financial Consulting">Financial Consulting</a></h6>
<h6 className="subcatrow"><a href="/business/Business Tips">Business Tips</a></h6>
<h6 className="subcatrow"><a href="/business/Presentations">Presentations</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/business/Business Plans">
<img className="grapimg" src={Plans}/>
<h6 className="cattext">Business Plans</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/business/Branding Services">
            <img className="grapimg" src={Branding}/>
<h6 className="cattext">Branding Services</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/business/Legal Consulting">
            <img className="grapimg" src={Legal}/>
<h6 className="cattext">Legal Consulting</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/business/Financial Consulting">
<img className="grapimg" src={Financial}/>
<h6 className="cattext">Financial Consulting</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/business/Business Tips">
            <img className="grapimg" src={Tips}/>
<h6 className="cattext">Business Tips</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/business/Presentations">
            <img className="grapimg" src={Presentations}/>
<h6 className="cattext">Presentations</h6>
</a>
            </Col>
        </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Business;