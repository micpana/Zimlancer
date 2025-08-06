import React, { Component } from 'react';
import './howitworks.css';
import {Row, CardDeck, Col, Button} from 'reactstrap';
import Bid from '../images/howitworks/bid.png'
import Hire from '../images/howitworks/hire.jpg'
import Postjob from '../images/howitworks/postjob.png'

  class PaymentsSafetyBar extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="howitworks">
        <h2 className="hiwheading">How it Works</h2>
        <Row className="hiwrow">
            <Col>
            <img className="hiwimg" src={Postjob}/><br/><br/>
<h5 className="hiwtitle">Post a job(gig)/Sell</h5>
<span className="hiwdescr">Create a listing detailed with the service you can deliver online, your delivery time and the fixed amount you'll charge for your service. Collaborate with buyers via Zimlancer private chat, share files and project updates.</span>
            </Col>
            <Col>
            <img className="hiwimg" src={Hire}/><br/><br/>
<h5 className="hiwtitle">Find freelancers to work on your project/Hire</h5>
<span className="hiwdescr">Need work done? Whatever your needs, there are freelancers ready to get the job done: from Graphics & Design, Digital Marketing, Programming and Tech, Video & Animation, Mudic & Video and so much more. Collaborate with buyers via Zimlancer private chat, share files and project milestones.</span>
            </Col>
            <Col>
            <img className="hiwimg" src={Bid}/><br/><br/>
<h5 className="hiwtitle">Post bids</h5>
<span className="hiwdescr">Simply post a job you want done and start receiving bids from our hirely talented freelancers. One you find a suitable candidate, collaborate through Zimlancer private chat.</span>
            </Col>
        </Row>
        <Button className='hiwbtn' style={{backgroundColor:'#6552b8'}}>Learn More</Button>
        </div>
      );
    }

  };
  
  export default PaymentsSafetyBar;