import React, { Component } from 'react';
import '../listings/viewservice.css';
import './profile.css'
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER, GET_SERVICES_BY_USERID, GET_ORDERS_IN_QUEUE, GET_SELLER_RATING} from '../graphql/QueryResolver';
import {ADD_PROFILE_VIEW} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import {BACKEND_URL} from '../backendurl';
import MessagePopup from '../listings/messagepopup';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn3.png'
import moment from 'moment';

  class Profile extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
userDetails: {},
userServices: [],
ordersInQueue: [],
getSellerRating: []
      };
      this.userIcon=(e)=>{
        e.target.src=require("../images/usericon.png")
    };
    }

    componentDidMount() {
      const { cookies } = this.props;
      var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;
      axios.post(GRAPHQL_BASE_URL, {//////add profile view
        query: print(ADD_PROFILE_VIEW), variables: {
          userid: this.props.id,
          viewerid: cookies.get('userId'),
          date: dateTime
        }
    }).then((result) => {
        this.setState({profileviews: result.data.data.addProfileView});

    }).catch(error => {
      console.log(error.response)
  });//////ends here
      axios.post(GRAPHQL_BASE_URL, {/////////////get user details
          query: print(GET_USER), variables: {id: this.props.id}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});

      }).catch(error => {
        console.log(error.response)
    });////////ends here
    axios.post(GRAPHQL_BASE_URL, {///////get all services by the user
        query: print(GET_SERVICES_BY_USERID), variables: {id: this.props.id}
    }).then((result) => {
        this.setState({userServices: result.data.data.getServicesByUserId});

    }).catch(error => {
      console.log(error.response)
  });///////////////////ends here
  axios.post(GRAPHQL_BASE_URL, {/////////////////get orders in queue
    query: print(GET_ORDERS_IN_QUEUE), variables: {sellerid: this.props.id, completed: "false"}
}).then((result) => {
    this.setState({ordersInQueue: result.data.data.getOrdersInQueue});

}).catch(error => {
  console.log(error.response)
});///////////ends here
axios.post(GRAPHQL_BASE_URL, {/////////////////get seller rating
  query: print(GET_SELLER_RATING), variables: {sellerid: this.props.id}
}).then((result) => {
  this.setState({getSellerRating: result.data.data.getSellerRating});

}).catch(error => {
console.log(error.response)
});//////////ends here


  }

    render() {
      const userServices = this.state.userServices.map((service, index) => {
        const profileimage= BACKEND_URL+"images/profilepictures/"+ this.state.userDetails.profilepicturepath
        const serviceimage=BACKEND_URL+"images/services/"+service.imagepath1
var servicesLength=this.state.userServices.length;
        if(servicesLength==0){
          return<Row style={{minHeight: '225px'}}>
<h6 style={{color: 'rebeccapurple', marginTop: 'auto', marginBottom: 'auto'}}>
<Col>{this.state.userDetails.username} has not posted any service listings yet.</Col>
</h6>
          </Row>
        }else{
          return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
          <Card className="mycard">
          <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
          <CardBody>
            <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
            <CardText className="servicetitle">{service.name}</CardText>
            <CardSubtitle className="pricing">Starting at: <span className="actualprice">${service.price}</span></CardSubtitle>
          </CardBody>
        </Card>
  </Col></a>
          </Row>
        }
            });
    const user=this.state.userDetails;
    const ordersInQueue=this.state.ordersInQueue.length;
    const profileimage= BACKEND_URL+"images/profilepictures/"+ this.state.userDetails.profilepicturepath
  //////////////calculating the avergage seller rating
  var totalSellerRatings = this.state.getSellerRating.reduce((acc, review) => acc + review.rating, 0);
  var sellerDivisor = this.state.getSellerRating.length;
  var averageSellerRating = (totalSellerRatings/sellerDivisor);
   //////////////time passed since user joined
   var today = new Date();
   var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
   var dateTime = date+' '+time;
 var timePassedSinceUserJoined = moment(this.state.userDetails.datejoined).from(dateTime)////////time since review was posted
      return (
        // <Container>
        <div className="userprofile">
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
 <h2>{user.username}'s Profile</h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row>
        <Col>
        <Row style={{border:'1px solid rgba(102, 51, 153, 0.404)', marginLeft: '25px', marginRight: '25px'}}>
<Col sm="4" style={{border:'1px solid #DFCDF1', margin: '10px'}}>
<br/>
        <img className="profilepicture" onError={this.userIcon} src={profileimage} style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
        <h5>{user.username}</h5>
        <StarRatings
          rating={averageSellerRating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='userrating'
        /> 
        <h6 className="lightgreytext"><span className="purpletext">{averageSellerRating}</span> from {this.state.getSellerRating.length} reviews</h6>
        <h6>{ordersInQueue} Orders in Queue</h6>
        <MessagePopup seller={user.id}/>
</Col>
   <Col style={{border:'1px solid #DFCDF1', margin: '10px'}}>
   <br/>
      <Row className="lightgreytext">
            <Col><h6 style={{textAlign:'left'}}>Skills:</h6></Col>
            <Col><h6 style={{textAlign:'right'}}>{user.skills}</h6></Col>
        </Row>
        
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
       <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{timePassedSinceUserJoined}</h6></Col>
     </Row>
   <h5 style={{borderTop:'1px solid rgba(102, 51, 153, 0.404)'}}><br/>Bio:</h5>
     <h6 className="lightgreytext" style={{fontSize:'15px'}}><br/>{user.bio}</h6>
   </Col>
        </Row>
        <br/>
       <Row>
         <Col>
       <h3>Services by {this.state.userDetails.username}</h3>
       </Col>
       </Row>
        <Row style={{border:'1px solid #DFCDF1', marginLeft: '25px', marginRight: '25px'}}>
        <div  style={{margin: '10px'}}>
        <Row>
        {userServices}
        </Row>
        </div>
        </Row>
         
         <br/>
        
<br/>
</Col>
<Col sm="2">
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '80%', float: 'center'}}/></a>
</Col>
</Row>
        </div>
        // </Container>
      );
    }

  };
  
  export default withCookies(Profile);