import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Button, Row, Col } from 'reactstrap';
  import Logo from '../images/logo.png';
  import './footer.css'
  import Playstore from '../images/playstore.png';
  import { BrowserRouter, Route, Switch, withRouter, Link } from 'react-router-dom';




  class Footer extends Component{
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
      return (
        <div className="footer">
         <Row className="toprow">
<Col className="logocol">
<a href="/"><img className="logoimg" src={Logo}/></a>
</Col>
<Col className="categoriescol">
<h5 className="ftitle">Categories</h5>
<h6 className="catrow"><a href="/graphicsanddesign/">Graphics & Design</a></h6>
<h6 className="catrow"><a href="/digitalmarketing/">Digital Marketing</a></h6>
<h6 className="catrow"><a href="/programmingandtech/">Programming & Tech</a></h6>
<h6 className="catrow"><a href="/videoandanimation/">Video & Animation</a></h6>
<h6 className="catrow"><a href="/musicandaudio/">Music & Audio</a></h6>
<h6 className="catrow"><a href="/business/">Business</a></h6>
<h6 className="catrow"><a href="/writingandtranslation/">Writing & Translation</a></h6>
<h6 className="catrow"><a href="/funandlifestyle/">Fun & Lifestyle</a></h6>
</Col>
<Col className="aboutcol">
<h5 className="ftitle">About</h5>
<h6 className="catrow"><a href="/aboutus/">About Us</a></h6>
<h6 className="catrow"><a href="/howitworks/">How it works</a></h6>
<h6 className="catrow"><a href="/buyerandsellersafety/">Buyer & Seller Safety</a></h6>
<h6 className="catrow"><a href="/news/">News</a></h6>
</Col>
<Col className="supportcol">
<h5 className="ftitle">Support</h5>
<h6 className="catrow"><a href="/helpandsupport/">Help & Support</a></h6>
<h6 className="catrow"><a href="/buyingonbasa">Buying on Zimlancer</a></h6>
<h6 className="catrow"><a href="/sellingonbasa">Selling on Zimlancer</a></h6>
</Col>
<Col className="termscol">
<h5 className="ftitle">Terms</h5>
<h6 className="catrow"><a href="/privacyandpolicy">Privacy & Policy</a></h6>
<h6 className="catrow"><a href="/termsandconditions">Terms & Conditions</a></h6>
<h6 className="catrow"><a href="/feesandcharges">Fees & Charges</a></h6>
</Col>
<Col className="appscol">
<h5 className="ftitle">Apps</h5>
<h6 className="catrow"><Row><Col xs="3"><img className="playstore" src={Playstore}/></Col><Col><a href="/">Download Zimlancer on Google Play</a></Col></Row></h6>

</Col>
         </Row>
         <Row className="bottomrow">
<Col className="socialicons">

</Col>
<Col className="copyright">
<h6>Zimlancer &copy; 2019</h6>
</Col>
<Col>

</Col>
         </Row>
        </div>
      );
    }

  };
  
  export default Footer;