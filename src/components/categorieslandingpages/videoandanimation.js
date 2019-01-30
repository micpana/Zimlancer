import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Animation from '../images/categories/videoandanimation/animation.jpg'
import Intros from '../images/categories/videoandanimation/intro.jpg'
import Short from '../images/categories/videoandanimation/short.jpg'
import Spoke from '../images/categories/videoandanimation/spoke.jpg'
import Videoo from '../images/categories/videoandanimation/video.jpg'
import Visual from '../images/categories/videoandanimation/visual.jpg'
import Whiteboard from '../images/categories/videoandanimation/whiteboard.png'


  class Video extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="graphics">
        <h2 className="grapheading">Video & Animation</h2>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Video & Animation</h5>
<h6 className="subcatrow"><a href="/videoandanimation/Whiteboard & Animated Explainers">Whiteboard & Animated Explainers</a></h6>
<h6 className="subcatrow"><a href="/videoandanimation/Intros & Outros">Intros & Outros</a></h6>
<h6 className="subcatrow"><a href="/videoandanimation/Short Video Ads">Short Video Ads</a></h6>
<h6 className="subcatrow"><a href="/videoandanimation/Spokesperson Videos">Spokesperson Videos</a></h6>
<h6 className="subcatrow"><a href="/videoandanimation/Video Editing">Video Editing</a></h6>
<h6 className="subcatrow"><a href="/videoandanimation/Animations">Animations</a></h6>
<h6 className="subcatrow"><a href="/videoandanimation/Visual Effects">Visual Effects</a></h6>

</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/videoandanimation/Whiteboard & Animated Explainers">
<img className="grapimg" src={Whiteboard}/>
<h6 className="cattext">Whiteboard & Animated Explainers</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/videoandanimation/Intros & Outros">
            <img className="grapimg" src={Intros}/>
<h6 className="cattext">Intros & Outros</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/videoandanimation/Short Video Ads">
            <img className="grapimg" src={Short}/>
<h6 className="cattext">Short Video Ads</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/videoandanimation/Spokesperson Videos">
<img className="grapimg" src={Spoke}/>
<h6 className="cattext">Spokesperson Videos</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/videoandanimation/Video Editing">
            <img className="grapimg" src={Videoo}/>
<h6 className="cattext">Video Editing</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/videoandanimation/Animations">
            <img className="grapimg" src={Animation}/>
<h6 className="cattext">Animations</h6>
</a>
            </Col>
        </Row>
<Row>
<Col>
            <a className="piclink" href="/videoandanimation/Visual Effects">
            <img className="grapimg" src={Visual}/>
<h6 className="cattext">Visual Effects</h6>
</a>
            </Col>
            <Col></Col>
            <Col></Col>
</Row>
        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Video;