import React, { Component } from 'react';
import {Row, CardDeck, Col, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_REFERRALS_BY_USERNAME, GET_USER, GET_REFERRAL_CLICKS_BY_USERNAME} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';
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
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


  class Referrals extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        getReferralsByUsername:  [],
        userDetails: {},
        referralClicks: []
      };
   
    }

    componentDidMount() {
      const { cookies } = this.props;
        axios.post(GRAPHQL_BASE_URL, {//////get user details
            query: print(GET_USER), variables: {id: cookies.get('userId')}
        }).then((result) => {
            this.setState({userDetails: result.data.data.getUser});
            axios.post(GRAPHQL_BASE_URL, {//////get referrals
                query: print(GET_REFERRALS_BY_USERNAME), variables: {
                    referredby: result.data.data.getUser.username
                }
            }).then((result) => {
              this.setState({getReferralsByUsername: result.data.data.getReferralsByUsername});
            }).catch(error => {
              console.log(error.response);
            }); 
            axios.post(GRAPHQL_BASE_URL, {//////get referral link clicks
                query: print(GET_REFERRAL_CLICKS_BY_USERNAME), variables: {
                    referredby: result.data.data.getUser.username
                }
            }).then((result) => {
              this.setState({referralClicks: result.data.data.getReferralClicksByUsername});
            }).catch(error => {
              console.log(error.response);
            }); 
        }).catch(error => {
          console.log(error.response)
        });
  }

    render() {
      var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        const clicksFromRegisteredUsers = this.state.referralClicks.filter(click => click.userid != null);
        const ownClicks = this.state.referralClicks.filter(click => click.referredby == this.state.userDetails.username);
        const clicksToday = this.state.referralClicks.filter(click => click.date == date);
        let port = (window.location.port ? ':' + window.location.port : '');
        var referralLink = ('http://' + window.location.hostname + port + '/ref/' +  this.state.userDetails.username);
        return(<div>
            <Container>
        <h6>Referral System</h6>
        <br/><br/>
        <Row>
<div style={{textAlign: 'left'}}>
<h6>Your referral link: <span style={{color: 'rebeccapurple'}}>{referralLink}</span></h6>
<br/>
<h6 style={{color: 'rebeccapurple'}}>Share link on social media</h6>
<Row style={{marginLeft: '3px'}}>
<FacebookShareButton url={referralLink} style={{padding: '5px'}}>
<FacebookIcon size={32} round={true} />
</FacebookShareButton>
{/* <FacebookShareCount url={referralLink} /> */}

<TwitterShareButton url={referralLink} style={{padding: '5px'}}>
<TwitterIcon size={32} round={true} />
</TwitterShareButton>

<WhatsappShareButton url={referralLink} style={{padding: '5px'}}>
<WhatsappIcon size={32} round={true} />
</WhatsappShareButton>

<GooglePlusShareButton url={referralLink} style={{padding: '5px'}}>
<GooglePlusIcon size={32} round={true} />
</GooglePlusShareButton>

<EmailShareButton url={referralLink} style={{padding: '5px'}}>
<EmailIcon size={32} round={true} />
</EmailShareButton>
</Row>
</div>
<br/><br/><br/>
</Row>
<Row>
<Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.referralClicks.length}<br/>Link Clicks</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.getReferralsByUsername.length}<br/>Users Registered</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>$0<br/>Commissions</div>
                            </div>
    </Col>
</Row>
<br/>
<Row>
<Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{clicksFromRegisteredUsers.length}<br/>Clicks By Members</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{ownClicks.length}<br/>Own Clicks</div>
                            </div>
    </Col>
    <Col>
    <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{clicksToday.length}<br/>Clicks Today</div>
                            </div>
    </Col>
</Row>
   </Container>
          </div>
        )
    }

  };
  
  export default withCookies(Referrals);