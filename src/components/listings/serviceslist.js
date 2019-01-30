import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_SUBCATEGORY, GET_USER} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';

  class ServicesList extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
servicesList:[],
userDetails:{}
      };
    }

    componentDidMount() {
      axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_SERVICES_BY_SUBCATEGORY), variables: {subcategory: this.props.match.params.subcategory}
      }).then((result) => {
          this.setState({servicesList: result.data.data.getServicesBySubcategory});
console.log("kkkkkkkkkkkk", result.data.data.getServicesBySubcategory);
      }).catch(error => {
        console.log(error.response)
    });

  }

    render() {
      const servicesList = this.state.servicesList.map((service, index) => {
        axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_USER), variables: {id: service.userid}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});    
      }).catch(error => {
        console.log(error.response)
    });

const profileimage= "http://localhost:3008/images/profilepictures/"+this.state.userDetails.profilepicturepath
const serviceimage="http://localhost:3008/images/services/"+service.imagepath1
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



      return (
        <div className="graphics">
        <h2 className="grapheading">{this.props.match.params.subcategory}</h2>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Filter</h5>
<h6 className="subcatrow">Delivery Time</h6>
<h6 className="subcatrow">Seller Rating</h6>
<h6 className="subcatrow">Price Range</h6>

</Col>
<Col className="subcategories">
        
           <Row className="srvlst">
{servicesList}
           </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default ServicesList;