import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_BID_DETAILS, GET_USER} from '../graphql/QueryResolver';
import {ADD_INTEREST} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import MessagePopup from './messagepopup'
import BuyServicePopup from '../user/buyservicepopup'
import {BACKEND_URL} from '../backendurl';
import moment from 'moment'
import  BidPopup from './bidpopup'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class ViewBid extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
      super(props);
  
      this.state = {
bidDetails: {},
userDetails: {}
      };

    }

    componentDidMount() {
        const { cookies } = this.props;
        var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;
        axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_BID_DETAILS), variables: {id: this.props.match.params.bidid}
        }).then((result) => {
            this.setState({bidDetails: result.data.data.getServiceBids});
            axios.post(GRAPHQL_BASE_URL, {//////add bid view
                query: print(ADD_INTEREST), variables: {
                  userid: cookies.get('userId'),
                  maincategory: result.data.data.getServiceBids.maincategory,
                  subcategory: result.data.data.getServiceBids.subcategory,
                  date: dateTime,
                  serviceid: result.data.data.getServiceBids.id,
                  sellerid: result.data.data.getServiceBids.userid
                }
            }).then((result2) => {
                this.setState({interests: result2.data.data.createInterests});
        
            }).catch(error => {
              console.log(error.response)
          });
        }).catch(error => {
          console.log(error.response)
      });
  }
  

    render() {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_USER), variables: {id: this.state.bidDetails.userid}
        }).then((result) => {
            this.setState({userDetails: result.data.data.getUser});
      
        }).catch(error => {
          console.log(error.response)
      });
      var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
    var duration = moment(this.state.bidDetails.datelisted).from(dateTime)////////time since bid was posted
    var expiry = moment(this.state.bidDetails.expirationdate).from(dateTime)////////bid expiration time

    const user =this.state.userDetails
      const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
      return (
        <div style={{marginLeft: '4%', marginRight: '4%'}}>
{/* <Container> */}
<Row style={{marginTop: '4%'}}>
    <Col style={{border: '1px solid rgba(102, 51, 153, 0.404)', marginRight: '1%'}}>
    <h5>{this.state.bidDetails.name}</h5>
    <Row>
        <Col>
        <span style={{color: 'grey'}}>Listed: </span> <span style={{color: 'rebeccapurple'}}>{duration}</span>
        </Col>
        <Col>
        <span style={{color: 'grey'}}>Bids placed: </span> <span style={{color: 'rebeccapurple'}}>{this.state.bidDetails.numberofbids}</span>
        </Col>
    </Row>
<img src={BACKEND_URL+"images/bids/"+this.state.bidDetails.bidimage} style={{maxHeight: '500px'}}/>
    <br/><br/>
    <Container style={{border: '1px solid #af85da67'}}>
<h3 style={{borderBottom: '1px solid #af85da67'}}>Gig description</h3>
<Row style={{color:'rebeccapurple'}}>
<Col style={{textAlign:'left'}}>
Payout:
</Col>
<Col style={{textAlign:'right'}}>
${this.state.bidDetails.payout}
</Col>
</Row>
<br/>
        <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Expected delivery time:
</Col>
<Col style={{textAlign:'right'}}>
{this.state.bidDetails.expectedcompletiontime} days
</Col>
</Row>
<br/>
<Row style={{color:'rebeccapurple'}}>
<Col style={{textAlign:'left'}}>
Expiry:
</Col>
<Col style={{textAlign:'right'}}>
{expiry}
</Col>
</Row>
<br/>
        <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Type of delivery:
</Col>
<Col style={{textAlign:'right'}}>
Online
</Col>
</Row>
<BidPopup seller={this.state.bidDetails.userid} bidname={this.state.bidDetails.name}
bidid={this.state.bidDetails.id}
/>
<br/>
<h6 style={{textAlign: 'left'}}>{this.state.bidDetails.description}</h6>

    </Container>
    </Col>


    <Col style={{border: '1px solid rgba(102, 51, 153, 0.404)', marginLeft: '1%'}} sm="3">
    <img className="usrpropc" src={profileimage} style={{width: '60%'}}/>
      <h5>{user.username}</h5>
      
     <Row>
<Col className="lightgreytext" xs="4" style={{textAlign:'left'}}><h6>From</h6></Col>
<Col className="lightgreytext" style={{textAlign:'right'}}><h6>{user.city}, {user.country}</h6></Col>

     </Row>
     <Row>
       <Col className="lightgreytext" style={{textAlign:'left'}}><h6>Joined</h6></Col>
       <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{user.datejoined}</h6></Col>
     </Row>
<br/>
<h6 className="lightgreytext" style={{fontSize:'15px', borderTop:'1px solid rgba(102, 51, 153, 0.404)'}}><br/>{user.bio}<br/><br/><a href={"/profile/"+ user.id} className="readmore">Visit user profile</a></h6>

    </Col>
</Row>
{/* </Container> */}
        </div>
      );
    }

  };
  
  export default withCookies(ViewBid);