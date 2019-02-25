import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER, FEATURED_SERVICES} from '../graphql/QueryResolver';
import {BACKEND_URL} from '../backendurl';import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class FeaturedServices extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        servicesList:[],
        userDetails:{}

      };
      this.ValidateContent = () =>{
        if(this.state.servicesList==""){
          return<h6 style={{color: 'rebeccapurple', marginTop: '10%'}}>No service listings have been promoted yet.</h6>
        }else{
          const servicesList = this.state.servicesList.map((service, index) => {
            axios.post(GRAPHQL_BASE_URL, {
              query: print(GET_USER), variables: {id: service.userid}
          }).then((result) => {
              this.setState({userDetails: result.data.data.getUser});    
          }).catch(error => {
            console.log(error.response)
        });
    
    const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
    const serviceimage= BACKEND_URL+"images/services/"+service.imagepath1
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
return<Row>{servicesList}</Row>
        }
      }
      
    }
 
    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(FEATURED_SERVICES)
        }).then((result) => {
            this.setState({servicesList: result.data.data.allFeaturedServices});
        }).catch(error => {
          console.log(error.response)
      });
  }
 


    render() {
    
      
        return(<div>
          <this.ValidateContent/>
        </div>
        )
    }

  };
  
  export default FeaturedServices;