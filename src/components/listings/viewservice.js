import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICE_BY_ID, GET_USER, GET_ORDERS_IN_QUEUE} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';

  class ViewService extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
serviceDetails:{},
userDetails:[],
ordersInQueue:[]
      };
      // this.DisplayPackages = this.DisplayPackages.bind(this);

    }

    componentDidMount() {
      axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_SERVICE_BY_ID), variables: {id: this.props.match.params.serviceid}
      }).then((result) => {
          this.setState({serviceDetails: result.data.data.getService});

      }).catch(error => {
        console.log(error.response)
    });

axios.post(GRAPHQL_BASE_URL, {
  query: print(GET_ORDERS_IN_QUEUE), variables: {userid: this.props.match.params.userid, completed: "false"}
}).then((result) => {
  this.setState({ordersInQueue: result.data.data.getOrdersInQueue});

}).catch(error => {
console.log(error.response)
});

  }
  


    render() {
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_USER), variables: {id: this.state.serviceDetails.userid}
    }).then((result) => {
        this.setState({userDetails: result.data.data.getUser});
  
    }).catch(error => {
      console.log(error.response)
  });

  var serviceInfo=this.state.serviceDetails
  function DisplayPackages(props) {
    if(serviceInfo.extras1==""){
      return<h6 style={{color:'rebeccapurple'}}><br/>This gig has no extra packages.</h6>
    }else{
      return<div>
        <Col>
     <div id="tabs-container">
        <div class="tabs">
          <div class="tab-2">
              <label for="tab2-1">${serviceInfo.extras1price}</label>
              <input id="tab2-1" name="tabs-two" type="radio" checked="checked"/>
                <div>
                <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Delivery time:
</Col>
<Col style={{textAlign:'right'}}>
{serviceInfo.extras1additionaltime} Days
</Col>
</Row>
<br/>
<h6 style={{textAlign:'left'}}>{serviceInfo.extras1}</h6>

                                       

                </div>
          </div>
          <div class="tab-2">
                                    <label for="tab2-2">${serviceInfo.extras2price}</label>
                                    <input id="tab2-2" name="tabs-two" type="radio" />
                                    <div>
                                    <Row style={{color:'rgba(0, 0, 0, 0.5)'}}>
<Col style={{textAlign:'left'}}>
Delivery time:
</Col>
<Col style={{textAlign:'right'}}>
{serviceInfo.extras2additionaltime} Days
</Col>
</Row>
<br/>                         
<h6 style={{textAlign:'left'}}>{serviceInfo.extras2}</h6>

                       


                                    </div>
                                </div>


        </div>
     </div>
     </Col>
      </div>
    }
  }

      const user=this.state.userDetails;
        const serviceimage= "http://localhost:3008/images/services/"+ this.state.serviceDetails.imagepath1
        const profileimage= "http://localhost:3008/images/profilepictures/"+this.state.userDetails.profilepicturepath
        const service=this.state.serviceDetails;
        const ordersInQueue=this.state.ordersInQueue.length
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
<br/>
        <h6 className="fulldescription"><br/>{service.description}</h6>
</Col>
        <Col  className="packages">
        <h3 className="thehdn">Extra Packages</h3>
        <br/><br/>
        <DisplayPackages/>
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
      <a className="msgbtn" href="/messages/"><h6 className="inboxseller"><FaRegEnvelope color="rebeccapurple" size="20px"/> Inbox seller</h6></a>
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
  
  export default ViewService;