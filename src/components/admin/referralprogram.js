import React, { Component } from 'react';
import {Row, CardDeck, Col, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ALL_SITE_REFERRALS, ALL_REFERRAL_CLICKS, ALL_COMMISSIONS} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class ReferralProgram extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
   allReferredUsers: [],
   allReferralClicks: [],
   allCommissionsEarned: []

      };
   
    }
 

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {////////get all referred users
            query: print(ALL_SITE_REFERRALS)
        }).then((result) => {
          this.setState({allReferredUsers: result.data.data.allReferrals});
        }).catch(error => {
          console.log(error.response);
        });/////ends here
        axios.post(GRAPHQL_BASE_URL, {////////get all link clicks
            query: print(ALL_REFERRAL_CLICKS)
        }).then((result) => {
          this.setState({allReferralClicks: result.data.data.allReferralClicks});
        }).catch(error => {
          console.log(error.response);
        });/////ends here
        axios.post(GRAPHQL_BASE_URL, {/////////all commissions earned
          query: print(ALL_COMMISSIONS)
      }).then((result) => {
          this.setState({allCommissionsEarned: result.data.data.allCommissionsEarned});
      
      }).catch(error => {
        console.log(error.response)
      });//////ends here
  }



    render() {
        var today = new Date();
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
          const clicksFromRegisteredUsers = this.state.allReferralClicks.filter(click => click.userid != null);
          const clicksToday = this.state.allReferralClicks.filter(click => click.date == date);
          const registeredToday = this.state.allReferredUsers.filter(user => user.date == date);
          const totalCommissions = this.state.allCommissionsEarned.reduce((acc, amount) => acc + amount.commission, 0);

        return(<div>
           <Container>
           <h6>Referral System</h6>
        <br/><br/>
           <Row>
<Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.allReferralClicks.length}<br/>Link Clicks</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{clicksFromRegisteredUsers.length}<br/>Clicks By Members</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.allReferredUsers.length}<br/>Users Registered</div>
                            </div>
    </Col>
</Row>
<br/>
<Row>
<Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{clicksToday.length}<br/>Clicks Today</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{registeredToday.length}<br/>Registered Today</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>${totalCommissions}<br/>Commissions Earned</div>
                            </div>
    </Col>
</Row>
           </Container>
          </div>
        )
    }

  };
  
  export default ReferralProgram;