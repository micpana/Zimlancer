import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_SUBCATEGORY, GET_USER, GET_BIDS_BY_SUBCATEGORY} from '../graphql/QueryResolver';
import {BACKEND_URL} from '../backendurl';import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class Services extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        servicesList:[],
        userDetails:{}

      };
      
    }
 
    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_SERVICES_BY_SUBCATEGORY), variables: {subcategory: this.props.subcategory}
        }).then((result) => {
            this.setState({servicesList: result.data.data.getServicesBySubcategory});
        }).catch(error => {
          console.log(error.response)
      });
  }
 


    render() {
        const servicesList = this.state.servicesList.map((service, index) => {
          var imagepath=""

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
      
        return(<div>
<Row>{servicesList}</Row>
        </div>
        )
    }

  };
  
  export default Services;