import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Greeting from '../images/categories/funandlifestyle/greeting.jpg'
import Online from '../images/categories/funandlifestyle/online.jpg'
import Nutrition from '../images/categories/funandlifestyle/nutrition.jpg'
import Workout from '../images/categories/funandlifestyle/workout.jpg'
import Viral from '../images/categories/funandlifestyle/viral.jpg'
import Arts from '../images/categories/funandlifestyle/arts.jpg'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'



  class Fun extends Component{
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
 <h2>Fun & Lifestyle</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Fun & Lifestyle</h5>
<h6 className="subcatrow"><a href="/funandlifestyle/Greeting Cards & Videos">Greeting Cards & Videos</a></h6>
<h6 className="subcatrow"><a href="/funandlifestyle/Online Lessons">Online Lessons</a></h6>
<h6 className="subcatrow"><a href="/funandlifestyle/Nutrition">Nutrition</a></h6>
<h6 className="subcatrow"><a href="/funandlifestyle/Workout Plans">Workout Plans</a></h6>
<h6 className="subcatrow"><a href="/funandlifestyle/Business">Business</a></h6>
<h6 className="subcatrow"><a href="/funandlifestyle/Viral Videos">Viral Videos</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/funandlifestyle/Greeting Cards & Videos">
<img className="grapimg" src={Greeting}/>
<h6 className="cattext">Greeting Cards & Videos</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/funandlifestyle/Online lessons">
            <img className="grapimg" src={Online}/>
<h6 className="cattext">Online lessons</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/funandlifestyle/Nutrition">
            <img className="grapimg" src={Nutrition}/>
<h6 className="cattext">Nutrition</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/funandlifestyle/Workout Plans">
<img className="grapimg" src={Workout}/>
<h6 className="cattext">Workout Plans</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/funandlifestyle/Viral Videos">
            <img className="grapimg" src={Viral}/>
<h6 className="cattext">Viral Videos</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/funandlifestyle/Arts & Crafts">
            <img className="grapimg" src={Arts}/>
<h6 className="cattext">Arts & Crafts</h6>
</a>
            </Col>
        </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Fun;