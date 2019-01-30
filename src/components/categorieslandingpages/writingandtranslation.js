import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Articles from '../images/categories/writingandtranslation/articles.jpg'
import Resumes from '../images/categories/writingandtranslation/resumes.jpg'
import Website from '../images/categories/writingandtranslation/website.jpg'
import Technical from '../images/categories/writingandtranslation/technical.jpg'
import Press from '../images/categories/writingandtranslation/press.jpg'
import Legal from '../images/categories/writingandtranslation/legal.jpg'



  class Writing extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="graphics">
        <h2 className="grapheading">Writing & Translation</h2>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Writing & Translation</h5>
<h6 className="subcatrow"><a href="/writingandtranslation/Articles & Blog Posts">Articles & Blog Posts</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Resumes & Cover Letters">Resumes & Cover Letters</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Website Content">Website Content</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Technical Writing">Technical Writing</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Press Releases">Press Releases</a></h6>
<h6 className="subcatrow"><a href="/writingandtranslation/Legal Writing">Legal Writing</a></h6>

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