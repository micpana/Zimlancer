import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Plans from '../images/categories/business/plans.jpg'
import Branding from '../images/categories/business/branding.jpg'
import Legal from '../images/categories/business/legal.jpg'
import Financial from '../images/categories/business/financial.jpg'
import Tips from '../images/categories/business/tips.jpg'
import Presentations from '../images/categories/business/presentations.jpg'


  class Business extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="graphics">
        <h2 className="grapheading">Business</h2>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Business</h5>
<h6 className="subcatrow"><a href="/business/Business Plans">Business Plans</a></h6>
<h6 className="subcatrow"><a href="/business/Branding Services">Branding Services</a></h6>
<h6 className="subcatrow"><a href="/business/Legal Consulting">Legal Consulting</a></h6>
<h6 className="subcatrow"><a href="/business/Financial Consulting">Financial Consulting</a></h6>
<h6 className="subcatrow"><a href="/business/Business Tips">Business Tips</a></h6>
<h6 className="subcatrow"><a href="/business/Presentations">Presentations</a></h6>

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