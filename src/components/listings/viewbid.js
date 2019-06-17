import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_BID_DETAILS, GET_USER, GET_BID_COMMENTS} from '../graphql/QueryResolver';
import {ADD_INTEREST} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import MessagePopup from './messagepopup'
import BuyServicePopup from '../user/buyservicepopup'
import BidProposals from './bidproposals'
import {BACKEND_URL} from '../backendurl';
import moment from 'moment'
import  BidPopup from './bidpopup'
import MessageBidLister from './messagebidlister';
import ReferAndEarn from '../images/referandearn2.png'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount,
  } from 'react-share';
  import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    RedditIcon,
    TumblrIcon,
    LivejournalIcon,
    MailruIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
    EmailIcon,
  } from 'react-share';
  import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    EmailShareButton,
  } from 'react-share';

  class ViewBid extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
      super(props);
  
      this.state = {
bidDetails: {},
userDetails: {},
bidComments: []
      };

      this.winnerName = (bidwinner) =>{////////get winner's name
      axios.post(GRAPHQL_BASE_URL, {/////get winner's username
        query: print(GET_USER), variables: {id: bidwinner}
    }).then((result) => {
      let username= result.data.data.getUser.username;
        localStorage.setItem('win', username)
    }).catch(error => {
      console.log(error.response)
  });//ends here 
  return localStorage.getItem('win')
    };//////////////ends here

      this.winnerValidate = () =>{////////check if the viewer is the bid winner
        const { cookies } = this.props;
        var userid= cookies.get('userId');
        var bidwinner= this.state.bidDetails.wonby;
        var winnerName= this.winnerName(bidwinner);
        if(userid==bidwinner){
            return<Row>
                <Col>
<h6 style={{textAlign: 'center'}}>Dear {winnerName}, you won this bid. </h6>
                </Col>
                <Col>
<MessageBidLister bidDetails={this.state.bidDetails}/>
                </Col>
            </Row>
        }else{
            return<h6></h6>
        }
      };
      this.bidValidate = () =>{////////check if the bid is still active
var bidDetails= this.state.bidDetails;
var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
if(bidDetails.active=="false"&&bidDetails.wonby!=null){///////if the bid has been awarded to someone already
return<h6 style={{color: 'rebeccapurple'}}>Please note that this bid has already been awarded to someone and is no longer active.</h6>
}else{
    if(bidDetails.wonby==null&&bidDetails.expirationdate<dateTime){/////////if the bid has already expired without a winner
        return<h6 style={{color: 'rebeccapurple'}}>Please note that this bid listing has already expired.</h6>
        }else{
            return<h6></h6>
        }
}/////ends here

      };
      this.UserValidate = () =>{////////check if the viewer is the bid owner
        const { cookies } = this.props;
        var viewerId = cookies.get('userId');
        var bidOwnerId = this.state.bidDetails.userid;
        if(viewerId==bidOwnerId){
            return<Row>
                <Col style={{color: 'grey'}}>
           Dear {this.state.bidDetails.username}, only you can see these three buttons =>   
                </Col>
                <Col>
                <Row>
                <Button id="editbidlisting" style={{backgroundColor: 'inherit', border: '1px solid #C0A3D8', color: 'grey'}}>
Edit Bid Listing
  </Button>
  <span> </span>
  <BidProposals bidid={this.state.bidDetails.id} bidDetails={this.state.bidDetails}/>
  <span> </span>
  <Button id="editbidlisting" style={{backgroundColor: 'inherit', border: '1px solid #C0A3D8', color: 'grey'}}>
Delete Bid Listing
  </Button>
  </Row>
                </Col>
            </Row>
        }else{
            return<h6></h6>
        }
    };////////////////////ends here

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
                  sellerid: result.data.data.getServiceBids.userid,
                  bidComments: []
                }
            }).then((result2) => {
                this.setState({interests: result2.data.data.createInterests});
        
            }).catch(error => {
              console.log(error.response)
          });////////////////ends here
          axios.post(GRAPHQL_BASE_URL, {//////get bid comments
            query: print(GET_BID_COMMENTS), variables: {
              bidid: result.data.data.getServiceBids.id
            }
        }).then((result3) => {
            this.setState({bidComments: result3.data.data.getBidCommentsByBidId});
    
        }).catch(error => {
          console.log(error.response)
      });////////////////ends here
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
    var timePassedSinceUserJoined = moment(this.state.userDetails.datejoined).from(dateTime)////////time since review was posted
    let port = (window.location.port ? ':' + window.location.port : '');
        var bidLink = ('http://' + window.location.hostname + port + '/' +  this.state.bidDetails.maincategory + '/' + this.state.bidDetails.subcategory + '/' + this.state.bidDetails.id);
    const user =this.state.userDetails
      const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
      return (
        <div style={{marginLeft: '4%', marginRight: '4%'}}>
{/* <Container> */}
<div style={{marginTop: '3%'}}>
<this.UserValidate/>
</div>
<div style={{marginTop: '1%'}}>
<this.winnerValidate/>
</div>
<div style={{marginTop: '1%'}}>
<this.bidValidate/>
</div>
<Row style={{marginTop: '2%'}}>
    <Col style={{border: '1px solid rgba(102, 51, 153, 0.404)', marginRight: '1%'}}>
    <h5>{this.state.bidDetails.name}</h5>
    <Row>
        <Col>
        <span style={{color: 'grey'}}>Listed: </span> <span style={{color: 'rebeccapurple'}}>{duration}</span>
        </Col>
        <Col>
        <span style={{color: 'grey'}}>Bids placed: </span> <span style={{color: 'rebeccapurple'}}>{this.state.bidComments.length}</span>
        </Col>
    </Row>
<img src={BACKEND_URL+"images/bids/"+this.state.bidDetails.bidimage} style={{maxHeight: '500px', width: '100%'}}/>
<Row style={{marginLeft: '3px', marginTop: '20px', marginBottom: '10px'}}>
      <h6 style={{color: 'rebeccapurple', marginTop: '10px'}}>Share this on social media: </h6>
<FacebookShareButton url={bidLink} style={{padding: '5px'}}>
<FacebookIcon size={32} round={true} />
</FacebookShareButton>
{/* <FacebookShareCount url={referralLink} /> */}

<TwitterShareButton url={bidLink} style={{padding: '5px'}}>
<TwitterIcon size={32} round={true} />
</TwitterShareButton>

<WhatsappShareButton url={bidLink} style={{padding: '5px'}}>
<WhatsappIcon size={32} round={true} />
</WhatsappShareButton>

<GooglePlusShareButton url={bidLink} style={{padding: '5px'}}>
<GooglePlusIcon size={32} round={true} />
</GooglePlusShareButton>

<EmailShareButton url={bidLink} style={{padding: '5px'}}>
<EmailIcon size={32} round={true} />
</EmailShareButton>

<LinkedinShareButton url={bidLink} style={{padding: '5px'}}>
<LinkedinIcon size={32} round={true} />
</LinkedinShareButton>
</Row>
    <Container style={{border: '1px solid #af85da67'}}>
<h3 style={{borderBottom: '1px solid #af85da67'}}>Bid description</h3>
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
bidid={this.state.bidDetails.id} bidcomments={this.state.bidComments} bidDetails={this.state.bidDetails}
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
       <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{timePassedSinceUserJoined}</h6></Col>
     </Row>
<br/>
<h6 className="lightgreytext" style={{fontSize:'15px', borderTop:'1px solid rgba(102, 51, 153, 0.404)'}}><br/>{user.bio}<br/><br/><a href={"/profile/"+ user.id} className="readmore">Visit user profile</a></h6>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '100%', marginBottom: '5px'}}/></a>

    </Col>
</Row>
{/* </Container> */}
        </div>
      );
    }

  };
  
  export default withCookies(ViewBid);