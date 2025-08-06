import React, { Component } from 'react';
import './graphicsanddesign.css';
import {Row, CardDeck, Col} from 'reactstrap';
import Architecture from '../images/categories/graphicsanddesign/architecture.jpg'
import Banner from '../images/categories/graphicsanddesign/banner.jpg'
import Book from '../images/categories/graphicsanddesign/book.jpg'
import Business from '../images/categories/graphicsanddesign/business.jpg'
import Flyers from '../images/categories/graphicsanddesign/flyers.jpg'
import Infographic from '../images/categories/graphicsanddesign/infographic.jpg'
import Invitations from '../images/categories/graphicsanddesign/invitations.jpg'
import Logodesign from '../images/categories/graphicsanddesign/logodesign.jpg'
import Package from '../images/categories/graphicsanddesign/package.jpg'
import Photoshop from '../images/categories/graphicsanddesign/photoshop.jpg'
import Potraits from '../images/categories/graphicsanddesign/potraits.jpg'
import Presentation from '../images/categories/graphicsanddesign/presentation.jpg'
import Social from '../images/categories/graphicsanddesign/social.jpg'
import Tshirts from '../images/categories/graphicsanddesign/tshirts.jpg'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'

  class Graphics extends Component{
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
 <h2>Graphics & Design</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>     
           <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Graphics & Design</h5>
<h6 className="subcatrow"><a href="/graphicsanddesign/Logo Design">Logo Design</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Flyers & Brochures">Flyers & Brochures</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Packaging Design">Packaging Design</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Book & Album Covers">Book & Album Covers</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Potraits & Caricatures">Potraits & Caricatures</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Business Cards">Business Cards</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Presentation Design">Presentation Design</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Infographic Design">Infographic Design</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Architecture">Architecture</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Tshirts">Tshirts</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Photoshop Editing">Photoshop Editing</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Banner Ads">Banner Ads</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Invitations">Invitations</a></h6>
<h6 className="subcatrow"><a href="/graphicsanddesign/Social Media">Social Media</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
        <Row>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Logo Design">
<img className="grapimg" src={Logodesign}/>
<h6 className="cattext">Logo Design</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Flyers & Brochures">
            <img className="grapimg" src={Flyers}/>
<h6 className="cattext">Flyers & Brochures</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Packaging Design">
            <img className="grapimg" src={Package}/>
<h6 className="cattext">Packaging Design</h6>
</a>
            </Col>
        </Row>
    
        <Row>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Book & Album Covers">
<img className="grapimg" src={Book}/>
<h6 className="cattext">Book & Album Covers</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Potraits & Caricatures">
            <img className="grapimg" src={Potraits}/>
<h6 className="cattext">Potraits & Caricatures</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Business Cards & Stationary">
            <img className="grapimg" src={Business}/>
<h6 className="cattext">Business Cards & Stationary</h6>
</a>
            </Col>
        </Row>

            <Row>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Presentation Design">
<img className="grapimg" src={Presentation}/>
<h6 className="cattext">Presentation Design</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Infographic Design">
            <img className="grapimg" src={Infographic}/>
<h6 className="cattext">Infographic Design</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Architecture & Floor Plans">
            <img className="grapimg" src={Architecture}/>
<h6 className="cattext">Architecture & Floor Plans</h6>
</a>
            </Col>
        </Row>
        
        <Row>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Tshirts & Merchandise">
<img className="grapimg" src={Tshirts}/>
<h6 className="cattext">Tshirts & Merchandise</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Photoshop Editing">
            <img className="grapimg" src={Photoshop}/>
<h6 className="cattext">Photoshop Editing</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Banner Ads">
            <img className="grapimg" src={Banner}/>
<h6 className="cattext">Banner Ads</h6>
</a>
            </Col>
        </Row>

            <Row>
            <Col>
            <a className="piclink" href="/graphicsnddesign/Invitations">
<img className="grapimg" src={Invitations}/>
<h6 className="cattext">Invitations</h6>
</a>
            </Col>
            <Col>
            <a className="piclink" href="/graphicsanddesign/Social Media Design">
            <img className="grapimg" src={Social}/>
<h6 className="cattext">Social Media Design</h6>
</a>
            </Col>
            <Col>
          
            </Col>
            
        </Row>




        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default Graphics;