import React, { Component } from 'react';
import './homepagecategories.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Graphics from '../images/categories/graphicsanddesign.png'
import Digital from '../images/categories/digitalmarketing.png'
import Programming from '../images/categories/programming&tech.png'
import Video from '../images/categories/vid&anim.png'
import Music from '../images/categories/musicandaudio.png'
import Business from '../images/categories/business.png'
import Writing from '../images/categories/writingandtranslation.png'
import Fun from '../images/categories/fun.png'



  class HomepageCategories extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="homepagecategories">
        <h2 className="catheading">Explore the Marketplace</h2>
        <Row>
            <Col>
            <a className="homcatlink" href="/graphicsanddesign/">
<img className="catim" src={Graphics}/><br/><br/>
<span>Graphics & Design</span>
</a>
            </Col>
            <Col>
            <a className="homcatlink" href="/digitalmarketing/">
            <img className="catim" src={Digital}/><br/><br/>
<span>Digital Marketing</span>
</a>
            </Col>
            <Col>
            <a className="homcatlink" href="/programmingandtech/">
            <img className="catim" src={Programming}/><br/><br/>
<span>Programming & Tech</span>
</a>
            </Col>
            <Col>
            <a className="homcatlink" href="/videoandanimation/">
            <img className="catim" src={Video}/><br/><br/>
<span>Video & Animation</span>
</a>
            </Col>
        </Row>
        <br/><br/>
        <Row>
        <Col>
        <a className="homcatlink" href="/musicandaudio/">
<img className="catim" src={Music}/><br/><br/>
<span>Music & Audio</span>
</a>
            </Col>
            <Col>
            <a className="homcatlink" href="/business/">
            <img className="catim" src={Business}/><br/><br/>
<span>Business</span>
</a>
            </Col>
            <Col>
            <a className="homcatlink" href="/writingandtranslation/">
            <img className="catim" src={Writing}/><br/><br/>
<span>Writing & Translation</span>
</a>
            </Col>
            <Col>
            <a className="homcatlink" href="/funandlifestyle/">
            <img className="catim" src={Fun}/><br/><br/>
<span>Fun & Lifestyle</span>
</a>
            </Col>
        </Row>

        
        </div>
      );
    }

  };
  
  export default HomepageCategories;