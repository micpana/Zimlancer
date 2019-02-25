import React, { Component } from 'react';
import '../listings/viewservice.css';
import './profile.css'
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER, GET_SERVICES_BY_USERID, GET_ORDERS_IN_QUEUE} from '../graphql/QueryResolver';
import {ADD_PROFILE_VIEW} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import {BACKEND_URL} from '../backendurl';
import MessagePopup from '../listings/messagepopup';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class Profile extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
userDetails:{},
userServices:[],
ordersInQueue:[]
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
          userid: this.props.match.params.userid,
          viewerid: cookies.get('userId'),
          date: dateTime
        }
    }).then((result) => {
        this.setState({profileviews: result.data.data.addProfileView});

    }).catch(error => {
      console.log(error.response)
  });
      axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_USER), variables: {id: this.props.match.params.userid}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});

      }).catch(error => {
        console.log(error.response)
    });
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_SERVICES_BY_USERID), variables: {id: this.props.match.params.userid}
    }).then((result) => {
        this.setState({userServices: result.data.data.getServicesByUserId});

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
      const userServices = this.state.userServices.map((service, index) => {
        const profileimage= BACKEND_URL+"images/profilepictures/"+ this.state.userDetails.profilepicturepath
        const serviceimage=BACKEND_URL+"images/services/"+service.imagepath1
                return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
                <Card className="mycard">
                <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                <CardBody>
                  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%'}}/>   {service.username}</CardTitle>
                  <CardText className="servicetitle">{service.name}</CardText>
                  <CardSubtitle className="pricing">Starting at: <span className="actualprice">${service.price}</span></CardSubtitle>
                </CardBody>
              </Card>
        </Col></a>
                </Row>
        
        
            });
    const user=this.state.userDetails;
    const ordersInQueue=this.state.ordersInQueue.length;
    const profileimage= BACKEND_URL+"images/profilepictures/"+ this.state.userDetails.profilepicturepath

      return (
        <Container><br/><br/>
        <div className="userprofile">
        
        <Row>
        <Col style={{border:'1px solid rgba(102, 51, 153, 0.404)', marginRight:'20px'}} sm="5">
        <br/>
        <img className="profilepicture" src={profileimage}/><br/><br/>
        <h5>{user.username}</h5>
        <StarRatings
          rating={user.rating}
          starRatedColor="rebeccapurple"
          numberOfStars={5}
          starDimension="15px"
          name='userrating'
        /> 
        <h6 className="lightgreytext"><span className="purpletext">{user.rating}</span> from 0 reviews</h6>
        <h6>{ordersInQueue} Orders in Queue</h6><br/>
        <MessagePopup seller={user.id}/><br/>
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
       <Col className="lightgreytext" style={{textAlign:'right'}}><h6>{user.datejoined}</h6></Col>
     </Row>
     <h5 style={{borderTop:'1px solid rgba(102, 51, 153, 0.404)'}}><br/>Bio:</h5>
     <h6 className="lightgreytext" style={{fontSize:'15px'}}><br/>{user.bio}</h6>

        </Col>
        <Col >
       
        <h6>Services by {this.state.userDetails.username}</h6>
        <br/>
        <Row>{userServices}</Row>

          
        </Col>
          </Row><br/>
        
<br/>

        </div>
        </Container>
      );
    }

  };
  
  export default withCookies(Profile);