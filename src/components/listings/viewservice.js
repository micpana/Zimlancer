import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ADD_INTEREST} from '../graphql/MutationResolver';
import {GET_SERVICE_BY_ID, GET_USER, GET_ORDERS_IN_QUEUE} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import MessagePopup from './messagepopup'
import BuyServicePopup from '../user/buyservicepopup'
import {BACKEND_URL} from '../backendurl';
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

  class ViewService extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
serviceDetails:{},
userDetails:{},
ordersInQueue:[],
extras: "extras1"
      };
      this.viewItem = this.viewItem.bind(this);
      ///////buttons
      this.ButtonsSelect = () =>{
       if(this.state.extras=="extras1"){
        return<Row style={{marginTop: '-9%'}}>
        <Button id="extras1" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', borderBottom: '3px solid rebeccapurple', width: '50%'}}>${this.state.serviceDetails.extras1price}</Button>
        <Button id="extras2" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', borderBottom: '1px solid rgba(0, 0, 0, 0.5)', width: '50%'}}>${this.state.serviceDetails.extras2price}</Button>
        </Row>
       }
       if(this.state.extras=="extras2"){
        return<Row style={{marginTop: '-9%'}}>
        <Button id="extras1" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', borderBottom: '1px solid rgba(0, 0, 0, 0.5)', width: '50%'}}>${this.state.serviceDetails.extras1price}</Button>
        <Button id="extras2" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', borderBottom: '3px solid rebeccapurple', width: '50%'}}>${this.state.serviceDetails.extras2price}</Button>
        </Row>
       }
              }
      this.PackageSelect = () =>{
        if(this.state.extras=="extras1"){
          return <div>
          <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Delivery time:
</Col>
<Col style={{textAlign:'right'}}>
{this.state.serviceDetails.extras1additionaltime} Days
</Col>
</Row>
<BuyServicePopup seller={this.state.userDetails.id} serviceid={this.state.serviceDetails.id}
servicename={this.state.serviceDetails.servicename} price={this.state.serviceDetails.extras1price}
maincategory={this.state.serviceDetails.maincategory} subcategory={this.state.serviceDetails.subcategory}

/>
<br/>
<h6 style={{textAlign:'left'}}>{this.state.serviceDetails.extras1}</h6>

                                 

          </div>
         }
         if(this.state.extras=="extras2"){
          return <div>
          <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Delivery time:
</Col>
<Col style={{textAlign:'right'}}>
{this.state.serviceDetails.extras2additionaltime} Days
</Col>
</Row>
<BuyServicePopup seller={this.state.userDetails.id} serviceid={this.state.serviceDetails.id}
servicename={this.state.serviceDetails.servicename} price={this.state.serviceDetails.extras2price}
maincategory={this.state.serviceDetails.maincategory} subcategory={this.state.serviceDetails.subcategory}

/>
<br/>                         
<h6 style={{textAlign:'left'}}>{this.state.serviceDetails.extras2}</h6>




          </div>
         }
       
      }

      this.DisplayPackages = () =>{
        if(this.state.serviceDetails.extras1==""){
          return<h6 style={{color: 'rebeccapurple', marginTop: '10%'}}>This gig has no extra packages</h6>
        }else{
          return<div>
          <this.ButtonsSelect/>
          <br/>
          <this.PackageSelect/>
        </div>
        }
      }
    }

    componentDidMount() {
      const { cookies } = this.props;
      var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;
      axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_SERVICE_BY_ID), variables: {id: this.props.match.params.serviceid}
      }).then((result) => {
          this.setState({serviceDetails: result.data.data.getService});
          axios.post(GRAPHQL_BASE_URL, {//////add service view
            query: print(ADD_INTEREST), variables: {
              userid: cookies.get('userId'),
              maincategory: result.data.data.getService.maincategory,
              subcategory: result.data.data.getService.subcategory,
              date: dateTime,
              serviceid: result.data.data.getService.id,
              sellerid: result.data.data.getService.userid
            }
        }).then((result2) => {
            this.setState({interests: result2.data.data.createInterests});
    
        }).catch(error => {
          console.log(error.response)
      });
      }).catch(error => {
        console.log(error.response)
    });

