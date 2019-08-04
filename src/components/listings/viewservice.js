import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, Container, Input, InputGroup} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ADD_INTEREST, CREATE_SERVICE_REVIEW} from '../graphql/MutationResolver';
import {GET_SERVICE_BY_ID,  GET_ORDERED_JOBS,GET_USER, GET_ORDERS_IN_QUEUE, SERVICE_REVIEWS, GET_SELLER_RATING} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import MessagePopup from './messagepopup'
import BuyServicePopup from '../user/buyservicepopup'
import ReferAndEarn from '../images/referandearn2.png'
import Modal from 'react-responsive-modal';
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
import moment from 'moment';

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
extras: "extras1",
serviceReviews: [],
review: "",
reviewDetails: {},
open: false,
modalText: "",
imageOnDisplay: "",
getSellerRating: [],
yourCompletedOrders: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.viewItem = this.viewItem.bind(this);
      this.userIcon=(e)=>{
        e.target.src=require("../images/usericon.png")
    };

      this.onOpenModal = () => {
        this.setState({ open: true });
      };
     
      this.onCloseModal = () => {
        this.setState({ open: false });
      };

      this.inputServiceReview = () => {//////for reviewing
        const { cookies } = this.props;
    
        if(cookies.get('userId')!=null){////////////////////////////////validate if user is logged in
          const serviceReviews = this.state.serviceReviews.filter(review => review.userid === cookies.get('userId'));
          const ordersYouvePlacedOnThisService = this.state.yourCompletedOrders.filter(order =>order.serviceid === this.state.serviceDetails.id);

        if(this.state.serviceDetails.userid==cookies.get('userId')){/////check if service lister is the current viewer
          return<h6 style={{color: 'rebeccapurple', marginTop: '3%'}}>You cannot post a review on your own service listing.</h6>
        }else{
          if(serviceReviews.length!=0){//////check if user has already posted a review
            return<h6 style={{color: 'rebeccapurple', marginTop: '3%'}}>You have already posted a review on this listing.</h6>
          }else{
            if(ordersYouvePlacedOnThisService.length==0){/////check if user has purchased this service before
              return<h6 style={{color: 'rebeccapurple', marginTop: '3%'}}>You can only post a review on a service you've ordered before.</h6>
            }else{
              return<div>
              <Label for="review" style={{float: 'left', marginTop: '1%', marginLeft: '5px'}}><h5>Add a review</h5></Label>
     <InputGroup>
     <Input  placeholder="Rate this service out of 5" type="number" name="rating" id="rating" 
              value={this.state.rating} onChange={this.handleChange} />
              <Input  placeholder="Add your service review here" type="text" name="review" id="review" 
              value={this.state.review} onChange={this.handleChange} />
        <Button onClick={e=>this.submitReview(e)} style={{backgroundColor:'rgb(100, 82, 184)'}}>Submit Review</Button>
    </InputGroup>
            </div>
            }///////////////ends here
          }//////////////////////////////ends here
        }////////////////////////////////////////////////////////////////ends here
        }else{
          return<h6 style={{color: 'rebeccapurple', marginTop: '3%'}}>You have to be logged in inorder to post a review.</h6>
        }
      }//////////////////////////////////////////////////////////////ends here

      this.getUsername = (details) =>{//////////get get rater username
        var length=  details.userid.length;
  var total= length+ details.indexNum
    var random= 900+'vwser'+details.userid[0]+length+details.userid[2]+details.userid+details.indexNum+details.userid[1]+total
        axios.post(GRAPHQL_BASE_URL, {/////get sender username
          query: print(GET_USER), variables: {id: details.userid}
      }).then((result) => {
        let username= result.data.data.getUser.username;
          localStorage.setItem(random, username)
      }).catch(error => {
        console.log(error.response)
    });//ends here 
    return localStorage.getItem(random)
      };///////////ends here
  
      this.getProfilepicture = (details) =>{//////////get get rater profilepicture
        var length=  details.userid.length;
        var total= length+ details.indexNum
          var random= 985+'vwsrv'+details.userid[0]+length+details.userid[2]+details.userid+details.indexNum+details.userid[1]+total      
        axios.post(GRAPHQL_BASE_URL, {/////get sender profile picture
          query: print(GET_USER), variables: {id: details.userid}
      }).then((result) => {
        let username= result.data.data.getUser.profilepicturepath;
          localStorage.setItem(random, username)
      }).catch(error => {
        console.log(error.response)
    });//ends here 
    return localStorage.getItem(random)
      };//////////////////////ends here

        /////////////select image on display
        this.selectImageOnDisplay = (e) =>{
          const image1= this.state.serviceDetails.imagepath1;
          const image2= this.state.serviceDetails.imagepath2;
          const image3= this.state.serviceDetails.imagepath3;

          if(e.target.id=="image1"){
this.setState({imageOnDisplay: image1});
          }
          if(e.target.id=="image2"){
            this.setState({imageOnDisplay: image2});
                      }
          if(e.target.id=="image3"){
                        this.setState({imageOnDisplay: image3});
                                  }

        };/////////////function ends here

          /////////////row showing all images available
          this.RowWithImagesAvailable = (e) =>{
            const image1= BACKEND_URL+"images/services/"+ this.state.serviceDetails.imagepath1;
            const image2= BACKEND_URL+"images/services/"+ this.state.serviceDetails.imagepath2;
            const image3= BACKEND_URL+"images/services/"+ this.state.serviceDetails.imagepath3;
  
            if(this.state.serviceDetails.imagepath2==null&&this.state.serviceDetails.imagepath3==null){///////////if only the first image is available
return<div>
  <span style={{color: 'grey', fontSize: '13px'}}>Only 1 image available</span>
  <Row>
    <Col>
    <img id="image1" src={image1} onClick={e=>this.selectImageOnDisplay(e)} style={{width: '70px', border: '1px solid #DFCDF1'}}/>
    </Col>
  </Row>
</div>
            };///ends here
if(this.state.serviceDetails.imagepath2!=null&&this.state.serviceDetails.imagepath3==null){///////////if only the first & second images are available
              return<div>
                <span style={{color: 'grey', fontSize: '13px'}}>Only 2 image available</span>
                <Row>
                  <Col>
                  <img id="image1" src={image1} onClick={e=>this.selectImageOnDisplay(e)} style={{width: '70px', border: '1px solid #DFCDF1'}}/>
                  </Col>
                  <Col>
                  <img id="image2" src={image2} onClick={e=>this.selectImageOnDisplay(e)} style={{width: '70px', border: '1px solid #DFCDF1'}}/>
                  </Col>
                </Row>
              </div>
                          }///ends here
if(this.state.serviceDetails.imagepath2!=null&&this.state.serviceDetails.imagepath3!=null){///////////if all images are available
                            return<div>
                              <span style={{color: 'grey', fontSize: '13px'}}>All 3 images are available</span>
                              <Row>
                                <Col>
                                <img id="image1" src={image1} onClick={e=>this.selectImageOnDisplay(e)} style={{width: '70px', border: '1px solid #DFCDF1'}}/>
                                </Col>
                                <Col>
                                <img id="image2" src={image2} onClick={e=>this.selectImageOnDisplay(e)} style={{width: '70px', border: '1px solid #DFCDF1'}}/>
                                </Col>
                                <Col>
                                <img id="image3" src={image3} onClick={e=>this.selectImageOnDisplay(e)} style={{width: '70px', border: '1px solid #DFCDF1'}}/>
                                </Col>
                              </Row>
                            </div>
                                        }///ends here
          };///////////////////////////////////////////////////function ends here

         /////////////show multiple service images
         this.ServiceImages = () =>{
          const image= BACKEND_URL+"images/services/"+ this.state.imageOnDisplay
return<div>
        <img className="serviceimage" src={image} style={{maxHeight: '500px'}}/><br/>
<this.RowWithImagesAvailable/>
        <br/>
</div>


        };//////////////////////function ends here

      /////////////service reviews
      this.ServiceReviews = () =>{
       if(this.state.serviceReviews.length===0){
         return<h6 style={{color: 'rebeccapurple'}}>This service listing has no reviews yet.</h6>
       }else{////////////displaying all reviews
        const { cookies } = this.props;
        var today = new Date();
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        var dateTime = date+' '+time;
        var sortedServiceReviews = this.state.serviceReviews.sort(function(a,b){////sort reviews by date & time
          return new Date(b.date) - new Date(a.date);
        });
        const servicesReviews = sortedServiceReviews.map((review, index) => {
          var details= {
            userid: review.userid,
            indexNum: index
          }
      var username= this.getUsername(details);/////details coming from function
      var userprofilepicturepath= BACKEND_URL+"images/profilepictures/"+this.getProfilepicture(details);
          var timePassed = moment(review.date).from(dateTime)////////time since review was posted
return<div style={{border: '1px solid #DFCDF1', marginBottom: '5px'}}>
<Row style={{marginBottom: '5px'}}>    
  <Col style={{textAlign: 'left', color: 'grey', fontSize: '15px', marginLeft: '1%'}}>
 Posted {timePassed}
  </Col>
  <Col>
  <StarRatings
          rating={review.rating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='serviceRating'
        /> 
  </Col>
</Row>
<Row>
  <Col style={{textAlign: 'left', color: 'rebeccapurple', fontSize: '15px', marginLeft: '1%'}}> 
  <img src={userprofilepicturepath}  onError={this.userIcon} style={{width: '20px', height: '20px', borderRadius: '50%'}}/>
  <span> </span>{username}
  </Col>
</Row>
<Row style={{marginBottom: '5px'}}>
  <Col>
    {review.review}
</Col>
</Row>
</div>
        })
         return<div style={{maxHeight: '390px', overflowY: 'scroll'}}>
           {servicesReviews}
         </div>
       }
               }
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
<BuyServicePopup seller={this.state.userDetails.id} serviceDetails={this.state.serviceDetails} package={2}/>
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
<BuyServicePopup seller={this.state.userDetails.id} serviceDetails={this.state.serviceDetails} package={3}/>
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
          this.setState({imageOnDisplay: result.data.data.getService.imagepath1});
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
      });////////////////////////////ends here
      axios.post(GRAPHQL_BASE_URL, {/////////////////get orders in queue
        query: print(GET_ORDERS_IN_QUEUE), variables: {sellerid: result.data.data.getService.userid, completed: "false"}
      }).then((result3) => {
        this.setState({ordersInQueue: result3.data.data.getOrdersInQueue});
      
      }).catch(error => {
      console.log(error.response)
      });//////////ends here
      axios.post(GRAPHQL_BASE_URL, {/////////////////get seller rating
        query: print(GET_SELLER_RATING), variables: {sellerid: result.data.data.getService.userid}
      }).then((result4) => {
        this.setState({getSellerRating: result4.data.data.getSellerRating});
      
      }).catch(error => {
      console.log(error.response)
      });//////////ends here
      }).catch(error => {
        console.log(error.response)
    });