axios.post(GRAPHQL_BASE_URL, {
  query: print(GET_ORDERS_IN_QUEUE), variables: {sellerid: this.state.serviceDetails.userid, completed: "false"}
}).then((result) => {
  this.setState({ordersInQueue: result.data.data.getOrdersInQueue});

}).catch(error => {
console.log(error.response)
});

  }
  
  viewItem(e) {
    this.setState({extras: e.target.id});
  }
    render() {
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_USER), variables: {id: this.state.serviceDetails.userid}
    }).then((result) => {
        this.setState({userDetails: result.data.data.getUser});
  
    }).catch(error => {
      console.log(error.response)
  });


      const user=this.state.userDetails;
        const serviceimage= BACKEND_URL+"images/services/"+ this.state.serviceDetails.imagepath1
        const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
        const service=this.state.serviceDetails;
        const ordersInQueue=this.state.ordersInQueue.length
        let port = (window.location.port ? ':' + window.location.port : '');
        var serviceLink = ('http://' + window.location.hostname + port + '/' +  service.maincategory + '/' + service.subcategory + '/' + service.id);
      return (
        <div className="viewsdiv">
  <Row className="servicedetails">
      <Col className="proddetails">
      <h5>{service.name}</h5>
      <Row>
          <Col><StarRatings
          rating={service.rating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='rating'
        />  </Col>
          <Col><h6 className="blwtitle"> Orders in queue: <span className="purpletext">{ordersInQueue}</span></h6>
          </Col>
      </Row>
      <img className="serviceimage" src={serviceimage} style={{maxHeight: '500px'}}/><br/><br/>
      <Row style={{marginLeft: '3px'}}>
      <h6 style={{color: 'rebeccapurple', marginTop: '10px'}}>Share this on social media: </h6>
<FacebookShareButton url={serviceLink} style={{padding: '5px'}}>
<FacebookIcon size={32} round={true} />
</FacebookShareButton>
{/* <FacebookShareCount url={referralLink} /> */}

<TwitterShareButton url={serviceLink} style={{padding: '5px'}}>
<TwitterIcon size={32} round={true} />
</TwitterShareButton>

<WhatsappShareButton url={serviceLink} style={{padding: '5px'}}>
<WhatsappIcon size={32} round={true} />
</WhatsappShareButton>

<GooglePlusShareButton url={serviceLink} style={{padding: '5px'}}>
<GooglePlusIcon size={32} round={true} />
</GooglePlusShareButton>

<EmailShareButton url={serviceLink} style={{padding: '5px'}}>
<EmailIcon size={32} round={true} />
</EmailShareButton>
</Row>

      <Row>
        <Col className="descrcol">
        <h3 className="thehdn">Gig description</h3>
        <br/>
        <Row style={{color:'rebeccapurple'}}>
<Col style={{textAlign:'left'}}>
Price:
</Col>
<Col style={{textAlign:'right'}}>
${service.price}
</Col>
</Row>
<br/>
        <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Delivery time:
</Col>
<Col style={{textAlign:'right'}}>
{service.completiontime} Days
</Col>
</Row>

<BuyServicePopup seller={this.state.userDetails.id} serviceid={this.state.serviceDetails.id}
    servicename={this.state.serviceDetails.servicename} price={this.state.serviceDetails.price}
maincategory={this.state.serviceDetails.maincategory} subcategory={this.state.serviceDetails.subcategory}
 
/>

<br/>
        <h6 className="fulldescription"><br/>{service.description}</h6>
</Col>
        <Col  className="packages">
        <h3 className="thehdn">Extra Packages</h3>
        <br/><br/>
        <this.DisplayPackages/>
</Col>
      </Row>
      


      </Col>
      <Col className="userdetails" sm="3">
      <img className="usrpropc" src={profileimage}/>
      <h5>{user.username}</h5>
      <h6 className="lightgreytext">{user.skills}</h6>
      <StarRatings
          rating={user.rating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='userrating'
        /> 
        <h6 className="lightgreytext"><span className="purpletext">{user.rating}</span> from 0 reviews</h6>
        <MessagePopup seller={user.id}/>
     <Row>
<Col className="lightgreytext" xs="4" style={{textAlign:'left'}}><h6>From</h6></Col>
<Col className="lightgreytext" style={{textAlign:'right'}}><h6>{user.city}, {user.country}</h6></Col>

     </Row>
<Row>
  <Col className="lightgreytext" style={{textAlign:'left'}}><h6>Responds in</h6></Col>
  <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{user.responsetime} Hours</h6></Col>


</Row>
     <Row>
       <Col className="lightgreytext" style={{textAlign:'left'}}><h6>Joined</h6></Col>
       <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{user.datejoined}</h6></Col>
     </Row>
<br/>
<h6 className="lightgreytext" style={{fontSize:'15px', borderTop:'1px solid rgba(102, 51, 153, 0.404)'}}><br/>{user.bio}<br/><br/><a href={"/profile/"+ user.id} className="readmore">Visit seller profile</a></h6>




      </Col>


  </Row>
        </div>
      );
    }

  };
  
  export default withCookies(ViewService);