axios.post(GRAPHQL_BASE_URL, {/////////////get service reviews
  query: print(SERVICE_REVIEWS), variables: {serviceid: this.props.match.params.serviceid}
}).then((result) => {
  this.setState({serviceReviews: result.data.data.getServiceReviewByServiceId});
}).catch(error => {
console.log(error.response)
});///////////ends here

    axios.post(GRAPHQL_BASE_URL, {//////////// get orders you've made and have been completed
      query: print(GET_ORDERED_JOBS), variables: {userid: cookies.get('userId'), completed: "true"}
    }).then((result) => {
      this.setState({yourCompletedOrders: result.data.data.getOrderedJobs});
    
    }).catch(error => {
    console.log(error.response)
    });///////////ends here

  }
  
  viewItem(e) {
    this.setState({extras: e.target.id});
  };
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  };
  submitReview(e) {
    const { cookies } = this.props;
    e.preventDefault()
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;

    if(cookies.get('userId')!=null){///////validate if user is logged in
      const serviceReviews = this.state.serviceReviews.filter(review => review.userid === cookies.get('userId'));
if(serviceReviews.length!=0){///////check if user has reviewed service already
  this.setState({modalText: "You've already posted a review for this service listing."})
  this.onOpenModal();
  this.setState({review: ""});
  this.setState({rating: ""});
}else{
  axios.post(GRAPHQL_BASE_URL, {
    query: print(CREATE_SERVICE_REVIEW), variables: {
      serviceid: this.props.match.params.serviceid,
      userid: cookies.get('userId'),
      sellerid: this.state.userDetails.id,
      review: this.state.review,
      rating: parseInt(this.state.rating, 10),
      date: dateTime
    }
}).then((result) => {
  this.setState({reviewDetails: result.data.data.createServiceReview});
    alert('Your service review was succesful');
    this.setState({review: ""});
    this.setState({rating: ""});
    axios.post(GRAPHQL_BASE_URL, {/////////////reload service reviews
      query: print(SERVICE_REVIEWS), variables: {serviceid: this.props.match.params.serviceid}
    }).then((result) => {
      this.setState({serviceReviews: result.data.data.getServiceReviewByServiceId});
    
    }).catch(error => {
    console.log(error.response)
    });//////////end of reload
}).catch(error => {
  console.log(error.response);
  alert('An error has occured while trying to add your service review');

});
}////end of check if user has reviewed service already
     
    }else{
      this.setState({modalText: "You need to login first inorder to start posting reviews."})
      this.onOpenModal();
      this.setState({review: ""});
      this.setState({rating: ""});
    }

  };
    render() {
      const { open } = this.state;
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
      ///////////////calculating the avergage service rating
      var totalRatings = this.state.serviceReviews.reduce((acc, review) => acc + review.rating, 0);
      var divisor = this.state.serviceReviews.length;
      var averageServiceRating = 0;
      if(this.state.serviceReviews.length!=0){
        averageServiceRating = (totalRatings/divisor);
      };
      //////////////calculating the avergage seller rating
      var totalSellerRatings = this.state.getSellerRating.reduce((acc, review) => acc + review.rating, 0);
      var sellerDivisor = this.state.getSellerRating.length;
      var averageSellerRating = 0;
      if(this.state.getSellerRating.length!=0){
        averageSellerRating = (totalSellerRatings/sellerDivisor);
      };
      //////////////time passed since user joined
      var today = new Date();
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        var dateTime = date+' '+time;
      var timePassedSinceUserJoined = moment(this.state.userDetails.datejoined).from(dateTime)////////time since review was posted

              return (
        <div className="viewsdiv">
  <Row className="servicedetails">
      <Col className="proddetails">
      <h5>{service.name}</h5>
      <Row>
          <Col><StarRatings
          // had to comment out some code in node_modules/react-star-ratings/build/star-ratings.js:152
          rating={averageServiceRating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='rating'
        />  </Col>
          <Col><h6 className="blwtitle"> Orders in queue: <span className="purpletext">{ordersInQueue}</span></h6>
          </Col>
      </Row>
<this.ServiceImages/>
      {/* <img className="serviceimage" src={serviceimage} style={{maxHeight: '500px'}}/><br/><br/> */}
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

<LinkedinShareButton url={serviceLink} style={{padding: '5px'}}>
<LinkedinIcon size={32} round={true} />
</LinkedinShareButton>
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

<BuyServicePopup seller={this.state.userDetails.id} serviceDetails={this.state.serviceDetails} package={1}/>

<br/>
        <h6 className="fulldescription"><br/>{service.description}</h6>
</Col>
        <Col  className="packages">
        <h3 className="thehdn">Extra Packages</h3>
        <br/><br/>
        <this.DisplayPackages/>
</Col>
      </Row>
      {/* ///////////////////////Service Reviews */}
      <Modal open={open} onClose={this.onCloseModal} center>
<h6 style={{color: 'rebeccapurple'}}><br/><br/>{this.state.modalText}<br/><br/></h6>
</Modal>
      <Row style={{marginTop: '5px', marginBottom: '5px', marginLeft: '1px', marginRight: '1px', border: '1px solid #DFCDF1'}}>
<h3 style={{marginLeft: 'auto', marginRight: 'auto', borderBottom: '1px solid #DFCDF1'}}>Service Reviews</h3>
  <Container style={{marginTop: '5px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px', border: '1px solid #DFCDF1'}}>
<this.inputServiceReview/>
<br/> 
<this.ServiceReviews/>
  </Container>
  </Row>


      </Col>
      <Col className="userdetails" sm="3">
      <img className="usrpropc" src={profileimage}/>
      <h5>{user.username}</h5>
      <h6 className="lightgreytext">{user.skills}</h6>
      <StarRatings
          rating={averageSellerRating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='userrating'
        /> 
        <h6 className="lightgreytext"><span className="purpletext">{averageSellerRating}</span> from {this.state.getSellerRating.length} reviews</h6>
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
       <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{timePassedSinceUserJoined}</h6></Col>
     </Row>
<br/>
<h6 className="lightgreytext" style={{fontSize:'15px', borderTop:'1px solid rgba(102, 51, 153, 0.404)'}}><br/>{user.bio}<br/><br/><a href={"/profile/"+ user.id} className="readmore">Visit seller profile</a></h6>

<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '100%', marginBottom: '5px'}}/></a>
<br/>

      </Col>


  </Row>
  
        </div>
      );
    }

  };
  
  export default withCookies(ViewService);